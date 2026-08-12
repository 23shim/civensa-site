import { AuthorityPostPage, metadataFor } from "../_components/authority-posts";

const slug = "uk-public-procurement-intelligence";
export const metadata = metadataFor(slug);
export default function Page() { return <AuthorityPostPage slug={slug} />; }
