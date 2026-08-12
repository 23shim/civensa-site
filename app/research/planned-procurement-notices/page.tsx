import { AuthorityPostPage, metadataFor } from "../_components/authority-posts";

const slug = "planned-procurement-notices";
export const metadata = metadataFor(slug);
export default function Page() { return <AuthorityPostPage slug={slug} />; }
