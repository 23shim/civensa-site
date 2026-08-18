# Civensa normalized provider research schema

Research date: 18 August 2026

## Evidence rules

- Use first-party provider pages, help centres, pricing pages, terms, or official product documentation.
- Record a portal only when the provider explicitly names or links it. A broad claim such as "all UK portals" belongs in `otherCoverageClaims`, not `explicitPortals`.
- `not_stated` means the reviewed provider pages did not establish the feature. It does not mean the product lacks it.
- `no` requires an explicit provider statement that the feature is unavailable or excluded.
- Plan-limited or indirect functionality is `partial`.
- Keep provider claims separate from Civensa testing. This research does not constitute an independent product test.
- Preserve direct evidence URLs beside each material fact.

## Feature keys

- `keywordAlerts`: saved keyword searches or keyword-based notifications.
- `semanticAiMatching`: semantic, profile-based, machine-learning, or AI relevance matching. Generic AI copy without matching is not enough.
- `buyerProfiles`: structured pages or intelligence about contracting authorities.
- `supplierProfiles`: structured supplier, incumbent, winner, or competitor profiles. A user's own company profile alone is not enough.
- `renewalSignals`: contract expiry, renewal, re-tender, or extension monitoring.
- `similarContracts`: comparable historical opportunities or awards surfaced against a notice or profile.
- `buyerDocuments`: buyer plans, strategies, minutes, pipelines, budgets, or other buyer-authored documents beyond procurement notices.
- `buyerRequirements`: extracted or organized participation conditions, certifications, policies, evaluation criteria, or recurring buyer requirements.
- `requirementsPlanning`: gap planning, readiness actions, evidence planning, or a workflow for preparing against requirements before bid submission.
- `awardHistory`: historical award notices, winners, values, or award search.
- `frameworks`: framework, DPS, dynamic-market, or route-to-market discovery/intelligence.
- `competitorTracking`: named competitor, incumbent, supplier, or winner monitoring.
- `exportsApi`: CSV/Excel export, API, webhook, CRM, or another documented data export/integration.
- `collaboration`: multiple users, assignments, shared pipeline, comments, or team workflow.
- `bidWriting`: response drafting, answer library, document analysis, compliance matrix, or managed writing support.

Each feature uses:

```json
{
  "status": "yes | partial | no | not_stated",
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
  "evidence": [{ "label": "Pricing", "url": "https://..." }]
}
```

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
