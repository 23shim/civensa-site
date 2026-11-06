import { externalRel, isBidSkimUrl } from "../_lib/external-links";

// Civensa and BidSkim share an operator, so BidSkim's own pages are cited as
// plain-text sources rather than linked. Followed BidSkim links are kept to a
// handful of hand-placed spots (see tests/rendered-html.test.mjs).
export function SourceLink({ href, label, arrow = true }: { href: string; label: string; arrow?: boolean }) {
  if (isBidSkimUrl(href)) return <span className="source-unlinked">{label}</span>;
  return <a href={href} rel={externalRel(href)}>{label}{arrow ? " ↗" : null}</a>;
}
