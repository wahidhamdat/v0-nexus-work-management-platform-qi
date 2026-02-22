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

const DEMO_URL = "https://calendly.com/wahidhamdat30/30min"

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06090f]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
      >
        <a
          href="/"
          className="text-[#e8ecf1] font-bold text-xl tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Monakes AI
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-[#8892a4] hover:text-[#e8ecf1] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-md px-4 font-medium text-sm"
          >
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
              Request a Demo
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-[#8892a4] hover:text-[#e8ecf1]"
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
            className="lg:hidden bg-[#06090f]/98 backdrop-blur-xl border-t border-[rgba(255,255,255,0.06)] overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4 max-w-7xl mx-auto">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm text-[#8892a4] hover:text-[#e8ecf1] hover:bg-[rgba(255,255,255,0.04)] rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-[rgba(255,255,255,0.06)] my-2" />
              <Button asChild className="bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-md font-medium">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                  Request a Demo
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
