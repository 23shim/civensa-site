export const categorySlugs = [
  "tender-alerts",
  "procurement-intelligence",
  "bid-writing-software",
  "bid-writing-services",
  "official-portals",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];
export type EvidenceBasis = "Provider-stated" | "Official source";

export type EvidenceLink = { label: string; url: string };

export type VendorRecord = {
  slug: string;
  name: string;
  category: CategorySlug;
  providerType: string;
  officialUrl: string;
  summary: string;
  coverage: string;
  pricing: string;
  pricingCaveat: string;
  bestFor: string;
  notFor: string;
  caveat: string;
  evidenceBasis: EvidenceBasis;
  independentlyTested: false;
  lastChecked: "2026-08-12";
  evidenceLinks: readonly EvidenceLink[];
};

export type CategoryDefinition = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  lead: string;
  questions: readonly string[];
};

export const LAST_CHECKED = "2026-08-12" as const;

export function commercialRecord(
  value: Omit<VendorRecord, "lastChecked" | "independentlyTested" | "evidenceBasis">,
): VendorRecord {
  return {
    ...value,
    evidenceBasis: "Provider-stated",
    independentlyTested: false,
    lastChecked: LAST_CHECKED,
  };
}

export function officialRecord(
  value: Omit<VendorRecord, "lastChecked" | "independentlyTested" | "evidenceBasis">,
): VendorRecord {
  return {
    ...value,
    evidenceBasis: "Official source",
    independentlyTested: false,
    lastChecked: LAST_CHECKED,
  };
}

