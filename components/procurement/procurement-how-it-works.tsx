"use client"

import { useEffect, useRef, useState } from "react"
import { Upload, Cpu, Users } from "lucide-react"

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
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

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Get your documents in",
    items: [
      {
        label: "ERP Integration",
        text: "Pulls RFPs and bids directly from SAP, Oracle, Procore, or your existing procurement system.",
      },
      {
        label: "Simple Upload",
        text: "Drag-and-drop PDFs, Word docs, Excel sheets \u2013 whatever format your bidders use.",
      },
    ],
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI evaluates",
    items: [
      {
        label: "Multi-Agent Analysis",
        text: "Multi-agent models evaluate compliance, pricing, and technical responses in minutes, flagging anomalies and risks automatically.",
      },
    ],
  },
  {
    number: "03",
    icon: Users,
    title: "Committees decide",
    items: [
      {
        label: "Human Review",
        text: "Your team reviews ranked bids with full justifications, adjusts scores if needed, and exports an audit-ready report.",
      },
    ],
  },
]

export function ProcurementHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-label="How it works"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8A1538] mb-4 block">
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Three steps to audit-ready evaluation
          </h2>
        </div>

        {/* Steps - Horizontal on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${300 + i * 200}ms` }}
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 right-0 w-full h-px bg-[#8A1538]/10 translate-x-1/2 z-0" />
                )}

                <div className="relative z-10 lg:px-8">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-[#8A1538]/8 flex items-center justify-center relative">
                      <Icon className="w-6 h-6 text-[#8A1538]" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#8A1538] text-white text-[10px] font-bold flex items-center justify-center">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-[#1A1A1A] mb-5"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>

                  {/* Items */}
                  <div className="flex flex-col gap-4">
                    {step.items.map((item) => (
                      <div key={item.label}>
                        <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm text-[#5A5A5A] leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
