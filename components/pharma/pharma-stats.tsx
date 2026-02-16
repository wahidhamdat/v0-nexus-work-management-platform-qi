"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  {
    value: "$100K\u2013$500K",
    label: "Average cost of a single temperature excursion event",
  },
  {
    value: "30%",
    label: "of cold chain shipments experience temperature excursions",
  },
  {
    value: "< 5 min",
    label: "Quinn\u2019s quoting time with full GDP compliance",
  },
]

export function PharmaStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      aria-label="Cold chain compliance statistics"
      className="relative bg-[#0A1628] py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pharma-grid-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`text-center px-6 ${
                i < stats.length - 1
                  ? "md:border-r md:border-[rgba(255,255,255,0.08)]"
                  : ""
              }`}
            >
              <div
                className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <p className="text-sm text-[#8892a4] max-w-[240px] mx-auto leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
