import { PageIntro, SiteFooter, SiteHeader } from "../../_components/site-chrome";
import {
  categories,
  getCategory,
  getRecords,
  type CategorySlug,
  type FeatureStatus,
  type NormalizedFeatureKey,
  type VendorRecord,
} from "../_data";
import { TenderAlertExplorer } from "./tender-alert-explorer";
import { scoreTenderAlert, toTenderAlertExplorerRecord } from "../_data/tender-alert-scoring";

const internationalProcurementSlugs = new Set([
  "civant",
  "deltek-govwin-iq",
  "govspend",
  "govtribe",
  "highergov",
  "tenderalpha",
]);

const featureLabels: Record<NormalizedFeatureKey, string> = {
  semanticAiMatching: "AI or semantic matching",
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
  exportsApi: "Exports or API",
  collaboration: "Team workflow",
  bidWriting: "Bid writing",
};

const matrixFeatureKeys: readonly NormalizedFeatureKey[] = [
  "semanticAiMatching",
  "buyerProfiles",
  "supplierProfiles",
  "renewalSignals",
  "similarContracts",
  "buyerDocuments",
  "buyerRequirements",
  "requirementsPlanning",
  "awardHistory",
];

const strictAuditFeatureKeys: readonly NormalizedFeatureKey[] = [
  "buyerProfiles",
  "supplierProfiles",
  "requirementsPlanning",
];

const statusLabels: Record<FeatureStatus, string> = {
  yes: "Yes",
  partial: "Partial",
  not_offered: "Not offered",
};

const portalColumns = [
  { id: "find_a_tender", label: "Find a Tender" },
  { id: "contracts_finder", label: "Contracts Finder" },
  { id: "public_contracts_scotland", label: "Public Contracts Scotland" },
  { id: "sell2wales", label: "Sell2Wales" },
  { id: "etendersni", label: "eTendersNI" },
  { id: "ted", label: "TED" },
] as const;

const ownershipDisclosure = (
  <div className="disclosure">
    <strong>Ownership disclosure:</strong> Civensa is operated by BidSkim Limited, the company that develops BidSkim. BidSkim uses the same fields, feature weights and provider-source standard as every other entry. Civensa has not independently tested these products. Product classes and scores are mechanical outputs from public evidence. There are no affiliate links or paid placements.
  </div>
);

function formatCheckedDate(value: string): string {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

function FeatureStatusLabel({ status }: { status: FeatureStatus }) {
  return <span className={`feature-status feature-status-${status}`}>{statusLabels[status]}</span>;
}

function formatPrice(value: number | null, currency: "GBP" | "EUR" | "USD" | "mixed" | "unknown"): string {
  if (value === null) return "Not published";
  if (currency === "mixed" || currency === "unknown") return value.toLocaleString("en-GB", { maximumFractionDigits: 2 });
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function NormalizedFeatureMatrix({ records }: { records: readonly VendorRecord[] }) {
  const normalizedRecords = records.filter((record) => record.normalized);
  if (normalizedRecords.length === 0) return null;
  return <section className="feature-matrix-section" aria-labelledby="feature-matrix-title">
    <div className="section-kicker">Normalized comparison</div>
    <h2 id="feature-matrix-title">Features described on provider pages</h2>
    <p>Yes requires clear first-party evidence that the complete capability is available in at least one current plan. Partial means the implementation is adjacent, incomplete or materially narrower. If the reviewed pages do not establish it, Civensa marks it not offered.</p>
    <div className="feature-matrix-scroll" role="region" aria-label="Scrollable normalized feature comparison">
      <table className="feature-matrix">
        <thead><tr><th scope="col">Service</th><th scope="col">Pricing basis</th>{matrixFeatureKeys.map((key) => <th scope="col" key={key}>{featureLabels[key]}</th>)}</tr></thead>
        <tbody>{normalizedRecords.map((record) => <tr key={record.slug}>
          <th scope="row"><a href={`/tools/tender-alerts/${record.slug}/`}>{record.name}</a></th>
          <td>{record.normalized?.pricing.billingBasis.replaceAll("_", " ")}</td>
          {matrixFeatureKeys.map((key) => <td key={key}><FeatureStatusLabel status={record.normalized!.features[key].status} /></td>)}
        </tr>)}</tbody>
      </table>
    </div>
  </section>;
}

function NormalizedPricingMatrix({ records }: { records: readonly VendorRecord[] }) {
  const normalizedRecords = records.filter((record) => record.normalized);
  if (normalizedRecords.length === 0) return null;
  return <section className="feature-matrix-section" aria-labelledby="pricing-matrix-title">
    <div className="section-kicker">Pricing comparison</div>
    <h2 id="pricing-matrix-title">Monthly and annual prices on the same basis</h2>
    <p>Monthly is the price charged on a monthly schedule. Annual is the published yearly total, with its effective monthly cost calculated as annual price divided by 12. Unpublished billing options stay unpublished.</p>
    <div className="feature-matrix-scroll" role="region" aria-label="Scrollable normalized pricing comparison">
      <table className="feature-matrix pricing-matrix">
        <thead><tr><th scope="col">Service</th><th scope="col">Plan</th><th scope="col">Pay monthly<br />per month</th><th scope="col">Pay annually<br />per year</th><th scope="col">Annual effective<br />per month</th><th scope="col">Billing basis</th><th scope="col">Included users</th><th scope="col">Notes</th></tr></thead>
        <tbody>{normalizedRecords.map((record) => {
          const pricing = record.normalized!.pricing;
          return pricing.comparablePlans.map((plan, planIndex) => <tr key={`${record.slug}-${plan.planName}`}>
            {planIndex === 0 ? <th scope="rowgroup" rowSpan={pricing.comparablePlans.length}><a href={`/tools/tender-alerts/${record.slug}/`}>{record.name}</a></th> : null}
            <th scope="row">{plan.planName}</th>
            <td>{formatPrice(plan.monthlyPrice, plan.currency)}</td>
            <td>{formatPrice(plan.annualPrice, plan.currency)}{plan.annualPriceCalculation === "calculated_from_annual_monthly_rate" ? <small className="calculated-price">Calculated</small> : null}</td>
            <td>{formatPrice(plan.annualMonthlyEquivalent, plan.currency)}</td>
            <td>{plan.billingBasis.replaceAll("_", " ")}</td>
            <td>{plan.includedUsers}</td>
            <td>{plan.notes}</td>
          </tr>);
        })}</tbody>
      </table>
    </div>
  </section>;
}

function PortalCoverageMatrix({ records }: { records: readonly VendorRecord[] }) {
  const normalizedRecords = records.filter((record) => record.normalized);
  if (normalizedRecords.length === 0) return null;
  return <section className="feature-matrix-section" aria-labelledby="portal-matrix-title">
    <div className="section-kicker">Named sources</div>
    <h2 id="portal-matrix-title">Portals explicitly named by each provider</h2>
    <p>Listed means the provider&apos;s reviewed page names that portal. Not stated is not evidence that the service lacks coverage. Generic claims such as “all UK portals” stay outside this matrix.</p>
    <div className="feature-matrix-scroll" role="region" aria-label="Scrollable explicit portal coverage comparison">
      <table className="feature-matrix portal-matrix">
        <thead><tr><th scope="col">Service</th>{portalColumns.map((portal) => <th scope="col" key={portal.id}>{portal.label}</th>)}<th scope="col">Other named portals</th></tr></thead>
        <tbody>{normalizedRecords.map((record) => {
          const explicitPortals = record.normalized!.explicitPortals;
          const otherPortals = explicitPortals.filter((portal) => !portalColumns.some((column) => column.id === portal.portalId));
          return <tr key={record.slug}>
            <th scope="row"><a href={`/tools/tender-alerts/${record.slug}/`}>{record.name}</a></th>
            {portalColumns.map((column) => {
              const portal = explicitPortals.find((item) => item.portalId === column.id);
              const evidence = portal?.evidenceLinks[0];
              return <td key={column.id}>{portal ? <span className="portal-listed">{evidence ? <a href={evidence.url} rel="noopener noreferrer">Listed ↗</a> : "Listed"}</span> : <span className="portal-not-stated">Not stated</span>}</td>;
            })}
            <td>{otherPortals.length > 0 ? otherPortals.map((portal) => portal.portalName).join(", ") : <span className="portal-not-stated">None named</span>}</td>
          </tr>;
        })}</tbody>
      </table>
    </div>
  </section>;
}

function latestChecked(records: readonly VendorRecord[]): string {
  return records.reduce((latest, record) => record.lastChecked > latest ? record.lastChecked : latest, "0000-00-00");
}

function NormalizedEvidence({ record }: { record: VendorRecord }) {
  const normalized = record.normalized;
  if (!normalized) return null;
  const researchNotes = [...normalized.caveats, ...normalized.otherCoverageClaims.map((item) => item.claim)].slice(0, 2);
  if (researchNotes.length === 0) return null;
  return <div className="normalized-evidence">
    <h3>Research notes</h3>
    <ul>{researchNotes.map((note) => <li key={note}>{note}</li>)}</ul>
  </div>;
}

function StrictFeatureAudit({ record }: { record: VendorRecord }) {
  const normalized = record.normalized;
  if (!normalized) return null;
  return <div className="strict-feature-audit">
    <h3>Strict profile and planning audit</h3>
    <dl>{strictAuditFeatureKeys.map((key) => {
      const feature = normalized.features[key];
      return <div key={key}>
        <dt>{featureLabels[key]} <FeatureStatusLabel status={feature.status} /></dt>
        <dd>{feature.detail}{feature.evidenceLinks.map((link) => <a key={link.url} href={link.url} rel="noopener noreferrer">{link.label} ↗</a>)}</dd>
      </div>;
    })}</dl>
  </div>;
}

function BreadcrumbSchema({ category }: { category?: { name: string; slug: string } }) {
  const elements = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://civensa.com/" },
    { "@type": "ListItem", position: 2, name: "Procurement tools", item: "https://civensa.com/tools/" },
  ];
  if (category) elements.push({ "@type": "ListItem", position: 3, name: category.name, item: `https://civensa.com/tools/${category.slug}/` });
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: elements };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function ItemListSchema({ name, records }: { name: string; records: readonly VendorRecord[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: records.length,
    itemListElement: records.map((record, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: record.name,
      url: record.category === "tender-alerts"
        ? `https://civensa.com/tools/tender-alerts/${record.slug}/`
        : `https://civensa.com/tools/${record.category}/#${record.slug}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function DirectoryEntry({ record }: { record: VendorRecord }) {
  const evidenceLinks = [...(record.normalized?.pricing.evidenceLinks ?? []), ...record.evidenceLinks]
    .filter((link, index, links) => links.findIndex((candidate) => candidate.url === link.url) === index);
  return <article className="directory-entry" id={record.slug}>
    <div>
      <div className="entry-type">{record.providerType}</div>
      <h2><a href={record.officialUrl} rel="noopener noreferrer">{record.name} <span aria-hidden="true">↗</span></a></h2>
      <span className="evidence-label">{record.evidenceBasis}</span>
      <span className="evidence-label">Not independently tested</span>
      {record.category === "tender-alerts" && record.normalized ? <a className="deep-audit-link" href={`/tools/tender-alerts/${record.slug}/`}>View deep audit →</a> : null}
    </div>
    <div>
      <p>{record.summary}</p>
      <ul>
        <li><strong>Coverage:</strong> {record.coverage}</li>
        <li><strong>Best for:</strong> {record.bestFor}</li>
        <li><strong>Not for:</strong> {record.notFor}</li>
        <li><strong>Caveat:</strong> {record.caveat}</li>
      </ul>
      <StrictFeatureAudit record={record} />
      <NormalizedEvidence record={record} />
    </div>
    <div className="entry-meta">
      <div><small>Public pricing</small><span>{record.normalized?.pricing.plansText ?? record.pricing}</span></div>
      {record.normalized ? <div><small>Normalized pricing basis</small><span>{record.normalized.pricing.billingBasis.replaceAll("_", " ")}. {record.normalized.pricing.seatDetail}</span></div> : null}
      <div><small>Pricing caveat</small><span>{record.pricingCaveat}</span></div>
      <div><small>Last checked</small><time dateTime={record.lastChecked}>{formatCheckedDate(record.lastChecked)}</time></div>
      <div><small>Evidence</small>{evidenceLinks.map((link) => <a key={link.url} href={link.url} rel="noopener noreferrer">{link.label} ↗</a>)}</div>
    </div>
  </article>;
}

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug);
  const records = getRecords(slug);
  const checkedDate = formatCheckedDate(latestChecked(records));
  const containsBidSkim = records.some((record) => record.name === "BidSkim");
  const structuredRecords = slug === "tender-alerts"
    ? [...records].sort((left, right) => scoreTenderAlert(right).overallScore - scoreTenderAlert(left).overallScore || left.name.localeCompare(right.name, "en-GB"))
    : records;
  const ukIntelligenceRecords = slug === "procurement-intelligence"
    ? records.filter((record) => !internationalProcurementSlugs.has(record.slug))
    : [];
  const internationalIntelligenceRecords = slug === "procurement-intelligence"
    ? records.filter((record) => internationalProcurementSlugs.has(record.slug))
    : [];
  return <main>
    <SiteHeader />
    <PageIntro kicker="Procurement tools directory" title={category.name} lead={category.lead} />
    <section className="shell directory-intro">
      <div>
        {containsBidSkim ? ownershipDisclosure : <div className="directory-note"><strong>Evidence status:</strong> Entries describe public claims from the provider or the official body. Civensa has not independently tested, rated or ranked them. There are no affiliate links or paid rankings.</div>}
        <p>Research desk: Civensa Research. Evidence checked {checkedDate}.</p>
        <p><a className="text-link" href="/tools/methodology/">Read the directory methodology and corrections policy →</a></p>
      </div>
      <div className="directory-facts" aria-label="Directory facts">
        <div><span>Listings</span><strong>{records.length}</strong></div>
        <div><span>Last checked</span><strong>{checkedDate}</strong></div>
        <div><span>Independent tests</span><strong>None</strong></div>
      </div>
    </section>
    <section className="content-section shell" aria-labelledby={slug === "tender-alerts" ? "tender-explorer-title" : "questions-title"}>
      <nav className="directory-controls" aria-label="Tools categories">
        {categories.map((item) => <a key={item.slug} href={`/tools/${item.slug}/`} aria-current={item.slug === slug ? "page" : undefined}>{item.shortName}</a>)}
      </nav>
      {slug === "tender-alerts" ? <>
        <TenderAlertExplorer records={records.map(toTenderAlertExplorerRecord)} />
        <details className="shortlist-questions">
          <summary>Three questions to ask before buying</summary>
          <ul>{category.questions.map((question) => <li key={question}>{question}</li>)}</ul>
        </details>
        <details className="research-tables">
          <summary>Open the full research tables</summary>
          <NormalizedFeatureMatrix records={records} />
          <NormalizedPricingMatrix records={records} />
          <PortalCoverageMatrix records={records} />
        </details>
      </> : <>
        <div className="section-kicker">Before you shortlist</div>
        <h2 id="questions-title">Three questions worth asking</h2>
        <ul>{category.questions.map((question) => <li key={question}>{question}</li>)}</ul>
      </>}
      {slug === "procurement-intelligence" ? <>
        <section aria-labelledby="uk-intelligence-title">
          <h2 id="uk-intelligence-title">UK-facing procurement intelligence</h2>
          <p>Products with a stated UK procurement-data use. Entries are alphabetical, not ranked.</p>
          <div className="directory-list">{ukIntelligenceRecords.map((record) => <DirectoryEntry key={record.slug} record={record} />)}</div>
        </section>
        <section aria-labelledby="international-intelligence-title">
          <h2 id="international-intelligence-title">International alternatives</h2>
          <p>Products focused on European, US or global markets. Entries are alphabetical, not ranked.</p>
          <div className="directory-list">{internationalIntelligenceRecords.map((record) => <DirectoryEntry key={record.slug} record={record} />)}</div>
        </section>
      </> : slug === "tender-alerts" ? null : <div className="directory-list">{records.map((record) => <DirectoryEntry key={record.slug} record={record} />)}</div>}
      <div className="directory-note"><strong>Verify before buying:</strong> Public prices and feature pages can change. Request a dated order form, check official notice links, and run a real workflow before committing.</div>
    </section>
    <SiteFooter />
    <BreadcrumbSchema category={{ name: category.name, slug }} />
    <ItemListSchema name={`Civensa ${category.name}`} records={structuredRecords} />
  </main>;
}

export function DirectoryIndex() {
  const allRecords = categories.flatMap((category) => getRecords(category.slug));
  const checkedDate = formatCheckedDate(latestChecked(allRecords));
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Civensa procurement tools directory categories",
    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem", position: index + 1, name: category.name, url: `https://civensa.com/tools/${category.slug}/`,
    })),
  };
  return <main>
    <SiteHeader />
    <PageIntro kicker="Sourced directory" title="Tools for finding, understanding and bidding for public contracts." lead="A source-linked directory of tender alerts, procurement intelligence, bid-response software, bid-writing services and official portals." />
    <section className="shell directory-intro">
      <div>{ownershipDisclosure}<p>Research desk: Civensa Research. Evidence checked {checkedDate}.</p><p>Every listing has a dated source basis, public pricing text where available, coverage, a practical fit note and an explicit limitation.</p></div>
      <div className="directory-facts" aria-label="Directory facts">
        <div><span>Listings</span><strong>{getRecords("tender-alerts").length + getRecords("procurement-intelligence").length + getRecords("bid-writing-software").length + getRecords("bid-writing-services").length + getRecords("official-portals").length}</strong></div>
        <div><span>Categories</span><strong>{categories.length}</strong></div>
        <div><span>Last checked</span><strong>{checkedDate}</strong></div>
      </div>
    </section>
    <section className="content-section shell">
      <div className="section-kicker">Browse by job</div>
      <div className="category-grid">{categories.map((category) => {
        const count = getRecords(category.slug).length;
        return <article className="category-card" key={category.slug}><small>{count} sourced listings</small><h2>{category.name}</h2><p>{category.description}</p><a href={`/tools/${category.slug}/`}>Open category →</a></article>;
      })}<article className="category-card"><small>How this works</small><h2>Directory methodology</h2><p>Inclusion, evidence labels, pricing freshness, corrections, ownership and change-log rules.</p><a href="/tools/methodology/">Read methodology →</a></article></div>
      <div className="directory-note"><strong>Start at the source:</strong> A commercial service can consolidate or interpret notices, but the buyer’s current official notice and tender documents control.</div>
    </section>
    <SiteFooter />
    <BreadcrumbSchema />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
