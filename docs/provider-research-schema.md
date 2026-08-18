# Civensa normalized provider research schema

Research date: 18 August 2026

## Evidence rules

- Use first-party provider pages, help centres, pricing pages, terms, or official product documentation.
- Record a portal only when the provider explicitly names or links it. A broad claim such as "all UK portals" belongs in `otherCoverageClaims`, not `explicitPortals`.
- `yes` means the complete normalized capability is offered in at least one current plan. A higher-plan restriction does not turn a complete capability into `partial`; record plan gating in the detail and deep audit.
- `partial` means the product offers only an adjacent, incomplete, indirect, pilot, or materially narrower version of the normalized capability.
- `not_offered` is the default when the reviewed first-party pages do not establish the feature. For this directory, an undocumented capability is treated as not offered to a buyer evaluating the public product.
- Do not infer a capability from generic marketing language, screenshots without an identifiable workflow, a search filter, or a raw notice field.
- Plan-limited but otherwise complete functionality is `yes`. Indirect or incomplete functionality is `partial`.
- Keep provider claims separate from Civensa testing. This research does not constitute an independent product test.
- Preserve direct evidence URLs beside each material fact.

## Feature keys

- `semanticAiMatching`: semantic, profile-based, machine-learning, or AI relevance matching. Generic AI copy without matching is not enough.
- `buyerProfiles`: `yes` only for a deliberately built buyer entity with structured cross-notice intelligence and evidence of canonicalisation, deduplication, entity resolution, or comparable investment. A buyer filter, buyer name on a notice, spend chart, contact list, or unverified page is not enough. Use `partial` for structured buyer pages where the provider does not establish robust identity handling.
- `supplierProfiles`: `yes` only for deliberately built supplier entities that aggregate awards, incumbency, relationships, competitor history, or other cross-notice intelligence with evidence of canonicalisation, deduplication, entity resolution, or comparable investment. The user's own matching profile, a winner field, supplier search, or a flat directory is not enough. Use `partial` for structured pages without established identity handling.
- `renewalSignals`: contract expiry, renewal, re-tender, or extension monitoring.
- `similarContracts`: comparable historical opportunities or awards surfaced against a notice or profile.
- `buyerDocuments`: a full searchable corpus of buyer-authored plans, strategies, minutes, budgets, pipelines or comparable documents that can surface upcoming work. Tender packs, isolated linked files or extracted snippets alone do not qualify as `yes`.
- `buyerRequirements`: extracted or organized participation conditions, certifications, policies, evaluation criteria, or recurring buyer requirements.
- `requirementsPlanning`: `yes` only for a durable workflow that turns requirements into gaps, evidence needs, owners, actions, deadlines, or tracked readiness before bid submission. Extracted requirements, a checklist, fit score, bid/no-bid explanation, compliance matrix, or drafting assistant alone is at most `partial`.
- `awardHistory`: historical award notices, winners, values, or award search.
- `frameworks`: framework, DPS, dynamic-market, or route-to-market discovery/intelligence.
- `competitorTracking`: named competitor, incumbent, supplier, or winner monitoring.
- `exportsApi`: CSV/Excel export, API, webhook, CRM, or another documented data export/integration.
- `collaboration`: multiple users, assignments, shared pipeline, comments, or team workflow.
- `bidWriting`: response drafting, answer library, document analysis, compliance matrix, or managed writing support.

Each feature uses:

```json
{
  "status": "yes | partial | not_offered",
  "detail": "Short factual explanation",
  "evidence": [{ "label": "Page label", "url": "https://..." }]
}
```

## Pricing fields

```json
{
  "availability": "public_numeric | free_only | quote_only | not_found",
  "billingBasis": "per_seat | per_organisation | per_team | mixed | unknown",
  "currency": "GBP | EUR | USD | mixed | unknown",
  "plansText": "Concise transcription of visible prices and billing periods",
  "seatDetail": "Included users and additional-seat pricing, or not publicly stated",
  "vatDetail": "VAT treatment when stated",
  "trialDetail": "Trial length, card requirement, or not publicly stated",
  "comparablePlans": [
    {
      "planName": "Published plan name",
      "currency": "GBP | EUR | USD | mixed | unknown",
      "billingBasis": "per_seat | per_organisation | per_team | mixed | unknown",
      "monthlyPrice": 79,
      "annualPrice": 780,
      "annualMonthlyEquivalent": 65,
      "annualPriceCalculation": "published_total | calculated_from_annual_monthly_rate | not_available",
      "includedUsers": "Published user or recipient allowance",
      "notes": "Material limits, VAT, introductory pricing, or calculation caveat"
    }
  ],
  "evidence": [{ "label": "Pricing", "url": "https://..." }]
}
```

Comparable-pricing rules:

- One entry per publicly described plan, including free and custom plans.
- Store numeric prices without currency symbols. Use `null` when that billing option is not published; never estimate it.
- `monthlyPrice` is the price paid for one month on a monthly billing schedule.
- `annualPrice` is the total price paid for one year on an annual billing schedule. Use a published total where available. If the provider instead publishes an annual-billing monthly rate, calculate the total as that rate multiplied by 12 and label it with `calculated_from_annual_monthly_rate`.
- `annualMonthlyEquivalent` is `annualPrice / 12`, rounded to two decimal places, or the provider's explicitly published annual-billing monthly rate.
- `annualPriceCalculation` is `published_total` for a provider-published yearly total, `calculated_from_annual_monthly_rate` when the yearly total is arithmetic from an explicitly published annual-billing monthly rate, and `not_available` when no annual schedule is established.
- Do not multiply a month-to-month price by 12 and present it as an annual plan. Only an explicitly labelled annual-billing monthly rate supports the calculated yearly total.
- Preserve per-seat, per-organisation, per-team and mixed pricing distinctions. Record included users and extra-seat charges where stated.

## Canonical portal identifiers

- `find_a_tender` - Find a Tender
- `contracts_finder` - Contracts Finder
- `public_contracts_scotland` - Public Contracts Scotland
- `sell2wales` - Sell2Wales
- `etendersni` - eTendersNI
- `ted` - Tenders Electronic Daily
- `defence_sourcing_portal` - Defence Sourcing Portal
- `nhs_atamis` - NHS Atamis
- `in_tend` - In-tend
- `procontract` - ProContract
- `delta_esourcing` - Delta eSourcing
- `mytenders` - myTenders
- `compete_for` - CompeteFor
- `other` - another explicitly named portal

Each explicit portal uses:

```json
{
  "portalId": "find_a_tender",
  "portalName": "Find a Tender",
  "detail": "Provider's precise coverage wording",
  "evidence": [{ "label": "Coverage", "url": "https://..." }]
}
```

## Deep provider audit

Every provider also receives a deeper business and product audit. Use first-party product pages, documentation, help centres, terms, privacy/security pages and status pages, plus authoritative official corporate records where useful. Do not use anonymous review claims as evidence.

Each evidence field uses:

```json
{
  "evidenceStrength": "strong | moderate | weak | not_found",
  "detail": "Specific factual assessment, including plan or product boundaries",
  "evidence": [{ "label": "Direct source", "url": "https://..." }]
}
```

Each provider must add:

```json
{
  "deepAudit": {
    "researchSummary": "Two or three concise sentences explaining what the business actually sells and where its defensible depth appears to be.",
    "legalAndMaturity": {},
    "targetCustomerAndUseCase": {},
    "dataSourcesAndCoverageMethod": {},
    "dataIngestionAndFreshness": {},
    "matchingAndQualificationMethod": {},
    "buyerEntityInvestment": {},
    "supplierEntityInvestment": {},
    "renewalSignalMethod": {},
    "requirementsPlanningMethod": {},
    "historicalAndAwardDepth": {},
    "workflowAndIntegrations": {},
    "securitySupportAndOnboarding": {},
    "commercialModel": {},
    "materialLimitations": [{ "detail": "Material limitation", "evidence": [] }],
    "contradictions": [{ "detail": "Conflicting first-party statements", "evidence": [] }],
    "diligenceQuestions": ["Concrete question a buyer should ask before purchase"]
  }
}
```

Deep-audit rules:

- `strong` requires direct, specific documentation or an authoritative official record.
- `moderate` means useful first-party evidence exists but an important implementation detail is missing.
- `weak` means only broad marketing copy or an indirect signal was found.
- `not_found` means the reviewed sources did not establish the subject.
- For buyer and supplier entities, name the evidence for canonicalisation, deduplication, entity resolution, aliases, cross-notice aggregation or other substantial identity work. Rich-looking pages without identity evidence are not `strong`.
- For renewals, distinguish published contract-end dates, calculated expiry windows, extension evidence, predicted re-tender timing and confirmed future notices.
- For requirements planning, distinguish extraction/checklists from a durable workflow with gaps, evidence, owners, actions, dates and readiness state.
- Record what is included by plan. Do not downgrade a fully implemented feature merely because it is sold on a higher tier.

## Batch artifact

Each research batch must write valid JSON to its assigned file:

```json
{
  "researchedAt": "2026-08-18",
  "providers": [
    {
      "slug": "provider-slug",
      "name": "Provider name",
      "officialUrl": "https://...",
      "pricing": {},
      "features": {},
      "explicitPortals": [],
      "otherCoverageClaims": [
        {
          "claim": "Exact concise description",
          "evidence": [{ "label": "Coverage", "url": "https://..." }]
        }
      ],
      "caveats": [],
      "sourceUrls": []
    }
  ]
}
```
