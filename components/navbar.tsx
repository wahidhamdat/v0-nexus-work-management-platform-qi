"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Shield", href: "/shield" },
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
]

const BRIEFING_URL = "https://calendly.com/wahidhamdat30/30min"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-colors duration-200 ${belowAlertBar ? "top-10" : "top-0"} ${
        scrolled ? "bg-[#0a0a0a] border-b border-white/[0.08]" : "bg-[#0a0a0a]/95"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
      >
        <a
          href="/"
          className="text-white font-semibold text-lg tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Monakes AI
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-sm px-4 font-medium text-sm"
          >
            <a href={BRIEFING_URL} target="_blank" rel="noopener noreferrer">
              Request Briefing
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-zinc-400 hover:text-white"
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
            className="lg:hidden bg-[#0a0a0a] border-t border-white/[0.08] overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4 max-w-7xl mx-auto">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-white/[0.08] my-2" />
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-sm font-medium">
                <a href={BRIEFING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                  Request Briefing
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
