import { AuthorityPostPage, metadataFor } from "../_components/authority-posts";

const slug = "bid-readiness-checklist";
export const metadata = metadataFor(slug);
export default function Page() { return <AuthorityPostPage slug={slug} />; }
