import type { Metadata } from "next";
import { CategoryPage } from "../_components/directory";

export const metadata: Metadata = { title: "Tender alert services: features, monthly prices and coverage", description: "Compare UK tender-alert services by normalized features, monthly and annual price, users, buyer and supplier profiles, requirements planning and explicitly named portals.", alternates: { canonical: "/tools/tender-alerts" } };
export default function Page() { return <CategoryPage slug="tender-alerts" />; }

