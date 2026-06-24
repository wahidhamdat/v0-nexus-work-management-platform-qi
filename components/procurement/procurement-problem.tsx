"use client"

import { useEffect, useRef } from "react"
import { Clock, AlertTriangle, Users } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "150\u2013300",
    unit: "staff hours",
    description:
      "per tender cycle spent on manual scoring and documentation.",
  },
  {
    icon: Clock,
    value: "6+",
    unit: "weeks",
    description:
      "before a complete evaluation record exists in most institutions.",
  },
  {
    icon: AlertTriangle,
    value: "USD 98.7M",
    unit: "average claim",
    description:
      "per project dispute globally — 35% of total project CAPEX.",
  },
]

export function ProcurementProblem() {
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
        // Heading reveal
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )

        // Cards stagger from right
        cardsRef.current.filter(Boolean).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 60, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.7,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          )
        })

        // Hover tilt on cards
        cardsRef.current.filter(Boolean).forEach((card) => {
          const handleMove = (e: MouseEvent) => {
            if (!card) return
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const rotateX = ((y - centerY) / centerY) * -3
            const rotateY = ((x - centerX) / centerX) * 3
            gsap.to(card, {
              rotateX,
              rotateY,
              duration: 0.4,
              ease: "power2.out",
              transformPerspective: 800,
            })
          }
          const handleLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: "power2.out",
            })
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
      id="problem"
      ref={sectionRef}
      aria-label="Problem"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />
      {/* Subtle diagonal line decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #8A1538, #8A1538 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div ref={headingRef} className="lg:w-[45%] opacity-0">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-4 block">
              The Problem
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-balance block">
                The decision was sound. The record could not prove it.
              </span>
            </h2>
            <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg">
              Procurement committees evaluate billion-dollar tenders under
              institutional pressure, tight timelines, and complex scoring
              matrices. The evaluations are rigorous. The decisions are
              defensible. The documentation is assembled afterward — sometimes
              weeks after — from notes, emails, and committee memory.
            </p>
            <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg mt-4">
              When a contractor files a formal protest, an informal complaint
              reaches the minister's office, or an international arbitration
              claim is lodged, that retrospective record becomes the
              institution's entire line of defense. Arbitral tribunals and audit
              bodies do not evaluate what the committee intended to do. They
              evaluate what the record shows was done, at the time it was done.
            </p>
            <p className="text-base text-[#5A5A5A] leading-relaxed max-w-lg mt-4 font-medium">
              The exposure is not the decision. The exposure is the gap between
              when the decision was made and when the record was built.
            </p>
            {/* Accent line */}
            <div className="mt-8 w-16 h-[2px] bg-[#8A1538]/20" />
          </div>

          <div className="lg:w-[55%] flex flex-col gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.unit}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="flex items-start gap-5 p-6 rounded-xl bg-[#F7F5F2] border border-[#1A1A1A]/6 opacity-0 will-change-transform hover:border-[#8A1538]/15 transition-colors duration-300"
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
