"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const footerLinks = {
  Product: ["AI Quoting Agent", "Carrier Manager", "Container Tracker", "Ops Dashboard", "API"],
  Company: ["About", "Careers", "Blog", "Partners", "Contact"],
  Resources: ["Documentation", "Case Studies", "ROI Calculator", "Webinars", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Security", "Compliance"],
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="border-t border-[rgba(255,255,255,0.06)] bg-[#06090f]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-sm bg-[#00e5a0]" />
              <span
                className="font-bold text-[#e8ecf1] text-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                MonakesAI
              </span>
            </a>
            <p className="text-sm text-[#5a6478] mb-4">
              AI Digital Employees for freight forwarders and 3PLs across Australia.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111822] border border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#00e5a0] pulse-glow" />
              <span className="text-xs text-[#8892a4]">All Systems Operational</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[#e8ecf1] mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-[#5a6478]">
            &copy; {new Date().getFullYear()} MonakesAI Pty Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors">
              Twitter
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
