"use client"

import { useEffect, useRef } from "react"
import { CheckCircle2, Scale, Server, Users } from "lucide-react"

const validations = [
  {
    icon: CheckCircle2,
    title: "Platform",
    description:
      "Core engine live. Clause-level evidentiary record generation tested and validated against real Gulf tender documentation. Real-time evaluator interface finalized.",
  },
  {
    icon: Scale,
    title: "Legal",
    description:
      "ICC-validated evidentiary architecture. Aligned with international procurement law. Configurable to national procurement frameworks across jurisdictions.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description:
      "Sovereign deployment confirmed. Client-controlled hosting. Zero data transfer to external environments.",
  },
  {
    icon: Users,
    title: "Pipeline",
    description:
      "Partner conversations underway for deployment within government ministries.",
  },
]

export function ProcurementTraction() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
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
            start: "top 70%",
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
          .fromTo(
            bodyRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.2"
          )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          tl.fromTo(
            card,
            { opacity: 0, y: 30, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            `-=${i === 0 ? 0.3 : 0.4}`
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
      aria-label="Traction and validation"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span
            ref={labelRef}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-6 block opacity-0"
          >
            Traction &amp; Validation
          </span>

          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-4 opacity-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built, validated, and moving to deployment.
          </h2>

          <p
            ref={subRef}
            className="text-lg text-[#5A5A5A] leading-relaxed mb-0 opacity-0"
          >
            The engine is live. The architecture is validated. The deployment
            conversations are active.
          </p>
        </div>

        <div ref={bodyRef} className="max-w-3xl mb-14 opacity-0">
          <p className="text-base text-[#5A5A5A] leading-relaxed mb-4">
            The Monakes core engine is operational. The three-pillar evidentiary
            architecture — temporal lock, automated rationale, and zero
            reconstruction — has been validated against ICC arbitration
            standards and international procurement law frameworks. The platform
            does not require custom development for deployment. It requires
            configuration: mapping an institution&apos;s existing evaluation
            criteria into the Monakes environment before a single tender is
            touched.
          </p>

          <p className="text-base text-[#5A5A5A] leading-relaxed mb-4">
            Internal benchmarking against real Gulf tender documentation
            structures demonstrates compression of a standard 6-week evaluation
            cycle to under 48 hours, with complete clause-level traceability
            across technical, financial, and compliance scoring. Every score
            timestamped. Every score locked. Every score traceable to its source
            document.
          </p>

          <p className="text-base text-[#5A5A5A] leading-relaxed mb-4">
            Monakes is currently in active conversations with institutional
            implementation partners in Qatar to deploy across government
            ministries. These deployments will run alongside live tender
            cycles — zero disruption to existing workflows, committees, or ERP
            systems — and will produce the third-party verifiable deployment
            record that confirms what the platform already demonstrates
            internally.
          </p>

          <p className="text-base text-[#5A5A5A] leading-relaxed">
            On data sovereignty: the platform deploys on the client&apos;s own
            controlled environment. There is no Monakes-controlled data store.
            Tender records, evaluation data, and institutional information never
            leave the client&apos;s infrastructure. This holds regardless of
            jurisdiction, region, or hosting model.
          </p>
        </div>

        {/* Validation grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {validations.map((v, i) => {
            const Icon = v.icon
            return (
              <div
                key={v.title}
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className="group relative p-6 rounded-xl bg-white border border-[#1A1A1A]/6 hover:border-[#8A1538]/20 transition-all duration-500 opacity-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8A1538]/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8A1538]/12 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-[#8A1538]" />
                  </div>
                  <h4
                    className="text-sm font-bold text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {v.title}
                  </h4>
                </div>
                <p className="text-xs text-[#5A5A5A] leading-relaxed">
                  {v.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
