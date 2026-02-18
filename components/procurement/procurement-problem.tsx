"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, AlertTriangle, Users } from "lucide-react"

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

const stats = [
  {
    icon: Users,
    value: "150\u2013300",
    unit: "staff hours",
    description: "per tender cycle are spent reading and scoring thousands of pages by hand.",
  },
  {
    icon: Clock,
    value: "6+",
    unit: "weeks",
    description: "Evaluation cycles stretch to 6 weeks or more for complex construction and infrastructure projects.",
  },
  {
    icon: AlertTriangle,
    value: "High",
    unit: "risk",
    description: "Human error and inconsistent scoring create disputes, audit findings, and reputational risk.",
  },
]

export function ProcurementProblem() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="problem"
      ref={sectionRef}
      aria-label="Problem"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left - Problem statements */}
          <div className="lg:w-[45%]">
            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-[#8A1538] mb-4 block">
                The Problem
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-balance block">
                  Public procurement teams are drowning in manual work.
                </span>
              </h2>
              <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg">
                Manual tender evaluation doesn{"'"}t scale when you{"'"}re managing billion-dollar project pipelines.
              </p>
            </div>
          </div>

          {/* Right - Stat blocks */}
          <div className="lg:w-[55%] flex flex-col gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.unit}
                  className={`flex items-start gap-5 p-6 rounded-xl bg-[#F7F5F2] border border-[#1A1A1A]/6 transition-all duration-700 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${200 + i * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#8A1538]/8 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#8A1538]" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span
                        className="text-2xl font-bold text-[#1A1A1A]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {stat.value}
                      </span>
                      <span className="text-sm font-semibold text-[#8A1538] uppercase tracking-wide">
                        {stat.unit}
                      </span>
                    </div>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
