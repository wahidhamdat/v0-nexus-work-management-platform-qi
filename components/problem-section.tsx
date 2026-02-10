"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, RefreshCw, Package, TrendingDown } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

const painPoints = [
  {
    icon: Clock,
    title: "45 Minutes Per Quote",
    body: "Multi-leg route calculations, carrier rate lookups, margin optimisation, document generation \u2014 all done manually. By the time your quote lands, a faster competitor already won the job.",
    stat: "$42 hidden cost per quote",
  },
  {
    icon: RefreshCw,
    title: "8 Portals, 12 SOPs, One Booking",
    body: "Carrier portals, freight platforms, email-based systems \u2014 your team context-switches across platforms all day. Every booking is a manual obstacle course of logins, form fills, and confirmation chasing.",
    stat: "45+ minutes per multi-carrier booking",
  },
  {
    icon: Package,
    title: "Containers Vanishing Into Spreadsheets",
    body: "Hired, owned, purchased \u2014 each container type has its own tracking process, dehire workflow, and supplier coordination. One missed handoff and you\u2019re paying $200/day in storage penalties while hunting a container that should\u2019ve been returned last Tuesday.",
    stat: "8+ separate tracking processes",
  },
  {
    icon: TrendingDown,
    title: "The Hidden Cost of \u2018How We\u2019ve Always Done It\u2019",
    body: "Manual quoting, portal-hopping bookings, and spreadsheet container tracking aren\u2019t just slow \u2014 they compound. Errors cascade. Penalties stack. Staff burn out. Your margins bleed while you\u2019re too busy firefighting to notice.",
    stat: "$100K+ annual hidden operational cost",
  },
]

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="problem"
      className="relative py-24 px-6"
      style={{
        backgroundColor: "#0c1018",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-[#00e5a0]" />
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00e5a0]"
          >
            The Problem
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
          {"The Entire Industry Runs on Spreadsheets, Portal Tabs, and 11pm Phone Calls."}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892a4] text-base sm:text-lg max-w-3xl mb-16 leading-relaxed"
        >
          {"Whether you\u2019re a 5-person forwarder or a 200-person 3PL, your team is burning hours on quoting, booking, and tracking work that should take minutes."}
        </motion.p>

        {/* Pain Point Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {painPoints.map((point) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                variants={itemVariants}
                className="group relative rounded-[14px] bg-[#111822] border border-[rgba(255,255,255,0.06)] p-6 transition-all duration-300 hover:border-[rgba(0,229,160,0.2)] hover:-translate-y-[3px]"
              >
                {/* Green top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[14px] bg-gradient-to-r from-[#00e5a0] to-[rgba(0,229,160,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,160,0.08)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#00e5a0]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold text-[#e8ecf1] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {point.title}
                </h3>

                {/* Body */}
                <p className="text-[#8892a4] text-sm leading-relaxed mb-5">
                  {point.body}
                </p>

                {/* Stat Badge */}
                <div className="border-t border-[rgba(255,255,255,0.06)] pt-4">
                  <span className="text-xs font-medium text-[rgba(0,229,160,0.7)]">
                    {point.stat}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Callout */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-base sm:text-lg text-[#e8ecf1] max-w-4xl mx-auto mt-16 leading-relaxed"
        >
          {"Your ops team didn\u2019t sign up to be data entry clerks. At scale, manual quoting costs "}
          <span className="text-[#00e5a0] font-semibold">$42,000/month</span>
          {", booking chaos adds 45 minutes per job, and one missed container transfer costs "}
          <span className="text-[#00e5a0] font-semibold">$200/day</span>
          {". It adds up fast."}
        </motion.p>
      </div>
    </section>
  )
}
