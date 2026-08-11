import type { Metadata } from "next";
import { AnalyticsConsent } from "./_components/analytics-consent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://civensa.com"),
  title: { default: "Civensa — Procurement intelligence, mapped", template: "%s — Civensa" },
  description: "Evidence-led research on UK public procurement: buyer intent, contract renewals, supplier requirements and market structure.",
  keywords: ["public procurement intelligence", "UK tenders", "contract renewals", "buyer intelligence", "supplier requirements"],
  alternates: { canonical: "/" },
  openGraph: { title: "Civensa — See the market before it moves", description: "Procurement intelligence connecting buyer intent, contract cycles and supplier requirements.", url: "https://civensa.com", siteName: "Civensa", type: "website", images: [{ url: "/og.png", width: 1733, height: 909, alt: "Civensa — See the market before it moves" }] },
  twitter: { card: "summary_large_image", title: "Civensa — See the market before it moves", description: "Procurement intelligence, mapped.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "Civensa", url: "https://civensa.com", description: "A procurement research publication operated by BidSkim Limited." };
  return <html lang="en"><body>{children}<AnalyticsConsent /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
