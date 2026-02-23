"use client"

import { useEffect, useRef } from "react"
import { Zap, Brain, ShieldCheck, FileKey } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Real-Time Screening",
    description:
      "Every regulatory update from BIS, OFAC, and UN ingested at publication. No weekly batch. Zero-disruption deployment.",
  },
  {
    icon: Brain,
    title: "Neural Fuzzy Matching",
    description:
      "Name variants, transliterations, and obfuscations that exact-match screening misses. Deterministic match rationale.",
  },
  {
    icon: ShieldCheck,
    title: "Deterministic ECCN Classification",
    description:
      "Rules-based classification. Verifiable, deterministic results. No hallucinations.",
  },
  {
    icon: FileKey,
    title: "Immutable Audit Trail",
    description:
      "Every decision, list version, and match rationale cryptographically logged. Export a complete audit record when regulators require it.",
  },
]

export function ShieldSolution() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: i * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              },
            }
          )
        })

        cardsRef.current.filter(Boolean).forEach((card) => {
          const glowEl = card?.querySelector(".card-glow") as HTMLElement | null
          const handleMove = (e: MouseEvent) => {
            if (!card || !glowEl) return
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            gsap.to(glowEl, {
              x: x - 100,
              y: y - 100,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            })
          }
          const handleLeave = () => {
            if (!glowEl) return
            gsap.to(glowEl, { opacity: 0, duration: 0.5 })
          }
          card?.addEventListener("mousemove", handleMove)
          card?.addEventListener("mouseleave", handleLeave)
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="solution"
      ref={sectionRef}
      aria-label="Solution"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0A0E1A]" />
      <div className="absolute inset-0 shield-grid-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headingRef} className="max-w-2xl mb-16 opacity-0">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4A7FA5] mb-4 block">
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              How Shield Operates
            </span>
          </h2>
          <p className="text-base text-[#7A8BA8] leading-relaxed max-w-xl">
            Shield screens every transaction against the current regulatory list at the moment of processing. Sub-200ms. Deterministic. Immutable audit trail.
          </p>
        </div>

        {/* 5 feature cards: 3 on top row, 2 on bottom centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className={`group relative p-8 rounded-xl bg-[#111827]/80 border border-white/6 hover:border-[#4A7FA5]/20 transition-all duration-500 opacity-0 overflow-hidden ${
                  i >= 3 ? "lg:col-span-1 lg:last:col-start-2" : ""
                }`}
              >
                <div className="card-glow absolute w-[200px] h-[200px] rounded-full bg-[#4A7FA5]/5 blur-[60px] pointer-events-none opacity-0" />

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A7FA5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#4A7FA5]/8 flex items-center justify-center mb-5 group-hover:bg-[#4A7FA5]/12 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#4A7FA5]" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#7A8BA8] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
