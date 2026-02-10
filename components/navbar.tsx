"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "The Problem", href: "#problem" },
  { label: "Our Agents", href: "#agents" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06090f]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-[#06090f]/50 backdrop-blur-md"
      }`}
    >
      <nav
        ref={navRef}
        className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-[#00e5a0]" />
          <span
            className="text-[#e8ecf1] font-bold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            MonakesAI
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-3 py-2 text-sm text-[#8892a4] hover:text-[#e8ecf1] transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-[rgba(255,255,255,0.04)] rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Button
            size="sm"
            className="shimmer-btn bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-full px-5 font-semibold text-sm shadow-[0_0_20px_rgba(0,229,160,0.15)] hover:shadow-[0_0_30px_rgba(0,229,160,0.25)] transition-shadow"
          >
            Book a Deployment Call
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-[#8892a4] hover:text-[#e8ecf1]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
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
              <Button className="shimmer-btn bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-full font-semibold">
                Book a Deployment Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
