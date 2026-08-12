import { AuthorityPostPage, metadataFor } from "../_components/authority-posts";

const slug = "preliminary-market-engagement";
export const metadata = metadataFor(slug);
export default function Page() { return <AuthorityPostPage slug={slug} />; }
