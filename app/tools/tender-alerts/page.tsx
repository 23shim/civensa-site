import type { Metadata } from "next";
import { CategoryPage } from "../_components/directory";

export const metadata: Metadata = { title: "Compare tender alert services: features, value and pricing", description: "Filter 29 UK tender-alert services by product class, features, portals and price. Compare transparent feature, value and combined scores with source-linked audits.", alternates: { canonical: "/tools/tender-alerts" } };
export default function Page() { return <CategoryPage slug="tender-alerts" />; }

