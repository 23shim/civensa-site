import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../_components/site-chrome";
import { authorityPosts } from "./_components/authority-posts";

export const metadata: Metadata = {
  title: "UK public procurement research and intelligence guides",
  description: "Evidence-led guides to UK public procurement intelligence, government contracts, pipeline notices, buyer research, awards and bid readiness.",
  alternates: { canonical: "/research" },
};

const established = [
  {tag:"Contract cycles · 8 min",title:"Why renewal signals matter before a tender is published",copy:"Turning contract dates into a disciplined, evidence-led pursuit calendar.",href:"/research/renewal-signals/"},
  {tag:"Buyer intelligence · 8 min",title:"Reading the buyer before reading the opportunity",copy:"How plans, prior awards and public documents reveal the wider buying context.",href:"/research/buyer-intelligence/"},
  {tag:"Bid readiness · 8 min",title:"Requirements are a market signal, not an admin task",copy:"Using recurring criteria and certifications to plan commercial readiness early.",href:"/research/supplier-requirements/"},
];

export default function Research(){
  const itemList = {"@context":"https://schema.org","@type":"ItemList",name:"Civensa UK public procurement research",itemListElement:authorityPosts.map((post,index)=>({"@type":"ListItem",position:index+1,name:post.title,url:`https://civensa.com/research/${post.slug}/`}))};
  return <main><SiteHeader/><PageIntro kicker="UK procurement intelligence" title="Evidence for the decisions before the bid." lead="Practical, sourced guides for understanding buyers, public contracts, notice lifecycles, routes to market and supplier readiness."/>
    <section className="research-feature shell"><div><div className="section-kicker">Start here</div><h2>{authorityPosts[0].title}</h2><p>{authorityPosts[0].description}</p><a className="button button-dark" href={`/research/${authorityPosts[0].slug}/`}>Read the definitive guide <span aria-hidden="true">↗</span></a></div><div className="research-map"><span>BUYERS</span><span>NOTICES</span><strong>C</strong><span>CONTRACTS</span><span>SUPPLIERS</span></div></section>
    <section className="content-section shell"><div className="research-section-head"><div><div className="section-kicker">Procurement Act notice guides</div><h2>Follow the commercial lifecycle.</h2></div><p>Ten connected guides, based on current official guidance and written for supplier decisions.</p></div><div className="content-grid">{authorityPosts.slice(1).map((post)=><article className="content-card" key={post.slug}><div className="tag">{post.kicker} · {post.readTime.replace(" read","")}</div><h2>{post.title}</h2><p>{post.description}</p><a href={`/research/${post.slug}/`}>Read the guide →</a></article>)}</div></section>
    <section className="content-section shell research-established"><div className="research-section-head"><div><div className="section-kicker">Civensa field notes</div><h2>Core research methods.</h2></div></div><div className="content-grid">{established.map((post)=><article className="content-card" key={post.href}><div className="tag">{post.tag}</div><h2>{post.title}</h2><p>{post.copy}</p><a href={post.href}>Read the note →</a></article>)}</div></section>
    <SiteFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemList)}}/>
  </main>;
}
