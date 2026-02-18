"use client"

import { useEffect, useRef, useState } from "react"
import { Eye, Shield, UserCheck, Link2 } from "lucide-react"

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

const features = [
  {
    icon: Link2,
    title: "Seamless Ingestion",
    description:
      "Monakes ingests RFPs and bids from your ERP, procurement system, or simple drag-and-drop upload \u2013 your choice.",
  },
  {
    icon: Eye,
    title: "Multi-Agent Scoring",
    description:
      "Multi-agent AI scores technical, financial, and compliance criteria against your exact evaluation matrix.",
  },
  {
    icon: Shield,
    title: "Full Traceability",
    description:
      "Every score is traceable back to the original clause and page, so evaluators can see why a bid was ranked the way it was.",
  },
  {
    icon: UserCheck,
    title: "Human Control",
    description:
      "Your committee retains full decision authority. AI assists, humans decide.",
  },
]

export function ProcurementSolution() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="solution"
      ref={sectionRef}
      aria-label="Solution"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8A1538] mb-4 block">
            The Solution
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              AI-powered evaluation that is fast, fair, and defendable in any audit.
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group relative p-8 rounded-xl bg-white border border-[#1A1A1A]/6 hover:border-[#8A1538]/20 transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                {/* Connecting line decoration */}
                <div className="absolute top-0 left-8 w-px h-3 bg-[#8A1538]/15 -translate-y-full hidden md:block" />

                <div className="w-12 h-12 rounded-lg bg-[#8A1538]/8 flex items-center justify-center mb-5 group-hover:bg-[#8A1538]/12 transition-colors">
                  <Icon className="w-5 h-5 text-[#8A1538]" />
                </div>
                <h3
                  className="text-lg font-bold text-[#1A1A1A] mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
