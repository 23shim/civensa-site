import type { Metadata } from "next";
import { CategoryPage } from "../_components/directory";

export const metadata: Metadata = { title: "Bid-writing services and consultancies", description: "Compare bid-writing services by scope, coverage, public pricing basis and practical limitations.", alternates: { canonical: "/tools/bid-writing-services" } };
export default function Page() { return <CategoryPage slug="bid-writing-services" />; }

