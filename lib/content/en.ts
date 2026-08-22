import type { SiteContent } from "./types"

const BRIEFING = "https://calendly.com/wahidhamdat30/30min"

export const en: SiteContent = {
  locale: "en",
  dir: "ltr",

  spine: [
    { id: "thesis", label: "§01 THESIS" },
    { id: "exposure", label: "§02 EXPOSURE" },
    { id: "mechanism", label: "§03 MECHANISM" },
    { id: "architecture", label: "§04 ARCHITECTURE" },
    { id: "workflow", label: "§05 WORKFLOW" },
    { id: "security", label: "§06 SOVEREIGNTY" },
    { id: "team", label: "§07 TEAM" },
    { id: "contact", label: "§08 CONTACT" },
  ],

  skip: "Skip to content",

  nav: {
    brand: "MONAKES",
    links: [
      { label: "Thesis", href: "#thesis" },
      { label: "Exposure", href: "#exposure" },
      { label: "Platform", href: "#architecture" },
      { label: "Security", href: "#security" },
      { label: "Team", href: "#team" },
    ],
    cta: { label: "Request a briefing", href: BRIEFING },
    menu: "Menu",
    altLang: { label: "عربي", href: "/ar" },
  },

  hero: {
    eyebrow: "A QSTP PORTFOLIO COMPANY · EDUCATION CITY, DOHA",
    headline: ["The decision was sound.", "Three years later, the record has to prove it."],
    lede:
      "Monakes gives governments and large enterprises AI-powered tender evaluation that produces a complete, contemporaneous record — every score timestamped at creation, attributed to its evaluator, locked against retroactive edit, and traced to the clause it came from.",
    ctas: [
      { label: "Request a briefing", href: BRIEFING },
      { label: "Partner inquiry", href: "mailto:partners@monakes.com" },
    ],
    strip: [
      "DEPLOYED ON YOUR INFRASTRUCTURE",
      "COMPLETE RECORD IN 48 HOURS",
      "EVERY SCORE TIED TO ITS SOURCE CLAUSE",
      "PARALLEL RUN — NOTHING CHANGES",
    ],
  },

  thesis: {
    label: "§01 — THE THESIS",
    heading: "Your best evidence is a memory. Memories rewrite themselves.",
    paras: [
      "When a procurement decision is challenged — a bid protest, an audit finding, an arbitration claim — the institution defends it with two things: whatever documentation exists, and the recollection of the people who were in the room.",
      "The second is worth less than almost anyone assumes.",
      "In 2020 the ICC Commission on Arbitration published a report on the accuracy of fact witness memory in international arbitration, produced with scientific input from psychologists specialising in memory. Its findings: human memory is fragile and malleable. Memories become corrupted without the person knowing. Post-event information can overwrite a factual memory rather than merely add to it — and it arrives through entirely ordinary channels. A conversation with a colleague. A discussion with counsel. Simply retelling the same account several times.",
    ],
    gestmin: {
      before: "Courts arrived at the same place independently. In ",
      cite: "Gestmin v Credit Suisse",
      after:
        ", the English Commercial Court held that a judge should place little reliance on witnesses’ recollections of meetings, and base findings on inferences drawn from the documentary record instead.",
    },
    emphasis:
      "The direction is settled. Contemporaneous documents are the primary evidence. Recollection is tested against them, not the reverse.",
    close:
      "Which leaves one question most procurement authorities cannot answer: three years from now, what will your record show — and will it exist before anyone asks for it?",
    sources: [
      {
        label: "ICC COMMISSION REPORT ON THE ACCURACY OF FACT WITNESS MEMORY (2020)",
        href: "https://iccwbo.org/news-publications/arbitration-adr-rules-and-tools/icc-arbitration-and-adr-commission-report-on-the-accuracy-of-fact-witness-memory-in-international-arbitration/",
      },
      {
        label: "GESTMIN SGPS SA v CREDIT SUISSE (UK) LTD [2013] EWHC 3560 (COMM)",
        href: "https://www.bailii.org/ew/cases/EWHC/Comm/2013/3560.html",
      },
    ],
  },

  exposure: {
    label: "§02 — THE EXPOSURE",
    heading: "The forum is busy, expensive, and runs on documents.",
    figures: [
      { value: "881", label: "NEW ICC ARBITRATIONS FILED IN 2025" },
      { value: "US$299B", label: "TOTAL CASELOAD VALUE" },
      {
        value: "28%",
        label: "OF NEW FILINGS WERE CONSTRUCTION & ENGINEERING — THE LARGEST SECTOR",
      },
    ],
    body:
      "Construction and engineering generated 246 ICC cases in 2025, more than any other sector. And the exposure is not confined to mega-projects: 41% of new cases involved amounts not exceeding US$4 million — the threshold at which the ICC’s expedited procedure applies automatically. Expedited means compressed timetables. Compressed timetables mean there is no time to reconstruct a record you never built.",
    quote: {
      label: "IBA RULES ON THE TAKING OF EVIDENCE, ARTICLE 9(6)",
      text:
        "Where a party fails without satisfactory explanation to produce a document the tribunal has ordered, the tribunal may infer that the document would have been adverse to that party’s interests.",
      after:
        "Read that in procurement terms. If the record of how a score was reached does not exist, the absence is not neutral.",
      emphasis: "A gap in the record is not a gap. It is a submission.",
    },
    sources: [
      {
        label: "ICC DISPUTE RESOLUTION STATISTICS 2025",
        href: "https://iccwbo.org/dispute-resolution/resources/icc-dispute-resolution-statistics/",
      },
      {
        label: "IBA RULES ON THE TAKING OF EVIDENCE IN INTERNATIONAL ARBITRATION (2020)",
        href: "https://www.ibanet.org/resources",
      },
    ],
  },

  mechanism: {
    label: "§03 — THE MECHANISM",
    heading: "Nothing goes wrong at the moment of decision. It goes wrong afterwards.",
    paras: [
      "Committees evaluate large tenders rigorously, under real pressure and real time constraints. The evaluations are careful. The decisions are usually right.",
      "The documentation is assembled afterwards. Sometimes days. Often weeks. Occasionally only once a challenge has already been filed — at which point the institution is reconstructing, from notes and email and recollection, a decision made by people whose memory of it has been quietly reorganising ever since.",
      "That reconstruction becomes the institution’s account of what happened. And every element of it faces one question: did this exist at the time, or was it produced for this proceeding?",
    ],
    emphasis: "The exposure is not the decision. It is the interval between the decision and the record.",
    figures: [
      { value: "150–300", label: "STAFF HOURS PER TENDER CYCLE ON MANUAL SCORING AND DOCUMENTATION" },
      { value: "6+ WEEKS", label: "BEFORE A COMPLETE EVALUATION RECORD EXISTS IN MOST INSTITUTIONS" },
    ],
  },

  architecture: {
    label: "§04 — THE ARCHITECTURE",
    heading: "Contemporaneous by construction, not by discipline.",
    paras: [
      "Every institution already intends to document its evaluations properly. Intention is not the failure point — sequence is. Records built after the fact are built after the fact, however diligent the people building them.",
      "Monakes removes the interval structurally.",
    ],
    pillars: [
      {
        title: "Temporal lock",
        body:
          "Each score is generated, timestamped, attributed to a named evaluator, and sealed at the moment of creation. Amendments are recorded as amendments — the original stands, with its own time and author. The record of a decision cannot be improved after the decision.",
      },
      {
        title: "Automated rationale",
        body:
          "Each score carries its justification, traced to the exact clause, page, and criterion in the source document. Not a summary of the bid. A citation into it — the kind that can be put in front of a tribunal and followed back.",
      },
      {
        title: "Zero reconstruction",
        body:
          "Because the record is generated as the evaluation runs, there is nothing to assemble later. No committee is asked, months afterwards, to recall why a bidder scored seven rather than nine.",
      },
    ],
    closing:
      "Monakes does not award contracts. The committee decides. Monakes ensures that whatever the committee decides is documented, timestamped, and defensible from the moment it is decided.",
  },

  workflow: {
    label: "§05 — THE WORKFLOW",
    steps: [
      {
        title: "Documents in",
        body:
          "Ingests from SAP, Oracle, Procore, or your existing procurement platform — or by direct upload of PDF, Word, and Excel. The evaluation clock starts. So does the record.",
      },
      {
        title: "The system evaluates",
        body:
          "Multi-agent models score technical, financial, and compliance criteria in parallel, against your evaluation matrix as your entity has published it. Anomalies and inconsistencies are flagged. Every scoring action is timestamped, attributed, and locked.",
      },
      {
        title: "The committee decides",
        body:
          "Your team reviews ranked bids with clause-level justification for every score, adjusts where required, and exports an audit-ready record. The record is not produced after the committee decides. It is produced as the committee works.",
      },
    ],
  },

  security: {
    label: "§06 — WHERE THE DATA LIVES",
    heading: "We do not hold your tender data. Anywhere.",
    paras: [
      "Monakes deploys on your own controlled environment — in-country sovereign cloud, government private cloud, on-premise, or hybrid. There is no Monakes-operated data store. Tender records, evaluation data, and institutional information never enter infrastructure we control.",
      "This is not a deployment option added to satisfy a procurement checklist. It is the architecture, and it is why the platform deploys in jurisdictions with strict residency requirements without redesign.",
    ],
    blocks: [
      {
        title: "Jurisdiction-adaptable compliance",
        body:
          "The compliance layer configures to national procurement law and data governance frameworks rather than being locked to one regime. A new jurisdiction means configuration, not a rebuild.",
      },
      {
        title: "Access control and integrity",
        body:
          "Evaluator identity, scoring actions, timestamps, and amendments are logged, attributed, and immutable. The record that existed at the moment of decision is the record that exists at the moment of challenge.",
      },
      {
        title: "Built to an evidentiary standard",
        body:
          "Most procurement software is built so a process runs smoothly. Monakes is built so the output of that process survives being read by someone whose job is to find the gap in it.",
      },
    ],
  },

  team: {
    label: "§07 — TEAM",
    heading: "Built by people who know what a failed record costs.",
    intro:
      "Monakes was not built by engineers who found a market. It was built by people who have been in the rooms where procurement decisions are made, and who understand what happens when the record supporting one of those decisions does not hold.",
    people: [
      {
        name: "Abdelwahed",
        role: "FOUNDER & SYSTEMS ARCHITECT",
        bio:
          "Built the core platform and the three-pillar evidentiary architecture. Background in AI systems for operations-heavy environments where the output is read under pressure by people looking for gaps.",
      },
      {
        name: "Hamdat",
        role: "BOARD MEMBER · STRATEGY & INSTITUTIONAL PARTNERSHIPS",
        bio:
          "Ensures the commercial model maps to how public institutions actually evaluate, procure, and adopt technology — a process that does not resemble private-sector sales.",
      },
      {
        name: "Sofiene",
        role: "DEPLOYMENT ENGINEER",
        bio:
          "Veteran of Qatar’s TASMU national digital transformation programme. Designed the infrastructure architecture from inside a sovereign regulatory environment rather than from outside it.",
      },
      {
        name: "Husain",
        role: "BOARD MEMBER · PROCUREMENT OPERATIONS",
        bio:
          "Has served on government procurement evaluation committees. Knows how scores are assigned under institutional pressure and where documentation gaps form.",
      },
    ],
    advisory:
      "The advisory network includes a former Qatar Government Procurement Committee Chair and an ICC arbitration specialist.",
  },

  contact: {
    label: "§08 — THREE CONVERSATIONS",
    columns: [
      {
        title: "Government & institutional teams",
        body:
          "Monakes runs alongside your existing evaluation of a live tender. Your committee works as it works today; your ERP and legal timelines are untouched. At the end you hold two records of the same evaluation, side by side, and compare them on completeness, traceability, and the time each took to exist.",
        cta: { label: "Request a briefing — 30 minutes", href: BRIEFING },
      },
      {
        title: "System integrators & partners",
        body:
          "You own the client relationship and deployment execution. Monakes provides the platform, the evidentiary architecture, the compliance documentation, and technical onboarding. Margin is built into the deployment fee, and there is no competing direct sales motion in your market. One partner per market.",
        cta: { label: "Partner inquiry", href: "mailto:partners@monakes.com" },
      },
      {
        title: "Investors & strategic partners",
        body:
          "Monakes is the documentation infrastructure layer for public procurement. Institutions run billion-dollar tender pipelines with no contemporaneous evidentiary architecture, arbitration caseloads are at record levels, and national digital mandates are converting governance practice into regulatory requirement.",
        cta: { label: "Investor inquiry", href: "mailto:investors@monakes.com" },
      },
    ],
  },

  footer: {
    entity: "MONAKES FOR ARTIFICIAL INTELLIGENCE SOLUTIONS LLC",
    address: "Qatar Science & Technology Park, Education City, Doha",
    status: "A QSTP Portfolio Company",
    email: "info@monakes.com",
    rights: "© 2026. All rights reserved.",
  },
}
