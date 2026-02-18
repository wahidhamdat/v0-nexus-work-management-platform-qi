"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Impact", href: "#impact" },
  { label: "Founder", href: "#founder" },
]

export function ProcurementNavbar() {
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
          ? "bg-[#F7F5F2]/95 backdrop-blur-xl border-b border-[#8A1538]/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
      >
        <a href="/procurement" className="flex items-center gap-2">
          <span
            className="text-[#1A1A1A] font-bold text-xl tracking-tight"
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
              className="text-sm text-[#5A5A5A] hover:text-[#8A1538] transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="https://calendly.com/wahidhamdat30/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#8A1538] text-white text-sm font-semibold hover:bg-[#6D1030] transition-colors"
          >
            Book a Demo
          </a>
        </div>

        <button
          className="md:hidden p-2 text-[#5A5A5A] hover:text-[#1A1A1A]"
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
            className="md:hidden bg-[#F7F5F2]/98 backdrop-blur-xl border-t border-[#8A1538]/10 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4 max-w-7xl mx-auto">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm text-[#5A5A5A] hover:text-[#8A1538] hover:bg-[#8A1538]/5 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-[#8A1538]/10 my-2" />
              <a
                href="https://calendly.com/wahidhamdat30/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm text-center font-semibold rounded-lg bg-[#8A1538] text-white hover:bg-[#6D1030] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
