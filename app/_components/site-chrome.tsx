/* eslint-disable @next/next/no-html-link-for-pages -- Static export uses plain anchors to avoid an RSC prefetch runtime on GitHub Pages. */
export function Wordmark() { return <a className="wordmark" href="/"><span className="mark" aria-hidden="true">C</span><span>Civensa</span></a>; }

export function SiteHeader() {
  return <header className="site-header"><div className="shell nav-wrap"><Wordmark /><nav className="desktop-nav" aria-label="Primary navigation"><a href="/research">Research</a><a href="/compare">Compare</a><a href="/methodology">Methodology</a><a href="/about">About</a></nav><a className="nav-contact" href="/contact">Contact <span aria-hidden="true">↗</span></a><details className="mobile-menu"><summary aria-label="Open menu">Menu</summary><nav><a href="/research">Research</a><a href="/compare">Compare</a><a href="/methodology">Methodology</a><a href="/about">About</a><a href="/contact">Contact</a></nav></details></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-top"><div><Wordmark /><p>Procurement intelligence, mapped.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="/research">Research</a><a href="/compare">Compare approaches</a><a href="/methodology">Methodology</a></div><div><strong>Company</strong><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div></div><div className="shell footer-bottom"><span>© 2026 Civensa. All rights reserved.</span><span>A research publication operated by BidSkim Limited.</span></div></footer>;
}

export function PageIntro({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return <section className="page-intro shell"><div className="eyebrow"><span /> {kicker}</div><h1>{title}</h1><p>{lead}</p></section>;
}

export function ArticleLayout({ kicker, title, standfirst, date, datePublished, path, readTime = "8 min read", children }: { kicker: string; title: string; standfirst: string; date: string; datePublished: string; path: string; readTime?: string; children: React.ReactNode }) {
  const url = `https://civensa.com${path}/`;
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: title, description: standfirst, datePublished, dateModified: datePublished, mainEntityOfPage: url, author: { "@type": "Organization", name: "Civensa Research", url: "https://civensa.com/about/" }, publisher: { "@id": "https://civensa.com/#organization" }, image: "https://civensa.com/og.png", inLanguage: "en-GB" };
  return <main><SiteHeader /><article><header className="article-head shell"><a className="back-link" href="/research">← All research</a><div className="eyebrow"><span /> {kicker}</div><h1>{title}</h1><p>{standfirst}</p><div className="article-byline"><span>Civensa Research</span><time dateTime={datePublished}>{date}</time><span>{readTime}</span></div></header><div className="article-body shell">{children}</div></article><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></main>;
}
