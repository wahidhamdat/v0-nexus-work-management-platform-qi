"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function PharmaProblem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="the-problem"
      ref={ref}
      aria-label="The reality of cold chain compliance failures"
      className="relative bg-white py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#00B4D8] mb-5"
        >
          The Reality
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1628] leading-tight mb-12 max-w-4xl text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {"$35 billion lost to cold chain failures every year. Most of them start before the shipment leaves."}
        </motion.h2>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-base text-[#3D4B5E] leading-relaxed">
              {"Temperature excursions cost pharma companies $100K\u2013$500K per event. The industry focuses on transit monitoring, warehouse controls, and packaging validation. But a surprising number of compliance failures trace back to the quoting process \u2014 where carrier GDP certification wasn\u2019t verified, pharma surcharges were missed, and documentation gaps went unnoticed until the audit."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-base text-[#3D4B5E] leading-relaxed">
              {"30% of cold chain shipments experience temperature excursions. Documentation failures are the #1 cause of GDP non-compliance citations. 5\u201310% of pharma freight invoices contain surcharge errors. And in most operations, the quoting step has zero compliance automation."}
            </p>
          </motion.div>
        </div>

        {/* Bold centered statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-l-4 border-[#00B4D8] pl-6 py-2"
        >
          <p
            className="text-xl sm:text-2xl font-bold text-[#0A1628] text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {"The quote is where compliance begins. Or where it breaks."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
