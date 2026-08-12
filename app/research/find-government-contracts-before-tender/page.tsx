import { AuthorityPostPage, metadataFor } from "../_components/authority-posts";

const slug = "find-government-contracts-before-tender";
export const metadata = metadataFor(slug);
export default function Page() { return <AuthorityPostPage slug={slug} />; }
