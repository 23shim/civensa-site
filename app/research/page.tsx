import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteFooter, SiteHeader } from "../_components/site-chrome";
export const metadata: Metadata = { title:"Procurement research", description:"Civensa research on UK public procurement, renewal signals, buyer intelligence and supplier requirements.", alternates:{canonical:"/research"} };
const pieces=[
 {tag:"Contract cycles · 8 min",title:"Why renewal signals matter before a tender is published",copy:"Turning contract dates into a disciplined, evidence-led pursuit calendar.",href:"/research/renewal-signals"},
 {tag:"Buyer intelligence · 8 min",title:"Reading the buyer before reading the opportunity",copy:"How plans, prior awards and public documents reveal the wider buying context.",href:"/research/buyer-intelligence"},
 {tag:"Bid readiness · 8 min",title:"Requirements are a market signal, not an admin task",copy:"Using recurring criteria and certifications to plan commercial readiness early.",href:"/research/supplier-requirements"},
 {tag:"Market structure · 6 min",title:"The four layers of procurement intelligence",copy:"A working model for connecting opportunities, organisations, contracts and requirements.",href:"/methodology"},
 {tag:"Comparison · 7 min",title:"Choosing a procurement information approach",copy:"A neutral guide to official portals, alert services, intelligence platforms and specialist advisers.",href:"/compare"},
 {tag:"Research practice · 5 min",title:"What responsible procurement prediction looks like",copy:"Why forecasts should remain qualified, sourced and open to revision.",href:"/methodology#prediction"},
];
export default function Research(){return <main><SiteHeader/><PageIntro kicker="Research library" title="Evidence for the decisions before the bid." lead="Field notes and practical frameworks for understanding buyers, contract cycles, requirements and public-sector markets."/><section className="content-section shell"><div className="content-grid">{pieces.map(p=><article className="content-card" key={p.title}><div className="tag">{p.tag}</div><h2>{p.title}</h2><p>{p.copy}</p><Link href={p.href}>Read the note →</Link></article>)}</div></section><SiteFooter/></main>}
