import type { Metadata } from "next";
import { ArticleLayout } from "../../_components/site-chrome";
import { authorityPosts, type AuthorityPost } from "./authority-content";

export type { AuthorityPost } from "./authority-content";
export { authorityPosts } from "./authority-content";

export const postBySlug = Object.fromEntries(
  authorityPosts.map((post) => [post.slug, post]),
) as Record<string, AuthorityPost>;

export function metadataFor(slug: string): Metadata {
  const post = postBySlug[slug];
  return {
    title: post.title,
    description: post.description,
    keywords: [post.kicker, "UK public procurement", "procurement intelligence", "government contracts"],
    alternates: { canonical: `/research/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://civensa.com/research/${post.slug}/`,
    },
  };
}

export function AuthorityPostPage({ slug }: { slug: string }) {
  const post = postBySlug[slug];
  const sourceById = Object.fromEntries(post.sources.map((source) => [source.id, source]));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Civensa", item: "https://civensa.com/" },
      { "@type": "ListItem", position: 2, name: "Research", item: "https://civensa.com/research/" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://civensa.com/research/${post.slug}/`,
      },
    ],
  };

  return (
    <ArticleLayout
      kicker={post.kicker}
      title={post.title}
      standfirst={post.standfirst}
      date="12 August 2026"
      datePublished="2026-08-12"
      path={`/research/${post.slug}`}
      readTime={post.readTime}
    >
      <aside className="research-method">
        <strong>Research note</strong>
        <p>
          Checked 12 August 2026. Current opportunities and dates can change. Civensa separates
          official facts, analyst interpretation and forecasts, and links the evidence used below.
        </p>
      </aside>
      <nav className="article-toc" aria-label="Article contents">
        <strong>In this guide</strong>
        <ol>
          {post.sections.map((section, index) => (
            <li key={section.heading}>
              <a href={`#section-${index + 1}`}>{section.heading}</a>
            </li>
          ))}
        </ol>
      </nav>
      {post.sections.map((section, index) => (
        <section key={section.heading} id={`section-${index + 1}`}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
          {section.note && <aside>{section.note}</aside>}
          {section.evidence && (
            <p className="section-evidence">
              <span>Evidence for this section:</span>{" "}
              {section.evidence.map((sourceId, sourceIndex) => {
                const source = sourceById[sourceId];
                if (!source) return null;
                return (
                  <span key={source.id}>
                    {sourceIndex > 0 ? " · " : ""}
                    <a href={source.url} rel="external">
                      {source.label}
                    </a>
                  </span>
                );
              })}
            </p>
          )}
        </section>
      ))}
      <section className="article-faq">
        <h2>Frequently asked questions</h2>
        {post.faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
      <section className="article-sources">
        <h2>Primary sources, reading and listening</h2>
        <p>
          We use official material for legal rules and live dates. Reports, books and podcasts add
          context. Follow the live notice and current guidance before making a commercial decision.
        </p>
        <ul>
          {post.sources.map((source) => (
            <li key={source.id}>
              <span className="source-kind">{source.kind}</span>{" "}
              <a href={source.url} rel="external">
                {source.label} ↗
              </a>
              {source.note && <small>{source.note}</small>}
            </li>
          ))}
        </ul>
      </section>
      <section className="related-research">
        <h2>Continue the research</h2>
        <div>
          {post.related.map((relatedSlug) => {
            const related = postBySlug[relatedSlug];
            return related ? (
              <a key={relatedSlug} href={`/research/${relatedSlug}/`}>
                {related.title}
                <span>Read guide →</span>
              </a>
            ) : (
              <a key={relatedSlug} href={`/research/${relatedSlug}/`}>
                {relatedSlug.replaceAll("-", " ")}
                <span>Read guide →</span>
              </a>
            );
          })}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </ArticleLayout>
  );
}
