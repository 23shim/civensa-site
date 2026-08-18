import { spawn } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const port = "4173";
const origin = `http://127.0.0.1:${port}`;
const outputDir = path.resolve("site-dist");
const providerAuditRoutes = (await Promise.all([1, 2, 3, 4, 5, 6].map(async (number) => {
  const batch = JSON.parse(await readFile(path.resolve(`docs/provider-research-batch-${number}.json`), "utf8"));
  return batch.providers.map((provider) => `/tools/tender-alerts/${provider.slug}/`);
}))).flat();
const routes = [
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
  "/tools/",
  "/tools/methodology/",
  "/tools/tender-alerts/",
  "/tools/procurement-intelligence/",
  "/tools/bid-writing-software/",
  "/tools/bid-writing-services/",
  "/tools/official-portals/",
  ...providerAuditRoutes,
];

const server = spawn(process.execPath, ["dist/standalone/server.js"], {
  env: { ...process.env, HOST: "127.0.0.1", PORT: port },
  stdio: "inherit",
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The production server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Timed out waiting for the standalone server");
}

try {
  await waitForServer();
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await cp("public", outputDir, { recursive: true });
  await cp("dist/standalone/dist/client/_next", path.join(outputDir, "_next"), {
    recursive: true,
  });

  for (const route of routes) {
    const response = await fetch(`${origin}${route}`);
    if (!response.ok) {
      throw new Error(`Failed to render ${route}: HTTP ${response.status}`);
    }
    const targetDir = route === "/" ? outputDir : path.join(outputDir, route);
    await mkdir(targetDir, { recursive: true });
    await writeFile(path.join(targetDir, "index.html"), await response.text());
  }

  const notFoundResponse = await fetch(`${origin}/__civensa_not_found__`);
  if (notFoundResponse.status !== 404) {
    throw new Error(`Failed to render the custom 404 page: HTTP ${notFoundResponse.status}`);
  }
  await writeFile(path.join(outputDir, "404.html"), await notFoundResponse.text());

  await writeFile(path.join(outputDir, ".nojekyll"), "");
  await writeFile(path.join(outputDir, "CNAME"), "civensa.com\n");
  console.log(`Exported ${routes.length} routes to ${outputDir}`);
} finally {
  server.kill();
}
