import batch1Json from "../../../docs/provider-research-batch-1.json";
import batch2Json from "../../../docs/provider-research-batch-2.json";
import batch3Json from "../../../docs/provider-research-batch-3.json";
import batch4Json from "../../../docs/provider-research-batch-4.json";
import batch5Json from "../../../docs/provider-research-batch-5.json";
import batch6Json from "../../../docs/provider-research-batch-6.json";
import batch7Json from "../../../docs/provider-research-batch-7.json";
import {
  normalizedFeatureKeys,
  type BillingBasis,
  type DeepEvidenceField,
  type DeepProviderAudit,
  type EvidenceLink,
  type FeatureStatus,
  type NormalizedFeature,
  type NormalizedFeatureKey,
  type NormalizedVendorProfile,
  type PricingAvailability,
} from "./types";

type RawEvidence = { label: string; url: string };
type RawFeature = {
  status: FeatureStatus;
  detail: string;
  evidence: readonly RawEvidence[];
};
type RawDeepEvidenceField = {
  evidenceStrength: "strong" | "moderate" | "weak" | "not_found";
  detail: string;
  evidence: readonly RawEvidence[];
};
type RawDeepAuditNote = { detail: string; evidence: readonly RawEvidence[] };
type RawDeepProviderAudit = {
  researchSummary: string;
  legalAndMaturity: RawDeepEvidenceField;
  targetCustomerAndUseCase: RawDeepEvidenceField;
  dataSourcesAndCoverageMethod: RawDeepEvidenceField;
  dataIngestionAndFreshness: RawDeepEvidenceField;
  matchingAndQualificationMethod: RawDeepEvidenceField;
  buyerEntityInvestment: RawDeepEvidenceField;
  supplierEntityInvestment: RawDeepEvidenceField;
  renewalSignalMethod: RawDeepEvidenceField;
  requirementsPlanningMethod: RawDeepEvidenceField;
  historicalAndAwardDepth: RawDeepEvidenceField;
  workflowAndIntegrations: RawDeepEvidenceField;
  securitySupportAndOnboarding: RawDeepEvidenceField;
  commercialModel: RawDeepEvidenceField;
  materialLimitations: readonly RawDeepAuditNote[];
  contradictions: readonly RawDeepAuditNote[];
  diligenceQuestions: readonly string[];
};
type RawProvider = {
  slug: string;
  pricing: {
    availability: PricingAvailability;
    billingBasis: BillingBasis;
    currency: "GBP" | "EUR" | "USD" | "mixed" | "unknown";
    plansText: string;
    seatDetail: string;
    vatDetail: string;
    trialDetail: string;
    comparablePlans: readonly {
      planName: string;
      currency: "GBP" | "EUR" | "USD" | "mixed" | "unknown";
      billingBasis: BillingBasis;
      monthlyPrice: number | null;
      annualPrice: number | null;
      annualMonthlyEquivalent: number | null;
      annualPriceCalculation: "published_total" | "calculated_from_annual_monthly_rate" | "not_available";
      includedUsers: string;
      notes: string;
    }[];
    evidence: readonly RawEvidence[];
  };
  features: Record<NormalizedFeatureKey, RawFeature>;
  explicitPortals: readonly {
    portalId: string;
    portalName: string;
    detail: string;
    evidence: readonly RawEvidence[];
  }[];
  otherCoverageClaims: readonly {
    claim: string;
    evidence: readonly RawEvidence[];
  }[];
  caveats: readonly string[];
  deepAudit: RawDeepProviderAudit;
};
type RawBatch = { researchedAt: string; providers: readonly RawProvider[] };

const rawBatches = [batch1Json, batch2Json, batch3Json, batch4Json, batch5Json, batch6Json, batch7Json] as unknown as readonly RawBatch[];

function cleanText(value: string): string {
  return value.replaceAll("—", ";").replaceAll("–", "-");
}

function evidenceLinks(evidence: readonly RawEvidence[]): readonly EvidenceLink[] {
  return evidence.map((link) => ({ label: cleanText(link.label), url: link.url }));
}

function normalizeDeepField(field: RawDeepEvidenceField): DeepEvidenceField {
  return {
    evidenceStrength: field.evidenceStrength,
    detail: cleanText(field.detail),
    evidenceLinks: evidenceLinks(field.evidence),
  };
}

function normalizeDeepAudit(audit: RawDeepProviderAudit): DeepProviderAudit {
  return {
    researchSummary: cleanText(audit.researchSummary),
    legalAndMaturity: normalizeDeepField(audit.legalAndMaturity),
    targetCustomerAndUseCase: normalizeDeepField(audit.targetCustomerAndUseCase),
    dataSourcesAndCoverageMethod: normalizeDeepField(audit.dataSourcesAndCoverageMethod),
    dataIngestionAndFreshness: normalizeDeepField(audit.dataIngestionAndFreshness),
    matchingAndQualificationMethod: normalizeDeepField(audit.matchingAndQualificationMethod),
    buyerEntityInvestment: normalizeDeepField(audit.buyerEntityInvestment),
    supplierEntityInvestment: normalizeDeepField(audit.supplierEntityInvestment),
    renewalSignalMethod: normalizeDeepField(audit.renewalSignalMethod),
    requirementsPlanningMethod: normalizeDeepField(audit.requirementsPlanningMethod),
    historicalAndAwardDepth: normalizeDeepField(audit.historicalAndAwardDepth),
    workflowAndIntegrations: normalizeDeepField(audit.workflowAndIntegrations),
    securitySupportAndOnboarding: normalizeDeepField(audit.securitySupportAndOnboarding),
    commercialModel: normalizeDeepField(audit.commercialModel),
    materialLimitations: audit.materialLimitations.map((item) => ({ detail: cleanText(item.detail), evidenceLinks: evidenceLinks(item.evidence) })),
    contradictions: audit.contradictions.map((item) => ({ detail: cleanText(item.detail), evidenceLinks: evidenceLinks(item.evidence) })),
    diligenceQuestions: audit.diligenceQuestions.map(cleanText),
  };
}

function normalizeProvider(provider: RawProvider, researchedAt: string): NormalizedVendorProfile {
  const features = Object.fromEntries(normalizedFeatureKeys.map((key) => {
    const feature = provider.features[key];
    const normalized: NormalizedFeature = {
      status: feature.status,
      detail: cleanText(feature.detail),
      evidenceLinks: evidenceLinks(feature.evidence),
    };
    return [key, normalized];
  })) as Record<NormalizedFeatureKey, NormalizedFeature>;

  return {
    researchedAt,
    pricing: {
      availability: provider.pricing.availability,
      billingBasis: provider.pricing.billingBasis,
      currency: provider.pricing.currency,
      plansText: cleanText(provider.pricing.plansText),
      seatDetail: cleanText(provider.pricing.seatDetail),
      vatDetail: cleanText(provider.pricing.vatDetail),
      trialDetail: cleanText(provider.pricing.trialDetail),
      comparablePlans: provider.pricing.comparablePlans.map((plan) => ({
        planName: cleanText(plan.planName),
        currency: plan.currency,
        billingBasis: plan.billingBasis,
        monthlyPrice: plan.monthlyPrice,
        annualPrice: plan.annualPrice,
        annualMonthlyEquivalent: plan.annualMonthlyEquivalent,
        annualPriceCalculation: plan.annualPriceCalculation,
        includedUsers: cleanText(plan.includedUsers),
        notes: cleanText(plan.notes),
      })),
      evidenceLinks: evidenceLinks(provider.pricing.evidence),
    },
    features,
    explicitPortals: provider.explicitPortals.map((portal) => ({
      portalId: portal.portalId,
      portalName: cleanText(portal.portalName),
      detail: cleanText(portal.detail),
      evidenceLinks: evidenceLinks(portal.evidence),
    })),
    otherCoverageClaims: provider.otherCoverageClaims.map((claim) => ({
      claim: cleanText(claim.claim),
      evidenceLinks: evidenceLinks(claim.evidence),
    })),
    caveats: provider.caveats.map(cleanText),
    deepAudit: normalizeDeepAudit(provider.deepAudit),
  };
}

const profiles: Record<string, NormalizedVendorProfile> = {};

for (const batch of rawBatches) {
  for (const provider of batch.providers) {
    if (profiles[provider.slug]) throw new Error(`Duplicate normalized provider slug: ${provider.slug}`);
    profiles[provider.slug] = normalizeProvider(provider, batch.researchedAt);
  }
}

if (Object.keys(profiles).length !== 26) {
  throw new Error(`Expected 26 normalized tender-alert providers, received ${Object.keys(profiles).length}`);
}

export const tenderAlertResearchBySlug: Readonly<Record<string, NormalizedVendorProfile>> = profiles;
