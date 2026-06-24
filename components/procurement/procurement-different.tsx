"use client"

import { useEffect, useRef } from "react"
import { FileSearch, Building2, Gavel } from "lucide-react"

const differentiators = [
  {
    icon: FileSearch,
    title: "Explainability by design",
    description:
      "Every score Monakes generates is traceable to a specific clause, page, and criterion in the original tender document. Not summarized. Not inferred. Cited. When a procurement committee faces an audit, a formal challenge, or a parliamentary inquiry, the record does not require reconstruction — it already exists.",
  },
  {
    icon: Building2,
    title: "Sovereign infrastructure",
    description:
      "Monakes operates on Microsoft Azure Qatar Central — sovereign, in-country cloud infrastructure aligned with Qatar\u2019s National Cyber Security Agency standards, PDPL data protection requirements, and QCF compliance architecture. Institutions do not send sensitive tender data outside their jurisdiction.",
  },
  {
    icon: Gavel,
    title: "Human authority, always",
    description:
      "Monakes is not an autonomous decision system. It is an institutional intelligence layer. Committees retain complete authority over final awards. Monakes ensures that whatever decision they make is documented, justified, and defensible before, during, and after any challenge.",
  },
]

export function ProcurementDifferent() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })

        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        )
          .fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.2"
          )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          tl.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            `-=${0.25 + i * 0.1}`
          )
        })

        // Card hover glow
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
      ref={sectionRef}
      aria-label="How Monakes is different"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span
            ref={labelRef}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-4 block opacity-0"
          >
            What Sets Us Apart
          </span>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-4 opacity-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built for institutions that cannot afford to be wrong.
          </h2>
          <p
            ref={subRef}
            className="text-base text-[#5A5A5A] leading-relaxed opacity-0"
          >
            Most procurement software was built for speed. Monakes is built for
            defensibility — the standard that actually matters in public sector
            evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className="group relative p-8 lg:p-10 rounded-xl bg-[#F7F5F2] border border-[#1A1A1A]/6 hover:border-[#8A1538]/20 transition-all duration-500 opacity-0 overflow-hidden"
              >
                {/* Mouse-follow glow */}
                <div className="card-glow absolute w-[200px] h-[200px] rounded-full bg-[#8A1538]/4 blur-[60px] pointer-events-none opacity-0" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#8A1538]/8 flex items-center justify-center mb-5 group-hover:bg-[#8A1538]/12 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#8A1538]" />
                  </div>
                  <h3
                    className="text-lg font-bold text-[#1A1A1A] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5A5A5A] leading-relaxed">
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
