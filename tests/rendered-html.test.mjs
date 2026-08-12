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
    assert.match(html, /12 August 2026|2026-08-12/, route);
    assert.match(html, /canonical[^>]+https:\/\/civensa\.com\/tools\//i, route);
    assert.doesNotMatch(html, /—|–|\s--\s/, `${route}: contains humanizer-prohibited dash punctuation`);
  }

  const alerts = await (await render("/tools/tender-alerts/")).text();
  assert.match(alerts, /BidSkim Limited/i);
  assert.match(alerts, /Monitor[^<]{0,80}£79|£79[^<]{0,80}Monitor/i);
  assert.match(alerts, /Predict[^<]{0,80}£189|£189[^<]{0,80}Predict/i);
  assert.match(alerts, /provider-stated|Provider-stated/i);

  const hub = await (await render("/tools/")).text();
  assert.match(hub, /"@type":"ItemList"/);
  assert.match(hub, /no affiliate links|no paid rankings/i);
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
