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
    title: "Every Quote You\u2019re Slow On Is a Job You\u2019ve Already Lost",
    body: "Your team spends 35\u201345 minutes building a single quote. Route calcs, rate lookups, margin tweaks, document formatting \u2014 all manual. Meanwhile, the company that quotes in 4 minutes already has the booking.",
    stat: "$42 per quote \u00D7 800 quotes/month = $33,600 you never see",
  },
  {
    icon: RefreshCw,
    title: "Your Team Didn\u2019t Sign Up to Be Data Entry Clerks",
    body: "8 portals. 12 SOPs. Different logins, different workflows, copy-paste between systems all day. Your best people are stuck doing admin instead of building customer relationships.",
    stat: "45+ minutes per booking \u2014 and your best staff doing their worst work",
  },
  {
    icon: Package,
    title: "One Missed Email = $200/Day Until Someone Notices",
    body: "A dehire notification gets buried in an inbox. A container sits at a depot. Nobody knows until the penalty invoice arrives. $200/day. $1,400/week. $1,800 on a single container \u2014 and it keeps happening because your tracking lives in spreadsheets and email chains.",
    stat: "One client paid $1,800 in penalties on a single missed container",
  },
  {
    icon: TrendingDown,
    title: "The Real Price of \u2018It\u2019s Fine, It Works\u2019",
    body: "It\u2019s not fine. It\u2019s $42 per quote. $200/day per missed container. 45 minutes per booking your team could spend winning new clients. The costs hide in plain sight because you\u2019ve been too busy firefighting to add them up. We did. It\u2019s over $100K a year.",
    stat: "Get the exact number for your operation \u2014 free",
  },
]

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="problem"
      aria-label="The problem with manual freight operations"
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
          {"You\u2019re Losing $100K a Year to Problems You\u2019ve Stopped Noticing."}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892a4] text-base sm:text-lg max-w-3xl mb-16 leading-relaxed"
        >
          {"Manual quoting. Portal roulette. Spreadsheet tracking. It doesn\u2019t matter if you\u2019re 5 people or 200 \u2014 the same bottlenecks are bleeding your margin every single day. Here\u2019s what it\u2019s actually costing you."}
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
          {"This isn\u2019t a technology problem. It\u2019s a speed problem. A margin problem. A \u201Cyour best people doing their worst work\u201D problem. And it\u2019s costing you "}
          <span className="text-[#00e5a0] font-semibold">$100K+ a year</span>
          {" whether you measure it or not."}
        </motion.p>
      </div>
    </section>
  )
}
