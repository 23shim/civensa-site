const key = "649d44f84843434ab0d10bc7117c2e60";
const paths = [
  "/",
  "/about/",
  "/compare/",
  "/contact/",
  "/methodology/",
  "/privacy/",
  "/research/",
  "/research/buyer-intelligence/",
  "/research/renewal-signals/",
  "/research/supplier-requirements/",
  "/research/uk-public-procurement-intelligence/",
  "/research/find-government-contracts-before-tender/",
  "/research/pipeline-notices/",
  "/research/preliminary-market-engagement/",
  "/research/planned-procurement-notices/",
  "/research/contract-award-notices/",
  "/research/contract-performance-notices/",
  "/research/frameworks-vs-dynamic-markets/",
  "/research/public-sector-buyer-profile/",
  "/research/bid-readiness-checklist/",
  "/terms/",
];

const response = await fetch("https://www.bing.com/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "civensa.com",
    key,
    keyLocation: `https://civensa.com/${key}.txt`,
    urlList: paths.map((path) => `https://civensa.com${path}`),
  }),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${await response.text()}`);
}

console.log(`IndexNow accepted ${paths.length} Civensa URLs with HTTP ${response.status}`);
