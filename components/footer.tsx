"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const navigateLinks = [
  { label: "The Problem", href: "#problem" },
  { label: "Our Agents", href: "#agents" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} role="contentinfo" className="border-t border-[rgba(255,255,255,0.06)] bg-[#06090f]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Column 1 — Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-sm bg-[#00e5a0]" />
              <span
                className="font-bold text-[#e8ecf1] text-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                MonakesAI
              </span>
            </a>
            <p className="text-sm text-[#8892a4] mb-4">
              The Fastest Freight Teams Run on MonakesAI
            </p>
            <p className="text-xs text-[#5a6478] leading-relaxed">
              182-184 High Street North,
              <br />
              East Ham, London E6 2JA
            </p>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <h4 className="text-sm font-semibold text-[#e8ecf1] mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navigateLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Get In Touch */}
          <div>
            <h4 className="text-sm font-semibold text-[#e8ecf1] mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@monakes.com"
                  className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors"
                >
                  info@monakes.com
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-[#00e5a0] hover:text-[#00cc8e] transition-colors"
                >
                  Get Your Free Speed Audit
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* SEO contextual text */}
        <p className="text-xs text-[#5a6478]/60 leading-relaxed max-w-4xl mt-12">
          {"MonakesAI makes freight companies the fastest quote in every inbox. Our digital specialists \u2014 Sarah, Alex, and Leo \u2014 handle quoting, booking, and container tracking so your team wins more jobs, eliminates penalties, and focuses on growth. Trusted by freight forwarders and 3PLs worldwide."}
        </p>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)]"
        >
          <p className="text-xs text-[#5a6478] text-center">
            &copy; 2026 MonakesAI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
