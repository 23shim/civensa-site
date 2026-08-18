import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TenderAlertProviderAudit } from "../../_components/provider-audit";
import { getRecord, getRecords } from "../../_data";

type PageProps = { params: Promise<{ provider: string }> };

export function generateStaticParams() {
  return getRecords("tender-alerts").map((record) => ({ provider: record.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provider } = await params;
  const record = getRecord("tender-alerts", provider);
  if (!record) return { title: "Provider audit not found", robots: { index: false, follow: false } };
  return {
    title: `${record.name}: features, pricing, coverage and deep audit`,
    description: `Source-linked audit of ${record.name}: normalized features, monthly and annual pricing, named portal coverage, buyer and supplier intelligence, renewals, requirements planning and diligence questions.`,
    alternates: { canonical: `/tools/tender-alerts/${record.slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { provider } = await params;
  const record = getRecord("tender-alerts", provider);
  if (!record) notFound();
  return <TenderAlertProviderAudit record={record} />;
}
