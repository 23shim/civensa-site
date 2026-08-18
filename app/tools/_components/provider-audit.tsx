/* eslint-disable @next/next/no-html-link-for-pages -- Static export uses plain anchors to avoid an RSC prefetch runtime. */
import { SiteFooter, SiteHeader } from "../../_components/site-chrome";
import {
  normalizedFeatureKeys,
  type DeepEvidenceField,
  type EvidenceStrength,
  type FeatureStatus,
  type NormalizedFeatureKey,
  type VendorRecord,
} from "../_data";

const featureLabels: Record<NormalizedFeatureKey, string> = {
  keywordAlerts: "Keyword alerts",
  semanticAiMatching: "AI or semantic matching",
  buyerProfiles: "Buyer profiles",
  supplierProfiles: "Supplier profiles",
  renewalSignals: "Renewals",
  similarContracts: "Similar contracts",
  buyerDocuments: "Buyer documents",
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

const strengthLabels: Record<EvidenceStrength, string> = {
  strong: "Strong evidence",
  moderate: "Moderate evidence",
  weak: "Weak evidence",
  not_found: "Not found",
};

const deepFieldGroups = [
  {
    title: "Business and product",
    fields: [
      ["Legal identity and maturity", "legalAndMaturity"],
      ["Target customer and use case", "targetCustomerAndUseCase"],
      ["Commercial model", "commercialModel"],
      ["Security, support and onboarding", "securitySupportAndOnboarding"],
    ],
  },
  {
    title: "Data and discovery engine",
    fields: [
      ["Sources and coverage method", "dataSourcesAndCoverageMethod"],
      ["Ingestion and freshness", "dataIngestionAndFreshness"],
      ["Matching and qualification", "matchingAndQualificationMethod"],
      ["Historical and award depth", "historicalAndAwardDepth"],
    ],
  },
  {
    title: "Intelligence depth",
    fields: [
      ["Buyer entity investment", "buyerEntityInvestment"],
      ["Supplier entity investment", "supplierEntityInvestment"],
      ["Renewal-signal method", "renewalSignalMethod"],
      ["Requirements-planning method", "requirementsPlanningMethod"],
      ["Workflow and integrations", "workflowAndIntegrations"],
    ],
  },
] as const;

function formatCheckedDate(value: string): string {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

function formatPrice(value: number | null, currency: "GBP" | "EUR" | "USD" | "mixed" | "unknown"): string {
  if (value === null) return "Not published";
  if (currency === "mixed" || currency === "unknown") return value.toLocaleString("en-GB", { maximumFractionDigits: 2 });
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value);
}

function EvidenceLinks({ links }: { links: readonly { label: string; url: string }[] }) {
  if (links.length === 0) return null;
  return <span className="audit-links">{links.map((link) => <a key={link.url} href={link.url} rel="noopener noreferrer">{link.label} ↗</a>)}</span>;
}

function DeepField({ label, field }: { label: string; field: DeepEvidenceField }) {
  return <article className="deep-audit-field">
    <div><h3>{label}</h3><span className={`evidence-strength evidence-strength-${field.evidenceStrength}`}>{strengthLabels[field.evidenceStrength]}</span></div>
    <p>{field.detail}</p>
    <EvidenceLinks links={field.evidenceLinks} />
  </article>;
}

export function TenderAlertProviderAudit({ record }: { record: VendorRecord }) {
  const normalized = record.normalized;
  if (!normalized) throw new Error(`Normalized audit missing for ${record.slug}`);
  const audit = normalized.deepAudit;
  const canonical = `https://civensa.com/tools/tender-alerts/${record.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${record.name} tender-alert provider audit`,
    url: canonical,
    dateModified: normalized.researchedAt,
    author: { "@type": "Organization", name: "Civensa Research" },
    about: { "@type": "Organization", name: record.name, url: record.officialUrl },
  };
  return <main>
    <SiteHeader />
    <header className="provider-audit-head shell">
      <a className="back-link" href="/tools/tender-alerts/">← Tender-alert comparison</a>
      <div className="eyebrow"><span /> Deep provider audit</div>
      <h1>{record.name}</h1>
      <p>{audit.researchSummary}</p>
      <div className="provider-audit-byline"><span>Civensa Research</span><time dateTime={normalized.researchedAt}>{formatCheckedDate(normalized.researchedAt)}</time><span>Provider-stated, not independently tested</span></div>
    </header>

    <section className="provider-audit-body shell">
      {record.name === "BidSkim" ? <div className="disclosure"><strong>Ownership disclosure:</strong> Civensa is operated by BidSkim Limited, which develops BidSkim. This audit uses the same fields and evidence labels as every other provider.</div> : null}

      <section aria-labelledby="provider-at-glance">
        <div className="section-kicker">At a glance</div>
        <h2 id="provider-at-glance">What is publicly established</h2>
        <div className="provider-fact-grid">
          <div><small>Public pricing</small><strong>{normalized.pricing.plansText}</strong></div>
          <div><small>Billing basis</small><strong>{normalized.pricing.billingBasis.replaceAll("_", " ")}</strong></div>
          <div><small>Named portals</small><strong>{normalized.explicitPortals.length}</strong></div>
          <div><small>Official product</small><a href={record.officialUrl} rel="noopener noreferrer">Open provider site ↗</a></div>
        </div>
      </section>

      <section aria-labelledby="provider-feature-audit">
        <div className="section-kicker">Normalized features</div>
        <h2 id="provider-feature-audit">Capability-by-capability evidence</h2>
        <p className="audit-intro">Yes means the complete normalized capability is available in at least one current plan. Partial means the implementation is adjacent, incomplete or materially narrower. Missing public evidence defaults to not offered.</p>
        <div className="provider-feature-grid">{normalizedFeatureKeys.map((key) => {
          const feature = normalized.features[key];
          return <article key={key}>
            <div><h3>{featureLabels[key]}</h3><span className={`feature-status feature-status-${feature.status}`}>{statusLabels[feature.status]}</span></div>
            <p>{feature.detail}</p>
            <EvidenceLinks links={feature.evidenceLinks} />
          </article>;
        })}</div>
      </section>

      <section aria-labelledby="provider-pricing-audit">
        <div className="section-kicker">Comparable pricing</div>
        <h2 id="provider-pricing-audit">Monthly and annual plans</h2>
        <div className="feature-matrix-scroll" role="region" aria-label={`${record.name} comparable pricing`}>
          <table className="feature-matrix pricing-matrix provider-price-table">
            <thead><tr><th scope="col">Plan</th><th scope="col">Pay monthly<br />per month</th><th scope="col">Pay annually<br />per year</th><th scope="col">Annual effective<br />per month</th><th scope="col">Basis</th><th scope="col">Included users</th><th scope="col">Notes</th></tr></thead>
            <tbody>{normalized.pricing.comparablePlans.map((plan) => <tr key={plan.planName}>
              <th scope="row">{plan.planName}</th><td>{formatPrice(plan.monthlyPrice, plan.currency)}</td><td>{formatPrice(plan.annualPrice, plan.currency)}{plan.annualPriceCalculation === "calculated_from_annual_monthly_rate" ? <small className="calculated-price">Calculated</small> : null}</td><td>{formatPrice(plan.annualMonthlyEquivalent, plan.currency)}</td><td>{plan.billingBasis.replaceAll("_", " ")}</td><td>{plan.includedUsers}</td><td>{plan.notes}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="audit-price-notes"><strong>Trial:</strong> {normalized.pricing.trialDetail} <strong>VAT:</strong> {normalized.pricing.vatDetail}</p>
        <EvidenceLinks links={normalized.pricing.evidenceLinks} />
      </section>

      {deepFieldGroups.map((group) => <section key={group.title} aria-labelledby={`audit-${group.title.toLowerCase().replaceAll(" ", "-")}`}>
        <div className="section-kicker">Deep audit</div>
        <h2 id={`audit-${group.title.toLowerCase().replaceAll(" ", "-")}`}>{group.title}</h2>
        <div className="deep-audit-grid">{group.fields.map(([label, key]) => <DeepField key={key} label={label} field={audit[key]} />)}</div>
      </section>)}

      <section aria-labelledby="provider-coverage-audit">
        <div className="section-kicker">Coverage evidence</div>
        <h2 id="provider-coverage-audit">Named portals and broader claims</h2>
        {normalized.explicitPortals.length > 0 ? <div className="deep-audit-grid">{normalized.explicitPortals.map((portal) => <article className="deep-audit-field" key={`${portal.portalId}-${portal.portalName}`}><h3>{portal.portalName}</h3><p>{portal.detail}</p><EvidenceLinks links={portal.evidenceLinks} /></article>)}</div> : <p>No individual portal was established on the reviewed provider pages.</p>}
        {normalized.otherCoverageClaims.length > 0 ? <ul className="audit-note-list">{normalized.otherCoverageClaims.map((claim) => <li key={claim.claim}>{claim.claim}<EvidenceLinks links={claim.evidenceLinks} /></li>)}</ul> : null}
      </section>

      <section aria-labelledby="provider-diligence-audit">
        <div className="section-kicker">Buyer diligence</div>
        <h2 id="provider-diligence-audit">Limitations, contradictions and questions</h2>
        <div className="audit-diligence-grid">
          <div><h3>Material limitations</h3><ul>{audit.materialLimitations.map((item) => <li key={item.detail}>{item.detail}<EvidenceLinks links={item.evidenceLinks} /></li>)}</ul></div>
          <div><h3>First-party contradictions</h3>{audit.contradictions.length > 0 ? <ul>{audit.contradictions.map((item) => <li key={item.detail}>{item.detail}<EvidenceLinks links={item.evidenceLinks} /></li>)}</ul> : <p>None established in the reviewed sources.</p>}</div>
          <div><h3>Questions to ask</h3><ol>{audit.diligenceQuestions.map((question) => <li key={question}>{question}</li>)}</ol></div>
        </div>
      </section>

      <div className="directory-note"><strong>Verification boundary:</strong> This profile organises provider statements and official records. It is not an independent product test. Verify live notices, data completeness, contract terms and a real workflow before purchase.</div>
    </section>
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
