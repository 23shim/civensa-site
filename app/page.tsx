import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";

export const metadata: Metadata = {
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
};

const signals = [
  { value: "01", label: "Buyer intent", copy: "Strategies, plans and published priorities translated into practical signals." },
  { value: "02", label: "Contract cycles", copy: "Awards and expiry dates organised around when markets are likely to move." },
  { value: "03", label: "Requirements", copy: "Criteria, certifications and recurring obligations brought into view early." },
  { value: "04", label: "Market shape", copy: "Incumbents, suppliers and buying patterns placed in their proper context." },
];

const notes = [
  { tag: "Contract cycles", date: "11 Aug 2026", title: "Why renewal signals matter before a tender is published", copy: "A practical framework for moving from expiry dates to a defensible pursuit calendar.", href: "/research/renewal-signals" },
  { tag: "Buyer intelligence", date: "7 Aug 2026", title: "Reading the buyer before reading the opportunity", copy: "How strategies, committee papers and prior awards can explain what a procurement notice cannot.", href: "/research/buyer-intelligence" },
  { tag: "Bid readiness", date: "31 Jul 2026", title: "Requirements are a market signal, not an admin task", copy: "A field guide to spotting recurring certifications and planning the evidence base ahead of time.", href: "/research/supplier-requirements" },
];

const marketCategories = [
  { tag: "Find opportunities", title: "Tender alerts and official portals", copy: "Compare free source portals with paid alert services by coverage, matching method, alert frequency and current price.", href: "/tools/tender-alerts/" },
  { tag: "Understand the market", title: "Procurement intelligence platforms", copy: "Research tools for buyers, suppliers, awards, incumbents, frameworks, spend, contacts and contract renewals.", href: "/tools/procurement-intelligence/" },
  { tag: "Prepare the response", title: "Bid-writing software and services", copy: "Separate document analysis, response libraries and drafting software from consultancies, freelance support and training.", href: "/tools/bid-writing-software/" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero shell">
        <div className="eyebrow"><span /> Procurement intelligence, mapped</div>
        <div className="hero-grid">
          <div>
            <h1>See the market<br />before it moves.</h1>
            <p className="hero-copy">Civensa connects buyer intent, contract cycles and supplier requirements, so public-sector markets are easier to understand before the tender lands.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="/research">Explore the research <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="/methodology">How we work <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="signal-map" aria-label="Procurement signal map">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="map-cross map-cross-a">+</div>
            <div className="map-cross map-cross-b">+</div>
            <div className="map-label map-label-a"><small>BUYER</small><strong>Intent</strong></div>
            <div className="map-label map-label-b"><small>MARKET</small><strong>Coverage</strong></div>
            <div className="map-label map-label-c"><small>CONTRACT</small><strong>Renewal</strong></div>
            <div className="map-core"><span>C</span><small>connected<br />signal</small></div>
          </div>
        </div>
        <div className="hero-rule"><span>UK PUBLIC PROCUREMENT</span><span>RESEARCH NOTE 001</span></div>
      </section>

      <section className="premise section shell">
        <div className="section-kicker">The premise</div>
        <div className="premise-grid">
          <h2>A tender is the end of a story, not the beginning.</h2>
          <div>
            <p>Most opportunity tools begin when a notice appears. Civensa studies the evidence that accumulates before that moment: expiring contracts, buyer plans, incumbent relationships, evaluation patterns and the requirements that shape who can compete.</p>
            <p>Our work is designed for suppliers, advisers and market teams who need a wider field of view, not more alerts.</p>
          </div>
        </div>
      </section>

      <section className="content-section shell">
        <div className="research-section-head">
          <div><div className="section-kicker">Procurement market guide</div><h2>Compare the tools around the tender.</h2></div>
          <p>Current provider records, official evidence, visible limitations and no affiliate rankings.</p>
        </div>
        <div className="category-grid">
          {marketCategories.map((category) => <article className="category-card" key={category.href}><small>{category.tag}</small><h2>{category.title}</h2><p>{category.copy}</p><a href={category.href}>Explore the category →</a></article>)}
        </div>
        <div className="hero-actions"><a className="button button-dark" href="/tools/">Browse the full tools directory <span aria-hidden="true">↗</span></a><a className="text-link" href="/tools/methodology/">How products are checked <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="signal-section section">
        <div className="shell">
          <div className="section-heading">
            <div><div className="section-kicker light">Four layers of signal</div><h2>From scattered evidence<br />to a market view.</h2></div>
            <p>We organise public procurement evidence around the decisions suppliers actually need to make.</p>
          </div>
          <div className="signal-grid">
            {signals.map((signal) => <article className="signal-card" key={signal.value}><span>{signal.value}</span><h3>{signal.label}</h3><p>{signal.copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading ink">
          <div><div className="section-kicker">Field notes</div><h2>Research for the<br />long procurement cycle.</h2></div>
          <a className="text-link" href="/research">View all research <span aria-hidden="true">→</span></a>
        </div>
        <div className="notes-grid">
          {notes.map((note, index) => <article className="note-card" key={note.title}><div className="note-meta"><span>{note.tag}</span><time>{note.date}</time></div><div className="note-number">0{index + 1}</div><h3><a href={note.href}>{note.title}</a></h3><p>{note.copy}</p><a className="note-arrow" href={note.href} aria-label={`Read ${note.title}`}>↗</a></article>)}
        </div>
      </section>

      <section className="manifesto">
        <div className="shell manifesto-grid"><div className="monogram">C</div><div><div className="section-kicker light">Our standard</div><blockquote>“Useful procurement intelligence should show its sources, its assumptions and its limits.”</blockquote><a className="button button-light" href="/methodology">Read our methodology <span aria-hidden="true">↗</span></a></div></div>
      </section>
      <SiteFooter />
    </main>
  );
}
