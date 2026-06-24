"use client"

import { useEffect, useRef } from "react"
import { Shield, Database, Lock, FileCheck } from "lucide-react"

const pillars = [
  {
    icon: FileCheck,
    title: "Qatar Legal Compliance",
    description:
      "The platform is fully aligned with Qatar Law No. 24 of 2015 governing public procurement, including committee structure requirements, evaluation documentation standards, and dispute resolution protocols. Every record Monakes generates is structured to meet the evidentiary requirements of the Qatar Investment and Trade Court.",
  },
  {
    icon: Database,
    title: "Data Sovereignty",
    description:
      "All data processed and stored by Monakes resides on Microsoft Azure Qatar Central — in-country sovereign infrastructure. No tender data, evaluation record, or institutional information leaves Qatar\u2019s jurisdiction. This is a structural guarantee, not a policy commitment.",
  },
  {
    icon: Lock,
    title: "Cybersecurity Architecture",
    description:
      "Infrastructure security is designed to meet the standards of Qatar\u2019s National Cyber Security Agency. Encryption protocols, access controls, and data handling procedures are aligned with the NCSA framework and the Qatar Cybersecurity Framework from the outset, not retrofitted for compliance.",
  },
  {
    icon: Shield,
    title: "Privacy & Data Protection",
    description:
      "The platform is built in full compliance with Qatar\u2019s Personal Data Protection Law. Evaluator identity, scoring behavior, and institutional data are handled under the PDPL framework, with data handling agreements available for institutional review prior to any pilot engagement.",
  },
]

export function ProcurementCompliance() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
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
            trigger: sectionRef.current,
            start: "top 75%",
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
            { opacity: 0, y: 30, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            `-=${i === 0 ? 0.2 : 0.45}`
          )
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Compliance and security"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span
            ref={labelRef}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-6 block opacity-0"
          >
            Compliance &amp; Security
          </span>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-4 opacity-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Institutional-grade infrastructure. Not a feature. The foundation.
          </h2>
          <p
            ref={subRef}
            className="text-base text-[#5A5A5A] leading-relaxed opacity-0"
          >
            For a system that generates legal evidence, infrastructure
            compliance is not a selling point. It is the minimum viable
            standard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className="group relative p-8 lg:p-10 rounded-xl bg-white border border-[#1A1A1A]/6 hover:border-[#8A1538]/20 transition-all duration-500 opacity-0"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#8A1538]/8 flex items-center justify-center group-hover:bg-[#8A1538]/12 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#8A1538]" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-[#1A1A1A] mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">
                      {pillar.description}
                    </p>
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
