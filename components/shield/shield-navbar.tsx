"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "The Gap", href: "#challenge" },
  { label: "How It Works", href: "#solution" },
  { label: "Integration", href: "#integration" },
]

export function ShieldNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          ? "bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-[#00D4FF]/10 shadow-[0_1px_12px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
      >
        <a href="/shield" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center group-hover:bg-[#00D4FF]/15 transition-colors duration-300">
            <div className="w-3 h-3 rounded-sm bg-[#00D4FF] rotate-45" />
            <div className="absolute inset-0 rounded-lg bg-[#00D4FF]/5 blur-sm -z-10" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-white font-bold text-lg tracking-tight leading-none group-hover:text-[#00D4FF] transition-colors duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The Shield
            </span>
            <span className="text-[10px] text-[#7A8BA8] tracking-[0.15em] uppercase leading-none mt-0.5">
              by Monakes AI
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative text-sm px-3 py-2 rounded-md transition-all duration-300 font-medium ${
                activeSection === item.href
                  ? "text-[#00D4FF]"
                  : "text-[#7A8BA8] hover:text-[#00D4FF]"
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <motion.div
                  layoutId="shield-nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#00D4FF] rounded-full"
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
            className="group relative inline-flex items-center px-5 py-2.5 rounded-lg bg-[#00D4FF] text-[#0A0E1A] text-sm font-semibold hover:bg-[#00BFEA] transition-all duration-300 shadow-[0_2px_8px_rgba(0,212,255,0.2)] hover:shadow-[0_4px_16px_rgba(0,212,255,0.3)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Book 15-min demo</span>
          </a>
        </div>

        <button
          className="md:hidden p-2 text-[#7A8BA8] hover:text-white transition-colors"
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
            className="md:hidden bg-[#0A0E1A]/98 backdrop-blur-xl border-t border-[#00D4FF]/10 overflow-hidden"
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
                      ? "text-[#00D4FF] bg-[#00D4FF]/5"
                      : "text-[#7A8BA8] hover:text-[#00D4FF] hover:bg-[#00D4FF]/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <hr className="border-[#00D4FF]/10 my-2" />
              <a
                href="https://calendly.com/wahidhamdat30/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm text-center font-semibold rounded-lg bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00BFEA] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book 15-min demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
