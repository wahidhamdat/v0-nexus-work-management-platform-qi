"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Shield,
  Pill,
  FileSearch,
  HeartPulse,
  ArrowRight,
  ChevronRight,
  Zap,
  Lock,
  Brain,
  Globe,
  Mail,
} from "lucide-react"

/* ═══════ PRODUCTS ═══════ */

const PRODUCTS = [
  {
    id: "shield",
    name: "The Shield",
    tagline: "Export Compliance Intelligence",
    headline: "Close the 24-hour gap where liability lives",
    description:
      "Real-time denied party screening, deterministic ECCN classification, and neural fuzzy matching — with an immutable audit trail. Shield sits between your ERP and the shipping dock, catching what your current tool misses.",
    href: "/shield",
    color: "#4A7FA5",
    colorLight: "rgba(74,127,165,0.12)",
    icon: Shield,
    stats: [
      { label: "Screening latency", value: "<200ms" },
      { label: "List sync", value: "Real-time" },
      { label: "Audit coverage", value: "100%" },
    ],
    status: "Live in production",
    statusColor: "#4ADE80",
  },
  {
    id: "quinn",
    name: "Quinn",
    tagline: "Pharma Cold Chain Quoting",
    headline: "Every pharma quote is a compliance decision",
    description:
      "An AI quoting agent that builds GDP-compliant cold chain quotes in under 5 minutes. Carrier verification, reefer monitoring surcharges, thermal packaging specs, and audit-ready documentation — built in, not bolted on.",
    href: "/pharma",
    color: "#00B4D8",
    colorLight: "rgba(0,180,216,0.12)",
    icon: Pill,
    stats: [
      { label: "Quote time", value: "<5 min" },
      { label: "GDP compliance", value: "Built-in" },
      { label: "Carrier verified", value: "Always" },
    ],
    status: "Early access",
    statusColor: "#FBBF24",
  },
  {
    id: "procurement",
    name: "Procurement Accelerator",
    tagline: "AI Tender Evaluation",
    headline: "Cut tender evaluation time by 80–90%",
    description:
      "Explainable AI that reads tender documents, extracts criteria, evaluates bidders against requirements, and generates auditable reports. Human reviewers confirm or override — the AI never decides alone.",
    href: "/procurement",
    color: "#8A1538",
    colorLight: "rgba(138,21,56,0.12)",
    icon: FileSearch,
    stats: [
      { label: "Time reduction", value: "80–90%" },
      { label: "Evaluation", value: "Explainable" },
      { label: "Audit trail", value: "Hash-chained" },
    ],
    status: "Pilot ready",
    statusColor: "#FBBF24",
  },
  {
    id: "claims",
    name: "Claims Intelligence",
    tagline: "Pre-Submission Claims Validation",
    headline: "Catch denial triggers before they cost you",
    description:
      "AI-powered claims validation that sits upstream of your adjudication engine. Parses EDI 837P/837I, cross-references payer-specific rules, auto-corrects simple issues, and flags complex ones with evidence-backed recommendations.",
    href: "/claims",
    color: "#1B6EC2",
    colorLight: "rgba(27,110,194,0.12)",
    icon: HeartPulse,
    stats: [
      { label: "Processing", value: "<2 sec" },
      { label: "Auto-correction", value: "Deterministic" },
      { label: "Payer rules", value: "Live sync" },
    ],
    status: "In development",
    statusColor: "#94A3B8",
  },
]

const PRINCIPLES = [
  {
    icon: Brain,
    title: "Agents, not dashboards",
    description:
      "Our products are autonomous AI agents that do the work — not reporting tools that show you charts about the work someone else still has to do.",
  },
  {
    icon: Lock,
    title: "Audit-first architecture",
    description:
      "Every decision, every override, every data point is hash-chained and immutable. When the regulator asks, you have the receipts.",
  },
  {
    icon: Zap,
    title: "Domain-native AI",
    description:
      "We don't wrap ChatGPT in a UI. Each agent is built with domain-specific logic, regulatory knowledge, and deterministic guardrails for its vertical.",
  },
  {
    icon: Globe,
    title: "Built for regulated industries",
    description:
      "Export control, pharmaceutical logistics, government procurement, healthcare claims. Industries where being wrong isn't an inconvenience — it's a liability.",
  },
]

/* ═══════ ANIMATED SECTION ═══════ */

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════ PRODUCT CARD ═══════ */

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[0]
  index: number
}) {
  const Icon = product.icon
  return (
    <AnimatedSection delay={index * 0.12}>
      <Link href={product.href} className="group block">
        <div
          className="relative rounded-xl border border-white/[0.06] bg-[#0a1020] p-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#0c1426] overflow-hidden"
        >
          {/* Accent line top */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ background: product.color }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: product.colorLight }}
              >
                <Icon size={20} style={{ color: product.color }} />
              </div>
              <div>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-500 tracking-wide uppercase">
                  {product.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: product.statusColor }}
              />
              <span className="text-[11px] text-zinc-500">
                {product.status}
              </span>
            </div>
          </div>

          {/* Headline */}
          <p
            className="text-xl font-semibold text-[#e8ecf1] mb-3 leading-snug"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {product.headline}
          </p>

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-white/[0.06]">
            {product.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-base font-bold"
                  style={{ color: product.color }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
            style={{ color: product.color }}
          >
            Explore {product.name}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </AnimatedSection>
  )
}

/* ═══════ MAIN COMPONENT ═══════ */

export function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#07111F]">
      {/* ═══════ NAVBAR ═══════ */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-200 ${
          scrolled
            ? "bg-[#07111F] border-b border-white/[0.08]"
            : "bg-[#07111F]/95"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-white font-semibold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Monakes AI
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {PRODUCTS.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {p.name}
              </Link>
            ))}
            <a
              href="mailto:info@monakes.com"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-white/20 text-sm text-white hover:bg-white/10 transition-colors font-medium"
            >
              Contact Us
            </a>
          </div>
        </nav>
      </header>

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 animated-grid pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00e5a0]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />
              <span className="text-xs font-medium text-zinc-400 tracking-wide">
                AI AGENTS FOR REGULATED INDUSTRIES
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            We build AI agents that do
            <br />
            <span className="text-[#00e5a0]">the compliance work</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Monakes AI builds autonomous agents for industries where every
            transaction carries regulatory weight. Export control. Pharmaceutical
            logistics. Government procurement. Healthcare claims.{" "}
            <span className="text-zinc-300">
              Our agents don&apos;t advise — they execute, with deterministic
              logic and immutable audit trails.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-[#00e5a0] text-[#06090f] font-semibold text-sm hover:bg-[#00e5a0]/90 transition-colors"
            >
              View Our Products
              <ChevronRight size={16} />
            </a>
            <a
              href="mailto:info@monakes.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors"
            >
              <Mail size={14} />
              info@monakes.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════ NARRATIVE ═══════ */}
      <section className="px-6 py-20 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00e5a0] mb-4">
              THE THESIS
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Regulated industries run on human review loops that are slow,
              expensive, and inconsistent. We replace the loop — not the human.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="space-y-5 text-[15px] text-zinc-400 leading-[1.75]">
              <p>
                Every day, compliance officers manually screen transactions
                against sanctioned entity lists that changed overnight.
                Pharmaceutical logistics teams hand-build cold chain quotes that
                are one missed surcharge away from a GDP violation. Procurement
                teams spend six weeks evaluating tenders that an AI agent can
                process in two days. Claims examiners manually review cases that
                a rules engine should have caught upstream.
              </p>
              <p>
                These aren&apos;t automation opportunities in the traditional sense.
                They&apos;re decision-dense workflows where the cost of being wrong
                is measured in fines, litigation, and lost licenses — not just
                lost efficiency.
              </p>
              <p className="text-zinc-300 font-medium">
                Monakes AI builds purpose-built agents for these exact
                environments. Each agent is domain-native, deterministic where it
                matters, explainable where it must be, and anchored to an
                immutable audit record. The human stays in the loop — but the
                loop is 10x faster and 10x cheaper.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ PRODUCTS ═══════ */}
      <section id="products" className="px-6 py-20" style={{ scrollMarginTop: 80 }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00e5a0] mb-4">
                PRODUCT PORTFOLIO
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Four verticals. One architecture.
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-base">
                Every product shares the same core: agentic AI, domain-specific
                rules, deterministic guardrails, and an immutable audit trail.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRINCIPLES ═══════ */}
      <section className="px-6 py-20 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00e5a0] mb-4">
                HOW WE BUILD
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Engineering principles
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon
              return (
                <AnimatedSection key={p.title} delay={i * 0.1}>
                  <div className="p-6 rounded-xl border border-white/[0.06] bg-[#0a1020]">
                    <div className="w-10 h-10 rounded-lg bg-[#00e5a0]/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[#00e5a0]" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ COMPANY ═══════ */}
      <section className="px-6 py-20 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00e5a0] mb-4">
              ABOUT MONAKES AI
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Enterprise AI for Regulated Industries.
            </h2>
            <p className="text-[15px] text-zinc-400 leading-[1.75] mb-8">
              Monakes AI Limited (Company No. 17023329) builds enterprise AI
              infrastructure. Our clients operate in environments
              where compliance is not optional — export-controlled trade,
              pharmaceutical cold chain, government procurement, and healthcare
              claims adjudication. We work directly with compliance teams,
              procurement offices, and operations leaders who need AI that is
              auditable, deterministic, and domain-aware.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info@monakes.com"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-white/[0.06] border border-white/[0.08] text-white font-medium text-sm hover:bg-white/[0.1] transition-colors"
              >
                <Mail size={14} />
                info@monakes.com
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-white/[0.08] bg-[#07111F]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              <p
                className="font-semibold text-white text-lg mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Monakes AI
              </p>
              <a
                href="mailto:info@monakes.com"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                info@monakes.com
              </a>
            </div>
            <div className="flex flex-col gap-2">
              {PRODUCTS.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-10 pt-6 border-t border-white/[0.08] text-xs text-zinc-500 text-center">
            © 2026 Monakes AI Limited. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
