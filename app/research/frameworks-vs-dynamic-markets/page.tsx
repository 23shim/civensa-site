import { AuthorityPostPage, metadataFor } from "../_components/authority-posts";

const slug = "frameworks-vs-dynamic-markets";
export const metadata = metadataFor(slug);
export default function Page() { return <AuthorityPostPage slug={slug} />; }
