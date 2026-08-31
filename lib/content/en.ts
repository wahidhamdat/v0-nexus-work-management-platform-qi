import type { SiteContent } from "./types"

const BRIEFING = "https://calendly.com/wahidhamdat30/30min"

export const en: SiteContent = {
  locale: "en",
  dir: "ltr",
  skip: "Skip to content",
  cta: { label: "Request a briefing", href: BRIEFING },

  rail: {
    title: "Case file",
    entries: [
      { id: "main", num: "00", label: "Record" },
      { id: "thesis", num: "01", label: "Thesis" },
      { id: "standard", num: "02", label: "Standard" },
      { id: "interval", num: "03", label: "Interval" },
      { id: "method", num: "04", label: "Method" },
      { id: "applications", num: "05", label: "Applications" },
      { id: "security", num: "06", label: "Security" },
      { id: "engagement", num: "07", label: "Engagement" },
      { id: "firm", num: "08", label: "Firm" },
      { id: "seal", num: "09", label: "Seal" },
    ],
  },

  nav: {
    brand: "MONAKES",
    links: [
      { label: "Thesis", href: "#thesis" },
      { label: "The Standard", href: "#standard" },
      { label: "Method", href: "#method" },
      { label: "Applications", href: "#applications" },
      { label: "Security", href: "#security" },
      { label: "Firm", href: "#firm" },
    ],
    menu: "Menu",
    altLang: { label: "عربي", href: "/ar" },
  },

  hero: {
    badge: "A QSTP Portfolio Company · Education City, Doha",
    city: "Doha",
    headline: "The decision was sound. Three years later, the record has to prove it.",
    sub: "The contemporaneous record behind consequential institutional judgments — sealed at creation, verifiable without us.",
    standardLine: "Under the Decision Protection Standard (DPS-1)",
    rope: "Principal-led. Limited engagements each quarter. Conflicts checked.",
    exhibitA: "Exhibit A — this page",
  },

  thesis: {
    num: "§01",
    kicker: "The Thesis",
    verdict: "Your best evidence is a memory. Memories rewrite themselves.",
    support:
      "Contemporaneous documents are the primary evidence. Recollection is tested against them, not the reverse.",
    exhibits: [
      {
        tag: "Exhibit B",
        ref: "ICC · 2020",
        title: "The Accuracy of Fact Witness Memory in International Arbitration",
        note: "Memory is fragile and malleable · post-event information overwrites fact",
        href: "https://iccwbo.org/news-publications/arbitration-adr-rules-and-tools/icc-arbitration-and-adr-commission-report-on-the-accuracy-of-fact-witness-memory-in-international-arbitration/",
      },
      {
        tag: "Exhibit C",
        ref: "[2013] EWHC 3560",
        title: "Gestmin SGPS SA v Credit Suisse (UK) Ltd",
        note: "Little reliance on recollection · findings from the documentary record",
        href: "https://www.bailii.org/ew/cases/EWHC/Comm/2013/3560.html",
        latinRef: true,
      },
    ],
    memo: {
      label: "Read the memorandum",
      paras: [
        "When a consequential decision is challenged — a bid protest, an audit finding, an arbitration claim — the institution defends it with two things: whatever documentation exists, and the recollection of the people who were in the room. The second is worth less than almost anyone assumes.",
        "In 2020 the ICC Commission on Arbitration published a report on the accuracy of fact witness memory, produced with scientific input from psychologists specialising in memory. Its findings: human memory is fragile and malleable. Memories become corrupted without the person knowing. Post-event information can overwrite a factual memory rather than merely add to it — and it arrives through entirely ordinary channels. A conversation with a colleague. A discussion with counsel. Simply retelling the same account several times.",
        "Courts arrived at the same place independently. In Gestmin v Credit Suisse, the English Commercial Court held that a judge should place little reliance on witnesses' recollections of meetings, and base findings on inferences drawn from the documentary record instead.",
        "This is true of a tender score, a compliance determination, a financial-reporting judgment, and a closed investigation alike. The failure is never the decision. It is the distance between the decision and its record.",
      ],
    },
  },

  standard: {
    num: "§02",
    kicker: "The Standard",
    suffix: "· DPS-1",
    verdict: "A methodology, not a promise.",
    support:
      "A published methodology for producing decision records that withstand adversarial examination.",
    degrees: [
      { key: "E0", label: "Absent" },
      { key: "E1", label: "Asserted" },
      { key: "E2" },
      { key: "E3" },
      { key: "E4", label: "Contemporaneous & independent" },
    ],
    readouts: {
      def: "The five degrees of evidence — a conclusion holds the grade of its weakest load-bearing evidence",
      E0: "E0 · Absent — no record exists behind the conclusion",
      E1: "E1 · Asserted — an assertion is not evidence of the fact asserted; it is evidence an assertion was made",
      E2: "E2 · Intermediate degree, defined in DPS-1",
      E3: "E3 · Intermediate degree, defined in DPS-1",
      E4: "E4 · Contemporaneous and independent — the grade a Decision Record is built to hold",
    },
    clauses: [
      {
        num: "2.1",
        title: "Degrees of evidence",
        body: "Every conclusion is graded on a five-degree scale, from E0 (absent) through E1 (asserted) to E4 (contemporaneous and independent). A conclusion holds the grade of its weakest load-bearing evidence. An assertion is not evidence of the fact asserted; it is evidence that an assertion was made.",
      },
      {
        num: "2.2",
        title: "Criteria packs",
        body: "Each domain is examined against a versioned pack of criteria — what must be evidenced, to what degree, and what an adversary asks first. Packs are maintained against the live enforcement and case record and versioned like any controlled document.",
      },
      {
        num: "2.3",
        title: "Adversarial verification",
        body: "Before any finding reaches a human reviewer, an independent verification pass — isolated from the first analysis — attacks it on four fronts: fidelity to the quoted source, integrity of the inference, contradiction elsewhere in the corpus, and congruence with scope. Findings that fail do not survive.",
      },
      {
        num: "2.4",
        title: "Human determination",
        body: "People decide; the methodology proves they did. Every finding is accepted, overridden with recorded rationale, or escalated — by a named person, at a recorded time, with what they saw preserved alongside what they decided.",
      },
      {
        num: "2.5",
        title: "The Decision Record",
        body: "The output: a sealed, hash-chained record in which every claim is traceable to its page and verifiable by your own counsel, auditor or committee — without Monakes in the room.",
      },
    ],
  },

  interval: {
    num: "§03",
    kicker: "The Interval",
    verdict: "The exposure is not the decision. It is the interval between the decision and its record.",
    memo: {
      label: "Read the mechanism",
      paras: [
        "Committees evaluate rigorously, under real pressure and real time constraints. The evaluations are careful. The decisions are usually right. The documentation is assembled afterwards. Sometimes days. Often weeks. Occasionally only once a challenge has already been filed — at which point the institution is reconstructing, from notes and email and recollection, a decision made by people whose memory of it has been quietly reorganising ever since.",
        "That reconstruction becomes the institution's account of what happened. And every element of it faces one question: did this exist at the time, or was it produced for this proceeding?",
      ],
    },
  },

  method: {
    num: "§04",
    kicker: "Method",
    verdict: "Contemporaneous by construction, not by discipline.",
    chainLabel: "The chain seals as you read",
    links: [
      {
        num: "01",
        title: "Corpus in",
        body: "The documents that carry the decision — and nothing else — scoped in writing, ingested, hashed.",
      },
      {
        num: "02",
        title: "Examination under the pack",
        body: "The entire corpus read against every criterion — not a sample. Each finding bound to its exact clause, page and passage. A citation, not a summary.",
      },
      {
        num: "03",
        title: "Verification",
        body: "The independent pass attacks every finding before a person sees it.",
      },
      {
        num: "04",
        title: "Determination",
        body: "Your people accept, override or escalate. Named. Timestamped. Amendments recorded as amendments.",
      },
      { num: "05", title: "Seal", body: "Locked at creation. Re-verifiable without us." },
    ],
  },

  applications: {
    num: "§05",
    kicker: "Applications",
    verdict: "One standard. Applied where records are examined.",
    monuments: [
      {
        counts: [150, 300],
        numeral: "{0}–{1}",
        label: "Staff hours per tender cycle on manual scoring and documentation",
      },
      {
        counts: [6],
        numeral: "{0}+",
        unit: "weeks",
        label: "Before a complete evaluation record exists in most institutions",
      },
    ],
    items: [
      {
        title: "Tender & bid evaluation",
        flag: "Flagship instrument",
        body: "Evaluation and record produced simultaneously: every score timestamped, attributed, locked, and traced to the clause it came from — in a fraction of committee time. Runs in parallel with a live evaluation; nothing in your process changes.",
      },
      {
        title: "Compliance programmes",
        body: "The distance between a programme that exists and one that can be evidenced as operating is where modern examinations are decided. We read the record behind effectiveness assertions — escalations, dispositions, attestations — before someone else does.",
      },
      {
        title: "Financial reporting & certification",
        body: "Certifications rest on chains of internal attestations and judgment memoranda. We read what the file would produce if examined: what each signature rested on, whether the basis of each judgment is contemporaneous, and what the representation letter is actually supported by.",
      },
      {
        title: "Legal, investigation & committee files",
        body: "Closed matters, deliberations and determinations — read for whether the file shows who decided what, when, on what basis.",
      },
    ],
  },

  security: {
    num: "§06",
    kicker: "Security & Sovereignty",
    verdict: "You choose where your work lives, and what reads it.",
    chips: ["Online", "On your infrastructure", "Sovereign · air-gapped"],
    confidentiality:
      "Engagements are confidential to the commissioning party. Corpora are hashed on intake and destroyed on confirmation at close.",
    memo: {
      label: "Read the deployment memorandum",
      paras: [
        "Run Monakes online for speed and zero setup, or deploy it inside your own environment when the work demands it. Either way, you choose the model that reads the work — your own keys, an in-region model, or a fully self-hosted one — and your data goes nowhere you didn't configure. Sovereign, on-premise, and air-gapped deployments are available for the most sensitive work.",
        "The compliance layer configures to national procurement law and data governance frameworks rather than being locked to one regime. Identity, actions, timestamps, and amendments are logged, attributed, and immutable — the record that existed at the moment of decision is the record that exists at the moment of challenge. Most software is built so a process runs smoothly. Monakes is built so the output of that process survives being read by someone whose job is to find the gap in it.",
      ],
    },
  },

  engagement: {
    num: "§07",
    kicker: "Engagement",
    verdict: "One door.",
    monuments: [
      {
        counts: [30],
        numeral: "{0}",
        unit: "minutes",
        label: "Briefing · one criterion, end to end, on a synthetic specimen — you are invited to attack it",
      },
      {
        counts: [10],
        numeral: "{0}",
        unit: "working days",
        label: "Diagnostic · a single file, fixed fee, delivered as a written memorandum",
      },
    ],
    rope: "Principal-led. A limited number of engagements each quarter. We act only for the function that engages us, never for parties adverse to it, and a conflicts check precedes every engagement. We are not an audit firm; we provide no assurance opinion; engagements may be commissioned through counsel.",
  },

  firm: {
    num: "§08",
    kicker: "The Firm",
    verdict: "People who know what a failed record costs.",
    people: [
      {
        name: "Mohameda Hamdat",
        role: "Founder & Systems Architect",
        bio: "Background in AI systems for operations-heavy environments where the output is read under pressure by people looking for gaps. Designed the Decision Protection Standard and the instrument that executes it.",
      },
      {
        name: "Abdelfadel Hamdat",
        role: "Board · Strategy & Institutional Partnerships",
        bio: "Ensures the commercial model maps to how public institutions actually evaluate, procure, and adopt technology — a process that does not resemble private-sector sales.",
      },
      {
        name: "Sofiene Chouchine",
        role: "Infrastructure",
        bio: "Veteran of Qatar's TASMU national digital transformation programme. Designed the infrastructure architecture from inside a sovereign regulatory environment rather than from outside it.",
      },
      {
        name: "Husain Sairy",
        role: "Board · Procurement Operations",
        bio: "Has served on government procurement evaluation committees. Knows how scores are assigned under institutional pressure and where documentation gaps form.",
      },
    ],
    stamps: [
      "QSTP Portfolio Company",
      "TASMU Programme — veteran",
      "Fmr Govt Procurement Committee Chair — advisory",
      "ICC arbitration specialist — advisory",
    ],
  },

  seal: {
    sealed: "Sealed",
    endOfRecord: "End of record",
    hashTitle: "This page, hashed in your browser — the property every Monakes record carries.",
    closed: "Record closed",
    legal: "Monakes for Artificial Intelligence Solutions LLC",
    address: "Qatar Science & Technology Park, Education City, Doha",
    email: "info@monakes.com",
    rights: "All rights reserved",
  },
}
