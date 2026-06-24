"use client"

import { useEffect, useRef } from "react"
import { Globe, TrendingUp, Building2 } from "lucide-react"

const marketStats = [
  {
    icon: Globe,
    figure: "USD 13T+",
    context: "annual procurement flow",
    detail:
      "Annual public procurement flow worldwide.",
  },
  {
    icon: TrendingUp,
    figure: "59%",
    context: "peak caseload growth",
    detail:
      "Peak year-on-year increase in Gulf commercial arbitration caseload.",
  },
  {
    icon: Building2,
    figure: "USD 1.2B",
    context: "GCC claims market",
    detail:
      "Value of GCC construction claims and dispute services market today.",
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
              National mandates are turning best practice into legal requirement.
            </span>
          </h2>
          <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg">
            Across the Gulf, national digital transformation agendas are not
            aspirational. They are operational directives with timelines,
            oversight committees, and compliance requirements. Governments
            across the region have established executive-level steering bodies
            with specific mandates over procurement governance and digital
            accountability. Regional arbitration institutions recorded caseload
            increases of 30 to 59 percent in a single year — construction and
            engineering disputes consistently lead the charts. The arbitration
            infrastructure is mature, active, and processing billion-dollar
            claims at volume.
          </p>
          <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg mt-4 font-medium">
            The institutions that deploy contemporaneous documentation
            infrastructure now will not be in the caseload. The institutions that
            do not will fund the next generation of construction arbitration
            practices.
          </p>
          <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg mt-4">
            The window to get ahead of this is measurable. It is not permanent.
          </p>
          <div className="mt-8 w-16 h-[2px] bg-[#8A1538]/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
