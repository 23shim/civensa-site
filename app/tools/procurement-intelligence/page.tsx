import type { Metadata } from "next";
import { CategoryPage } from "../_components/directory";

export const metadata: Metadata = { title: "Procurement intelligence platforms", description: "Compare procurement intelligence platforms by market, data scope, public pricing and limitations.", alternates: { canonical: "/tools/procurement-intelligence" } };
export default function Page() { return <CategoryPage slug="procurement-intelligence" />; }

