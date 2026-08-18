import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

function articleText(html) {
  const body = html.match(/<div class="article-body shell">(.*?)<\/div><\/article>/s)?.[1] ?? "";
  return body
    .replace(/<script.*?<\/script>/gs, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#x27|#39);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

test("server-renders the Civensa publication", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Civensa \| UK procurement tools, mapped<\/title>/i);
  assert.match(html, /See the market/);
  assert.match(html, /application\/rss\+xml/);
  assert.match(html, /"@type":"Organization"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("renders the procurement authority cluster with structured data", async () => {
  const slugs = ["uk-public-procurement-intelligence", "find-government-contracts-before-tender", "pipeline-notices", "preliminary-market-engagement", "planned-procurement-notices", "contract-award-notices", "contract-performance-notices", "frameworks-vs-dynamic-markets", "public-sector-buyer-profile", "bid-readiness-checklist"];
  for (const slug of slugs) {
    const response = await render(`/research/${slug}/`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /"@type":"Article"/, slug);
    assert.match(html, /"@type":"FAQPage"/, slug);
    assert.match(html, /Primary sources/, slug);
    assert.match(html, new RegExp(`canonical[^>]+https://civensa\\.com/research/${slug}/`, "i"), slug);
  }
});

test("authority articles meet the editorial depth and anti-slop gate", async () => {
  const slugs = ["uk-public-procurement-intelligence", "find-government-contracts-before-tender", "pipeline-notices", "preliminary-market-engagement", "planned-procurement-notices", "contract-award-notices", "contract-performance-notices", "frameworks-vs-dynamic-markets", "public-sector-buyer-profile", "bid-readiness-checklist"];
  const banned = /\b(?:delve|foster|leverage|utilize|facilitate|empower|streamline|robust|cutting-edge|paradigm|tapestry|realm|beacon|multifaceted|meticulous|intricate|paramount|transformative|elevate|embark|supercharge|harness|ever-evolving)\b/i;
  for (const slug of slugs) {
    const response = await render(`/research/${slug}/`);
    const html = await response.text();
    const text = articleText(html);
    const words = text.match(/\b[\p{L}\p{N}][\p{L}\p{N}'-]*\b/gu) ?? [];
    assert.ok(words.length >= 1_000, `${slug}: expected at least 1,000 rendered words`);
    assert.ok((html.match(/<section id="section-/g) ?? []).length >= 8, `${slug}: expected at least 8 research sections`);
    assert.ok((html.match(/class="source-kind"/g) ?? []).length >= 8, `${slug}: expected at least 8 named sources`);
    assert.doesNotMatch(text, banned, `${slug}: contains banned AI-style language`);
    assert.doesNotMatch(text, /—|–|\s--\s/, `${slug}: contains humanizer-prohibited dash punctuation`);
  }
});

test("renders the procurement tools directory with dated evidence and ownership disclosure", async () => {
  const routes = [
    "/tools/",
    "/tools/tender-alerts/",
    "/tools/procurement-intelligence/",
    "/tools/bid-writing-software/",
    "/tools/bid-writing-services/",
    "/tools/official-portals/",
    "/tools/methodology/",
  ];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /Civensa/, route);
    assert.match(html, /12 August 2026|18 August 2026|2026-08-12|2026-08-18/, route);
    assert.match(html, /canonical[^>]+https:\/\/civensa\.com\/tools\//i, route);
    assert.doesNotMatch(html, /—|–|\s--\s/, `${route}: contains humanizer-prohibited dash punctuation`);
  }

  const alerts = await (await render("/tools/tender-alerts/")).text();
  assert.match(alerts, /BidSkim Limited/i);
  assert.match(alerts, /Monitor[^<]{0,80}£79|£79[^<]{0,80}Monitor/i);
  assert.match(alerts, /Predict[^<]{0,80}£189|£189[^<]{0,80}Predict/i);
  assert.match(alerts, /provider-stated|Provider-stated/i);
  assert.match(alerts, /Features described on provider pages/i);
  assert.match(alerts, /Monthly and annual prices on the same basis/i);
  assert.match(alerts, /Portals explicitly named by each provider/i);
  assert.match(alerts, /Not stated is not evidence that the service lacks coverage/i);
  assert.match(alerts, /Not offered/i);
  assert.match(alerts, /Shortlist builder/i);
  assert.match(alerts, /Full intelligence/i);
  assert.match(alerts, /Intelligence \+ workflow/i);
  assert.match(alerts, /Smart matchers/i);
  assert.match(alerts, /Lite alerting/i);
  assert.match(alerts, /Maximum monthly cost/i);
  assert.match(alerts, /Must offer/i);
  assert.match(alerts, /Add to compare/i);
  assert.match(alerts, /68%<\/strong>\s*features/i);
  assert.match(alerts, /32%<\/strong>\s*value/i);
  const renderedScores = [...alerts.matchAll(/class="overall-score"[^>]*>[\s\S]*?<strong>(\d+)<\/strong>/g)].map((match) => Number(match[1]));
  assert.equal(renderedScores.length, 29, "one combined score per provider");
  assert.deepEqual(renderedScores, [...renderedScores].sort((left, right) => right - left), "default results should be sorted by combined score");
  assert.ok(renderedScores.every((score) => score >= 0 && score <= 100), "combined scores should stay within 0 to 100");
  assert.ok(Buffer.byteLength(alerts) < 700_000, "tender-alert comparison page should stay below 700 kB");

  const methodology = await (await render("/tools/methodology/")).text();
  assert.match(methodology, /Product classes and shortlist score/i);
  assert.match(methodology, /68% feature depth and 32% headline value/i);
  assert.match(methodology, /lowest published plan may not contain every scored feature/i);

  const hub = await (await render("/tools/")).text();
  assert.match(hub, /"@type":"ItemList"/);
  assert.match(hub, /no affiliate links|no paid rankings|no paid placements/i);
});

test("normalized tender-alert research is complete and schema-consistent", async () => {
  const featureKeys = ["keywordAlerts", "semanticAiMatching", "buyerProfiles", "supplierProfiles", "renewalSignals", "similarContracts", "buyerDocuments", "buyerRequirements", "requirementsPlanning", "awardHistory", "frameworks", "competitorTracking", "exportsApi", "collaboration", "bidWriting"];
  const batches = await Promise.all([1, 2, 3, 4, 5, 6].map(async (number) => JSON.parse(await readFile(new URL(`../docs/provider-research-batch-${number}.json`, import.meta.url), "utf8"))));
  const providers = batches.flatMap((batch) => {
    assert.equal(batch.researchedAt, "2026-08-18");
    return batch.providers;
  });
  assert.equal(providers.length, 29);
  assert.equal(new Set(providers.map((provider) => provider.slug)).size, 29);
  const deepAuditFields = ["legalAndMaturity", "targetCustomerAndUseCase", "dataSourcesAndCoverageMethod", "dataIngestionAndFreshness", "matchingAndQualificationMethod", "buyerEntityInvestment", "supplierEntityInvestment", "renewalSignalMethod", "requirementsPlanningMethod", "historicalAndAwardDepth", "workflowAndIntegrations", "securitySupportAndOnboarding", "commercialModel"];
  for (const provider of providers) {
    assert.deepEqual(Object.keys(provider.features).sort(), [...featureKeys].sort(), provider.slug);
    for (const feature of Object.values(provider.features)) {
      assert.match(feature.status, /^(yes|partial|not_offered)$/);
      assert.equal(typeof feature.detail, "string");
      assert.ok(Array.isArray(feature.evidence));
    }
    assert.ok(Array.isArray(provider.explicitPortals));
    assert.ok(Array.isArray(provider.caveats));
    assert.ok(Array.isArray(provider.sourceUrls));
    assert.equal(typeof provider.deepAudit.researchSummary, "string");
    for (const field of deepAuditFields) {
      assert.match(provider.deepAudit[field].evidenceStrength, /^(strong|moderate|weak|not_found)$/, `${provider.slug}: ${field}`);
      assert.equal(typeof provider.deepAudit[field].detail, "string");
      assert.ok(Array.isArray(provider.deepAudit[field].evidence));
    }
    assert.ok(Array.isArray(provider.deepAudit.materialLimitations));
    assert.ok(Array.isArray(provider.deepAudit.contradictions));
    assert.ok(Array.isArray(provider.deepAudit.diligenceQuestions));
    assert.ok(Array.isArray(provider.pricing.comparablePlans));
    assert.ok(provider.pricing.comparablePlans.length > 0, `${provider.slug}: comparable plans`);
    for (const plan of provider.pricing.comparablePlans) {
      assert.match(plan.billingBasis, /^(per_seat|per_organisation|per_team|mixed|unknown)$/);
      for (const field of ["monthlyPrice", "annualPrice", "annualMonthlyEquivalent"]) assert.ok(plan[field] === null || typeof plan[field] === "number", `${provider.slug}: ${plan.planName} ${field}`);
      assert.match(plan.annualPriceCalculation, /^(published_total|calculated_from_annual_monthly_rate|not_available)$/);
      if (plan.annualPrice === null) assert.equal(plan.annualMonthlyEquivalent, null, `${provider.slug}: ${plan.planName} annual equivalent without annual price`);
      else assert.ok(Math.abs(plan.annualMonthlyEquivalent - Math.round((plan.annualPrice / 12) * 100) / 100) < 0.001, `${provider.slug}: ${plan.planName} annual monthly equivalent`);
    }
  }
  const bidSkim = providers.find((provider) => provider.slug === "bidskim-alerts");
  assert.equal(bidSkim.features.buyerProfiles.status, "yes");
  assert.equal(bidSkim.features.supplierProfiles.status, "yes");
  assert.equal(bidSkim.features.renewalSignals.status, "yes");
});

test("renders deep provider audit pages", async () => {
  for (const slug of ["bidskim-alerts", "psip-alerts", "tenderlake", "kimonbids-alerts"]) {
    const response = await render(`/tools/tender-alerts/${slug}/`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /Deep provider audit/i, slug);
    assert.match(html, /Capability-by-capability evidence/i, slug);
    assert.match(html, /Data and discovery engine/i, slug);
    assert.match(html, /Limitations, contradictions and questions/i, slug);
    assert.match(html, new RegExp(`canonical[^>]+https://civensa\\.com/tools/tender-alerts/${slug}/`, "i"), slug);
  }
  const bidSkim = await (await render("/tools/tender-alerts/bidskim-alerts/")).text();
  assert.match(bidSkim, /Ownership disclosure/i);
  assert.match(bidSkim, /Buyer profiles[\s\S]{0,400}feature-status-yes|feature-status-yes[\s\S]{0,400}Buyer profiles/i);
});

test("publishes complete discovery files", async () => {
  const [sitemap, llms, feed] = await Promise.all([readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"), readFile(new URL("../public/llms.txt", import.meta.url), "utf8"), readFile(new URL("../public/feed.xml", import.meta.url), "utf8")]);
  for (const slug of ["uk-public-procurement-intelligence", "pipeline-notices", "bid-readiness-checklist"]) {
    assert.match(sitemap, new RegExp(slug));
    assert.match(llms, new RegExp(slug));
  }
  for (const path of ["tools/", "tools/tender-alerts", "tools/procurement-intelligence", "tools/bid-writing-software", "tools/bid-writing-services", "tools/official-portals", "tools/methodology"]) {
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  }
  assert.match(llms, /procurement tools directory/i);
  const providerBatches = await Promise.all([1, 2, 3, 4, 5, 6].map(async (number) => JSON.parse(await readFile(new URL(`../docs/provider-research-batch-${number}.json`, import.meta.url), "utf8"))));
  for (const provider of providerBatches.flatMap((batch) => batch.providers)) {
    assert.match(sitemap, new RegExp(`tools\\/tender-alerts\\/${provider.slug}\\/`), provider.slug);
    assert.match(llms, new RegExp(`tools/tender-alerts/${provider.slug}/`), provider.slug);
  }
  assert.match(feed, /Civensa Research/);
});

test("unknown legacy URLs return a non-indexable branded 404", async () => {
  const response = await render("/2023/legacy-spam-page/");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /<title>Page not found \| Civensa<\/title>/i);
  assert.match(html, /name="robots" content="noindex, follow"/i);
  assert.match(html, /This page is not on the map/);
  assert.doesNotMatch(html, /rel="canonical"/i);
});
