import type { Metadata } from "next";
import { CategoryPage } from "../_components/directory";

export const metadata: Metadata = { title: "Official procurement and tender portals", description: "Official UK, EU and international procurement portals, with coverage, access costs and submission caveats.", alternates: { canonical: "/tools/official-portals" } };
export default function Page() { return <CategoryPage slug="official-portals" />; }

