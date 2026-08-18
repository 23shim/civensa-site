import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BidSkimProviderComparison } from "../_components/bidskim-provider-comparison";
import { tenderAlertRecords } from "../../tools/_data/tender-alerts";

type PageProps = { params: Promise<{ comparison: string }> };

const bidSkim = tenderAlertRecords.find((record) => record.slug === "bidskim-alerts");
const competitors = tenderAlertRecords.filter((record) => record.slug !== "bidskim-alerts");

function providerFromComparison(value: string) {
  const prefix = "bidskim-vs-";
  if (!value.startsWith(prefix)) return undefined;
  return competitors.find((record) => record.slug === value.slice(prefix.length));
}

if (!bidSkim) throw new Error("BidSkim comparison record is missing");

export function generateStaticParams() {
  return competitors.map((record) => ({ comparison: `bidskim-vs-${record.slug}` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { comparison } = await params;
  const provider = providerFromComparison(comparison);
  if (!provider) return { title: "Comparison not found", robots: { index: false, follow: false } };
  const title = `BidSkim vs ${provider.name}: features, pricing and scores`;
  const description = `Compare BidSkim and ${provider.name} across 14 normalized tender-intelligence features, tender-alert and full-package prices, coverage and disclosed Civensa scores.`;
  const path = `/compare/bidskim-vs-${provider.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `https://civensa.com${path}/`, type: "article", images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}

export default async function Page({ params }: PageProps) {
  const { comparison } = await params;
  const provider = providerFromComparison(comparison);
  if (!provider) notFound();
  const providerIndex = competitors.findIndex((record) => record.slug === provider.slug);
  const related = Array.from({ length: Math.min(4, competitors.length - 1) }, (_, offset) => competitors[(providerIndex + offset + 1) % competitors.length]);
  return <BidSkimProviderComparison bidSkim={bidSkim} provider={provider} related={related} />;
}
