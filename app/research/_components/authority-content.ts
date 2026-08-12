export type SourceKind =
  | "Official guidance"
  | "Policy announcement"
  | "Live agreement"
  | "Report"
  | "Book"
  | "Podcast"
  | "Event"
  | "Data";

export type Source = {
  id: string;
  kind: SourceKind;
  label: string;
  url: string;
  note?: string;
};

type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
  evidence?: string[];
};

type Faq = { question: string; answer: string };

export type AuthorityPost = {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  standfirst: string;
  readTime: string;
  sections: Section[];
  sources: Source[];
  faqs: Faq[];
  related: string[];
};

const guidanceCollection =
  "https://www.gov.uk/government/collections/procurement-act-2023-guidance-documents";
const findTender = "https://www.gov.uk/find-tender";
const gcaUpcoming = "https://www.webprod-cms.crowncommercial.gov.uk/agreements/upcoming";
const naoLifecycle =
  "https://www.nao.org.uk/insights/good-practice-guidance-for-managing-the-commercial-lifecycle/";
const ocdsAnalysis =
  "https://www.open-contracting.org/2019/11/01/what-can-ocds-data-tell-you-tips-for-analyzing-market-competition-and-other-key-aspects-of-procurement/";

export const authorityPosts: AuthorityPost[] = [
  {
    slug: "uk-public-procurement-intelligence",
    kicker: "Field guide",
    title: "UK public procurement intelligence: build the market, not another alert list",
    description:
      "A researched guide to connecting UK buyers, notices, contracts, suppliers, requirements and performance evidence into useful commercial decisions.",
    standfirst:
      "A notice tells you that something happened. Procurement intelligence tells you why it matters, what remains uncertain and which action is justified.",
    readTime: "12 min read",
    sections: [
      {
        heading: "The tender feed is only the visible edge",
        paragraphs: [
          "The National Audit Office estimates that UK public bodies spent £407 billion on procured goods and services in 2023 to 2024. That market does not appear as a neat list of open tenders. It is spread across buyer plans, pipeline notices, market engagement, competitions, awards, contracts, modifications, performance records and termination notices.",
          "An alert answers a narrow question: what was published today? A commercial team has harder questions. Is the buyer serious, is the route open to us, who already delivers the work, when does the decision move, and which evidence would make us credible? Those questions require connected records and a view of time.",
        ],
        evidence: ["nao-lifecycle", "gca-notices"],
      },
      {
        heading: "Start with six connected objects",
        paragraphs: [
          "A workable market model needs six objects. The buyer explains ownership and intent. The requirement explains the problem. The opportunity shows where the procurement sits in its lifecycle. The commercial route tells you whether access is open, gated or already closed. The contract records what was bought. The supplier record connects incumbency, partners and delivery evidence.",
          "The joins are more valuable than any single record. An award linked to its buyer plan can explain the policy objective. A contract linked to a later pipeline can expose a renewal decision. A performance notice linked to the exact lot and supplier can identify a delivery issue without turning it into gossip.",
        ],
        bullets: [
          "Buyer: legal identity, parent relationships, strategy, budget and named programme.",
          "Requirement: scope, conditions, certifications, evaluation themes and delivery measures.",
          "Opportunity: pipeline, engagement, planned procurement, tender and direct-award signals.",
          "Route: open competition, closed framework, open framework, dynamic market or another lawful route.",
          "Contract: value, term, options, changes, payment, performance and ending.",
          "Supplier: exact legal entity, role, lot, partners and public delivery record.",
        ],
        evidence: ["ocds-analysis", "cips-podcast"],
      },
      {
        heading: "Know which rulebook produced the record",
        paragraphs: [
          "The Procurement Act 2023 took effect on 24 February 2025, but it did not convert every live procurement overnight. Transitional rules preserve the earlier regime for procurements begun under it. Scotland also runs a devolved procurement regime for many purchases. A serious dataset therefore stores jurisdiction, commencement date, regulation and notice type instead of forcing every record into one modern template.",
          "Find a Tender is central to the new UK transparency model, while Contracts Finder and devolved portals still matter. Buyer websites remain essential for budgets, cabinet papers, strategies and service plans. Treat the official notice as the anchor, then add documents that explain the decision around it.",
        ],
        evidence: ["guidance", "find-tender"],
      },
      {
        heading: "Keep facts, calculations and forecasts apart",
        paragraphs: [
          "Write each statement into one of three columns. Observed means the source says it. Calculated means the result follows from stated inputs, such as adding a published contract term to a start date. Forecast means an analyst expects an event, such as a likely rebid window. Displaying those labels is more useful than hiding uncertainty behind a single confidence score.",
          "Never silently replace old values. Preserve the publication date and compare changes. A procurement that moves from a broad pipeline entry to detailed engagement is gaining definition. A date that slips twice is also information. It may point to approval, scope or route-to-market difficulty.",
        ],
        note:
          "Use a calculated expiry date as a research trigger. Do not treat it as evidence that a tender will be published.",
        evidence: ["ocds-analysis"],
      },
      {
        heading: "Use evidence to make one of five decisions",
        paragraphs: [
          "Research earns its cost when it changes a choice. A supplier can invest, monitor, partner, prepare or decline. Each outcome needs a different minimum evidence set. Investment needs buyer fit and timing. Monitoring needs a clear trigger. Partnering needs a capability gap and a credible route. Preparation needs a named requirement. Declining needs a reason that can be revisited later.",
          "This avoids a common failure in market intelligence: collecting large volumes of accurate information that never enter an account plan. Every priority record should have an owner, next review date, disconfirming evidence and a short statement of what the team will do.",
        ],
        evidence: ["aop-intelligence"],
      },
      {
        heading: "A weekly operating rhythm that stays small",
        paragraphs: [
          "On Monday, triage new notices and material contract events for named markets. On Wednesday, investigate only the few records that could change an account decision. On Friday, update actions and close weak hypotheses. Review buyer strategies and major pipelines monthly, and refresh route-to-market access quarterly.",
          "The weekly output should be a short decision log: which buyer moved, what new evidence appeared, what changed in our view, and who owns the next action? That cadence makes procurement data useful without asking a sales team to become full-time researchers.",
        ],
        bullets: [
          "Retain the source URL, title, publication date and buyer identity.",
          "Record the old and new value when a date, scope or route changes.",
          "Give each forecast an assumption and a date for review.",
          "Close records that no longer support a live decision.",
        ],
      },
      {
        heading: "What current policy makes newly visible",
        paragraphs: [
          "The 2026 commencement phases add evidence after award. Contract performance reporting began from 1 January 2026 for covered Procurement Act contracts. Payment information requirements followed from 1 April 2026 for relevant contracts. These records can show who won and how buyers manage delivery and payment.",
          "That does not make the public record complete. Missing fields, changing names and uneven publication remain normal. The Open Contracting Data Standard offers a useful discipline: identify the exact fields needed for the question before claiming that the data can answer it.",
        ],
        evidence: ["new-requirements", "ocds-analysis"],
      },
      {
        heading: "The reading that changes the method",
        paragraphs: [
          "The NAO commercial lifecycle guide draws on 200 reports covering more than 300 commercial arrangements. For suppliers, it places need, sourcing, mobilisation, performance, change and exit in the same account history.",
          "The CIPS Procurement Act podcast series frames transparency as a practical change for both practitioners and suppliers. Art of Procurement's discussion of market intelligence makes a second point: current information earns trust only when it is close enough to the decision to be acted on. Together, those ideas support a lifecycle record with dated evidence, not a static database.",
        ],
        evidence: ["nao-lifecycle", "cips-podcast", "aop-intelligence"],
      },
    ],
    sources: [
      { id: "guidance", kind: "Official guidance", label: "Procurement Act 2023 guidance collection", url: guidanceCollection },
      { id: "find-tender", kind: "Data", label: "Find a Tender", url: findTender },
      { id: "new-requirements", kind: "Official guidance", label: "New legislative requirements under the Procurement Act 2023", url: "https://www.gov.uk/government/publications/procurement-act-2023-short-guides/new-legislative-requirements-under-the-procurement-act-2023-html" },
      { id: "gca-notices", kind: "Official guidance", label: "GCA guide to the 17 Procurement Act notices", url: "https://www.gca.gov.uk/news/procurement-act-2023-notices-what-they-mean-and-how-to-use-them-procurement-essentials" },
      { id: "nao-lifecycle", kind: "Report", label: "NAO: Managing the commercial lifecycle", url: naoLifecycle, note: "Updated for the Procurement Act and based on two decades of NAO work." },
      { id: "ocds-analysis", kind: "Data", label: "Open Contracting Partnership: analysing competition and supplier participation", url: ocdsAnalysis },
      { id: "cips-podcast", kind: "Podcast", label: "CIPS Futures: Preparing for the Procurement Act", url: "https://cips-download.cips.org/podcasts/preparing-for-the-procurement-act-podcast" },
      { id: "aop-intelligence", kind: "Podcast", label: "Art of Procurement: Preserving the actionability of market intelligence", url: "https://artofprocurement.com/blog/podcast-episode424" },
    ],
    faqs: [
      { question: "What is public procurement intelligence?", answer: "It is a sourced account of buyers, requirements, routes, contracts and suppliers that supports a named commercial decision. Open tenders sit alongside uncertainty and change." },
      { question: "Is Find a Tender enough?", answer: "No. It is the official anchor for many UK records, but buyer plans, Contracts Finder, devolved portals, agreement pages and underlying documents add necessary context." },
      { question: "Can Civensa predict a rebid from a contract end date?", answer: "It can identify and qualify a review window. It should not present a rebid as certain without evidence of buyer intent." },
    ],
    related: ["find-government-contracts-before-tender", "public-sector-buyer-profile", "contract-performance-notices"],
  },
  {
    slug: "find-government-contracts-before-tender",
    kicker: "Early opportunity discovery",
    title: "How to find government contracts before the tender: a 2026 field method",
    description:
      "Find UK public-sector opportunities early using pipeline notices, market engagement, current contracts, buyer documents, framework calendars and public events.",
    standfirst:
      "Early opportunity work uses public signals to create preparation time before a formal tender compresses the response period.",
    readTime: "13 min read",
    sections: [
      {
        heading: "The buyer's decision begins before the competition",
        paragraphs: [
          "By the time a tender notice appears, a buyer may already have defined the problem, considered delivery options, tested the market, secured approvals and chosen a commercial route. A supplier beginning at that point must qualify the account, find partners and assemble evidence inside the response period.",
          "Early research helps a supplier decide whether to prepare and how to use any published engagement route fairly. It creates time without creating an entitlement to influence or shape a hidden specification.",
        ],
        evidence: ["act-pme", "nao-lifecycle"],
      },
      {
        heading: "Build a signal ladder, not one saved search",
        paragraphs: [
          "Start with the weakest but earliest evidence and move upward. Strategy and budget papers show direction. Pipeline notices show anticipated buying. Preliminary market engagement shows active discovery. A planned procurement notice can support a shorter tender period. The tender notice begins the formal competition.",
          "A signal becomes more credible when independent records agree. A pipeline entry, an expiring contract and a funded programme are stronger together than any one source. Record contradictions as well. They often reveal that a buyer is still deciding scope or timing.",
        ],
        bullets: [
          "Direction: strategy, budget, committee paper or transformation plan.",
          "Demand: pipeline notice or named commercial pipeline.",
          "Definition: preliminary market engagement and supplier questions.",
          "Timing: planned procurement notice and expected tender date.",
          "Competition: tender notice and procurement documents.",
        ],
        evidence: ["pipeline-guide", "pme-guide", "planned-guide"],
      },
      {
        heading: "Work backwards from the contract already in place",
        paragraphs: [
          "Award and contract detail notices can establish the current supplier, term, options and scope. Add modifications, performance and termination records before calculating any future window. Then ask whether the underlying service is still funded and whether policy points toward retendering, another route or insourcing.",
          "The Big Data and Analytics framework is a useful warning against simplistic expiry alerts. It expired on 8 August 2026 and will not be renewed, yet call-off contracts placed before expiry can run for up to five years where the terms allow. Framework expiry and customer contract expiry are different commercial events.",
        ],
        note:
          "Never tell a sales team that an expiring framework creates one replacement tender. Buyers may move to several routes, and existing call-offs may continue.",
        evidence: ["big-data"],
      },
      {
        heading: "Read the buyer outside the procurement portal",
        paragraphs: [
          "Cabinet papers, annual plans, digital strategies, estates plans and published business cases can explain the requirement before a commercial title settles. Search for the service outcome and programme name alongside the product category. Buyer language often changes between policy, pipeline and tender.",
          "Extract only what supports a decision: the problem, responsible team, budget status, dependency, likely timetable and source date. A large document archive is less useful than a one-page account hypothesis with explicit gaps.",
        ],
        evidence: ["nao-lifecycle"],
      },
      {
        heading: "A live framework watchlist, checked 12 August 2026",
        paragraphs: [
          "The Government Commercial Agency pipeline currently gives suppliers several near-term clocks. Network Services 4 is listed to open on 21 August. Consultancy and Professional Services is listed for 2 September. Managed Debt Collection Services is listed for 15 October. Vehicle Hire Solutions is listed for 20 August. These are planning dates, so the agreement page and Find a Tender notice must be checked before acting.",
          "Date conflicts are themselves useful. The detailed Network Services 4 page says a Find a Tender notice is estimated for August and a framework award for February 2027, while the central pipeline gives a 15 April 2027 expected live date. The sensible record keeps both statements and watches for the tender notice. It does not choose the more convenient date.",
        ],
        evidence: ["gca-upcoming", "network4"],
      },
      {
        heading: "Events are research appointments, not lead lists",
        paragraphs: [
          "Three dated events can help category teams plan public conversations. The P4H Health Procurement and Supply Chain Summit is scheduled for 29 September in Manchester. Procurex Scotland is scheduled for 29 October in Glasgow and includes a Pipeline Exchange. The GO Awards Wales ceremony is scheduled for 11 November in Cardiff, with entries closing on 9 September.",
          "Use an event to test market understanding, hear buyer language and identify public follow-up material. Do not imply that attendance provides privileged access to a procurement. Prepare three questions tied to published policy or pipeline evidence, and write a short research note afterwards.",
        ],
        evidence: ["p4h", "procurex-scotland", "go-wales"],
      },
      {
        heading: "Run a 90-day early pursuit",
        paragraphs: [
          "In days 1 to 15, verify the buyer, requirement, current contract and likely route. In days 16 to 30, decide whether the opportunity deserves a named owner. During days 31 to 60, close evidence gaps, assess partners and answer any public engagement. During days 61 to 90, prepare a bid skeleton only if the signal has strengthened.",
          "Stop when the evidence weakens. A cancelled programme, inaccessible framework, unaffordable certification or clear mismatch should release the team. Early research should reduce wasted bids as often as it creates new ones.",
        ],
        bullets: [
          "Write the reason to pursue in one sentence.",
          "Name the strongest evidence and the largest unknown.",
          "Set a date that will force a fresh bid or no-bid decision.",
          "Keep speculative value out of the committed sales forecast.",
        ],
        evidence: ["contract-ready"],
      },
      {
        heading: "The fair-contact boundary",
        paragraphs: [
          "Section 16 of the Procurement Act allows buyers to engage for purposes including developing requirements, designing procedures and building supplier capacity. It also requires steps to prevent unfair advantage and distorted competition. Suppliers should use the route the buyer publishes, answer the question asked and retain what they submitted.",
          "Outside formal engagement, public evidence can support ordinary account learning. It should not be used to ask officials for confidential information, unpublished evaluation details or a promise about the future competition.",
        ],
        evidence: ["act-pme"],
      },
    ],
    sources: [
      { id: "pipeline-guide", kind: "Official guidance", label: "Guidance: Pipeline Notice", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-plan-phase/guidance-pipeline-notice-html" },
      { id: "pme-guide", kind: "Official guidance", label: "Guidance: Preliminary Market Engagement", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-preliminary-market-engagement-html" },
      { id: "planned-guide", kind: "Official guidance", label: "Guidance: Planned Procurement Notice", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-planned-procurement-notice-html" },
      { id: "act-pme", kind: "Official guidance", label: "Procurement Act 2023, sections 16 and 17", url: "https://www.legislation.gov.uk/ukpga/2023/54/section/16" },
      { id: "gca-upcoming", kind: "Live agreement", label: "GCA upcoming agreements", url: gcaUpcoming, note: "Dates quoted here were checked on 12 August 2026." },
      { id: "network4", kind: "Live agreement", label: "Network Services 4, RM6377", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6377" },
      { id: "big-data", kind: "Live agreement", label: "Big Data and Analytics, RM6195", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6195" },
      { id: "nao-lifecycle", kind: "Report", label: "NAO: Managing the commercial lifecycle", url: naoLifecycle },
      { id: "contract-ready", kind: "Report", label: "DCMS evaluation of the Contract Readiness Programme", url: "https://www.gov.uk/government/publications/evaluation-of-the-contract-readiness-programme" },
      { id: "p4h", kind: "Event", label: "P4H Health Procurement and Supply Chain Summit 2026", url: "https://www.p4hhealthsummit.co.uk/" },
      { id: "procurex-scotland", kind: "Event", label: "Procurex Scotland 2026", url: "https://procurexscotland.co.uk/" },
      { id: "go-wales", kind: "Event", label: "GO Awards Wales 2026/27", url: "https://wales.goawards.co.uk/" },
    ],
    faqs: [
      { question: "How early can a supplier find a government opportunity?", answer: "Sometimes many months before tender through plans, pipelines or market engagement. Other requirements may have little public warning." },
      { question: "Does an expiring contract guarantee a rebid?", answer: "No. The buyer may extend, change scope, use another agreement, insource or stop the requirement." },
      { question: "Can a supplier contact the buyer before tender?", answer: "Use published engagement routes and respect the fairness rules. Public research is mainly a preparation tool, not permission to seek private procurement information." },
    ],
    related: ["pipeline-notices", "preliminary-market-engagement", "frameworks-vs-dynamic-markets"],
  },
  {
    slug: "pipeline-notices",
    kicker: "Signal guide",
    title: "Pipeline notices: how to read future demand without fooling the forecast",
    description:
      "A practical guide to UK1 pipeline notices, annual publication rules, confidence scoring, date drift and responsible sales forecasting.",
    standfirst:
      "A pipeline is a buyer's dated expectation. It is useful because it is early and imperfect, not because it is a promise.",
    readTime: "11 min read",
    sections: [
      {
        heading: "What the UK1 rule actually requires",
        paragraphs: [
          "A contracting authority expecting to spend more than £100 million on relevant procurement in a financial year must publish a pipeline notice. It covers public contracts with an estimated value above £2 million where the authority expects to publish a tender or transparency notice in the following 18 months.",
          "The annual deadline is within 56 days of 1 April, which means 26 May. Central purchasing bodies are encouraged to publish qualifying future frameworks even where the strict calculation works differently. A pipeline notice supplies advance information and does not invite a bid.",
        ],
        evidence: ["pipeline-guidance", "uk1-short"],
      },
      {
        heading: "Read the record as a dated hypothesis",
        paragraphs: [
          "Capture the buyer, description, estimated value, expected tender date, expected contract dates, classification codes and geography. Then keep the notice publication date. Without that date, an old forecast can look current long after the buyer changed its plan.",
          "The description may be broad because the commercial model is unresolved. Value may include options or many lots. Dates can move with business-case approval, budget, market feedback or a change in delivery model. The right response is to schedule the next check, not to fill the gaps with certainty.",
        ],
        note:
          "Never convert the total pipeline value into addressable revenue without lot, route and eligibility analysis.",
        evidence: ["pipeline-guidance"],
      },
      {
        heading: "Score evidence, not excitement",
        paragraphs: [
          "Use four dimensions. Intent asks whether a funded buyer document supports the need. Definition asks whether scope and route are becoming specific. Timing asks whether the date is close and stable. Access asks whether your organisation can enter the likely route. Score each separately so a large opportunity does not hide a closed route or weak evidence.",
          "A single UK1 entry might justify monitoring. Add a preliminary market engagement notice and a live incumbent contract, and preparation may be reasonable. Add a qualifying planned procurement notice, and response readiness becomes urgent because the tender period may be shortened.",
        ],
        bullets: [
          "Intent: no corroboration, strategic mention, funded programme or formal approval.",
          "Definition: category label, stated outcomes, draft scope or procurement documents.",
          "Timing: undated, broad quarter, named month or published tender date.",
          "Access: unknown, partner route, open competition or confirmed eligible agreement.",
        ],
        evidence: ["planned-guidance", "pme-guidance"],
      },
      {
        heading: "Date drift is commercial information",
        paragraphs: [
          "Keep versions side by side. A six-month slip may be harmless, but repeated movement can signal contested scope, a route change or budget pressure. A rising value may mean added lots, inflation or a different valuation method. A renamed requirement may show that buyer language has settled.",
          "Network Services 4 illustrates why one source is not enough. On 12 August 2026, the GCA pipeline listed tenders opening on 21 August and an expected live date of 15 April 2027. The detailed agreement page listed an August notice and a February 2027 framework award. Those statements describe different milestones and should coexist until the tender notice supplies firmer dates.",
        ],
        evidence: ["gca-upcoming", "network4"],
      },
      {
        heading: "Connect the notice chain by identifiers",
        paragraphs: [
          "Follow the originating notice into preliminary market engagement, planned procurement, tender, award and contract detail records. The Open Contracting ID is designed to connect releases through a contracting process. Buyer and supplier identifiers help separate similarly named organisations.",
          "Text matching alone is risky. A buyer may split one pipeline item into several lots or combine two needs. Preserve the original title and value, then record why later notices are linked. An analyst should be able to undo the relationship if stronger evidence appears.",
        ],
        evidence: ["transparency-module", "ocds-analysis"],
      },
      {
        heading: "Turn the annual pipeline season into a working calendar",
        paragraphs: [
          "Late May is a high-value review point because larger buyers publish their annual forward view. June should be used to resolve identities, compare versions and choose priority accounts. The rest of the year is for watching downstream notices and buyer documents, not waiting for the next annual dump.",
          "The GCA agreement pipeline is updated on its own schedule and includes future, planned, in-progress and recently awarded agreements. Use it as a separate commercial calendar. On 12 August 2026 it listed several late-summer and autumn openings, including Network Services 4, Consultancy and Professional Services and Managed Debt Collection Services.",
        ],
        evidence: ["gca-upcoming", "pipeline-guidance"],
      },
      {
        heading: "What a sales forecast may safely contain",
        paragraphs: [
          "A pipeline entry can support an unweighted market view and a research workload. It should enter a qualified opportunity forecast only after the team has evidence of fit, access, buyer intent and a credible share of scope. Estimated contract value is not the same as supplier revenue.",
          "Write down the conversion assumption. If the procurement is a multi-supplier framework, expected revenue may be zero even after winning a place. If it is a single-supplier contract, the full value may still include options that are never used. Honest forecasting starts with the commercial structure.",
        ],
        evidence: ["nao-efficiency"],
      },
      {
        heading: "Data quality checks before publication",
        paragraphs: [
          "Open Contracting Partnership guidance suggests checking whether the fields needed for the question are actually present. Competition analysis, for example, needs procurement method, tenderers and winning supplier identifiers. Pipeline analysis needs stable buyer identity, timing and value history.",
          "A useful pipeline product should show its gaps. Missing route, broad value and ambiguous buyer identity are not small technical issues. They determine whether a commercial conclusion is safe.",
        ],
        evidence: ["ocds-analysis"],
      },
    ],
    sources: [
      { id: "pipeline-guidance", kind: "Official guidance", label: "Guidance: Pipeline Notice", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-plan-phase/guidance-pipeline-notice-html" },
      { id: "uk1-short", kind: "Official guidance", label: "UK1, the new Pipeline Notice", url: "https://www.gov.uk/government/publications/procurement-act-2023-short-guides/uk1-the-new-pipeline-notice-html" },
      { id: "pme-guidance", kind: "Official guidance", label: "Guidance: Preliminary Market Engagement", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-preliminary-market-engagement-html" },
      { id: "planned-guidance", kind: "Official guidance", label: "Guidance: Planned Procurement Notice", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-planned-procurement-notice-html" },
      { id: "transparency-module", kind: "Official guidance", label: "Procurement Act e-learning: transparency notices", url: "https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-2-transparency" },
      { id: "gca-upcoming", kind: "Live agreement", label: "GCA upcoming agreements", url: gcaUpcoming, note: "Pipeline checked 12 August 2026." },
      { id: "network4", kind: "Live agreement", label: "Network Services 4, RM6377", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6377" },
      { id: "nao-efficiency", kind: "Report", label: "NAO: Efficiency in government procurement of common goods and services", url: "https://www.nao.org.uk/reports/efficiency-in-government-procurement-of-common-goods-and-services/" },
      { id: "ocds-analysis", kind: "Data", label: "Open Contracting Partnership: questions procurement data can answer", url: ocdsAnalysis },
    ],
    faqs: [
      { question: "Is a pipeline notice a live tender?", answer: "No. It is advance information about anticipated procurement and does not invite tenders." },
      { question: "When are mandatory pipeline notices published?", answer: "They are due within 56 days of 1 April for each relevant financial year, which is 26 May." },
      { question: "How should sales teams value a pipeline item?", answer: "Use it first for market sizing and research. Qualify route, eligibility, scope and likely revenue before putting it into a sales forecast." },
    ],
    related: ["planned-procurement-notices", "find-government-contracts-before-tender", "public-sector-buyer-profile"],
  },
  {
    slug: "preliminary-market-engagement",
    kicker: "Supplier fieldwork",
    title: "Preliminary market engagement: how to be useful before the specification hardens",
    description:
      "A supplier guide to UK preliminary market engagement, response design, fairness, SME access and current engagement signals.",
    standfirst:
      "A useful engagement response helps a buyer make a difficult choice with evidence, assumptions and trade-offs, without asking for special treatment.",
    readTime: "12 min read",
    sections: [
      {
        heading: "What the law lets the buyer learn",
        paragraphs: [
          "Section 16 of the Procurement Act allows preliminary market engagement for defined purposes. These include developing requirements, designing the procedure or award criteria, identifying capable suppliers, testing contract terms and building supplier capacity.",
          "If a buyer carries out engagement, it must publish a preliminary market engagement notice before the tender notice or explain in the tender notice why it did not. The buyer must also take steps to prevent participating suppliers gaining an unfair advantage or distorting the later competition.",
        ],
        evidence: ["act-section16", "pme-guidance"],
      },
      {
        heading: "Find the decision hidden inside the questions",
        paragraphs: [
          "A request for pricing may really test affordability. Questions on lotting may test SME access and integration risk. A request for implementation times may test whether the planned start date is credible. Read the full notice and group questions by the decision they support.",
          "Respond at that level. Give the buyer ranges, assumptions and consequences. If two delivery models are possible, explain what each costs and what risk it transfers. A flat claim that your product can do everything gives the buyer little usable evidence.",
        ],
        evidence: ["pme-guidance", "steel-guidance"],
      },
      {
        heading: "Use a five-part answer",
        paragraphs: [
          "Begin with the direct answer. State the evidence behind it. List the assumptions and units. Explain the trade-off. End with a practical next step the whole market could follow. This structure works for capacity, price, timetable, lot design and technical feasibility.",
          "Comparable evidence matters. Name the type and scale of delivery, the period measured and your role. Remove confidential customer material unless you have permission to use it. If a statement is based on an internal estimate rather than completed work, say so.",
        ],
        bullets: [
          "Answer: one sentence that resolves the question.",
          "Evidence: a relevant delivery example or market observation.",
          "Assumptions: volume, users, geography, term and dependencies.",
          "Trade-off: what becomes harder or more expensive under each option.",
          "Next step: a fair test, clarification or data point the buyer could publish.",
        ],
        evidence: ["contract-ready"],
      },
      {
        heading: "Influence the quality, not the competitive edge",
        paragraphs: [
          "A supplier can explain that a requirement is uninsurable, a timetable is not achievable or a certification excludes capable firms without improving outcomes. It can offer neutral wording and show the buyer how to test the point. It should not draft a specification that only its product can meet.",
          "Assume that material information may need to be shared with the later market. Keep your submission, attendee list and date. Do not ask for competitor responses. If a one-to-one meeting occurs, confirm the factual points in writing through the stated channel.",
        ],
        note:
          "The test is simple: would the advice still improve the procurement if your company did not win it?",
        evidence: ["act-section16"],
      },
      {
        heading: "Why engagement matters to smaller suppliers",
        paragraphs: [
          "OECD research identifies complex procedures, administrative burden and disproportionate financial or technical requirements as barriers to SME participation. Early engagement gives a buyer a chance to discover those barriers while scope, lots and conditions can still change.",
          "Current departmental action plans turn that principle into operating commitments. MHCLG set a milestone to use virtual pre-market engagement in all procurements where it adds value by 31 March 2027. The Cabinet Office and HM Treasury plan requires departments and bodies to set and report three-year direct SME spend targets.",
        ],
        evidence: ["oecd-sme", "mhclg-plan", "sme-plan"],
      },
      {
        heading: "A live example: Network Services 4",
        paragraphs: [
          "The Network Services 4 agreement page shows engagement changing the planned route. After supplier and buyer feedback, GCA revised the draft specification and introduced three critical-communications lots connected with the Emergency Services Network transition.",
          "The page lists supplier surgery sessions through 13 August 2026 and asks targeted questions on cross-lot requirements and the new lots. That is more valuable to a supplier than a generic request to introduce itself. It identifies the decisions that remain open and the date by which evidence is useful.",
        ],
        evidence: ["network4"],
      },
      {
        heading: "After engagement, run a change review",
        paragraphs: [
          "Compare the later tender with the engagement notice and your response. Which questions disappeared, which assumptions changed, and which requirements became fixed? Use the comparison to prepare for the actual competition, not to score how much influence you had.",
          "If no tender follows, search for a revised engagement, procurement termination notice, direct-award route or changed programme. Silence should reduce confidence. It should not be rewritten as a private delay that only your team understands.",
        ],
        evidence: ["termination-guidance"],
      },
      {
        heading: "Reading and listening that sharpen the response",
        paragraphs: [
          "The OECD SME report makes proportionality and accessible processes part of competition, not a favour to small firms. Peter Smith and Mark Perera's Procurement with Purpose adds a broader test: requirements should connect spend to measurable environmental and social outcomes rather than decorative policy language.",
          "The Art of Procurement episode on market intelligence argues that information must remain current and close to the decision. Applied here, that means a concise response to the buyer's live uncertainty is worth more than a long capability document assembled for every engagement.",
        ],
        evidence: ["oecd-sme", "purpose-book", "aop-intelligence"],
      },
    ],
    sources: [
      { id: "act-section16", kind: "Official guidance", label: "Procurement Act 2023, section 16", url: "https://www.legislation.gov.uk/ukpga/2023/54/section/16" },
      { id: "pme-guidance", kind: "Official guidance", label: "Guidance: Preliminary Market Engagement", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-preliminary-market-engagement-html" },
      { id: "termination-guidance", kind: "Official guidance", label: "Guidance: Procurement Termination Notices", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-procurement-termination-notices-html" },
      { id: "steel-guidance", kind: "Official guidance", label: "PPN 04/23 guidance on early steel-market engagement", url: "https://www.gov.uk/government/publications/ppn-0423-procuring-steel-in-government-contracts/ppn-0423-guidance-html" },
      { id: "sme-plan", kind: "Official guidance", label: "Cabinet Office and HM Treasury SME Action Plan 2025 to 2028", url: "https://www.gov.uk/government/publications/cabinet-office-and-hm-treasury-small-and-medium-sized-enterprise-sme-action-plan-2025-to-2028/cabinet-office-and-hm-treasury-small-and-medium-sized-enterprise-sme-action-plan-2025-to-2028" },
      { id: "mhclg-plan", kind: "Official guidance", label: "MHCLG SME Action Plan 2025 to 2028", url: "https://www.gov.uk/government/publications/mhclg-small-and-medium-enterprises-sme-action-plan-2025-to-2028/mhclg-small-and-medium-enterprises-sme-action-plan-2025-to-2028" },
      { id: "network4", kind: "Live agreement", label: "Network Services 4, RM6377", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6377", note: "Engagement page checked 12 August 2026." },
      { id: "oecd-sme", kind: "Report", label: "OECD: SMEs in Public Procurement", url: "https://www.oecd.org/en/publications/smes-in-public-procurement_9789264307476-en.html" },
      { id: "contract-ready", kind: "Report", label: "DCMS evaluation of the Contract Readiness Programme", url: "https://www.gov.uk/government/publications/evaluation-of-the-contract-readiness-programme" },
      { id: "purpose-book", kind: "Book", label: "Procurement with Purpose, Peter Smith with Mark Perera", url: "https://www.procurementwithpurpose.com/blog/procurement-with-purpose-publication-day" },
      { id: "aop-intelligence", kind: "Podcast", label: "Art of Procurement: Preserving the actionability of market intelligence", url: "https://artofprocurement.com/blog/podcast-episode424" },
    ],
    faqs: [
      { question: "Does taking part improve a later tender score?", answer: "Not automatically. Engagement is separate from evaluation, and buyers must preserve fairness in the competition." },
      { question: "Should a supplier share prices?", answer: "Answer the published question using ranges, units and assumptions where appropriate. Follow the stated process for commercially sensitive material." },
      { question: "What if we miss the engagement?", answer: "That does not normally exclude a supplier from a later open competition. Check the eventual tender notice and documents for the actual rules." },
    ],
    related: ["planned-procurement-notices", "find-government-contracts-before-tender", "bid-readiness-checklist"],
  },
  {
    slug: "planned-procurement-notices",
    kicker: "Timing guide",
    title: "Planned procurement notices: the preparation clock suppliers often miss",
    description:
      "Understand UK3 planned procurement notices, qualifying notice rules, shorter tender periods and the actions suppliers should take before competition.",
    standfirst:
      "In the qualifying timing window, a planned procurement notice can allow a buyer to shorten the later tender period.",
    readTime: "10 min read",
    sections: [
      {
        heading: "Do not confuse UK3 with a pipeline entry",
        paragraphs: [
          "A pipeline notice gives larger buyers a forward portfolio view. A planned procurement notice is tied to an intended procurement and sits before the tender notice. It may be the first public record, or it may follow a pipeline or preliminary market engagement notice.",
          "Publishing UK3 is optional. Its value to the buyer is that a qualifying notice can support a reduced tendering period. Its value to the supplier is more specific advance warning, often when the requirement and expected tender date are taking shape.",
        ],
        evidence: ["planned-guidance", "transparency-module"],
      },
      {
        heading: "The 40-day to 12-month rule",
        paragraphs: [
          "Section 15 defines a qualifying planned procurement notice as one published at least 40 days and no more than 12 months before the tender notice. Where the conditions are met, the buyer may reduce the tendering period to 10 days or more.",
          "Ten days is not automatic. The authority must still set a period that is reasonable and have regard to the covered procurement objectives, including reducing barriers faced by SMEs. Suppliers should nevertheless treat a qualifying notice as the start of their response clock, not a casual preview.",
        ],
        note:
          "The correct question is not whether the tender will definitely last 10 days. It is whether your team could respond if the buyer lawfully uses a shorter period.",
        evidence: ["planned-guidance", "act-section15"],
      },
      {
        heading: "Where UK3 is not used",
        paragraphs: [
          "Official guidance says a planned procurement notice is not used to establish a dynamic market, award under a framework or make a direct award. A buyer may publish one before a tender for a contract awarded under an existing dynamic market.",
          "This distinction changes the supplier action. If the likely route is a framework call-off, preparation begins with confirming framework access. If the buyer intends an open competition, UK3 may be a direct warning that bid documents need to be ready.",
        ],
        evidence: ["planned-guidance", "framework-module"],
      },
      {
        heading: "Read the fields as a response brief",
        paragraphs: [
          "Extract the expected tender date, scope, value, term, procedure, lots, conditions and location. Note what is missing. A broad value or unresolved lot structure may justify partner planning, but it may not justify pricing work.",
          "Compare UK3 with any earlier pipeline or engagement. A narrower scope, changed value or later start date tells you how the buyer's thinking moved. If the difference is substantial, the buyer may need to republish for the notice to retain qualifying status.",
        ],
        evidence: ["procurement-procedures"],
      },
      {
        heading: "A 48-hour, 7-day, 14-day response plan",
        paragraphs: [
          "Within 48 hours, resolve the buyer and route, identify the likely bid owner and decide whether the notice fits the target market. Within seven days, confirm partners, participation conditions and the evidence gaps that could block submission. Within 14 days, prepare the compliance matrix, case-study shortlist and clarification questions that do not depend on final tender wording.",
          "Do not draft the answer before the criteria exist. Prepare components, not invented questions. A strong readiness pack makes the live response faster while leaving room to follow the buyer's actual method.",
        ],
        bullets: [
          "Legal entity and central digital platform information checked.",
          "Likely route and supplier eligibility confirmed.",
          "Partner roles and permissions recorded.",
          "Comparable evidence indexed by outcome and contract scale.",
          "Named reviewer and bid or no-bid meeting reserved.",
        ],
        evidence: ["contract-ready"],
      },
      {
        heading: "Watch for changes that break the assumption",
        paragraphs: [
          "A planned date can move outside the qualifying window. Scope can change enough to make the notice unreliable. A buyer can stop the procurement or choose a different lawful route. Monitor the originating process in Find a Tender rather than saving the notice as a standalone PDF.",
          "A procurement termination notice may later close the chain. If a new UK3 appears, retain the earlier record and reset the timing calculation. Your readiness plan should follow the current source, not the first date copied into a CRM.",
        ],
        evidence: ["termination-guidance", "find-tender"],
      },
      {
        heading: "Why this notice changes bid economics",
        paragraphs: [
          "Short response periods reward firms that completed identity, policy, evidence and partner work before publication. They also make weak qualification expensive. A team can waste scarce writing capacity on an opportunity whose route or conditions were knowable weeks earlier.",
          "The DCMS Contract Readiness Programme evaluation is relevant beyond charities and social enterprises. It studied training intended to help organisations compete for contracts. For any supplier, readiness is a capability built before tender and tested during the live response.",
        ],
        evidence: ["contract-ready"],
      },
      {
        heading: "The legal text and the practitioner's reading",
        paragraphs: [
          "Sue Arrowsmith's work places procurement rules in their economic and policy context. That is a useful way to read UK3. The timing rule is not merely administration. It trades early transparency for the possibility of a shorter formal period.",
          "For a supplier, the operational answer is straightforward: treat the notice as credible preparation time, retain uncertainty and wait for the tender before finalising a response.",
        ],
        evidence: ["arrowsmith", "planned-guidance"],
      },
    ],
    sources: [
      { id: "planned-guidance", kind: "Official guidance", label: "Guidance: Planned Procurement Notice", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-planned-procurement-notice-html" },
      { id: "act-section15", kind: "Official guidance", label: "Procurement Act 2023, section 15", url: "https://www.legislation.gov.uk/ukpga/2023/54/section/15" },
      { id: "transparency-module", kind: "Official guidance", label: "Procurement Act e-learning: transparency", url: "https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-2-transparency" },
      { id: "procurement-procedures", kind: "Official guidance", label: "Procurement Act e-learning: procurement procedures", url: "https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-3-procurement-procedures" },
      { id: "framework-module", kind: "Official guidance", label: "Procurement Act e-learning: frameworks and dynamic markets", url: "https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-5-frameworks-and-dynamic-markets" },
      { id: "termination-guidance", kind: "Official guidance", label: "Guidance: Procurement Termination Notices", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-procurement-termination-notices-html" },
      { id: "find-tender", kind: "Data", label: "Find a Tender", url: findTender },
      { id: "contract-ready", kind: "Report", label: "DCMS evaluation of the Contract Readiness Programme", url: "https://www.gov.uk/government/publications/evaluation-of-the-contract-readiness-programme" },
      { id: "arrowsmith", kind: "Book", label: "The Law of Public and Utilities Procurement, Sue Arrowsmith", url: "https://www.nottingham.ac.uk/pprg/publications/books/the-law-of-public-and-utilities-procurement.aspx", note: "University of Nottingham overview of the book and its policy context." },
    ],
    faqs: [
      { question: "Does every procurement have a planned procurement notice?", answer: "No. Publication is optional, and the notice is not used for every commercial route." },
      { question: "Does UK3 always mean a 10-day tender?", answer: "No. A qualifying notice permits a reduction, but the buyer must still set a reasonable period and may allow longer." },
      { question: "What should a supplier do first?", answer: "Confirm buyer fit, route and eligibility, then begin evidence and partner preparation without inventing tender questions." },
    ],
    related: ["pipeline-notices", "preliminary-market-engagement", "bid-readiness-checklist"],
  },
  {
    slug: "contract-award-notices",
    kicker: "Post-award intelligence",
    title: "Contract award notices: reconstruct the deal before calling it incumbency",
    description:
      "Use UK contract award and detail notices to understand suppliers, lots, values, routes, contract terms and market competition without overclaiming.",
    standfirst:
      "An award notice names a decision. Commercial intelligence begins when you resolve what was awarded, to whom, under which route and for how long.",
    readTime: "12 min read",
    sections: [
      {
        heading: "UK6 and UK7 answer different questions",
        paragraphs: [
          "Under the Procurement Act sequence, the contract award notice signals an authority's intention to enter into a public contract and supports the standstill process where applicable. The contract details notice follows once the contract has been entered into and confirms the contractual record.",
          "A useful award model keeps both. The first tells you the selected supplier and proposed award. The second can confirm contract dates, value and required KPI information. Later changes, performance and termination belong to the same process.",
        ],
        evidence: ["award-guidance", "details-guidance"],
      },
      {
        heading: "Reconstruct the commercial shape",
        paragraphs: [
          "Start with the exact buyer and supplier legal entities. Then capture contract title, lot, award method, value, term, options, procedure, framework or dynamic-market reference and procurement identifier. Read the attached documents where publication rules and redactions allow.",
          "Do not use the headline value until you understand its basis. Framework ceilings, multi-lot totals, optional extensions and estimated call-off spend answer different questions. A £1 billion framework is not £1 billion of revenue for every appointed supplier.",
        ],
        bullets: [
          "Who entered the contract, including joint buyers and supplier entities?",
          "What scope and lot did the award cover?",
          "Was it an open competition, call-off or direct award?",
          "Which dates are contractual and which are estimates?",
          "Does the value include VAT, options or all suppliers?",
          "Which later notices modify the original position?",
        ],
        evidence: ["details-guidance"],
      },
      {
        heading: "Incumbent is a role, not a permanent label",
        paragraphs: [
          "Call a supplier the incumbent only for the named service, contract and period supported by the record. A parent company award does not automatically prove which subsidiary delivers. A framework appointment does not prove a customer call-off. A subcontractor mention does not make that firm the prime supplier.",
          "Entity resolution matters because company names, trading styles, mergers and consortiums change. Keep the authoritative identifier and the source spelling. Add corporate relationships separately so that an analyst can see what was observed and what was resolved.",
        ],
        note:
          "Award history can show a purchasing pattern. It does not prove favouritism or predict the next result.",
        evidence: ["ocds-analysis"],
      },
      {
        heading: "Framework expiry does not end every contract",
        paragraphs: [
          "Big Data and Analytics RM6195 expired on 8 August 2026 and GCA says it will not be renewed. Its page also says call-offs placed before expiry may last up to five years where the agreement and call-off documents allow.",
          "Renewal research must follow customer contracts as well as the parent framework. A buyer can continue receiving services long after new call-offs close. The future route may also fragment across several agreements instead of producing a single replacement.",
        ],
        evidence: ["big-data"],
      },
      {
        heading: "Measure the market with fields that can support it",
        paragraphs: [
          "Award data can help estimate supplier concentration, buyer activity and category value. Competition questions require tender data too: procurement method, number of tenderers, tenderer identities and winning supplier. If those fields are missing, report the limitation instead of creating a precise league table.",
          "Open Contracting Partnership lists practical measures such as single-bid share, average bids per tender, supplier success rate and concentration by item. Those measures are more informative when buyers and suppliers have stable identifiers and category coding is checked.",
        ],
        evidence: ["ocds-analysis"],
      },
      {
        heading: "Competition is not guaranteed by publication",
        paragraphs: [
          "The NAO notes that competition can support efficiency, quality and innovation, while weak competition can lead to higher prices and poorer outcomes. It also found a profusion of public frameworks and called for better data, transparency and competition in central purchasing.",
          "For suppliers, the practical test is buyer usage. Count contracts actually awarded through an agreement as well as suppliers admitted to it. A long supplier list can coexist with concentrated call-off spend.",
        ],
        evidence: ["nao-competition", "nao-efficiency"],
      },
      {
        heading: "A seven-step award review",
        paragraphs: [
          "Begin by resolving the entities and linking the contracting process. Read the scope, normalise the value, calculate contractual milestones and attach later notices before writing the account implication. Keep that last step short and conditional.",
          "Examples of useful implications are narrow: the buyer has chosen a four-year managed service; the supplier is appointed to lot two; the contract includes a two-year option; or the route remains available to these listed buyers. Avoid claims about satisfaction, relationship quality or likely renewal unless another source supports them.",
        ],
        bullets: [
          "Create a review date before any extension decision window.",
          "Watch modifications and performance notices for the exact contract.",
          "Map recurring requirements to your evidence library.",
          "Record what would disprove the expected renewal scenario.",
        ],
        evidence: ["nao-lifecycle"],
      },
      {
        heading: "Why the contract itself deserves attention",
        paragraphs: [
          "An Art of Procurement discussion on digital contract management treats contracts as an operational source rather than an archive. The public-sector equivalent is to connect the published contract and its notices to obligations, dates and performance.",
          "That reading guards against a common mistake: extracting the supplier and value from UK6, then ignoring the contractual life that follows. The richer insight often appears later, when the buyer changes, measures or ends the arrangement.",
        ],
        evidence: ["aop-contracts", "nao-lifecycle"],
      },
    ],
    sources: [
      { id: "award-guidance", kind: "Official guidance", label: "Guidance: Contract Award Notices and Standstill", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-contract-award-notices-and-standstill-html" },
      { id: "details-guidance", kind: "Official guidance", label: "Guidance: Contract Details Notices", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-contract-details-notices-html" },
      { id: "big-data", kind: "Live agreement", label: "Big Data and Analytics, RM6195", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6195", note: "Expired 8 August 2026; page checked 12 August 2026." },
      { id: "nao-competition", kind: "Report", label: "NAO: Competition in public procurement, lessons learned", url: "https://www.nao.org.uk/insights/competition-in-public-procurement-lessons-learned/" },
      { id: "nao-efficiency", kind: "Report", label: "NAO: Efficiency in government procurement of common goods and services", url: "https://www.nao.org.uk/reports/efficiency-in-government-procurement-of-common-goods-and-services/" },
      { id: "nao-lifecycle", kind: "Report", label: "NAO: Managing the commercial lifecycle", url: naoLifecycle },
      { id: "ocds-analysis", kind: "Data", label: "Open Contracting Partnership: analysing procurement competition", url: ocdsAnalysis },
      { id: "aop-contracts", kind: "Podcast", label: "Art of Procurement: Contracting for Speed", url: "https://artofprocurement.com/blog/podcast-contracting-for-speed-how-orchestration-empowers-procurement" },
    ],
    faqs: [
      { question: "Is a contract award notice the final contract record?", answer: "Not by itself. Link it to the contract details notice and any later change, performance or termination notices." },
      { question: "Does a framework award show supplier revenue?", answer: "No. Appointment creates access. Revenue depends on customer call-offs and the agreement's award method." },
      { question: "Can award history predict the next winner?", answer: "It can inform research on incumbency and buyer behaviour, but it cannot establish the next result." },
    ],
    related: ["contract-performance-notices", "frameworks-vs-dynamic-markets", "public-sector-buyer-profile"],
  },
  {
    slug: "contract-performance-notices",
    kicker: "Delivery intelligence",
    title: "Contract performance notices: the public record now continues after award",
    description:
      "Understand the 2026 UK contract performance regime, KPI ratings, breach notices, payment data and responsible incumbent research.",
    standfirst:
      "The award answers who won. Performance notices can now show how delivery is assessed, where serious problems arise and which measures matter to the buyer.",
    readTime: "13 min read",
    sections: [
      {
        heading: "The 2026 commencement changed the evidence",
        paragraphs: [
          "Section 71 contract performance requirements commenced on 1 January 2026 for covered contracts awarded under the Procurement Act. Authorities must assess and publish performance against relevant KPIs at least once in each 12-month period and when the contract ends.",
          "The notice also records specified breach and poor-performance events. This is a new public layer between contract entry and termination. It gives suppliers evidence about delivery, but only when the statutory trigger and publication duty apply.",
        ],
        evidence: ["performance-guidance", "new-requirements"],
      },
      {
        heading: "Periodic KPI reporting has a defined scope",
        paragraphs: [
          "The KPI publication duty generally concerns public contracts above £5 million where section 52 requires KPIs. The current guidance says the regime expands earlier central-government policy to the majority of contracts above that value. Exemptions and cases where performance cannot appropriately be assessed by KPI still matter.",
          "Each public rating is one of five terms: good, approaching target, requires improvement, inadequate or other. Buyers may use a more detailed internal scale, but the notice maps the public assessment to these categories.",
        ],
        evidence: ["performance-guidance", "kpi-guidance"],
      },
      {
        heading: "Breach and poor performance are different triggers",
        paragraphs: [
          "A notice is required for a breach that results in partial termination, damages or a settlement agreement. It is also required where the authority considers performance unsatisfactory, gives the supplier a proper opportunity to improve, and the supplier fails to do so. Full termination is reported through a contract termination notice.",
          "The current short guide states that breach or failed-improvement notices are due within 30 days of the event. This part of section 71 applies more widely than annual KPI reporting, including to most public contracts, frameworks and concessions.",
        ],
        evidence: ["performance-guidance", "governance-module"],
      },
      {
        heading: "Read the assessment before judging the supplier",
        paragraphs: [
          "Resolve the exact contract, lot, supplier and assessment period. Read the KPI definition, target and buyer wording. Then look for later notices showing improvement, continued failure, modification or termination. A single rating can be important without representing the supplier's whole business.",
          "Do not infer fraud, financial distress or general incompetence from operational performance. Quote sparingly and link the original notice. If you add analysis, make the inference and its limits visible.",
        ],
        note:
          "The responsible unit of analysis is supplier plus contract plus period, not supplier alone.",
        evidence: ["performance-guidance"],
      },
      {
        heading: "Use the record to understand the buyer",
        paragraphs: [
          "A KPI set reveals what the buyer chose to make measurable. Repeated measures across contracts can show persistent priorities such as mobilisation, availability, response time, data quality or social-value delivery.",
          "Challengers should translate those priorities into evidence, not competitor attack lines. An incumbent can compare its own records with the buyer's published assessment. Partners can use serious, repeated events as a due-diligence trigger, then investigate the full context.",
        ],
        evidence: ["nao-lifecycle", "supplier-development"],
      },
      {
        heading: "Add payment evidence from April 2026",
        paragraphs: [
          "Section 70 payment information commenced from 1 April 2026 for relevant Procurement Act contracts outside the stated Welsh exception. Authorities publish information about individual payments above £30,000. Payment compliance reporting also provides aggregate evidence such as average invoice payment time.",
          "Payment data does not prove contract health by itself. It can, however, help distinguish a live spending relationship from a dormant award and support analysis of mobilisation or run rate when the data is complete enough.",
        ],
        evidence: ["new-requirements", "payment-guidance", "dwp-procurement"],
      },
      {
        heading: "Build a renewal view from delivery, not expiry alone",
        paragraphs: [
          "Start with contract dates and options. Add KPI history, breach notices, payment activity, modifications and buyer strategy. Then write several scenarios: extend, compete again, change route, reduce scope or end the service. Assign evidence for and against each.",
          "A poor rating does not guarantee displacement. The buyer may remediate, modify or extend. Consistently good ratings do not guarantee renewal either. Policy, budget and route can still change. Performance improves the forecast because it adds observed delivery evidence, not because it settles the outcome.",
        ],
        evidence: ["nao-lifecycle"],
      },
      {
        heading: "The management literature points in the same direction",
        paragraphs: [
          "The NAO's 2025 lifecycle guide draws on more than 300 commercial arrangements and treats timely management information, accountability and transition as parts of one discipline. It follows value from competition through delivery.",
          "An Art of Procurement discussion on supplier development makes a related point. Performance management should create a specific improvement path instead of a list of complaints. Suppliers reading public performance records should examine the measure, remedy and time allowed around any negative label.",
        ],
        evidence: ["nao-lifecycle", "supplier-development"],
      },
    ],
    sources: [
      { id: "performance-guidance", kind: "Official guidance", label: "Guidance: Contract Performance Notices", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-manage-phase/guidance-contract-performance-notices-html", note: "Updated 20 July 2026." },
      { id: "kpi-guidance", kind: "Official guidance", label: "Guidance: Key Performance Indicators", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-manage-phase/guidance-key-performance-indicators-html" },
      { id: "new-requirements", kind: "Official guidance", label: "New legislative requirements under the Procurement Act 2023", url: "https://www.gov.uk/government/publications/procurement-act-2023-short-guides/new-legislative-requirements-under-the-procurement-act-2023-html" },
      { id: "governance-module", kind: "Official guidance", label: "Procurement Act e-learning: contract governance", url: "https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-9-contract-governance" },
      { id: "payment-guidance", kind: "Official guidance", label: "Procurement Act manage-phase guidance", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-manage-phase" },
      { id: "dwp-procurement", kind: "Data", label: "DWP procurement publication approach", url: "https://www.gov.uk/government/organisations/department-for-work-pensions/about/procurement" },
      { id: "nao-lifecycle", kind: "Report", label: "NAO: Managing the commercial lifecycle", url: naoLifecycle },
      { id: "supplier-development", kind: "Podcast", label: "Art of Procurement: Defining and Delivering on Supplier Development", url: "https://artofprocurement.com/blog/podcast-episode286" },
    ],
    faqs: [
      { question: "Do all public contracts have performance notices?", answer: "No. Coverage depends on the contract, the Procurement Act provisions and whether a relevant KPI or performance event triggers publication." },
      { question: "Does no notice mean good performance?", answer: "No. Absence is not evidence of a positive or negative outcome." },
      { question: "Can a challenger cite a competitor's notice?", answer: "Public facts can be used with exact contract context and a source link. Avoid broad claims about the supplier or unsupported allegations." },
    ],
    related: ["contract-award-notices", "public-sector-buyer-profile", "uk-public-procurement-intelligence"],
  },
  {
    slug: "frameworks-vs-dynamic-markets",
    kicker: "Route strategy",
    title: "Frameworks, open frameworks and dynamic markets: where can a supplier still enter?",
    description:
      "Compare closed frameworks, Procurement Act open frameworks and dynamic markets using current GCA examples, expiry risks and a practical access strategy.",
    standfirst:
      "The commercial question is not which route sounds most flexible. It is whether you can enter, how contracts are awarded and whether buyers actually use it.",
    readTime: "14 min read",
    sections: [
      {
        heading: "Three routes, three entry patterns",
        paragraphs: [
          "A conventional framework appoints suppliers for a fixed term and sets rules for later call-offs. Once awarded, a supplier normally cannot join that framework. An open framework is a Procurement Act scheme of successive frameworks on substantially the same terms, reopened at stated intervals.",
          "A dynamic market is not itself a contract. Eligible suppliers can apply while it operates, subject to its conditions, and buyers run procurements through it. Admission to any route is separate from winning customer work.",
        ],
        evidence: ["framework-module", "framework-guidance", "dynamic-guidance"],
      },
      {
        heading: "Ask seven questions before counting access",
        paragraphs: [
          "Read the establishing notice and documents alongside the agreement title. Confirm eligible buyers, geographic scope, categories, admission conditions, reopening dates, award procedure and evidence of actual use.",
          "Then test internal readiness. An open door is of little use if certifications, insurance, financial standing or references cannot be ready by the admission date. Conversely, a closed framework may still offer subcontracting routes that deserve a deliberate partner strategy.",
        ],
        bullets: [
          "Can a new supplier apply now, at a future reopening, or not at all?",
          "Which lots match the service actually sold?",
          "Is customer award direct, competitive or both?",
          "Are prices capped at framework level?",
          "Which buyers have placed contracts through the route?",
          "When do supplier evidence and catalogue entries need renewal?",
          "What happens to call-offs after the parent agreement ends?",
        ],
        evidence: ["framework-guidance", "dynamic-guidance"],
      },
      {
        heading: "DOS7 shows how an open framework reopens",
        paragraphs: [
          "Digital Outcomes and Specialists 7 began on 30 January 2026 under the Procurement Act. GCA says the scheme runs for six years and reopens every 18 months. The first framework is listed to end on 29 July 2027, and an update dated 7 August 2026 points suppliers to planning for the second opening.",
          "That creates a different account plan from a closed four-year framework. A supplier that missed the first opening can build the required delivery evidence for the next. An appointed supplier still needs to compete for customer work; a place is not revenue.",
        ],
        evidence: ["dos7"],
      },
      {
        heading: "Tactical Communications shows a longer scheme",
        paragraphs: [
          "Tactical Communication Systems RM6393 started on 26 June 2026. Its first framework runs to 25 June 2029, while the open framework scheme is described as lasting eight years and reopening twice.",
          "Open frameworks do not share one reopening interval. Suppliers must record the scheme length, each framework term and the actual reopening plan. Missing one date can mean waiting years.",
        ],
        evidence: ["tactical"],
      },
      {
        heading: "The August 2026 watchlist",
        paragraphs: [
          "Big Data and Analytics expired on 8 August and is not being renewed. Digital Outcomes 6 expired on 27 June and has been replaced by DOS7. Network Services 3 remains available into 2027 while Network Services 4 is listed to open on 21 August 2026. These overlapping dates show why route mapping cannot be reduced to a replacement-name field.",
          "G-Cloud 15 is listed with an expected award date of 6 August 2026, but its detailed page still presents the award as an estimated timeline. Suppliers should confirm live status and the published supplier list before describing it as available.",
        ],
        note:
          "Current agreement dates were checked on 12 August 2026. GCA states that upcoming dates are approximate.",
        evidence: ["big-data", "dos6", "network3", "network4", "gcloud15", "gca-upcoming"],
      },
      {
        heading: "Framework value is not supplier revenue",
        paragraphs: [
          "The NAO reported £125 billion a year of common public-sector goods and services and about £25 billion spent through CCS frameworks in 2022 to 2023. It also warned about a profusion of frameworks, variable quality and the need for better data and competition.",
          "A supplier should therefore measure route health through customer call-offs, lot concentration, competition frequency and win rate. Appointment totals and ceiling values are weak substitutes for actual buying behaviour.",
        ],
        evidence: ["nao-efficiency", "ocds-analysis"],
      },
      {
        heading: "A portfolio rule for scarce bid capacity",
        paragraphs: [
          "Classify each route as enter now, prepare for reopening, partner only, monitor call-offs or exit. Give it an owner and next event. Remove agreement badges that have no buyer, category or action behind them.",
          "Balance route access with open-market opportunities. If most target buyers use a closed agreement you missed, partnership may deserve more effort than tender alerts. If a dynamic market remains open but generates few relevant contracts, admission work may rank below a coming open-framework window.",
        ],
        evidence: ["nao-efficiency"],
      },
      {
        heading: "What the framework literature adds",
        paragraphs: [
          "The Law and Economics of Framework Agreements examines how design choices affect competition and later outcomes. The practical supplier reading is that competition at entry and competition at call-off are separate moments.",
          "The Procurement Act's open-framework design changes the entry moment by scheduling successive frameworks. It does not remove the need to study call-off rules, buyer use or market concentration.",
        ],
        evidence: ["framework-book", "framework-module"],
      },
    ],
    sources: [
      { id: "framework-guidance", kind: "Official guidance", label: "Guidance: Frameworks", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-frameworks-html" },
      { id: "dynamic-guidance", kind: "Official guidance", label: "Guidance: Dynamic Markets", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-dynamic-markets-html" },
      { id: "framework-module", kind: "Official guidance", label: "Procurement Act e-learning: frameworks and dynamic markets", url: "https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-5-frameworks-and-dynamic-markets" },
      { id: "gca-upcoming", kind: "Live agreement", label: "GCA upcoming agreements", url: gcaUpcoming },
      { id: "dos7", kind: "Live agreement", label: "Digital Outcomes and Specialists 7, RM1043.9", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM1043.9" },
      { id: "tactical", kind: "Live agreement", label: "Tactical Communication Systems, RM6393", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6393" },
      { id: "big-data", kind: "Live agreement", label: "Big Data and Analytics, RM6195", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6195" },
      { id: "dos6", kind: "Live agreement", label: "Digital Outcomes 6, RM1043.8", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM1043.8" },
      { id: "network3", kind: "Live agreement", label: "Network Services 3, RM6116", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6116" },
      { id: "network4", kind: "Live agreement", label: "Network Services 4, RM6377", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM6377" },
      { id: "gcloud15", kind: "Live agreement", label: "G-Cloud 15, RM1557.15", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM1557.15" },
      { id: "nao-efficiency", kind: "Report", label: "NAO: Efficiency in government procurement of common goods and services", url: "https://www.nao.org.uk/reports/efficiency-in-government-procurement-of-common-goods-and-services/" },
      { id: "ocds-analysis", kind: "Data", label: "Open Contracting Partnership: analysing competition", url: ocdsAnalysis },
      { id: "framework-book", kind: "Book", label: "The Law and Economics of Framework Agreements, chapter on competition", url: "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/E0EFB9E896311982ACFE26649FEFA31D/9781139939584c7_p157-178_CBO.pdf/promoting_effective_competition_and_enhancing_outcomes_in_framework_agreements.pdf" },
    ],
    faqs: [
      { question: "Can a supplier join a framework after award?", answer: "A conventional framework normally closes after award. An open framework has scheduled successor frameworks that permit new competition." },
      { question: "Can a supplier join a dynamic market later?", answer: "Eligible suppliers can apply while the dynamic market operates, subject to its conditions." },
      { question: "Does admission guarantee work?", answer: "No. Admission and customer contract award are separate events." },
    ],
    related: ["contract-award-notices", "bid-readiness-checklist", "find-government-contracts-before-tender"],
  },
  {
    slug: "public-sector-buyer-profile",
    kicker: "Account intelligence",
    title: "Build a public-sector buyer profile that can survive a sales meeting",
    description:
      "A practical method for resolving UK public buyers and connecting strategy, budgets, pipelines, contracts, suppliers, requirements and performance.",
    standfirst:
      "A buyer profile should explain what the organisation needs, how it buys, who already delivers and what evidence would change your account plan.",
    readTime: "13 min read",
    sections: [
      {
        heading: "Begin with a decision, not a biography",
        paragraphs: [
          "A market-selection profile asks whether the buyer is worth pursuing. A renewal profile asks what may happen to a named contract. A live-pursuit profile asks how to answer a stated requirement. Write that decision at the top before collecting evidence.",
          "This prevents the familiar buyer dossier filled with an address, a generic mission statement and old spend figures. Every field should either support the decision, expose uncertainty or set the next research action.",
        ],
        evidence: ["aop-governance"],
      },
      {
        heading: "Resolve the organisation before adding spend",
        paragraphs: [
          "Public bodies publish under departments, agencies, NHS organisations, councils, schools, shared services and predecessor names. Trading styles and procurement agents add more ambiguity. Record the authoritative organisation name, Public Procurement Organisation Number where available, domain and parent relationship.",
          "Keep uncertain matches separate. A false join can transfer a contract, incumbent or requirement to the wrong account. The April 2026 below-threshold identifier requirement improves future records because relevant award notices must include the supplier's unique identifier, but historic data still needs care.",
        ],
        note:
          "A smaller profile built on verified entities is better than a large profile built on name similarity.",
        evidence: ["new-requirements", "cdp-guidance"],
      },
      {
        heading: "Build four linked dossiers",
        paragraphs: [
          "The first dossier is why: mandate, strategy, budget, policy and named programmes. The second is how: procurement thresholds, preferred agreements, pipelines and procedures. The third is who: current suppliers, partners and responsible public teams. The fourth is when: contract terms, options, planned notices and decision windows.",
          "Keep source dates visible. A strategy may run for five years while a budget changes annually. An old award may still be live through extension. A pipeline date may move. The profile needs its own change history rather than one last-updated label.",
        ],
        bullets: [
          "Why: the outcome the buyer is accountable for.",
          "How: routes, lots, participation conditions and evaluation patterns.",
          "Who: exact buyer entities, suppliers and publicly named roles.",
          "When: observed dates, calculated milestones and forecast review windows.",
        ],
        evidence: ["nao-lifecycle", "guidance"],
      },
      {
        heading: "Read documents for intent, not decoration",
        paragraphs: [
          "A digital strategy can explain why cloud, data or service redesign will be bought. An estates plan can precede construction, facilities or energy work. Cabinet and committee papers may record approval, options and budget dependencies. Search for the service problem and programme name, then follow procurement language as it develops.",
          "Extract the statement, page or section that supports the conclusion. A broad policy aspiration is not proof of a tender. Pair it with pipeline, engagement or contract evidence before raising opportunity confidence. The government's 18 June 2026 announcement on moving away from outsourcing by default is a good example: it raises an account-level question about future service delivery, but it does not decide the fate of any named contract.",
        ],
        evidence: ["nao-lifecycle", "insourcing-news"],
      },
      {
        heading: "Make award history specific",
        paragraphs: [
          "Summarise the buyer's awards by category, route, supplier and time period. Separate framework appointments from customer call-offs. Record whether a value covers one contract, all lots or an estimated ceiling.",
          "Repeated awards can show a purchasing pattern. They do not establish a hidden preference. Describe what happened and the sample period, then state the limits. This language is both safer and more useful than a claim that the buyer always chooses one type of firm.",
        ],
        evidence: ["ocds-analysis", "nao-competition"],
      },
      {
        heading: "Turn requirements into a readiness map",
        paragraphs: [
          "Across earlier tenders and buyer documents, record recurring participation conditions, certifications, delivery measures, social-value themes and evidence requests. Mark each as current, recurring or unique to one procurement.",
          "That distinction stops a team from preparing for the last tender instead of the next. It also reveals longer-lead gaps. If a target buyer repeatedly buys through an agreement that requires a certification you lack, the profile should create a dated readiness decision.",
        ],
        evidence: ["conditions-guidance", "purpose-book"],
      },
      {
        heading: "Score the account with disconfirming evidence",
        paragraphs: [
          "Use a short scorecard for fit, accessible spend, timing, evidence strength and cost to become ready. For each positive statement, write one fact that would reduce the score. Examples include a move to insourcing, an inaccessible route, a long extension or a programme losing funding.",
          "Review high-priority profiles when material evidence changes, not on an arbitrary annual cycle. A new pipeline, performance notice, budget or framework opening should update the relevant dossier and the account action.",
        ],
        evidence: ["aop-intelligence"],
      },
      {
        heading: "People and privacy",
        paragraphs: [
          "Use named contacts only where the role is public and relevant. Record the source, role and date. Avoid collecting personal details that are not needed for a legitimate business purpose, and do not infer private influence from attendance at an event or mention in a document.",
          "The buyer profile is an organisational research asset. It should help a supplier choose public, fair engagement channels and understand the buyer's published priorities. It should not become a speculative map of individuals.",
        ],
      },
      {
        heading: "The research ideas behind the model",
        paragraphs: [
          "The Open Contracting Data Standard treats buyer, tender, award, contract and implementation as related releases. The NAO lifecycle guide adds the operating reality that commercial decisions continue through mobilisation, management and exit.",
          "Art of Procurement's 2026 discussion of supply-chain visibility offers a useful warning: more information is only the starting point. A profile needs a way to decide which exposure or opportunity matters, otherwise it becomes another dashboard nobody acts on.",
        ],
        evidence: ["ocds-analysis", "nao-lifecycle", "aop-resilience"],
      },
    ],
    sources: [
      { id: "guidance", kind: "Official guidance", label: "Procurement Act 2023 guidance collection", url: guidanceCollection },
      { id: "new-requirements", kind: "Official guidance", label: "New legislative requirements under the Procurement Act 2023", url: "https://www.gov.uk/government/publications/procurement-act-2023-short-guides/new-legislative-requirements-under-the-procurement-act-2023-html" },
      { id: "cdp-guidance", kind: "Official guidance", label: "Central digital platform and publication guidance", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-central-digital-platform-and-publication-of-information-html" },
      { id: "conditions-guidance", kind: "Official guidance", label: "Guidance: Conditions of Participation", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-conditions-of-participation-html" },
      { id: "nao-lifecycle", kind: "Report", label: "NAO: Managing the commercial lifecycle", url: naoLifecycle },
      { id: "nao-competition", kind: "Report", label: "NAO: Competition in public procurement", url: "https://www.nao.org.uk/insights/competition-in-public-procurement-lessons-learned/" },
      { id: "insourcing-news", kind: "Policy announcement", label: "Government announcement on moving away from outsourcing by default", url: "https://www.gov.uk/government/news/ambition-to-end-era-of-outsourcing-by-default-as-government-looks-to-bring-cleaners-and-security-staff-in-house", note: "Published 18 June 2026. Treat as policy direction until a buyer publishes its own decision." },
      { id: "ocds-analysis", kind: "Data", label: "Open Contracting Partnership: analysing market competition", url: ocdsAnalysis },
      { id: "purpose-book", kind: "Book", label: "Procurement with Purpose, Peter Smith with Mark Perera", url: "https://www.procurementwithpurpose.com/blog/procurement-with-purpose-publication-day" },
      { id: "aop-governance", kind: "Podcast", label: "Art of Procurement: A simple sourcing governance process", url: "https://artofprocurement.com/blog/podcast-episode326" },
      { id: "aop-intelligence", kind: "Podcast", label: "Art of Procurement: Preserving the actionability of market intelligence", url: "https://artofprocurement.com/blog/podcast-episode424" },
      { id: "aop-resilience", kind: "Podcast", label: "Art of Procurement: Building resilience beyond tier one", url: "https://artofprocurement.com/blog/podcast-building-resilience-beyond-tier-one-hard-truths-about-risk-and-visibility" },
    ],
    faqs: [
      { question: "What belongs in a public-sector buyer profile?", answer: "Verified identity, objectives, routes, pipeline, awards, contracts, suppliers, recurring requirements, dates, evidence gaps and a named commercial decision." },
      { question: "How often should it be updated?", answer: "Update it when material evidence changes and schedule additional reviews around known budgets, pipelines, framework openings and contract decisions." },
      { question: "Can award history prove buyer preference?", answer: "No. It can show observed patterns for a stated period. Claims about preference need stronger evidence and careful wording." },
    ],
    related: ["uk-public-procurement-intelligence", "contract-award-notices", "pipeline-notices"],
  },
  {
    slug: "bid-readiness-checklist",
    kicker: "Readiness programme",
    title: "Public-sector bid readiness in 2026: a 12-week evidence plan",
    description:
      "Prepare for UK public tenders with current thresholds, supplier identifiers, participation conditions, social value, carbon plans, evidence rights and route access.",
    standfirst:
      "Bid readiness means proving identity, capacity and relevant delivery within the response period a buyer actually sets.",
    readTime: "15 min read",
    sections: [
      {
        heading: "First, know whether the threshold is crossed",
        paragraphs: [
          "From 1 January 2026 to 31 December 2027, the main Procurement Act thresholds include £135,018 for central-government goods and services, £207,720 for sub-central goods and services, £415,440 for utility goods and services, and £5,193,000 for works and concession contracts. The official figures include VAT.",
          "Threshold analysis belongs to the buyer, but suppliers need it to understand the likely regime and notice trail. Defence and security goods and services use £415,440, while relevant defence works and concessions use £5,193,000. Always check the current guidance and contract type.",
        ],
        evidence: ["thresholds", "ppn-thresholds"],
      },
      {
        heading: "Make the legal entity boring",
        paragraphs: [
          "Keep company name, number, registered address, ownership, accounts, insurance, tax information and exclusion declarations current. Register and maintain required supplier information on the central digital platform. Check that portals and partners use the same legal entity.",
          "From 1 April 2026, relevant notifiable below-threshold contract details notices must include the awarded supplier's unique identifier. The thresholds for those notices remain £12,000 for central government and NHS bodies and £30,000 for sub-central authorities. Accurate identity now matters across more of the public record.",
        ],
        evidence: ["cdp-guidance", "new-requirements"],
      },
      {
        heading: "Separate participation from scoring",
        paragraphs: [
          "Conditions of participation test whether a supplier has the legal and financial capacity or technical ability to perform. Award criteria compare tenders. Confusing the two leads teams to polish a response that cannot pass the gate, or to submit generic policies where scored evidence is required.",
          "Build a market-level conditions map from recent, comparable procurements. Mark each requirement as common, buyer-specific or contract-specific. Check proportionality and the official documents rather than assuming the last tender set a permanent rule.",
        ],
        evidence: ["conditions-guidance"],
      },
      {
        heading: "Track the current policy tests",
        paragraphs: [
          "The procurement policy note collection is a live readiness source. Current notes cover social value, open-book contract management, reserving below-threshold opportunities, carbon reduction plans, modern slavery, commercial playbooks and government security classifications.",
          "Do not turn each note into a policy PDF. Identify whether it applies to your target buyers and contracts, then connect it to operational proof. A carbon plan needs governed emissions data. Modern-slavery statements need supply-chain due diligence. Social value needs a delivery owner, baseline and measurement method. A 19 June 2026 government announcement also points suppliers in key sectors to new national-security procurement guidance, which should trigger a review of ownership, supply-chain and information evidence where relevant.",
        ],
        bullets: [
          "PPN 002: current social-value model and application.",
          "PPN 004: open-book contract management expectations.",
          "PPN 005: reserving eligible below-threshold competitions.",
          "PPN 006: carbon reduction plans in major government contracts.",
          "PPN 009: modern-slavery risk in government supply chains.",
          "PPN 011 and 012: commercial playbooks and security classifications.",
        ],
        evidence: ["ppn-collection", "social-value", "carbon-plan", "modern-slavery", "security-news"],
      },
      {
        heading: "Build evidence you have the right to reuse",
        paragraphs: [
          "For each case study, record the customer permission, your exact role, contract scale, baseline, action, measured outcome and relevance. Separate prime delivery from subcontracting and consortium work. Keep reference-contact consent and review dates.",
          "Customer bid text, feedback and scoring may be confidential or owned by another party. Do not add it to a shared library because it is useful. Record rights and restrictions at ingestion so the bid team knows what can be quoted, adapted or only consulted privately.",
        ],
        bullets: [
          "Mobilisation and transition evidence.",
          "Service levels, quality and corrective action.",
          "Security, data protection and business continuity.",
          "Environmental and social outcomes with measurement.",
          "Supply-chain controls and partner commitments.",
          "A failed or difficult delivery with the lesson and remedy.",
        ],
        evidence: ["contract-ready", "nao-lifecycle"],
      },
      {
        heading: "A 12-week plan",
        paragraphs: [
          "Weeks 1 and 2 resolve identity, owners and target markets. Weeks 3 and 4 map participation conditions and route access. Weeks 5 and 6 audit policies and accreditations. Weeks 7 and 8 rebuild case studies around evidence. Weeks 9 and 10 confirm partners and delivery capacity. Weeks 11 and 12 run a timed simulation against a real, closed tender.",
          "Every gap needs a lead time and a decision. A certification taking six months is not fixed by better writing. If the target opportunity is earlier, partner, narrow the scope or decline. Readiness should improve the quality of no-bid decisions as well as submissions.",
        ],
        evidence: ["contract-ready"],
      },
      {
        heading: "Tie readiness to live routes",
        paragraphs: [
          "A generic pack cannot tell you when to act. Link each requirement to a framework, dynamic market or buyer segment. On 12 August 2026, the GCA pipeline listed Network Services 4 to open on 21 August, Consultancy and Professional Services on 2 September and Managed Debt Collection Services on 15 October.",
          "Those clocks need different responses. A nine-day window is triage and document verification. A seven-week window can support partner confirmation and evidence repair. A future open-framework reopening may justify a longer capability programme.",
        ],
        evidence: ["gca-upcoming", "dos7"],
      },
      {
        heading: "Test readiness under pressure",
        paragraphs: [
          "Choose a closed tender in the target market. Give the team the original response period, portal rules and documents. Record time lost finding evidence, resolving claims, obtaining approvals and fixing entity details. The debrief should produce owned changes, not writing tips.",
          "Repeat quarterly for priority markets. Expire evidence deliberately, remove unavailable staff and change a partner to test whether the system survives normal disruption.",
        ],
        evidence: ["contract-ready"],
      },
      {
        heading: "Purpose needs proof",
        paragraphs: [
          "Procurement with Purpose surveys issues from climate and supplier diversity to fair employment and plastics. Its useful challenge is breadth: a supplier cannot credibly promise every social outcome on every contract.",
          "Choose outcomes connected to the requirement and place of delivery. Define the baseline, activity, owner and measure before tender. That turns purpose from bid language into a delivery commitment the buyer can assess.",
        ],
        evidence: ["purpose-book", "social-value"],
      },
    ],
    sources: [
      { id: "thresholds", kind: "Official guidance", label: "Procurement Act guidance: thresholds", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-thresholds-html" },
      { id: "ppn-thresholds", kind: "Official guidance", label: "PPN 023: 2026 threshold amounts", url: "https://www.gov.uk/government/publications/ppn-023-2026-threshold-amounts" },
      { id: "cdp-guidance", kind: "Official guidance", label: "Central digital platform and publication guidance", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-central-digital-platform-and-publication-of-information-html" },
      { id: "new-requirements", kind: "Official guidance", label: "New legislative requirements under the Procurement Act 2023", url: "https://www.gov.uk/government/publications/procurement-act-2023-short-guides/new-legislative-requirements-under-the-procurement-act-2023-html" },
      { id: "conditions-guidance", kind: "Official guidance", label: "Guidance: Conditions of Participation", url: "https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-conditions-of-participation-html" },
      { id: "ppn-collection", kind: "Official guidance", label: "Procurement policy notes collection", url: "https://www.gov.uk/government/collections/procurement-policy-notes" },
      { id: "social-value", kind: "Official guidance", label: "PPN 002: Taking account of social value", url: "https://www.gov.uk/government/publications/ppn-002-taking-account-of-social-value-in-the-award-of-contracts" },
      { id: "carbon-plan", kind: "Official guidance", label: "PPN 006: Carbon reduction plans", url: "https://www.gov.uk/government/publications/ppn-006-taking-account-of-carbon-reduction-plans-in-the-procurement-of-major-government-contracts" },
      { id: "modern-slavery", kind: "Official guidance", label: "PPN 009: Tackling modern slavery in government supply chains", url: "https://www.gov.uk/government/publications/ppn-009-tackling-modern-slavery-in-government-supply-chains" },
      { id: "security-news", kind: "Policy announcement", label: "Government procurement to prioritise national security", url: "https://www.gov.uk/government/news/government-procurement-to-prioritise-national-security", note: "Published 19 June 2026." },
      { id: "gca-upcoming", kind: "Live agreement", label: "GCA upcoming agreements", url: gcaUpcoming, note: "Dates checked 12 August 2026." },
      { id: "dos7", kind: "Live agreement", label: "Digital Outcomes and Specialists 7, RM1043.9", url: "https://www.webprod-cms.crowncommercial.gov.uk/agreements/RM1043.9" },
      { id: "contract-ready", kind: "Report", label: "DCMS evaluation of the Contract Readiness Programme", url: "https://www.gov.uk/government/publications/evaluation-of-the-contract-readiness-programme" },
      { id: "nao-lifecycle", kind: "Report", label: "NAO: Managing the commercial lifecycle", url: naoLifecycle },
      { id: "purpose-book", kind: "Book", label: "Procurement with Purpose, Peter Smith with Mark Perera", url: "https://www.procurementwithpurpose.com/blog/procurement-with-purpose-publication-day" },
    ],
    faqs: [
      { question: "What should be ready before a public tender?", answer: "Verified supplier information, route access, current declarations and policies, participation evidence, reusable case studies, partner commitments and named owners for gaps." },
      { question: "Are conditions of participation award criteria?", answer: "No. Participation conditions test capacity or ability to perform. Award criteria compare the submitted tenders." },
      { question: "Does the central digital platform remove portal work?", answer: "No. Suppliers still need to follow the official notice, buyer documents, agreement rules and submission process for each procurement." },
    ],
    related: ["planned-procurement-notices", "frameworks-vs-dynamic-markets", "preliminary-market-engagement"],
  },
];
