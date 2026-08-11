import Link from "next/link";

export function Wordmark() { return <Link className="wordmark" href="/" aria-label="Civensa home"><span className="mark">C</span><span>Civensa</span></Link>; }

export function SiteHeader() {
  return <header className="site-header"><div className="shell nav-wrap"><Wordmark /><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/research">Research</Link><Link href="/compare">Compare</Link><Link href="/methodology">Methodology</Link><Link href="/about">About</Link></nav><Link className="nav-contact" href="/contact">Contact <span aria-hidden="true">↗</span></Link><details className="mobile-menu"><summary aria-label="Open menu">Menu</summary><nav><Link href="/research">Research</Link><Link href="/compare">Compare</Link><Link href="/methodology">Methodology</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav></details></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-top"><div><Wordmark /><p>Procurement intelligence, mapped.</p></div><div className="footer-links"><div><strong>Explore</strong><Link href="/research">Research</Link><Link href="/compare">Compare approaches</Link><Link href="/methodology">Methodology</Link></div><div><strong>Company</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div></div><div className="shell footer-bottom"><span>© 2026 Civensa. All rights reserved.</span><span>A research publication operated by BidSkim Limited.</span></div></footer>;
}

export function PageIntro({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return <section className="page-intro shell"><div className="eyebrow"><span /> {kicker}</div><h1>{title}</h1><p>{lead}</p></section>;
}

export function ArticleLayout({ kicker, title, standfirst, date, children }: { kicker: string; title: string; standfirst: string; date: string; children: React.ReactNode }) {
  return <main><SiteHeader /><article><header className="article-head shell"><Link className="back-link" href="/research">← All research</Link><div className="eyebrow"><span /> {kicker}</div><h1>{title}</h1><p>{standfirst}</p><div className="article-byline"><span>Civensa Research</span><time>{date}</time><span>8 min read</span></div></header><div className="article-body shell">{children}</div></article><SiteFooter /></main>;
}
