import type { Metadata } from "next";
import { CategoryPage } from "../_components/directory";

export const metadata: Metadata = { title: "Bid-writing and RFP response software", description: "Compare bid-writing and response software by workflow, public pricing, fit and provider-stated caveats.", alternates: { canonical: "/tools/bid-writing-software" } };
export default function Page() { return <CategoryPage slug="bid-writing-software" />; }

