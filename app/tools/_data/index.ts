import { bidWritingServiceRecords } from "./bid-writing-services";
import { bidWritingSoftwareRecords } from "./bid-writing-software";
import { categories } from "./categories";
import { officialPortalRecords } from "./official-portals";
import { procurementIntelligenceRecords } from "./procurement-intelligence";
import { tenderAlertRecords } from "./tender-alerts";
import type { CategoryDefinition, CategorySlug, VendorRecord } from "./types";

export { categories } from "./categories";
export { LAST_CHECKED, normalizedFeatureKeys } from "./types";
export type {
  BillingBasis,
  CategoryDefinition,
  CategorySlug,
  CoverageClaim,
  DeepAuditNote,
  DeepEvidenceField,
  DeepProviderAudit,
  EvidenceBasis,
  EvidenceLink,
  EvidenceStrength,
  ExplicitPortalCoverage,
  FeatureStatus,
  NormalizedFeature,
  NormalizedFeatureKey,
  NormalizedPricing,
  NormalizedPricePlan,
  NormalizedVendorProfile,
  PricingAvailability,
  VendorRecord,
} from "./types";

export const vendorRecords: readonly VendorRecord[] = [
  ...tenderAlertRecords,
  ...procurementIntelligenceRecords,
  ...bidWritingSoftwareRecords,
  ...bidWritingServiceRecords,
  ...officialPortalRecords,
] as const;

export function getCategory(slug: CategorySlug): CategoryDefinition {
  const category = categories.find((item) => item.slug === slug);
  if (!category) throw new Error(`Unknown tools category: ${slug}`);
  return category;
}

export function getRecords(slug: CategorySlug): readonly VendorRecord[] {
  return vendorRecords
    .filter((record) => record.category === slug)
    .sort((left, right) => left.name.localeCompare(right.name, "en-GB"));
}

export function getRecord(category: CategorySlug, slug: string): VendorRecord | undefined {
  return vendorRecords.find((record) => record.category === category && record.slug === slug);
}
