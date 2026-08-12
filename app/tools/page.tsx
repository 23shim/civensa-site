import type { Metadata } from "next";
import { DirectoryIndex } from "./_components/directory";

export const metadata: Metadata = {
  title: "Public procurement tools directory",
  description: "A source-linked directory of tender alerts, procurement intelligence platforms, bid software, writing services and official portals.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() { return <DirectoryIndex />; }

