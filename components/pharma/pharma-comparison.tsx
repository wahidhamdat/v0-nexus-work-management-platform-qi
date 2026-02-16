"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { X, Check } from "lucide-react"

const withoutQuinn = [
  "Manual carrier verification (spreadsheet or phone call)",
  "Surcharges applied from memory or incomplete reference sheets",
  "Documentation assembled retroactively before audits",
  "Junior staff quoting without senior-level GDP knowledge",
  "30\u201340 minutes per quote",
]

const withQuinn = [
  "Automatic GDP carrier verification per route",
  "Every pharma surcharge applied from a continuously updated database",
  "Audit-ready documentation generated at point of quoting",
  "Every quote built with full compliance accuracy, regardless of who initiates it",
  "Under 5 minutes per quote",
]

export function PharmaComparison() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="the-shift"
      ref={ref}
      aria-label="The operational shift from manual to AI-assisted quoting"
      className="relative bg-white py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#00B4D8] mb-5"
        >
          The Insight
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1628] leading-tight mb-6 max-w-4xl text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {"The pharma logistics operations with the fewest audit findings aren\u2019t the ones with the biggest QA teams."}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-[#3D4B5E] leading-relaxed max-w-3xl mb-14"
        >
          {"They\u2019re the ones that built compliance into their quoting process. Instead of quoting first and verifying compliance later, they verify compliance as they quote. The documentation is a byproduct of the quote itself \u2014 not a retrofit before the inspection."}
        </motion.p>

        {/* Comparison grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl border border-[#E2E8F0] overflow-hidden"
        >
          {/* Without Quinn */}
          <div className="bg-[#FAFBFC] p-8 md:border-r border-b md:border-b-0 border-[#E2E8F0]">
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E74C3C]/70" />
              <h3
                className="text-base font-bold text-[#0A1628]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Without Quinn
              </h3>
            </div>
            <ul className="flex flex-col gap-4" role="list">
              {withoutQuinn.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[rgba(231,76,60,0.08)] flex items-center justify-center">
                    <X className="w-3 h-3 text-[#E74C3C]/70" />
                  </div>
                  <span className="text-sm text-[#3D4B5E] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Quinn */}
          <div className="bg-white p-8">
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00B4D8]" />
              <h3
                className="text-base font-bold text-[#0A1628]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                With Quinn
              </h3>
            </div>
            <ul className="flex flex-col gap-4" role="list">
              {withQuinn.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[rgba(0,180,216,0.1)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#00B4D8]" />
                  </div>
                  <span className="text-sm text-[#3D4B5E] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
