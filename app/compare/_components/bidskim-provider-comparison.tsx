/* eslint-disable @next/next/no-html-link-for-pages -- Static export uses plain anchors to avoid an RSC prefetch runtime. */
import { SiteFooter, SiteHeader } from "../../_components/site-chrome";
import {
  normalizedFeatureKeys,
  type FeatureStatus,
  type NormalizedFeatureKey,
  type VendorRecord,
} from "../../tools/_data";
import {
  scoreTenderAlert,
  tenderProductGroups,
  type TenderAlertScore,
} from "../../tools/_data/tender-alert-scoring";

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

const statusLabels: Record<FeatureStatus, string> = {
  yes: "Yes",
  partial: "Partial",
  not_offered: "Not offered",
};

const statusRank: Record<FeatureStatus, number> = {
  yes: 2,
  partial: 1,
  not_offered: 0,
};

const groupLabels = Object.fromEntries(tenderProductGroups.map((group) => [group.id, group.label]));

function formatCheckedDate(value: string): string {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

function formatCurrency(value: number, currency: TenderAlertScore["alertPriceCurrency"]): string {
  if (currency === "mixed" || currency === "unknown") return value.toLocaleString("en-GB", { maximumFractionDigits: 2 });
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function priceLabel(record: VendorRecord, score: TenderAlertScore, kind: "alert" | "full"): string {
  const value = kind === "alert" ? score.alertMonthlyPrice : score.fullPackageMonthlyPrice;
  const currency = kind === "alert" ? score.alertPriceCurrency : score.fullPackagePriceCurrency;
  if (value !== null) return `${formatCurrency(value, currency)}/mo`;
  return record.normalized?.pricing.availability === "quote_only" ? "Quote only" : "Not published";
}

function EvidenceLinks({ links }: { links: readonly { label: string; url: string }[] }) {
  if (links.length === 0) return null;
  return <span className="audit-links">{links.map((link) => <a key={`${link.url}-${link.label}`} href={link.url} rel="noopener noreferrer">{link.label} ↗</a>)}</span>;
}

function ScoreCard({ record, score }: { record: VendorRecord; score: TenderAlertScore }) {
  return <article className="comparison-score-card">
    <div className="comparison-score-card-head">
      <div><span className="comparison-card-label">Tender intelligence product</span><h2>{record.name}</h2></div>
      <div className="comparison-overall-score"><strong>{score.overallScore}</strong><span>/100</span></div>
    </div>
    <p>{record.summary}</p>
    <div className="comparison-score-breakdown">
      <div><span>Feature score</span><strong>{score.featureScore}</strong></div>
      <div><span>Value score</span><strong>{score.valueScore}</strong></div>
      <div><span>Complete features</span><strong>{score.yesCount}/14</strong></div>
    </div>
    <dl className="comparison-prices">
      <div><dt>Tender-alert benchmark</dt><dd>{priceLabel(record, score, "alert")}</dd><small>{score.alertPlanName}</small></div>
      <div><dt>Full-package benchmark</dt><dd>{priceLabel(record, score, "full")}</dd><small>{score.fullPackagePlanName}</small></div>
    </dl>
    <div className="comparison-groups" aria-label={`${record.name} product types`}>{score.groupIds.map((groupId) => <span key={groupId}>{groupLabels[groupId]}</span>)}</div>
  </article>;
}

function advantageSentence(keys: readonly NormalizedFeatureKey[], fallback: string): string {
  if (keys.length === 0) return fallback;
  return keys.map((key) => featureLabels[key]).join(", ");
}

export function BidSkimProviderComparison({ bidSkim, provider, related }: { bidSkim: VendorRecord; provider: VendorRecord; related: readonly VendorRecord[] }) {
  if (!bidSkim.normalized || !provider.normalized) throw new Error("Normalized comparison research is required");
  const bidSkimScore = scoreTenderAlert(bidSkim);
  const providerScore = scoreTenderAlert(provider);
  const bidSkimAdvantages = normalizedFeatureKeys.filter((key) => statusRank[bidSkim.normalized!.features[key].status] > statusRank[provider.normalized!.features[key].status]);
  const providerAdvantages = normalizedFeatureKeys.filter((key) => statusRank[provider.normalized!.features[key].status] > statusRank[bidSkim.normalized!.features[key].status]);
  const levelFeatures = normalizedFeatureKeys.filter((key) => statusRank[provider.normalized!.features[key].status] === statusRank[bidSkim.normalized!.features[key].status]);
  const canonical = `https://civensa.com/compare/bidskim-vs-${provider.slug}/`;
  const scoreLead = bidSkimScore.overallScore === providerScore.overallScore
    ? `Both products score ${bidSkimScore.overallScore}/100 on Civensa's current public-evidence model.`
    : `${bidSkimScore.overallScore > providerScore.overallScore ? "BidSkim" : provider.name} has the higher current public-evidence score: ${Math.max(bidSkimScore.overallScore, providerScore.overallScore)}/100 versus ${Math.min(bidSkimScore.overallScore, providerScore.overallScore)}/100.`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `BidSkim vs ${provider.name}`,
    description: `Evidence-led comparison of BidSkim and ${provider.name}, including normalized features, pricing benchmarks and disclosed scores.`,
    url: canonical,
    dateModified: provider.normalized.researchedAt,
    author: { "@type": "Organization", name: "Civensa Research" },
    about: [
      { "@type": "SoftwareApplication", name: bidSkim.name, url: bidSkim.officialUrl },
      { "@type": "SoftwareApplication", name: provider.name, url: provider.officialUrl },
    ],
  };

  return <main>
    <SiteHeader />
    <header className="provider-audit-head comparison-head shell">
      <a className="back-link" href="/compare/">← All BidSkim comparisons</a>
      <div className="eyebrow"><span /> Tender intelligence comparison</div>
      <h1>BidSkim vs {provider.name}</h1>
      <p>{scoreLead} Compare the underlying features, price references and public evidence before deciding which product fits your workflow.</p>
      <div className="provider-audit-byline"><span>Civensa Research</span><time dateTime={provider.normalized.researchedAt}>{formatCheckedDate(provider.normalized.researchedAt)}</time><span>Provider claims, not a hands-on test</span></div>
    </header>

    <div className="provider-audit-body comparison-body shell">
      <p className="comparison-commercial-disclosure"><strong>Commercial disclosure:</strong> Civensa is published by BidSkim Limited, the developer of BidSkim. Scores use Civensa&apos;s <a href="/tools/methodology/">published methodology</a> and source-linked evidence.</p>

      <section aria-labelledby="comparison-scores">
        <div className="section-kicker">Scores and prices</div>
        <h2 id="comparison-scores">The two products at a glance</h2>
        <div className="comparison-score-grid"><ScoreCard record={bidSkim} score={bidSkimScore} /><ScoreCard record={provider} score={providerScore} /></div>
        <p className="comparison-method-note">The combined score is 68% feature depth and 32% value. A complete feature scores more than a partial feature. Value considers both the tender-alert and full-package price benchmarks, price transparency and billing basis. Features may sit on higher tiers than the headline alert plan.</p>
      </section>

      <section aria-labelledby="comparison-feature-table">
        <div className="section-kicker">Feature evidence</div>
        <h2 id="comparison-feature-table">Fourteen capabilities compared</h2>
        <p className="audit-intro">Yes requires public evidence that the complete capability exists in at least one current plan. Partial means narrower or adjacent functionality. If the research did not establish the capability, it is marked not offered.</p>
        <div className="feature-matrix-scroll" role="region" aria-label={`BidSkim and ${provider.name} feature comparison`}>
          <table className="feature-matrix comparison-feature-table">
            <thead><tr><th scope="col">Capability</th><th scope="col">BidSkim</th><th scope="col">{provider.name}</th></tr></thead>
            <tbody>{normalizedFeatureKeys.map((key) => {
              const bidSkimFeature = bidSkim.normalized!.features[key];
              const providerFeature = provider.normalized!.features[key];
              return <tr key={key}>
                <th scope="row">{featureLabels[key]}</th>
                <td><span className={`feature-status feature-status-${bidSkimFeature.status}`}>{statusLabels[bidSkimFeature.status]}</span><p>{bidSkimFeature.detail}</p><EvidenceLinks links={bidSkimFeature.evidenceLinks} /></td>
                <td><span className={`feature-status feature-status-${providerFeature.status}`}>{statusLabels[providerFeature.status]}</span><p>{providerFeature.detail}</p><EvidenceLinks links={providerFeature.evidenceLinks} /></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="comparison-differences">
        <div className="section-kicker">Evidence differences</div>
        <h2 id="comparison-differences">Where the public evidence separates them</h2>
        <div className="comparison-difference-grid">
          <article><h3>BidSkim is stronger on</h3><p>{advantageSentence(bidSkimAdvantages, "No normalized capability has a stronger status than the competing product in the current audit.")}</p></article>
          <article><h3>{provider.name} is stronger on</h3><p>{advantageSentence(providerAdvantages, "No normalized capability has a stronger status than BidSkim in the current audit.")}</p></article>
          <article><h3>Same evidence status</h3><p>{advantageSentence(levelFeatures, "No capabilities currently have the same evidence status.")}</p></article>
        </div>
      </section>

      <section aria-labelledby="comparison-fit">
        <div className="section-kicker">Practical fit</div>
        <h2 id="comparison-fit">Which should make your shortlist?</h2>
        <div className="comparison-verdict-grid">
          <article><h3>Shortlist BidSkim when</h3><p>{bidSkim.bestFor}</p><p><strong>Public-evidence advantages:</strong> {advantageSentence(bidSkimAdvantages, "none over this provider in the current normalized audit")}.</p><p><strong>Watch for:</strong> {bidSkim.notFor} {bidSkim.caveat}</p></article>
          <article><h3>Shortlist {provider.name} when</h3><p>{provider.bestFor}</p><p><strong>Public-evidence advantages:</strong> {advantageSentence(providerAdvantages, "none over BidSkim in the current normalized audit")}.</p><p><strong>Watch for:</strong> {provider.notFor} {provider.caveat}</p></article>
        </div>
      </section>

      <section aria-labelledby="comparison-commercial-detail">
        <div className="section-kicker">Commercial context</div>
        <h2 id="comparison-commercial-detail">What the headline prices leave out</h2>
        <div className="comparison-verdict-grid">
          <article><h3>BidSkim pricing context</h3><p>{bidSkim.pricing}</p><p>{bidSkim.pricingCaveat}</p><EvidenceLinks links={bidSkim.normalized.pricing.evidenceLinks} /></article>
          <article><h3>{provider.name} pricing context</h3><p>{provider.pricing}</p><p>{provider.pricingCaveat}</p><EvidenceLinks links={provider.normalized.pricing.evidenceLinks} /></article>
        </div>
      </section>

      <section aria-labelledby="comparison-coverage">
        <div className="section-kicker">Coverage</div>
        <h2 id="comparison-coverage">Named portals, not just source-count claims</h2>
        <div className="comparison-verdict-grid">
          {[bidSkim, provider].map((record) => <article key={record.slug}><h3>{record.name}</h3><p>{record.coverage}</p><p><strong>{record.normalized!.explicitPortals.length} individually named portal{record.normalized!.explicitPortals.length === 1 ? "" : "s"}:</strong> {record.normalized!.explicitPortals.length > 0 ? record.normalized!.explicitPortals.map((portal) => portal.portalName).join(", ") : "none established on the reviewed public pages"}.</p></article>)}
        </div>
      </section>

      <section aria-labelledby="comparison-questions">
        <div className="section-kicker">Before buying</div>
        <h2 id="comparison-questions">Questions to test with {provider.name}</h2>
        <ol className="comparison-question-list">{provider.normalized.deepAudit.diligenceQuestions.slice(0, 6).map((question) => <li key={question}>{question}</li>)}</ol>
        <p><a href={`/tools/tender-alerts/${bidSkim.slug}/`}>Read the full BidSkim audit</a> · <a href={`/tools/tender-alerts/${provider.slug}/`}>Read the full {provider.name} audit</a> · <a href="/tools/methodology/">Read the scoring methodology</a></p>
      </section>

      <section aria-labelledby="related-comparisons">
        <div className="section-kicker">Keep comparing</div>
        <h2 id="related-comparisons">Other BidSkim comparisons</h2>
        <div className="comparison-related-grid">{related.map((record) => {
          const score = scoreTenderAlert(record);
          return <a key={record.slug} href={`/compare/bidskim-vs-${record.slug}/`}><span>BidSkim vs {record.name}</span><strong>{score.overallScore}/100</strong><small>{groupLabels[score.primaryGroupId]}</small></a>;
        })}</div>
      </section>

      <div className="directory-note"><strong>Verification boundary:</strong> The scoring is a directory aid built from public provider material and official records. It does not replace a trial using known notices, a coverage check against your target portals or a dated commercial quote.</div>
    </div>
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
