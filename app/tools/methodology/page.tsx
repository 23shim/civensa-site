import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../../_components/site-chrome";

export const metadata: Metadata = {
  title: "Procurement tools directory methodology",
  description: "How Civensa selects, sources, labels, dates and corrects entries in its procurement tools directory.",
  alternates: { canonical: "/tools/methodology" },
};

export default function ToolsMethodologyPage() {
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://civensa.com/" },
    { "@type": "ListItem", position: 2, name: "Procurement tools", item: "https://civensa.com/tools/" },
    { "@type": "ListItem", position: 3, name: "Methodology", item: "https://civensa.com/tools/methodology/" },
  ] };
  return <main>
    <SiteHeader />
    <PageIntro kicker="Directory methodology" title="What is included, what is checked, and what is not." lead="A practical standard for keeping a changing procurement market useful without pretending that provider claims are product tests." />
    <div className="page-copy shell">
      <div className="disclosure"><strong>Ownership disclosure:</strong> Civensa is operated by BidSkim Limited, which develops BidSkim. BidSkim receives no preferential label, score or placement. The directory has no affiliate links or paid rankings.</div>

      <h2>Inclusion</h2>
      <p>We include an active product, service or official portal when it has a clear procurement use, a working official website and enough first-party information to describe its scope without relying on review sites. A listing is not an endorsement. We aim to cover meaningful choices, not every newly registered domain.</p>
      <p>We exclude inactive services, lead-generation pages with no identifiable product, duplicate brands, unsupported comparison pages, review-only listings and providers for which we cannot establish a useful official source. We may also omit a provider while a material identity, ownership or product-status question is unresolved.</p>

      <h2>Evidence labels</h2>
      <p><strong>Official source</strong> means the entry describes a government, public-body or intergovernmental portal using that body’s own guidance. <strong>Provider-stated</strong> means scope, coverage, features and prices come from the commercial provider’s own website or documents. Neither label means Civensa has validated delivery quality.</p>
      <p>Every current listing is marked <strong>not independently tested</strong>. Best-for and not-for notes are editorial fit judgements based on the stated scope and limitation. They are not ratings, user reviews or performance findings.</p>
      <p>Most products and services are shown alphabetically within each category or geographic group. The tender-alert shortlist builder can sort by a transparent public-evidence score, feature depth, headline value, price or name. The score is not a product review or performance rating.</p>

      <h2>Normalized feature and portal fields</h2>
      <p>Tender-alert products use the same feature definitions for keyword alerts, AI or semantic matching, buyer and supplier profiles, renewals, similar contracts, buyer documents, buyer requirements, requirements planning, award history and related workflow capabilities. <strong>Yes</strong> requires clear first-party evidence that the complete capability is offered in at least one current plan. Higher-plan gating is shown separately and does not make a complete capability partial. <strong>Partial</strong> means the implementation is adjacent, incomplete, indirect, pilot-only or materially narrower. <strong>Not offered</strong> is the default when the reviewed public product pages do not establish the capability.</p>
      <p>Buyer and supplier profiles receive <strong>Yes</strong> only where the provider establishes deliberately built cross-notice entities with canonicalisation, deduplication, entity resolution or comparable investment. Filters, names on notices, spend charts and flat directories are not enough. Requirements planning receives <strong>Yes</strong> only for a durable workflow that turns requirements into tracked gaps, evidence needs, owners, actions or readiness. Extraction, checklists and bid/no-bid explanations alone are partial.</p>
      <p>Each tender-alert provider also has a deep audit page covering product maturity, target customers, data sourcing and freshness, matching method, identity investment, renewals, requirements planning, historical depth, integrations, security and onboarding, commercial structure, limitations, contradictory first-party statements and buyer diligence questions. Evidence strength describes the specificity of the reviewed sources, not product quality.</p>
      <p>A portal appears in the coverage matrix only when a first-party provider page explicitly names it. Broad claims such as “all UK portals” are preserved separately and do not populate individual portal cells. The linked source beside a claim is evidence that the provider made it, not proof that Civensa independently confirmed feed completeness.</p>

      <h2>Product classes and shortlist score</h2>
      <p>The tender-alert comparison groups products into full intelligence, intelligence plus workflow, smart matchers and lite alerting. Classification is mechanical. Full-intelligence products need at least five clearly evidenced intelligence capabilities plus a resolved buyer or supplier profile. Workflow products need at least two workflow capabilities alongside intelligence or requirements planning. Products with clear AI matching or moderate intelligence depth become smart matchers. The remainder are lite alerting.</p>
      <p>The combined shortlist score is 68% feature depth and 32% headline value. The feature score uses all 15 normalized capabilities and totals 100 possible points. Buyer profiles and renewals each carry 12 points, AI matching carries 11, supplier profiles, similar contracts, buyer requirements, requirements planning and award history each carry 8, and the remaining workflow and alerting features carry the balance. A partial capability receives 45% of its feature weight.</p>
      <p>Headline value combines the lowest published paid monthly equivalent, pricing transparency and billing inclusiveness. The calculation gives 55% of value weight to affordability, 25% to whether numeric pricing is public, and 20% to whether billing is per seat, team or organisation. A free-only product can show a zero headline price. Quote-only and unpublished prices receive a neutral-low affordability value rather than being treated as free. The lowest published plan may not contain every scored feature, currencies are not converted, and implementation quality is not tested. Buyers must compare the actual plan and order form before purchase.</p>

      <h2>Pricing and freshness</h2>
      <p>We separate each public plan into the price paid monthly, the published annual total and the annual plan&apos;s effective monthly cost. The effective monthly figure is annual price divided by 12, not a provider discount claim. An unpublished monthly or annual option stays unpublished; we do not multiply a monthly-only price by 12 and call it an annual plan. Billing basis, included users, tax, introductory pricing and material add-ons remain visible.</p>
      <p>The normalized tender-alert fields were checked on <time dateTime="2026-08-18">18 August 2026</time>; other directory records retain their own displayed check date. Public pages can change at any time, so buyers should obtain a dated order form before purchase. Where a provider page contradicts itself, we say so rather than choosing the more convenient figure.</p>

      <h2>How to use the directory</h2>
      <p>Use it to form a shortlist and a question set. For software, run a real tender and inspect source traceability, permissions, exports and deletion terms. For consultancies, identify the people who will work on the bid, what the client must supply, the number of review rounds and who owns final submission. For portals, the live official notice and tender documents always control.</p>

      <h2>Corrections</h2>
      <p>Send the page, disputed statement and a direct official source to <a className="text-link" href="mailto:research@civensa.com">research@civensa.com</a>. We will review factual corrections regardless of whether they come from a listed provider, competitor or reader. A request for more favourable wording is not, by itself, evidence.</p>

      <h2>Change-log standard</h2>
      <p>Material updates use one short line: <strong>date · entry · field changed · source or reason</strong>. We log price, plan, coverage, ownership, product-status and methodology corrections. Routine punctuation and layout edits are not logged.</p>
      <ul>
        <li>12 August 2026 · directory · first sourced release · provider and official-portal records checked.</li>
        <li>18 August 2026 · tender-alert directory · normalized feature, pricing and explicit-portal fields added · first-party provider pages checked.</li>
        <li>18 August 2026 · BidSkim · relevant listings and common-ownership disclosure added · public provider pages checked.</li>
        <li>18 August 2026 · tender-alert providers · deep audit profiles added and plan-gating rule clarified · first-party documentation and official records checked.</li>
        <li>18 August 2026 · tender-alert directory · product classes, filters, comparison and public-evidence score added · normalized research fields used.</li>
      </ul>
    </div>
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
  </main>;
}
