"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Hourglass, ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

interface LiveAgent {
  kind: "live"
  initial: string
  gradient: string
  label: string
  name: string
  description: string
  metrics: { value: string; label: string }[]
}

interface ComingSoonAgent {
  kind: "coming-soon"
  initial: string
  gradient: string
  label: string
  name: string
  badge: string
  description: string
  tags: string[]
}

const liveAgents: LiveAgent[] = [
  {
    kind: "live",
    initial: "S",
    gradient: "linear-gradient(135deg, #00e5a0, #00b4d8)",
    label: "QUOTE ORCHESTRATION AGENT",
    name: "Sarah Makes You the Fastest Quote in Every Inbox",
    description:
      "While your competitor is still opening their spreadsheet, Sarah has already analysed the route, pulled carrier rates, optimised your margin, and generated a professional quote document. 4 minutes. Done. Your team reviews, clicks approve, and the customer gets the quote before anyone else.",
    metrics: [
      { value: "4 min", label: "Quote to Inbox (Competitors: 35 min)" },
      { value: "95%", label: "First-Time Accuracy" },
      { value: "5\u00D7", label: "More Quotes, Same Team" },
      { value: "$8,400", label: "Back in Your Pocket Every Month" },
    ],
  },
  {
    kind: "live",
    initial: "A",
    gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    label: "BOOKING ORCHESTRATION AGENT",
    name: "Alex Means Your Team Never Logs Into a Carrier Portal Again",
    description:
      "Every portal. Every login. Every SOP. Every form fill. Every confirmation email. Alex handles all of it. Your team doesn\u2019t navigate carrier systems anymore \u2014 they just review completed bookings on one dashboard. 12 SOPs gone. 8 portals gone. Your people do real work instead.",
    metrics: [
      { value: "85%", label: "Faster Than Doing It Manually" },
      { value: "90%", label: "Fewer Errors (No More Double-Checking)" },
      { value: "12", label: "SOPs Replaced by One Dashboard" },
      { value: "0", label: "Portals \u2014 Your Team Never Logs In Again" },
    ],
  },
  {
    kind: "live",
    initial: "L",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    label: "CONTAINER LIFECYCLE SENTINEL",
    name: "Leo Killed Our Storage Penalties. Completely.",
    description:
      "Every container. Every type. Every stage \u2014 from empty delivery to dehire. Leo tracks it all in real-time and flags penalty risks before they cost you a cent. No more containers sitting at depots because a notification got buried. No more $200/day surprises. Our clients went from thousands in penalties to zero.",
    metrics: [
      { value: "$0", label: "Storage Penalties (Was $200/Day Per Container)" },
      { value: "Real-Time", label: "Every Container, Every Status, Always" },
      { value: "3\u00D7", label: "More Containers, Same Team" },
      { value: "Zero", label: "Missed Dehires Since Deployment" },
    ],
  },
]

const comingSoonAgents: ComingSoonAgent[] = [
  {
    kind: "coming-soon",
    initial: "M",
    gradient: "linear-gradient(135deg, #f43f5e, #fb7185)",
    label: "HUB TRANSFER ORCHESTRATION AGENT",
    name: "Maya Makes Sure Nothing Gets Stuck Between Carriers",
    badge: "COMING Q2 2026",
    description:
      "Missed connections. Incompatible schedules. Containers stranded between legs. Maya kills all of it before it costs you. Predictive delay detection, auto driver allocation, real-time monitoring. Precision coordination at any volume.",
    tags: [
      "Predictive Delay Detection",
      "Auto Driver Allocation",
      "Real-time Transfer Monitoring",
      "80% Penalty Reduction",
    ],
  },
  {
    kind: "coming-soon",
    initial: "N",
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    label: "INTELLIGENT COMMUNICATION AGENT",
    name: "Nova Means No Lead Falls Through the Cracks. Ever.",
    badge: "COMING Q3 2026",
    description:
      "Every inbound email classified and routed in seconds. Quote enquiries go to Sarah. Booking questions go to Alex. Complaints get flagged for humans. Your response time drops from hours to seconds. No lead ignored. No enquiry missed. Whether you get 20 a day or 200.",
    tags: [
      "Auto Email Classification",
      "AI-Generated Responses",
      "Sales Sequence Automation",
      "150% Faster Response Times",
    ],
  },
  {
    kind: "coming-soon",
    initial: "F",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    label: "FINANCIAL PROCESSING AGENT",
    name: "Finn Means Your Books Close Themselves",
    badge: "COMING Q4 2026",
    description:
      "Invoice generated the moment a booking confirms. Credit card fees calculated. Refund policies enforced. From 10 invoices a week to 10,000 \u2014 your financial ops on autopilot. No manual entry. No missed payments. No end-of-month scramble.",
    tags: [
      "Auto Invoice Generation",
      "Payment Processing",
      "Refund Policy Enforcement",
      "90% Faster Invoicing",
    ],
  },
]

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)]">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5a0]" />
      </span>
      <span className="text-[10px] font-bold tracking-wider uppercase text-[#00e5a0]">Live</span>
    </span>
  )
}

function ComingSoonBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgba(245,158,11,0.7)]" />
      </span>
      <span className="text-[10px] font-bold tracking-wider uppercase text-[rgba(245,158,11,0.9)]">{text}</span>
    </span>
  )
}

function AgentAvatar({ initial, gradient }: { initial: string; gradient: string; dimmed?: boolean }) {
  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: gradient }}
    >
      <span className="text-xl font-bold text-[#06090f]">{initial}</span>
    </div>
  )
}

function LiveAgentCard({ agent }: { agent: LiveAgent }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] p-6 lg:p-8 transition-all duration-300 hover:border-[rgba(0,229,160,0.2)] hover:-translate-y-1"
    >
      {/* Green top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#00e5a0] to-[rgba(0,229,160,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <AgentAvatar initial={agent.initial} gradient={agent.gradient} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <LiveBadge />
          </div>
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5a6478] block mb-1">
            {agent.label}
          </span>
          <h3
            className="text-lg lg:text-xl font-bold text-[#e8ecf1]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {agent.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#8892a4] text-sm leading-relaxed mb-6">{agent.description}</p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {agent.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] px-4 py-3"
          >
            <span className="block text-xl font-bold text-[#00e5a0] font-mono">{metric.value}</span>
            <span className="text-[11px] text-[#5a6478]">{metric.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ComingSoonCard({ agent }: { agent: ComingSoonAgent }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.04)] p-6 transition-all duration-300 hover:border-[rgba(245,158,11,0.2)] hover:-translate-y-1 overflow-hidden"
    >
      {/* Amber top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#f59e0b] to-[rgba(245,158,11,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Diagonal stripe overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 12px)",
        }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-4 mb-4">
        <div className="opacity-70">
          <AgentAvatar initial={agent.initial} gradient={agent.gradient} dimmed />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <ComingSoonBadge text={agent.badge} />
          </div>
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5a6478] block mb-1">
            {agent.label}
          </span>
          <h3
            className="text-base lg:text-lg font-bold text-[#e8ecf1]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {agent.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="relative text-[#8892a4] text-sm leading-relaxed mb-5">{agent.description}</p>

      {/* Capability Tags */}
      <div className="relative flex flex-wrap gap-2 mb-5">
        {agent.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-[11px] rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#8892a4]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Waitlist Link */}
      <a
        href="#contact"
        className="relative inline-flex items-center gap-1.5 text-sm text-[#00e5a0] hover:text-[#00ffb2] transition-colors"
      >
        {"Reserve Your Spot \u2014 Founding Members Get Priority + Locked-In Pricing"}
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  )
}

export function AgentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="agents" aria-label="AI agents for freight forwarding operations" className="py-24 px-6 bg-[#06090f]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-[#00e5a0]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00e5a0]">
            Your Digital Workforce
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#e8ecf1] leading-tight max-w-4xl mb-5 text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {"They Don\u2019t Call In Sick. They Don\u2019t Miss Deadlines. They Don\u2019t Lose Your Freight Jobs."}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892a4] text-base sm:text-lg max-w-3xl mb-16 leading-relaxed"
        >
          {"Three deployed and working right now. Three more coming this year. Each one handles a specific bottleneck that\u2019s bleeding your margin. Your team stays in charge. The repetitive grind just stops."}
        </motion.p>

        {/* ═══════ DEPLOYED & READY ═══════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00e5a0]" />
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00e5a0]">
            Deployed & Ready
          </span>
          <div className="flex-1 h-px bg-[rgba(0,229,160,0.15)]" />
        </motion.div>

        {/* Live Agent Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16"
        >
          {liveAgents.map((agent) => (
            <LiveAgentCard key={agent.initial} agent={agent} />
          ))}
        </motion.div>

        {/* ═══════ COMING SOON DIVIDER ═══════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-3 mb-8 mt-4"
        >
          <Hourglass className="w-4 h-4 text-[rgba(245,158,11,0.7)]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[rgba(245,158,11,0.7)]">
            Coming Soon &mdash; In the Pipeline
          </span>
          <div className="flex-1 h-px bg-[rgba(245,158,11,0.12)]" />
        </motion.div>

        {/* Coming Soon Agent Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {comingSoonAgents.map((agent) => (
            <ComingSoonCard key={agent.initial} agent={agent} />
          ))}
        </motion.div>

        {/* Section Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-16"
        >
          <p className="text-base sm:text-lg text-[#8892a4] max-w-3xl mx-auto mb-8 leading-relaxed">
            {"The full team ships by end of 2026. Companies that deploy now lock in "}
            <span className="text-[#00e5a0] font-semibold">founding-member pricing</span>
            {" and get first access to every new specialist as they launch. That window closes when the cohort fills."}
          </p>
          <a
            href="#contact"
            className="shimmer-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00e5a0] text-[#06090f] font-semibold text-base hover:bg-[#00ffb2] transition-colors"
          >
            {"See What\u2019s Possible \u2014 Book Your Free Speed Audit"}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
