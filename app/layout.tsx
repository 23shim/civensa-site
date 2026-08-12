import type { Metadata } from "next";
import { AnalyticsConsent } from "./_components/analytics-consent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://civensa.com"),
  title: { default: "Civensa | UK procurement tools, mapped", template: "%s | Civensa" },
  description: "Evidence-led UK public procurement research and a source-linked directory of tender alerts, procurement intelligence, bid-writing software and services.",
  keywords: ["public procurement intelligence", "UK tender alerts", "contract renewals", "buyer intelligence", "bid writing software", "tender writing services"],
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title: "Civensa | UK procurement tools, mapped", description: "A source-linked guide to tender alerts, procurement intelligence, bid-writing software and specialist services.", url: "https://civensa.com", siteName: "Civensa", type: "website", images: [{ url: "/og-tools.png", width: 1731, height: 909, alt: "Civensa: UK procurement tools, mapped" }] },
  twitter: { card: "summary_large_image", title: "Civensa | UK procurement tools, mapped", description: "Tender alerts, procurement intelligence and bid-writing tools compared with sources.", images: ["/og-tools.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://civensa.com/#organization", name: "Civensa", url: "https://civensa.com", description: "A procurement research publication operated by BidSkim Limited." },
      { "@type": "WebSite", "@id": "https://civensa.com/#website", name: "Civensa", url: "https://civensa.com", publisher: { "@id": "https://civensa.com/#organization" }, inLanguage: "en-GB" },
    ],
  };
  return <html lang="en-GB"><body>{children}<AnalyticsConsent /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
