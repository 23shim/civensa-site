import {
  normalizedFeatureKeys,
  type BillingBasis,
  type FeatureStatus,
  type NormalizedFeatureKey,
  type PricingAvailability,
  type VendorRecord,
} from "./types";

export const tenderAlertFeatureWeights: Readonly<Record<NormalizedFeatureKey, number>> = {
  semanticAiMatching: 12,
  buyerProfiles: 12,
  supplierProfiles: 8,
  renewalSignals: 12,
  similarContracts: 8,
  buyerDocuments: 6,
  buyerRequirements: 8,
  requirementsPlanning: 8,
  awardHistory: 8,
  frameworks: 5,
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
  primaryGroupId: TenderProductGroupId;
  groupIds: readonly TenderProductGroupId[];
  yesCount: number;
  partialCount: number;
  alertMonthlyPrice: number | null;
  alertPlanName: string;
  alertPriceCurrency: "GBP" | "EUR" | "USD" | "mixed" | "unknown";
  fullPackageMonthlyPrice: number | null;
  fullPackagePlanName: string;
  fullPackagePriceCurrency: "GBP" | "EUR" | "USD" | "mixed" | "unknown";
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

function productGroups(record: VendorRecord): readonly TenderProductGroupId[] {
  const normalized = record.normalized;
  if (!normalized) return ["lite-alerting"];
  const intelligenceDepth = yesCount(record, intelligenceKeys);
  const workflowDepth = yesCount(record, workflowKeys);
  const hasResolvedProfiles = normalized.features.buyerProfiles.status === "yes"
    || normalized.features.supplierProfiles.status === "yes";
  const groups: TenderProductGroupId[] = [];

  if (intelligenceDepth >= 5 && hasResolvedProfiles) groups.push("full-intelligence");
  if (workflowDepth >= 2 && (intelligenceDepth >= 2 || normalized.features.requirementsPlanning.status !== "not_offered")) groups.push("workflow-suites");
  if (normalized.features.semanticAiMatching.status === "yes" || intelligenceDepth >= 2) groups.push("smart-matchers");
  if (groups.length === 0) groups.push("lite-alerting");
  return groups;
}

function monthlyEquivalent(plan: NonNullable<VendorRecord["normalized"]>["pricing"]["comparablePlans"][number]): number | null {
  return plan.annualMonthlyEquivalent ?? plan.monthlyPrice;
}

function priceBenchmarks(record: VendorRecord) {
  const plans = record.normalized?.pricing.comparablePlans ?? [];
  const alertPlan = plans[0];
  const fullPackagePlan = plans.at(-1);
  return {
    alertMonthlyPrice: alertPlan ? monthlyEquivalent(alertPlan) : null,
    alertPlanName: alertPlan?.planName ?? "Not published",
    alertPriceCurrency: alertPlan?.currency ?? "unknown",
    fullPackageMonthlyPrice: fullPackagePlan ? monthlyEquivalent(fullPackagePlan) : null,
    fullPackagePlanName: fullPackagePlan?.planName ?? "Not published",
    fullPackagePriceCurrency: fullPackagePlan?.currency ?? "unknown",
  };
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
      primaryGroupId: "lite-alerting",
      groupIds: ["lite-alerting"],
      yesCount: 0,
      partialCount: 0,
      alertMonthlyPrice: null,
      alertPlanName: "Not published",
      alertPriceCurrency: "unknown",
      fullPackageMonthlyPrice: null,
      fullPackagePlanName: "Not published",
      fullPackagePriceCurrency: "unknown",
    };
  }

  const featureScore = Math.round(normalizedFeatureKeys.reduce((score, key) => (
    score + tenderAlertFeatureWeights[key] * statusFactor[normalized.features[key].status]
  ), 0));
  const prices = priceBenchmarks(record);
  const combinedAffordability = affordabilityScore(prices.alertMonthlyPrice) * 0.45
    + affordabilityScore(prices.fullPackageMonthlyPrice) * 0.55;
  const valueScore = Math.round(
    combinedAffordability * 0.55
      + transparencyScore(normalized.pricing.availability) * 0.25
      + inclusivenessScore(normalized.pricing.billingBasis) * 0.2,
  );
  const groupIds = productGroups(record);

  return {
    overallScore: Math.round(featureScore * 0.68 + valueScore * 0.32),
    featureScore,
    valueScore,
    primaryGroupId: groupIds[0],
    groupIds,
    yesCount: normalizedFeatureKeys.filter((key) => normalized.features[key].status === "yes").length,
    partialCount: normalizedFeatureKeys.filter((key) => normalized.features[key].status === "partial").length,
    ...prices,
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
