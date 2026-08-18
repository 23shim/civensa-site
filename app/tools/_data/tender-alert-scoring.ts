import {
  normalizedFeatureKeys,
  type BillingBasis,
  type FeatureStatus,
  type NormalizedFeatureKey,
  type PricingAvailability,
  type VendorRecord,
} from "./types";

export const tenderAlertFeatureWeights: Readonly<Record<NormalizedFeatureKey, number>> = {
  keywordAlerts: 3,
  semanticAiMatching: 11,
  buyerProfiles: 12,
  supplierProfiles: 8,
  renewalSignals: 12,
  similarContracts: 8,
  buyerDocuments: 5,
  buyerRequirements: 8,
  requirementsPlanning: 8,
  awardHistory: 8,
  frameworks: 4,
  competitorTracking: 5,
  exportsApi: 3,
  collaboration: 3,
  bidWriting: 2,
};

export const tenderProductGroups = [
  {
    id: "full-intelligence",
    label: "Full intelligence",
    shortLabel: "Full intelligence",
    description: "Deep buyer, supplier, award and renewal intelligence across connected notices.",
  },
  {
    id: "workflow-suites",
    label: "Intelligence + workflow",
    shortLabel: "Workflow suites",
    description: "Discovery combined with requirements, collaboration, exports or bid workflow.",
  },
  {
    id: "smart-matchers",
    label: "Smart matchers",
    shortLabel: "Smart matchers",
    description: "AI or semantic qualification with lighter historical and entity intelligence.",
  },
  {
    id: "lite-alerting",
    label: "Lite alerting",
    shortLabel: "Lite alerting",
    description: "Straightforward alerts, search or portal access with a smaller feature footprint.",
  },
] as const;

export type TenderProductGroupId = (typeof tenderProductGroups)[number]["id"];

export type TenderAlertScore = {
  overallScore: number;
  featureScore: number;
  valueScore: number;
  groupId: TenderProductGroupId;
  yesCount: number;
  partialCount: number;
  minimumMonthlyPrice: number | null;
  priceCurrency: "GBP" | "EUR" | "USD" | "mixed" | "unknown";
};

export type TenderAlertExplorerRecord = {
  slug: string;
  name: string;
  summary: string;
  coverage: string;
  bestFor: string;
  score: TenderAlertScore;
  featureStatuses: Readonly<Record<NormalizedFeatureKey, FeatureStatus>>;
  pricingAvailability: PricingAvailability;
  hasFreeOption: boolean;
  explicitPortalIds: readonly string[];
  explicitPortalCount: number;
};

const statusFactor: Readonly<Record<FeatureStatus, number>> = {
  yes: 1,
  partial: 0.45,
  not_offered: 0,
};

const intelligenceKeys: readonly NormalizedFeatureKey[] = [
  "buyerProfiles",
  "supplierProfiles",
  "renewalSignals",
  "similarContracts",
  "buyerRequirements",
  "awardHistory",
  "competitorTracking",
];

const workflowKeys: readonly NormalizedFeatureKey[] = [
  "requirementsPlanning",
  "exportsApi",
  "collaboration",
  "bidWriting",
];

function yesCount(record: VendorRecord, keys: readonly NormalizedFeatureKey[]): number {
  if (!record.normalized) return 0;
  return keys.filter((key) => record.normalized?.features[key].status === "yes").length;
}

function productGroup(record: VendorRecord): TenderProductGroupId {
  const normalized = record.normalized;
  if (!normalized) return "lite-alerting";
  const intelligenceDepth = yesCount(record, intelligenceKeys);
  const workflowDepth = yesCount(record, workflowKeys);
  const hasResolvedProfiles = normalized.features.buyerProfiles.status === "yes"
    || normalized.features.supplierProfiles.status === "yes";

  if (intelligenceDepth >= 5 && hasResolvedProfiles) return "full-intelligence";
  if (workflowDepth >= 2 && (intelligenceDepth >= 2 || normalized.features.requirementsPlanning.status === "yes")) return "workflow-suites";
  if (normalized.features.semanticAiMatching.status === "yes" || intelligenceDepth >= 2) return "smart-matchers";
  return "lite-alerting";
}

function minimumMonthlyPrice(record: VendorRecord): number | null {
  const plans = record.normalized?.pricing.comparablePlans ?? [];
  const paidPrices = plans
    .map((plan) => plan.annualMonthlyEquivalent ?? plan.monthlyPrice)
    .filter((price): price is number => price !== null && price > 0);
  if (paidPrices.length > 0) return Math.min(...paidPrices);
  const hasFreePlan = plans.some((plan) => plan.monthlyPrice === 0 || plan.annualMonthlyEquivalent === 0);
  return hasFreePlan ? 0 : null;
}

function affordabilityScore(price: number | null): number {
  if (price === null) return 35;
  if (price === 0) return 100;
  if (price <= 20) return 95;
  if (price <= 40) return 88;
  if (price <= 70) return 80;
  if (price <= 100) return 70;
  if (price <= 150) return 60;
  if (price <= 250) return 48;
  if (price <= 500) return 32;
  return 18;
}

function transparencyScore(availability: PricingAvailability): number {
  return {
    public_numeric: 100,
    free_only: 72,
    quote_only: 28,
    not_found: 18,
  }[availability];
}

function inclusivenessScore(basis: BillingBasis): number {
  return {
    per_organisation: 100,
    per_team: 88,
    mixed: 68,
    per_seat: 48,
    unknown: 35,
  }[basis];
}

export function scoreTenderAlert(record: VendorRecord): TenderAlertScore {
  const normalized = record.normalized;
  if (!normalized) {
    return {
      overallScore: 0,
      featureScore: 0,
      valueScore: 0,
      groupId: "lite-alerting",
      yesCount: 0,
      partialCount: 0,
      minimumMonthlyPrice: null,
      priceCurrency: "unknown",
    };
  }

  const featureScore = Math.round(normalizedFeatureKeys.reduce((score, key) => (
    score + tenderAlertFeatureWeights[key] * statusFactor[normalized.features[key].status]
  ), 0));
  const price = minimumMonthlyPrice(record);
  const valueScore = Math.round(
    affordabilityScore(price) * 0.55
      + transparencyScore(normalized.pricing.availability) * 0.25
      + inclusivenessScore(normalized.pricing.billingBasis) * 0.2,
  );

  return {
    overallScore: Math.round(featureScore * 0.68 + valueScore * 0.32),
    featureScore,
    valueScore,
    groupId: productGroup(record),
    yesCount: normalizedFeatureKeys.filter((key) => normalized.features[key].status === "yes").length,
    partialCount: normalizedFeatureKeys.filter((key) => normalized.features[key].status === "partial").length,
    minimumMonthlyPrice: price,
    priceCurrency: normalized.pricing.currency,
  };
}

export function toTenderAlertExplorerRecord(record: VendorRecord): TenderAlertExplorerRecord {
  const normalized = record.normalized;
  if (!normalized) throw new Error(`Tender-alert explorer record is missing normalized research: ${record.slug}`);
  return {
    slug: record.slug,
    name: record.name,
    summary: record.summary,
    coverage: record.coverage,
    bestFor: record.bestFor,
    score: scoreTenderAlert(record),
    featureStatuses: Object.fromEntries(normalizedFeatureKeys.map((key) => [key, normalized.features[key].status])) as Record<NormalizedFeatureKey, FeatureStatus>,
    pricingAvailability: normalized.pricing.availability,
    hasFreeOption: normalized.pricing.comparablePlans.some((plan) => plan.monthlyPrice === 0 || plan.annualMonthlyEquivalent === 0),
    explicitPortalIds: normalized.explicitPortals.map((portal) => portal.portalId),
    explicitPortalCount: normalized.explicitPortals.length,
  };
}
