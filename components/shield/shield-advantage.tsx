"use client"

import { useEffect, useRef } from "react"
import { Globe, Cpu, TrendingUp, Shield } from "lucide-react"

const advantages = [
  {
    icon: Globe,
    title: "Geopolitical Agility",
    description:
      "Navigate an unpredictable world with AI that adapts to shifting regulatory landscapes in real-time, keeping you ahead of geopolitical changes.",
  },
  {
    icon: Cpu,
    title: "Autonomous Multi-Agent AI",
    description:
      "Purpose-built Agentic AI agents collaborate to screen, classify, and audit every transaction without human bottlenecks or delays.",
  },
  {
    icon: TrendingUp,
    title: "Operational Efficiency",
    description:
      "Eliminate manual screening backlogs and reduce compliance processing time from hours to milliseconds, freeing your team for strategic work.",
  },
  {
    icon: Shield,
    title: "Ultimate Peace of Mind",
    description:
      "100% deterministic, verifiable results. No AI hallucinations. Every decision is traceable, auditable, and defensible under regulatory scrutiny.",
  },
]

export function ShieldAdvantage() {
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
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, x: i % 2 === 0 ? -30 : 30 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              delay: i * 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
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
      id="advantage"
      ref={sectionRef}
      aria-label="The Monakes AI Advantage"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0A0E1A]" />
      <div className="absolute inset-0 shield-grid-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headingRef} className="max-w-2xl mb-16 opacity-0">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00D4FF] mb-4 block">
            The Advantage
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              Monakes AI: Pioneering Autonomous Compliance.
            </span>
          </h2>
          <p className="text-base text-[#7A8BA8] leading-relaxed max-w-lg">
            As a sub-product of Monakes AI, {'"'}The Shield{'"'} embodies our
            commitment to leveraging advanced Agentic AI to solve the most complex
            challenges in global trade. We provide not just compliance, but
            geopolitical agility, operational efficiency, and the ultimate peace
            of mind for leaders navigating an unpredictable world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative flex items-start gap-6 p-8 rounded-xl bg-[#111827]/80 border border-white/6 opacity-0 hover:border-[#00D4FF]/15 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00D4FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#00D4FF]/8 flex items-center justify-center group-hover:bg-[#00D4FF]/12 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#00D4FF]" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7A8BA8] leading-relaxed">
                    {item.description}
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
