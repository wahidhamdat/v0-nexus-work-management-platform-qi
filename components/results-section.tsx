"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

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

const metrics = [
  {
    before: "35 min",
    after: "4 min",
    label: "Per Quote",
  },
  {
    before: "22%",
    after: "3%",
    label: "Error Rate",
  },
  {
    before: "12/day",
    after: "60+",
    label: "Daily Quote Capacity",
  },
  {
    before: "A$8,400/mo",
    after: "Under A$60/mo",
    label: "Quoting Cost",
  },
  {
    before: "Manual",
    after: "A$107K",
    label: "Annual Savings",
  },
]

const testimonials = [
  {
    quote:
      "The biggest surprise wasn\u2019t the speed \u2014 it was getting my evenings back. We went from two staff doing nothing but quotes to handling 5X the volume with the same team. It\u2019s not software. It\u2019s like hiring three people who never call in sick.",
    attribution: "Operations Director, Melbourne Freight Forwarder",
  },
  {
    quote:
      "We were processing 800 quotes a month across 6 staff. Now Sarah handles the bulk, our team focuses on complex jobs and customer relationships, and our win rate is up because we\u2019re first to respond. The ROI was obvious within the first fortnight.",
    attribution: "General Manager, National 3PL (85+ staff)",
  },
]

export function ResultsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="results"
      className="relative py-24 px-6"
      style={{ backgroundColor: "#06090f" }}
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
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00e5a0]">
            Real Results
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
          What Happens When You Deploy Instead of Hiring
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892a4] text-base sm:text-lg max-w-3xl mb-16 leading-relaxed"
        >
          Numbers from Australian freight forwarders and 3PLs who deployed our
          agents.
        </motion.p>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="group relative rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] p-6 text-center transition-all duration-300 hover:border-[rgba(0,229,160,0.2)]"
            >
              {/* Top gradient line on hover */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#00e5a0] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Before value */}
              <p className="text-sm text-[#5a6478] line-through mb-2">
                {metric.before}
              </p>

              {/* After value */}
              <p
                className="text-3xl sm:text-[2.4rem] font-bold text-[#00e5a0] mb-3 leading-none"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {metric.after}
              </p>

              {/* Label */}
              <p className="text-sm text-[#8892a4]">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.attribution}
              variants={itemVariants}
              className="relative rounded-2xl bg-[#111822] border border-[rgba(255,255,255,0.06)] p-8 lg:p-10"
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-6 left-8 text-[6rem] leading-none font-serif text-[#00e5a0] select-none pointer-events-none"
                style={{ opacity: 0.12 }}
                aria-hidden="true"
              >
                {"\u201C"}
              </span>

              {/* Quote text */}
              <p className="relative text-[#e8ecf1] text-base sm:text-lg leading-relaxed mb-6 z-10">
                {"\u201C"}
                {testimonial.quote}
                {"\u201D"}
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#00e5a0] opacity-40" />
                <p className="text-sm text-[#8892a4] italic">
                  {testimonial.attribution}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#00e5a0] text-sm font-semibold hover:gap-3 transition-all duration-300 group"
          >
            See How It Works for Your Operation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
