"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "How Quinn Works", href: "#quinn-features" },
  { label: "The Problem", href: "#the-problem" },
  { label: "For Pharma", href: "#for-pharma" },
  { label: "Get the Report", href: "#report" },
]

export function PharmaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A1628]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
      >
        <a href="/pharma" className="flex items-center gap-2">
          <span
            className="text-white font-bold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Monakes
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-[#8892a4] hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#report"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#00B4D8] text-white text-sm font-semibold hover:bg-[#0096B7] transition-colors"
          >
            Talk to Us
          </a>
        </div>

        <button
          className="md:hidden p-2 text-[#8892a4] hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1628]/98 backdrop-blur-xl border-t border-[rgba(255,255,255,0.06)] overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4 max-w-7xl mx-auto">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm text-[#8892a4] hover:text-white hover:bg-[rgba(255,255,255,0.04)] rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-[rgba(255,255,255,0.06)] my-2" />
              <a
                href="#report"
                className="px-4 py-3 text-sm text-center font-semibold rounded-full bg-[#00B4D8] text-white hover:bg-[#0096B7] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Talk to Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
