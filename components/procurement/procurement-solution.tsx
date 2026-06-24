"use client"

import { useEffect, useRef } from "react"
import { Eye, Shield, UserCheck, Link2 } from "lucide-react"

const features = [
  {
    icon: Link2,
    title: "Seamless Ingestion",
    description:
      "Monakes connects to your ERP, procurement system, or accepts direct upload. The record starts the moment the documents do.",
  },
  {
    icon: Eye,
    title: "Multi-Agent Scoring",
    description:
      "Multi-agent AI evaluates technical, financial, and compliance criteria against your exact evaluation matrix. Every score is generated and locked at the moment of creation.",
  },
  {
    icon: Shield,
    title: "Full Traceability",
    description:
      "Every score traces back to the specific clause, page, and criterion in the original tender document. Not a summary. A citation. The kind that holds in an arbitration proceeding.",
  },
  {
    icon: UserCheck,
    title: "Human Control",
    description:
      "Committees retain complete decision authority. Monakes does not award contracts. It ensures that whatever the committee decides is documented, timestamped, and defensible from the moment the decision is made.",
  },
]

export function ProcurementSolution() {
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

        // Card hover glow effect
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
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headingRef} className="max-w-2xl mb-16 opacity-0">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-4 block">
            The Solution
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              AI-powered evaluation. Contemporaneous documentation. No
              reconstruction required.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative p-8 rounded-xl bg-white border border-[#1A1A1A]/6 hover:border-[#8A1538]/20 transition-all duration-500 opacity-0 overflow-hidden"
              >
                {/* Mouse-follow glow */}
                <div className="card-glow absolute w-[200px] h-[200px] rounded-full bg-[#8A1538]/5 blur-[60px] pointer-events-none opacity-0" />

                {/* Connecting line top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A1538]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#8A1538]/8 flex items-center justify-center mb-5 group-hover:bg-[#8A1538]/12 transition-colors duration-300">
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
