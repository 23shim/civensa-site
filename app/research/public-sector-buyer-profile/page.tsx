import { AuthorityPostPage, metadataFor } from "../_components/authority-posts";

const slug = "public-sector-buyer-profile";
export const metadata = metadataFor(slug);
export default function Page() { return <AuthorityPostPage slug={slug} />; }
