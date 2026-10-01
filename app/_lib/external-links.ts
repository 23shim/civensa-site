import { vendorRecords } from "../tools/_data";

function domainFor(href: string): string | undefined {
  try {
    const url = new URL(href, "https://civensa.com/");
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    const labels = url.hostname.split(".");
    const suffix = labels.slice(-2).join(".");
    return labels.slice(suffix === "co.uk" || suffix === "org.uk" ? -3 : -2).join(".");
  } catch {
    return undefined;
  }
}

// New commercial directory entries automatically inherit the publisher's
// nofollow rule. Parent companies and alternate product hosts are included too.
const competitorDomains = new Set([
  ...vendorRecords
    .filter((record) => record.category !== "official-portals")
    .map((record) => domainFor(record.officialUrl))
    .filter((domain): domain is string => Boolean(domain) && domain !== "bidskim.com"),
  "bipsolutions.com",
  "oxygen-finance.com",
  "proactis.com",
  "uniqevo.co.uk",
]);

export function externalRel(href: string, existing = ""): string {
  const tokens = new Set(existing.split(/\s+/).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");
  const domain = domainFor(href);
  if (domain && competitorDomains.has(domain)) tokens.add("nofollow");
  return [...tokens].join(" ");
}
