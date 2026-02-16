"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShieldCheck, Calculator, FileText, Clock } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "GDP Carrier Verification",
    description:
      "Quinn automatically cross-references carrier GDP certification for the specific route \u2014 not just a blanket check. Every quote uses a verified, compliant carrier.",
  },
  {
    icon: Calculator,
    title: "Pharma Surcharge Precision",
    description:
      "Reefer monitoring. Thermal packaging. Dry ice. GDP handling premiums. Active vs passive temperature control. Quinn applies every applicable surcharge. No margin leakage.",
  },
  {
    icon: FileText,
    title: "Audit-Ready Documentation",
    description:
      "Every quote generates a complete compliance trail \u2014 carrier verification, surcharge breakdown, handling requirements. Your QA team can pull it in seconds during an inspection.",
  },
  {
    icon: Clock,
    title: "Under 5 Minutes",
    description:
      "What takes 30\u201340 minutes manually takes Quinn under 5. Same carriers, same margins, same accuracy \u2014 with compliance built into every step.",
  },
]

export function PharmaFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="quinn-features"
      ref={ref}
      aria-label="What Quinn does for pharma cold chain quoting"
      className="relative bg-[#F0F4F8] py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#00B4D8] mb-5"
        >
          {"Quinn \u2014 Your Digital Compliance Officer"}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1628] leading-tight mb-14 text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          An AI agent that makes every quote audit-ready.
        </motion.h2>

        {/* 2x2 Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-white rounded-xl border border-[#E2E8F0] p-8 hover:border-[rgba(0,180,216,0.3)] hover:shadow-[0_2px_24px_rgba(0,180,216,0.06)] transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-[rgba(0,180,216,0.08)] border border-[rgba(0,180,216,0.15)] flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-[#00B4D8]" />
              </div>
              <h3
                className="text-lg font-bold text-[#0A1628] mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-[#3D4B5E] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Centered note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-base text-[#5a6478] max-w-2xl mx-auto"
        >
          {"Quinn doesn\u2019t replace your team. She makes sure nothing gets missed when they\u2019re under pressure."}
        </motion.p>
      </div>
    </section>
  )
}
