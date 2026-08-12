import type { Metadata } from "next";
import { CategoryPage } from "../_components/directory";

export const metadata: Metadata = { title: "Tender alert services and discovery tools", description: "Compare UK-facing tender alert services by source coverage, public pricing, fit and provider-stated caveats.", alternates: { canonical: "/tools/tender-alerts" } };
export default function Page() { return <CategoryPage slug="tender-alerts" />; }

