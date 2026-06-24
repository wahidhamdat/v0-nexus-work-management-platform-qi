"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Impact", href: "#impact" },
  { label: "Why Now", href: "#why-now" },
  { label: "Team", href: "#team" },
]

export function ProcurementNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section via Intersection Observer
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F7F5F2]/95 backdrop-blur-xl border-b border-[#8A1538]/10 shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
      >
        <a href="/procurement" className="flex items-center gap-2 group">
          <span
            className="text-[#1A1A1A] font-bold text-xl tracking-tight group-hover:text-[#8A1538] transition-colors duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Monakes
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative text-sm px-3 py-2 rounded-md transition-all duration-300 font-medium ${
                activeSection === item.href
                  ? "text-[#8A1538]"
                  : "text-[#5A5A5A] hover:text-[#8A1538]"
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <motion.div
                  layoutId="procurement-nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8A1538] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="https://calendly.com/wahidhamdat30/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center px-5 py-2.5 rounded-lg bg-[#8A1538] text-white text-sm font-semibold hover:bg-[#6D1030] transition-all duration-300 shadow-[0_2px_8px_rgba(138,21,56,0.15)] hover:shadow-[0_4px_16px_rgba(138,21,56,0.25)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Request a Pilot</span>
          </a>
        </div>

        <button
          className="md:hidden p-2 text-[#5A5A5A] hover:text-[#1A1A1A] transition-colors"
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#F7F5F2]/98 backdrop-blur-xl border-t border-[#8A1538]/10 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4 max-w-7xl mx-auto">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-4 py-3 text-sm rounded-lg transition-colors font-medium ${
                    activeSection === item.href
                      ? "text-[#8A1538] bg-[#8A1538]/5"
                      : "text-[#5A5A5A] hover:text-[#8A1538] hover:bg-[#8A1538]/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <hr className="border-[#8A1538]/10 my-2" />
              <a
                href="https://calendly.com/wahidhamdat30/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm text-center font-semibold rounded-lg bg-[#8A1538] text-white hover:bg-[#6D1030] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request a Pilot
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
