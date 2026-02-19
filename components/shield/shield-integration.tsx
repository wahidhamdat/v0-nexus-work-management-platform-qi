"use client"

import { useEffect, useRef } from "react"
import { Plug, Layers, Lock, BarChart3 } from "lucide-react"

const integrations = [
  {
    icon: Plug,
    label: "SAP GTS",
    description: "Native API integration with SAP Global Trade Services",
  },
  {
    icon: Layers,
    label: "Oracle GTM",
    description: "Seamless data flow with Oracle Global Trade Management",
  },
  {
    icon: Lock,
    label: "Custom ERP",
    description: "RESTful API endpoints for any enterprise resource platform",
  },
  {
    icon: BarChart3,
    label: "Screening Tools",
    description: "Augments existing denied party screening infrastructure",
  },
]

export function ShieldIntegration() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        )

        gsap.fromTo(
          diagramRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: diagramRef.current, start: "top 85%" },
          }
        )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%" },
            }
          )
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="integration"
      ref={sectionRef}
      aria-label="Integration"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0D1220]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left - Copy */}
          <div className="lg:w-[50%]">
            <div ref={headingRef} className="opacity-0">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00D4FF] mb-4 block">
                Seamless Integration
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-balance block">
                  Your Existing Infrastructure, Supercharged by AI.
                </span>
              </h2>
              <p className="text-base text-[#7A8BA8] leading-relaxed max-w-lg mb-10">
                {'"'}The Shield{'"'} is engineered for zero-disruption deployment. Its
                API-first design allows for rapid, secure integration with your
                current SAP GTS, Oracle GTM, or other screening tools. It acts as
                an intelligent, headless layer, augmenting your existing
                investments and filling critical compliance gaps without requiring
                a costly rip-and-replace.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {integrations.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      ref={(el) => { cardsRef.current[i] = el }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-[#111827]/80 border border-white/6 opacity-0 hover:border-[#00D4FF]/15 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-md bg-[#00D4FF]/8 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#00D4FF]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-xs text-[#7A8BA8] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right - Architecture diagram */}
          <div className="lg:w-[50%] flex items-center justify-center">
            <div
              ref={diagramRef}
              className="relative w-full max-w-md opacity-0"
            >
              <div className="rounded-2xl bg-[#111827]/80 border border-white/8 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                {/* Title */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#7A8BA8]">
                    Architecture Overview
                  </span>
                </div>

                {/* Layer stack */}
                <div className="flex flex-col gap-3">
                  {/* Your systems */}
                  <div className="rounded-lg bg-[#1E293B] border border-white/6 p-4">
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7A8BA8] mb-2 block">
                      Your Systems
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["ERP", "SAP GTS", "Oracle GTM", "CRM"].map((sys) => (
                        <span
                          key={sys}
                          className="text-xs px-2.5 py-1 rounded bg-[#0A0E1A] border border-white/6 text-[#C0C8D8] font-medium"
                        >
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-4 bg-[#00D4FF]/30" />
                      <div className="w-2 h-2 border-b-2 border-r-2 border-[#00D4FF]/40 rotate-45 -mt-1" />
                    </div>
                  </div>

                  {/* The Shield layer */}
                  <div className="rounded-lg bg-[#00D4FF]/8 border border-[#00D4FF]/20 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/5 via-transparent to-[#00D4FF]/5" />
                    <div className="relative z-10">
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-2 block">
                        The Shield (Agentic AI Layer)
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {["Screening", "Classification", "Audit", "Monitoring"].map((mod) => (
                          <span
                            key={mod}
                            className="text-xs px-2.5 py-1 rounded bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] font-medium"
                          >
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-4 bg-[#00D4FF]/30" />
                      <div className="w-2 h-2 border-b-2 border-r-2 border-[#00D4FF]/40 rotate-45 -mt-1" />
                    </div>
                  </div>

                  {/* Regulatory feeds */}
                  <div className="rounded-lg bg-[#1E293B] border border-white/6 p-4">
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7A8BA8] mb-2 block">
                      Regulatory Feeds
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["BIS", "OFAC", "UN", "EU", "ITAR"].map((feed) => (
                        <span
                          key={feed}
                          className="text-xs px-2.5 py-1 rounded bg-[#0A0E1A] border border-white/6 text-[#C0C8D8] font-medium"
                        >
                          {feed}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
