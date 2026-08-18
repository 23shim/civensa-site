import type { CategoryDefinition } from "./types";

export const categories: readonly CategoryDefinition[] = [
  {
    slug: "tender-alerts",
    name: "Tender alerts and discovery",
    shortName: "Tender alerts",
    description: "Services that collect notices, run searches or send opportunity alerts.",
    lead: "Compare strict feature evidence, named-source coverage, users, monthly prices and annual prices before replacing direct checks of official notices.",
    questions: [
      "Which official sources are included, and which are omitted?",
      "Are alerts based on keywords, categories, a company profile or a stated scoring method?",
      "Can you open the original notice and see later amendments?",
    ],
  },
  {
    slug: "procurement-intelligence",
    name: "Procurement intelligence platforms",
    shortName: "Procurement intelligence",
    description: "Platforms that add buyer, award, spend, framework or renewal context to notices.",
    lead: "Compare the underlying market, data types and commercial model. A large database is not the same as verified account intelligence.",
    questions: [
      "Does the platform distinguish observed dates from calculated or forecast dates?",
      "How are duplicate buyers, suppliers, awards and frameworks resolved?",
      "Can important claims be traced to a public record or named analyst source?",
    ],
  },
  {
    slug: "bid-writing-software",
    name: "Bid-writing and response software",
    shortName: "Bid-writing software",
    description: "Software for response libraries, RFP workflows, drafting, reviews and proposal production.",
    lead: "Compare content governance, source citation, review controls and export quality using one of your real tender packs.",
    questions: [
      "Where is customer content stored, and is it used to train shared models?",
      "Can generated text show its approved source and confidence?",
      "Does the workflow preserve compliance checks, reviewers and a clean final export?",
    ],
  },
  {
    slug: "bid-writing-services",
    name: "Bid-writing services",
    shortName: "Bid-writing services",
    description: "Consultancies offering writing, review, management, training or interim bid support.",
    lead: "Compare the named people, scope, evidence-gathering process, review stages and pricing basis for the actual bid in hand.",
    questions: [
      "Who will do the work, and may it be subcontracted?",
      "What client inputs, approvals and turnaround times are assumed?",
      "Does the fee cover compliance review, submission and post-bid learning?",
    ],
  },
  {
    slug: "official-portals",
    name: "Official procurement portals",
    shortName: "Official portals",
    description: "First-party notice, registration and submission services run for public bodies.",
    lead: "Start with the portals that publish the authoritative notice. Aggregators can save time, but the live source controls deadlines and amendments.",
    questions: [
      "Is the portal the notice source, the submission system, or both?",
      "Must a supplier register before viewing documents or responding?",
      "Does the opportunity link to a separate e-sourcing system for submission?",
    ],
  },
] as const;

