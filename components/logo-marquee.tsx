"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const logos = [
  { name: "Mainfreight" },
  { name: "Toll Group" },
  { name: "Linfox" },
  { name: "DHL" },
  { name: "CEVA Logistics" },
  { name: "Kuehne+Nagel" },
  { name: "DB Schenker" },
  { name: "Freight People" },
]

export function LogoMarquee() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 overflow-hidden bg-[#06090f]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-sm text-[#5a6478] uppercase tracking-wider font-medium">
          Trusted by logistics leaders across Australia
        </p>
      </motion.div>

      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#06090f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#06090f] to-transparent z-10 pointer-events-none" />

        {/* Marquee container */}
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[180px] h-16 mx-8 opacity-40 hover:opacity-80 transition-all duration-300"
            >
              <span
                className="text-[#8892a4] font-semibold text-base tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
