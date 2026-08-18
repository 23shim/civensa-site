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
      <p>Products and services are shown alphabetically within each category or geographic group. The order is not a ranking.</p>

      <h2>Normalized feature and portal fields</h2>
      <p>Tender-alert products use the same feature definitions for keyword alerts, AI or semantic matching, buyer and supplier profiles, renewals, similar contracts, buyer documents, buyer requirements, requirements planning, award history and related workflow capabilities. <strong>Yes</strong> means a reviewed first-party page explicitly describes the capability. <strong>Partial</strong> means it is plan-limited, indirect or only covers part of the definition. <strong>No</strong> requires an explicit statement that the capability is unavailable. <strong>Not stated</strong> means the reviewed pages did not establish it and must not be read as “no”.</p>
      <p>A portal appears in the coverage matrix only when a first-party provider page explicitly names it. Broad claims such as “all UK portals” are preserved separately and do not populate individual portal cells. The linked source beside a claim is evidence that the provider made it, not proof that Civensa independently confirmed feed completeness.</p>

      <h2>Pricing and freshness</h2>
      <p>We reproduce useful public price text and its visible billing basis, then add a caveat where tax, users, credits, annual billing or add-ons affect interpretation. “No public price” means we did not find a numeric price on the checked official pages. It does not mean the service is free.</p>
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
      </ul>
    </div>
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
  </main>;
}
