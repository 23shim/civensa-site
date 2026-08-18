"use client";

import { useMemo, useState } from "react";
import {
  tenderProductGroups,
  type TenderAlertExplorerRecord,
  type TenderProductGroupId,
} from "../_data/tender-alert-scoring";
import type { NormalizedFeatureKey } from "../_data";

type SortId = "overall" | "features" | "value" | "alertPrice" | "fullPrice" | "group" | "name";
type PricingFilter = "all" | "public" | "free" | "quote";

const featureLabels: Readonly<Record<NormalizedFeatureKey, string>> = {
  semanticAiMatching: "AI matching",
  buyerProfiles: "Buyer profiles",
  supplierProfiles: "Supplier profiles",
  renewalSignals: "Renewals",
  similarContracts: "Similar contracts",
  buyerDocuments: "Buyer document corpus",
  buyerRequirements: "Buyer requirements",
  requirementsPlanning: "Requirements planning",
  awardHistory: "Award history",
  frameworks: "Frameworks",
  competitorTracking: "Competitor tracking",
  exportsApi: "Exports / API",
  collaboration: "Team workflow",
  bidWriting: "Bid writing",
};

const standoutKeys: readonly NormalizedFeatureKey[] = [
  "buyerProfiles",
  "supplierProfiles",
  "renewalSignals",
  "semanticAiMatching",
  "requirementsPlanning",
  "similarContracts",
  "awardHistory",
  "buyerRequirements",
  "competitorTracking",
  "bidWriting",
];

const filterFeatureKeys: readonly NormalizedFeatureKey[] = [
  "semanticAiMatching",
  "buyerProfiles",
  "supplierProfiles",
  "renewalSignals",
  "similarContracts",
  "buyerRequirements",
  "requirementsPlanning",
  "awardHistory",
  "frameworks",
  "competitorTracking",
  "exportsApi",
  "collaboration",
];

const portalOptions = [
  { id: "find_a_tender", label: "Find a Tender" },
  { id: "contracts_finder", label: "Contracts Finder" },
  { id: "public_contracts_scotland", label: "Public Contracts Scotland" },
  { id: "sell2wales", label: "Sell2Wales" },
  { id: "etendersni", label: "eTendersNI" },
  { id: "ted", label: "TED" },
] as const;

function featureStatusLabel(status: "yes" | "partial" | "not_offered"): string {
  return status === "yes" ? "Yes" : status === "partial" ? "Partial" : "Not offered";
}

function priceLabel(record: TenderAlertExplorerRecord, kind: "alert" | "full"): string {
  const score = record.score;
  const price = kind === "alert" ? score.alertMonthlyPrice : score.fullPackageMonthlyPrice;
  const planName = kind === "alert" ? score.alertPlanName : score.fullPackagePlanName;
  if (price === null) return planName !== "Not published" || record.pricingAvailability === "quote_only" ? `Quote · ${planName}` : "No public price";
  if (price === 0) return `Free · ${planName}`;
  const currency = kind === "alert" ? score.alertPriceCurrency : score.fullPackagePriceCurrency;
  const formatted = currency === "mixed" || currency === "unknown"
    ? price.toLocaleString("en-GB", { maximumFractionDigits: 2 })
    : new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 2 }).format(price);
  return `${formatted}/mo · ${planName}`;
}

export function TenderAlertExplorer({ records }: { records: readonly TenderAlertExplorerRecord[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<TenderProductGroupId | "all">("all");
  const [sort, setSort] = useState<SortId>("overall");
  const [maxAlertPrice, setMaxAlertPrice] = useState("any");
  const [maxFullPrice, setMaxFullPrice] = useState("any");
  const [pricingFilter, setPricingFilter] = useState<PricingFilter>("all");
  const [portal, setPortal] = useState("all");
  const [minimumScore, setMinimumScore] = useState("0");
  const [requiredFeatures, setRequiredFeatures] = useState<readonly NormalizedFeatureKey[]>([]);
  const [comparedSlugs, setComparedSlugs] = useState<readonly string[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  const scoredRecords = useMemo(() => records.map((record) => ({ record, score: record.score })), [records]);
  const groupCounts = useMemo(() => Object.fromEntries(tenderProductGroups.map((item) => [
    item.id,
    scoredRecords.filter(({ score }) => score.groupIds.includes(item.id)).length,
  ])), [scoredRecords]) as Record<TenderProductGroupId, number>;

  const visibleRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en-GB");
    return scoredRecords
      .filter(({ score }) => group === "all" || score.groupIds.includes(group))
      .filter(({ record }) => !normalizedQuery || [
        record.name,
        record.summary,
        record.bestFor,
        record.coverage,
      ]
        .some((value) => value.toLocaleLowerCase("en-GB").includes(normalizedQuery)))
      .filter(({ score }) => maxAlertPrice === "any" || (score.alertMonthlyPrice !== null && score.alertMonthlyPrice <= Number(maxAlertPrice)))
      .filter(({ score }) => maxFullPrice === "any" || (score.fullPackageMonthlyPrice !== null && score.fullPackageMonthlyPrice <= Number(maxFullPrice)))
      .filter(({ record }) => {
        if (pricingFilter === "all") return true;
        if (pricingFilter === "public") return record.pricingAvailability === "public_numeric";
        if (pricingFilter === "quote") return record.pricingAvailability === "quote_only";
        return record.hasFreeOption;
      })
      .filter(({ record }) => portal === "all" || record.explicitPortalIds.includes(portal))
      .filter(({ score }) => score.overallScore >= Number(minimumScore))
      .filter(({ record }) => requiredFeatures.every((key) => record.featureStatuses[key] === "yes"))
      .sort((left, right) => {
        if (sort === "features") return right.score.featureScore - left.score.featureScore || left.record.name.localeCompare(right.record.name, "en-GB");
        if (sort === "value") return right.score.valueScore - left.score.valueScore || right.score.featureScore - left.score.featureScore;
        if (sort === "alertPrice") return (left.score.alertMonthlyPrice ?? Number.POSITIVE_INFINITY) - (right.score.alertMonthlyPrice ?? Number.POSITIVE_INFINITY);
        if (sort === "fullPrice") return (left.score.fullPackageMonthlyPrice ?? Number.POSITIVE_INFINITY) - (right.score.fullPackageMonthlyPrice ?? Number.POSITIVE_INFINITY);
        if (sort === "group") return tenderProductGroups.findIndex((item) => item.id === left.score.primaryGroupId) - tenderProductGroups.findIndex((item) => item.id === right.score.primaryGroupId) || right.score.overallScore - left.score.overallScore;
        if (sort === "name") return left.record.name.localeCompare(right.record.name, "en-GB");
        return right.score.overallScore - left.score.overallScore || right.score.featureScore - left.score.featureScore;
      });
  }, [group, maxAlertPrice, maxFullPrice, minimumScore, portal, pricingFilter, query, requiredFeatures, scoredRecords, sort]);

  const comparedRecords = comparedSlugs
    .map((slug) => scoredRecords.find(({ record }) => record.slug === slug))
    .filter((item): item is (typeof scoredRecords)[number] => Boolean(item));
  const activeFilterCount = (query ? 1 : 0)
    + (group !== "all" ? 1 : 0)
    + (maxAlertPrice !== "any" ? 1 : 0)
    + (maxFullPrice !== "any" ? 1 : 0)
    + (pricingFilter !== "all" ? 1 : 0)
    + (portal !== "all" ? 1 : 0)
    + (minimumScore !== "0" ? 1 : 0)
    + requiredFeatures.length;

  function resetFilters() {
    setQuery("");
    setGroup("all");
    setSort("overall");
    setMaxAlertPrice("any");
    setMaxFullPrice("any");
    setPricingFilter("all");
    setPortal("all");
    setMinimumScore("0");
    setRequiredFeatures([]);
  }

  function toggleRequiredFeature(key: NormalizedFeatureKey) {
    setRequiredFeatures((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  }

  function toggleCompare(slug: string) {
    setComparedSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 4) return current;
      return [...current, slug];
    });
  }

  return <section className="tender-explorer" aria-labelledby="tender-explorer-title">
    <div className="tender-explorer-head">
      <div>
        <div className="section-kicker">Shortlist builder</div>
        <h2 id="tender-explorer-title">Find the right level of tender intelligence.</h2>
        <p>Start with a product type, then sort {records.length} researched services by feature depth, value or either price benchmark.</p>
      </div>
      <div className="score-key">
        <span>Provider-stated public-evidence score</span>
        <strong>68%</strong> features
        <strong>32%</strong> value
      </div>
    </div>

    <div className="product-group-grid" aria-label="Filter by product class">
      {tenderProductGroups.map((item) => <button
        className={group === item.id ? "is-active" : ""}
        type="button"
        key={item.id}
        onClick={() => setGroup(group === item.id ? "all" : item.id)}
        aria-pressed={group === item.id}
      >
        <span>{item.label}</span>
        <strong>{groupCounts[item.id]}</strong>
        <small>{item.description}</small>
      </button>)}
    </div>
    <p className="group-overlap-note">Products can appear in more than one type. Counts show memberships, not mutually exclusive buckets.</p>

    <div className="explorer-toolbar">
      <label className="explorer-search">
        <span>Search products</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Try renewals, frameworks, Scotland…" />
      </label>
      <label>
        <span>Sort results</span>
        <select value={sort} onChange={(event) => setSort(event.target.value as SortId)}>
          <option value="overall">Best combined score</option>
          <option value="features">Feature depth</option>
          <option value="value">Headline value</option>
          <option value="alertPrice">Lowest tender-alert price</option>
          <option value="fullPrice">Lowest full-package price</option>
          <option value="group">Product class</option>
          <option value="name">Name A to Z</option>
        </select>
      </label>
      {(activeFilterCount > 0 || sort !== "overall") ? <button className="reset-filters" type="button" onClick={resetFilters}>Reset {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</button> : <div />}
    </div>

    <div className="explorer-filter-panel">
      <div className="explorer-filter-grid">
        <label><span>Maximum alert price</span><select value={maxAlertPrice} onChange={(event) => setMaxAlertPrice(event.target.value)}>
          <option value="any">Any or unpublished</option>
          <option value="50">Up to £50</option>
          <option value="100">Up to £100</option>
          <option value="200">Up to £200</option>
          <option value="500">Up to £500</option>
        </select></label>
        <label><span>Maximum full-package price</span><select value={maxFullPrice} onChange={(event) => setMaxFullPrice(event.target.value)}>
          <option value="any">Any or unpublished</option>
          <option value="100">Up to £100</option>
          <option value="250">Up to £250</option>
          <option value="500">Up to £500</option>
          <option value="1000">Up to £1,000</option>
        </select></label>
        <label><span>Pricing evidence</span><select value={pricingFilter} onChange={(event) => setPricingFilter(event.target.value as PricingFilter)}>
          <option value="all">Any pricing</option>
          <option value="public">Public numeric price</option>
          <option value="free">Has a free option</option>
          <option value="quote">Quote only</option>
        </select></label>
        <label><span>Explicitly named portal</span><select value={portal} onChange={(event) => setPortal(event.target.value)}>
          <option value="all">Any portal coverage</option>
          {portalOptions.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
        </select></label>
        <label><span>Minimum combined score</span><select value={minimumScore} onChange={(event) => setMinimumScore(event.target.value)}>
          <option value="0">Any score</option>
          <option value="50">50 and above</option>
          <option value="65">65 and above</option>
          <option value="80">80 and above</option>
        </select></label>
      </div>
      <fieldset className="must-have-features">
        <legend>Must offer <span>Only clear “Yes” evidence qualifies</span></legend>
        <div>{filterFeatureKeys.map((key) => <button
          type="button"
          key={key}
          className={requiredFeatures.includes(key) ? "is-active" : ""}
          aria-pressed={requiredFeatures.includes(key)}
          onClick={() => toggleRequiredFeature(key)}
        >{featureLabels[key]}</button>)}</div>
      </fieldset>
    </div>

    <div className="explorer-results-head">
      <p aria-live="polite"><strong>{visibleRecords.length}</strong> of {records.length} products {activeFilterCount > 0 ? `· ${activeFilterCount} active filters` : ""}</p>
      <details>
        <summary>How the score works</summary>
        <p>Feature score uses 14 weighted capabilities. Buyer and supplier profiles, renewals and AI matching carry the most weight. Value separately measures the entry tender-alert plan and the highest listed package, then adds pricing transparency and whether pricing is per seat, team or organisation. Annual monthly equivalents are used when published. Quote-only prices receive a neutral-low affordability score. This is a comparison aid based on public claims, not a product review.</p>
      </details>
    </div>

    {comparedRecords.length > 0 ? <div className="compare-tray">
      <div><strong>Compare shortlist</strong><span>{comparedRecords.length}/4 selected</span></div>
      <div className="compare-picks">{comparedRecords.map(({ record }) => <button type="button" key={record.slug} onClick={() => toggleCompare(record.slug)}>{record.name} <span aria-hidden="true">×</span></button>)}</div>
      <button className="compare-action" type="button" disabled={comparedRecords.length < 2} onClick={() => setComparisonOpen((open) => !open)}>{comparisonOpen ? "Hide comparison" : "Compare selected"}</button>
    </div> : null}

    {comparisonOpen && comparedRecords.length >= 2 ? <div className="shortlist-comparison" role="region" aria-label="Selected products comparison">
      <div className="feature-matrix-scroll">
        <table className="feature-matrix compare-shortlist-table">
          <thead><tr><th scope="col">Measure</th>{comparedRecords.map(({ record }) => <th scope="col" key={record.slug}><a href={`/tools/tender-alerts/${record.slug}/`}>{record.name}</a></th>)}</tr></thead>
          <tbody>
            <tr><th scope="row">Combined score</th>{comparedRecords.map(({ record, score }) => <td key={record.slug}><strong>{score.overallScore}/100</strong></td>)}</tr>
            <tr><th scope="row">Product types</th>{comparedRecords.map(({ record, score }) => <td key={record.slug}>{score.groupIds.map((id) => tenderProductGroups.find((item) => item.id === id)?.label).join(", ")}</td>)}</tr>
            <tr><th scope="row">Tender-alert price</th>{comparedRecords.map(({ record }) => <td key={record.slug}>{priceLabel(record, "alert")}</td>)}</tr>
            <tr><th scope="row">Full-package price</th>{comparedRecords.map(({ record }) => <td key={record.slug}>{priceLabel(record, "full")}</td>)}</tr>
            {filterFeatureKeys.slice(0, 10).map((key) => <tr key={key}><th scope="row">{featureLabels[key]}</th>{comparedRecords.map(({ record }) => <td key={record.slug}><span className={`feature-status feature-status-${record.featureStatuses[key]}`}>{featureStatusLabel(record.featureStatuses[key])}</span></td>)}</tr>)}
            <tr><th scope="row">Named portals</th>{comparedRecords.map(({ record }) => <td key={record.slug}>{record.explicitPortalCount || "None"}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div> : null}

    <div className="tender-result-grid">
      {visibleRecords.map(({ record, score }, index) => {
        const groupLabels = score.groupIds.map((id) => tenderProductGroups.find((item) => item.id === id)!.shortLabel);
        const standouts = standoutKeys.filter((key) => record.featureStatuses[key] === "yes").slice(0, 4);
        return <article className="tender-result-card" key={record.slug}>
          <div className="result-card-topline">
            <span>{groupLabels.join(" · ")}</span>
            <span>#{index + 1} in results</span>
          </div>
          <div className="result-card-title">
            <div>
              <h3><a href={`/tools/tender-alerts/${record.slug}/`}>{record.name}</a></h3>
              <p>{record.summary}</p>
            </div>
            <div className="overall-score" aria-label={`Combined score ${score.overallScore} out of 100`}>
              <strong>{score.overallScore}</strong>
              <span>/100</span>
            </div>
          </div>
          <div className="score-bars">
            <div><span>Features <strong>{score.featureScore}</strong></span><i><b style={{ width: `${score.featureScore}%` }} /></i></div>
            <div><span>Value <strong>{score.valueScore}</strong></span><i><b style={{ width: `${score.valueScore}%` }} /></i></div>
          </div>
          <div className="result-facts">
            <div><span>Tender-alert price</span><strong>{priceLabel(record, "alert")}</strong></div>
            <div><span>Full-package price</span><strong>{priceLabel(record, "full")}</strong></div>
            <div><span>Features evidenced</span><strong>{score.yesCount} yes · {score.partialCount} partial</strong></div>
            <div><span>Named portals</span><strong>{record.explicitPortalCount || "None"}</strong></div>
          </div>
          <div className="standout-features" aria-label="Evidenced features">
            {standouts.length > 0 ? standouts.map((key) => <span key={key}>{featureLabels[key]}</span>) : <span>Core alerting only</span>}
          </div>
          <div className="result-card-footer">
            <button
              className={comparedSlugs.includes(record.slug) ? "compare-toggle is-active" : "compare-toggle"}
              type="button"
              onClick={() => toggleCompare(record.slug)}
              disabled={!comparedSlugs.includes(record.slug) && comparedSlugs.length >= 4}
              aria-pressed={comparedSlugs.includes(record.slug)}
            >{comparedSlugs.includes(record.slug) ? "Added to compare" : "Add to compare"}</button>
            <a href={`/tools/tender-alerts/${record.slug}/`}>View evidence →</a>
          </div>
        </article>;
      })}
    </div>
    {visibleRecords.length === 0 ? <div className="empty-results"><strong>No products match those filters.</strong><button type="button" onClick={resetFilters}>Clear filters</button></div> : null}
  </section>;
}
