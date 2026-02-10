"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "The Problem", href: "#problem", id: "problem", ariaLabel: "View the problems we solve for freight forwarders" },
  { label: "Our Agents", href: "#agents", id: "agents", ariaLabel: "View our AI agents for freight forwarding" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works", ariaLabel: "Learn how our AI agents work" },
  { label: "Results", href: "#results", id: "results", ariaLabel: "See real results from our AI agents" },
  { label: "Pricing", href: "#pricing", id: "pricing", ariaLabel: "View pricing for AI freight agents" },
  { label: "Contact", href: "#contact", id: "contact", ariaLabel: "Contact us to deploy AI agents" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
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

  // Intersection observer for active link highlighting
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)
    const observers: IntersectionObserver[] = []

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(id)
        }
      })
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(id), {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        })
        observer.observe(el)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
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
        role="navigation"
        aria-label="Main navigation"
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
          {navItems.map((item, index) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.ariaLabel}
                className={`relative px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-[#e8ecf1]" : "text-[#8892a4] hover:text-[#e8ecf1]"
                }`}
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
                {isActive && hoveredIndex !== index && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-[rgba(0,229,160,0.06)] rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#00e5a0] rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Button
            asChild
            size="sm"
            className="shimmer-btn bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-full px-5 font-semibold text-sm shadow-[0_0_20px_rgba(0,229,160,0.15)] hover:shadow-[0_0_30px_rgba(0,229,160,0.25)] transition-shadow"
          >
            <a href="#contact">Book a Deployment Call</a>
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
                  className={`px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeId === item.id
                      ? "text-[#e8ecf1] bg-[rgba(0,229,160,0.06)] border-l-2 border-[#00e5a0]"
                      : "text-[#8892a4] hover:text-[#e8ecf1] hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-[rgba(255,255,255,0.06)] my-2" />
              <Button
                asChild
                className="shimmer-btn bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-full font-semibold"
              >
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Book a Deployment Call
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
