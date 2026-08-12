/* eslint-disable @next/next/no-html-link-for-pages -- Static export uses plain anchors to avoid an RSC prefetch runtime on GitHub Pages. */
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found on Civensa.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found shell">
        <div className="eyebrow"><span /> Error 404</div>
        <div className="not-found-grid">
          <div className="not-found-code" aria-hidden="true">404</div>
          <div>
            <h1>This page is not on the map.</h1>
            <p>The address may be outdated or mistyped. No Civensa research is published at this URL.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="/">Return home <span aria-hidden="true">→</span></a>
              <a className="text-link" href="/research">Explore the research <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
