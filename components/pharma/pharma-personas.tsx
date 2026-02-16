"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Truck, Building2, ClipboardCheck } from "lucide-react"

const personas = [
  {
    icon: Truck,
    title: "Pharma 3PLs & Freight Forwarders",
    description:
      "You build cold chain quotes daily. Quinn ensures every one is GDP-compliant, with correct surcharges and carrier verification \u2014 without slowing your team down.",
  },
  {
    icon: Building2,
    title: "Pharma Distributors",
    description:
      "Your reputation depends on compliance at every step. Quinn gives your quoting process the same rigor you apply to warehousing and transit.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality & Compliance Directors",
    description:
      "You need documentation you can trust. Quinn generates audit-ready compliance trails from the moment a quote is created \u2014 not assembled after the fact.",
  },
]

export function PharmaPersonas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="for-pharma"
      ref={ref}
      aria-label="Who Quinn is built for"
      className="relative bg-[#F0F4F8] py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#00B4D8] mb-5"
        >
          Built for Pharma Cold Chain
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1628] leading-tight mb-14 max-w-4xl text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {"If your team handles temperature-sensitive pharmaceutical shipments, Quinn was built for you."}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-white rounded-xl border border-[#E2E8F0] p-8 hover:border-[rgba(0,180,216,0.3)] transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-[rgba(0,180,216,0.08)] border border-[rgba(0,180,216,0.15)] flex items-center justify-center mb-5">
                <persona.icon className="w-5 h-5 text-[#00B4D8]" />
              </div>
              <h3
                className="text-base font-bold text-[#0A1628] mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {persona.title}
              </h3>
              <p className="text-sm text-[#3D4B5E] leading-relaxed">
                {persona.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
