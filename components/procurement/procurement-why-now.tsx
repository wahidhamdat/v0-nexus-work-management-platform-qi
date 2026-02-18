"use client"

import { useEffect, useRef } from "react"
import { Globe, Database, TrendingUp, Target } from "lucide-react"

const marketStats = [
  {
    icon: Globe,
    figure: "13\u201320%",
    context: "of GDP worldwide",
    detail:
      "Public procurement = 13\u201320% of GDP worldwide (USD 13T+ annually).",
  },
  {
    icon: Database,
    figure: "~USD 15T",
    context: "global flow",
    detail:
      "15% of global GDP flows through public procurement systems (~USD 15T).",
  },
  {
    icon: TrendingUp,
    figure: "USD 362.8B",
    context: "opened annually",
    detail:
      "USD 362.8B in value opened up annually by procurement open data alone (2.81% of total spend).",
  },
  {
    icon: Target,
    figure: "50%+",
    context: "savings potential",
    detail:
      "Centralized procurement delivers 50%+ savings; most tools achieve 5\u201310% price savings.",
  },
]

export function ProcurementWhyNow() {
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
      id="why-now"
      ref={sectionRef}
      aria-label="Why now"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headingRef} className="max-w-2xl mb-16 opacity-0">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-4 block">
            Why Now
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              A trillion-dollar market waiting for better tools
            </span>
          </h2>
          <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg">
            Monakes captures the evaluation bottleneck in this trillion-dollar
            market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.context}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative flex items-start gap-6 p-8 rounded-xl bg-[#F7F5F2] border border-[#1A1A1A]/6 opacity-0 hover:border-[#8A1538]/15 transition-all duration-300 overflow-hidden"
              >
                {/* Hover reveal accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8A1538] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#8A1538]/8 flex items-center justify-center group-hover:bg-[#8A1538]/12 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#8A1538]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className="text-2xl lg:text-3xl font-bold text-[#1A1A1A]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {stat.figure}
                    </span>
                    <span className="text-sm text-[#8A1538] font-semibold uppercase tracking-wide">
                      {stat.context}
                    </span>
                  </div>
                  <p className="text-sm text-[#5A5A5A] leading-relaxed">
                    {stat.detail}
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
