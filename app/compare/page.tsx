import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../_components/site-chrome";
import { tenderAlertRecords } from "../tools/_data/tender-alerts";
import { scoreTenderAlert, tenderProductGroups } from "../tools/_data/tender-alert-scoring";

export const metadata: Metadata = {
  title: "BidSkim comparisons: features, pricing and scores",
  description: "Compare BidSkim with 25 UK and international tender-alert providers using normalized features, two price benchmarks and a disclosed scoring model.",
  alternates: { canonical: "/compare" },
};

const bidSkim = tenderAlertRecords.find((record) => record.slug === "bidskim-alerts");
if (!bidSkim) throw new Error("BidSkim comparison record is missing");
const bidSkimScore = scoreTenderAlert(bidSkim);
const groupLabels = Object.fromEntries(tenderProductGroups.map((group) => [group.id, group.label]));
const comparisons = tenderAlertRecords
  .filter((record) => record.slug !== "bidskim-alerts")
  .map((record) => ({ record, score: scoreTenderAlert(record) }))
  .sort((left, right) => right.score.overallScore - left.score.overallScore || left.record.name.localeCompare(right.record.name, "en-GB"));

export default function Compare() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BidSkim tender intelligence comparisons",
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map(({ record }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `BidSkim vs ${record.name}`,
      url: `https://civensa.com/compare/bidskim-vs-${record.slug}/`,
    })),
  };
  return <main>
    <SiteHeader />
    <PageIntro kicker="Product comparisons" title="BidSkim versus the market." lead={`Twenty-five provider comparisons use the same 14 features, two pricing benchmarks and disclosed score. BidSkim's current score is ${bidSkimScore.overallScore}/100.`} />
    <div className="page-copy compare-index shell">
      <section aria-labelledby="named-comparisons">
        <div className="section-kicker">25 named comparisons</div>
        <h2 id="named-comparisons">Compare BidSkim with every tender-alert provider in the directory</h2>
        <p>Cards are ordered by the competing provider&apos;s current score, not by a paid placement. Providers can belong to more than one product type.</p>
        <div className="comparison-index-grid">{comparisons.map(({ record, score }) => <a key={record.slug} href={`/compare/bidskim-vs-${record.slug}/`}>
          <div><span>BidSkim vs</span><h3>{record.name}</h3></div>
          <div className="comparison-index-scores"><span>BidSkim <strong>{bidSkimScore.overallScore}</strong></span><span>{record.name} <strong>{score.overallScore}</strong></span></div>
          <p>{record.summary}</p>
          <small>{score.groupIds.map((groupId) => groupLabels[groupId]).join(" · ")}</small>
        </a>)}</div>
      </section>

      <section aria-labelledby="comparison-score-method">
        <h2 id="comparison-score-method">What the score means</h2>
        <p>The score combines 68% feature depth and 32% headline value. Feature depth uses the status of 14 normalized capabilities. Value uses the tender-alert benchmark, the full-package benchmark, price transparency and billing basis. A higher number means stronger public evidence against this model. It does not prove better data, usability, service or outcomes.</p>
        <p><a className="button button-dark" href="/tools/methodology/">See the full scoring method <span aria-hidden="true">↗</span></a></p>
      </section>

      <section aria-labelledby="comparison-approaches">
        <h2 id="comparison-approaches">The five common approaches</h2>
        <table className="compare-table"><thead><tr><th>Approach</th><th>Best for</th><th>Typical strength</th><th>Typical limitation</th></tr></thead><tbody><tr><td>Official portals</td><td>First-party access and statutory records</td><td>Authoritative source material, often free</td><td>Records are split across portals and buyers</td></tr><tr><td>Tender alert services</td><td>Monitoring newly published opportunities</td><td>Filtering and notifications in one place</td><td>Coverage, matching quality and alert volume vary</td></tr><tr><td>Procurement intelligence platforms</td><td>Account planning and market analysis</td><td>Connects notices with contracts, buyers and suppliers</td><td>Quality depends on entity matching, source coverage and method</td></tr><tr><td>Bid-writing software</td><td>Analysing documents and producing responses</td><td>Reusable evidence, collaboration and drafting support</td><td>It cannot make weak evidence or poor qualification credible</td></tr><tr><td>Specialist advisers</td><td>Complex pursuits and hands-on support</td><td>Judgement, interpretation and tailored help</td><td>Higher cost and limited capacity across a broad pipeline</td></tr></tbody></table>
      </section>

      <h2>Questions to ask any provider</h2>
      <ul><li>Which sources are covered, and how quickly are they updated?</li><li>Can every material claim be traced to its source?</li><li>How are duplicate buyers, suppliers and notices resolved?</li><li>Are expiry dates observed, calculated or forecast, and is that distinction visible?</li><li>What happens when sources disagree or later change?</li><li>Can you export your data and preserve your own research?</li><li>Which features, seats, taxes and billing commitments are included at the quoted price?</li></ul>
    </div>
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
