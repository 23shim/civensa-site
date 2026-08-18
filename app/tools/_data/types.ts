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

export const normalizedFeatureKeys = [
  "keywordAlerts",
  "semanticAiMatching",
  "buyerProfiles",
  "supplierProfiles",
  "renewalSignals",
  "similarContracts",
  "buyerDocuments",
  "buyerRequirements",
  "requirementsPlanning",
  "awardHistory",
  "frameworks",
  "competitorTracking",
  "exportsApi",
  "collaboration",
  "bidWriting",
] as const;

export type NormalizedFeatureKey = (typeof normalizedFeatureKeys)[number];
export type FeatureStatus = "yes" | "partial" | "not_offered";

export type NormalizedFeature = {
  status: FeatureStatus;
  detail: string;
  evidenceLinks: readonly EvidenceLink[];
};

export type PricingAvailability = "public_numeric" | "free_only" | "quote_only" | "not_found";
export type BillingBasis = "per_seat" | "per_organisation" | "per_team" | "mixed" | "unknown";

export type NormalizedPricePlan = {
  planName: string;
  currency: "GBP" | "EUR" | "USD" | "mixed" | "unknown";
  billingBasis: BillingBasis;
  monthlyPrice: number | null;
  annualPrice: number | null;
  annualMonthlyEquivalent: number | null;
  annualPriceCalculation: "published_total" | "calculated_from_annual_monthly_rate" | "not_available";
  includedUsers: string;
  notes: string;
};

export type NormalizedPricing = {
  availability: PricingAvailability;
  billingBasis: BillingBasis;
  currency: "GBP" | "EUR" | "USD" | "mixed" | "unknown";
  plansText: string;
  seatDetail: string;
  vatDetail: string;
  trialDetail: string;
  comparablePlans: readonly NormalizedPricePlan[];
  evidenceLinks: readonly EvidenceLink[];
};

export type ExplicitPortalCoverage = {
  portalId: string;
  portalName: string;
  detail: string;
  evidenceLinks: readonly EvidenceLink[];
};

export type CoverageClaim = {
  claim: string;
  evidenceLinks: readonly EvidenceLink[];
};

export type EvidenceStrength = "strong" | "moderate" | "weak" | "not_found";

export type DeepEvidenceField = {
  evidenceStrength: EvidenceStrength;
  detail: string;
  evidenceLinks: readonly EvidenceLink[];
};

export type DeepAuditNote = {
  detail: string;
  evidenceLinks: readonly EvidenceLink[];
};

export type DeepProviderAudit = {
  researchSummary: string;
  legalAndMaturity: DeepEvidenceField;
  targetCustomerAndUseCase: DeepEvidenceField;
  dataSourcesAndCoverageMethod: DeepEvidenceField;
  dataIngestionAndFreshness: DeepEvidenceField;
  matchingAndQualificationMethod: DeepEvidenceField;
  buyerEntityInvestment: DeepEvidenceField;
  supplierEntityInvestment: DeepEvidenceField;
  renewalSignalMethod: DeepEvidenceField;
  requirementsPlanningMethod: DeepEvidenceField;
  historicalAndAwardDepth: DeepEvidenceField;
  workflowAndIntegrations: DeepEvidenceField;
  securitySupportAndOnboarding: DeepEvidenceField;
  commercialModel: DeepEvidenceField;
  materialLimitations: readonly DeepAuditNote[];
  contradictions: readonly DeepAuditNote[];
  diligenceQuestions: readonly string[];
};

export type NormalizedVendorProfile = {
  researchedAt: string;
  pricing: NormalizedPricing;
  features: Record<NormalizedFeatureKey, NormalizedFeature>;
  explicitPortals: readonly ExplicitPortalCoverage[];
  otherCoverageClaims: readonly CoverageClaim[];
  caveats: readonly string[];
  deepAudit: DeepProviderAudit;
};

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
  lastChecked: string;
  evidenceLinks: readonly EvidenceLink[];
  normalized?: NormalizedVendorProfile;
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
  value: Omit<VendorRecord, "lastChecked" | "independentlyTested" | "evidenceBasis"> & { lastChecked?: string },
): VendorRecord {
  return {
    ...value,
    evidenceBasis: "Provider-stated",
    independentlyTested: false,
    lastChecked: value.lastChecked ?? LAST_CHECKED,
  };
}

export function officialRecord(
  value: Omit<VendorRecord, "lastChecked" | "independentlyTested" | "evidenceBasis"> & { lastChecked?: string },
): VendorRecord {
  return {
    ...value,
    evidenceBasis: "Official source",
    independentlyTested: false,
    lastChecked: value.lastChecked ?? LAST_CHECKED,
  };
}

