"use client"

import { useEffect, useRef } from "react"
import { CheckCircle2, Scale, Server, Users } from "lucide-react"

const validations = [
  {
    icon: CheckCircle2,
    title: "Platform",
    description:
      "Core engine operational. Automated 48-hour record generation tested and validated. Real-time evaluator interface finalized.",
  },
  {
    icon: Scale,
    title: "Legal",
    description:
      "ICC-validated evidentiary architecture. Full alignment with international procurement law standards. Adaptable to national procurement frameworks across jurisdictions.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description:
      "Sovereign deployment model confirmed. Client-controlled hosting. No data leaves the institution\u2019s environment.",
  },
  {
    icon: Users,
    title: "Partners",
    description:
      "Implementation partner network active. Deployment pipeline established across target markets.",
  },
]

export function ProcurementTraction() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

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

        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        )
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
            Built, validated, and ready to deploy.
          </h2>

          <p
            ref={subRef}
            className="text-lg text-[#5A5A5A] leading-relaxed mb-0 opacity-0"
          >
            Monakes is not in development. The platform is operational,
            compliance-validated, and deploying through institutional
            implementation partners.
          </p>
        </div>

        <div ref={bodyRef} className="max-w-3xl mb-14 opacity-0">
          <p className="text-base text-[#5A5A5A] leading-relaxed mb-4">
            The Monakes core engine is live. The three-pillar evidentiary
            architecture — temporal lock, automated rationale, and zero
            reconstruction — has been validated against ICC arbitration
            standards and international procurement law frameworks. The platform
            does not require custom development for deployment. It requires
            configuration: mapping an institution&apos;s existing evaluation
            criteria and scoring matrices into the Monakes environment, which is
            completed before a single tender is touched.
          </p>
          <p className="text-base text-[#5A5A5A] leading-relaxed mb-4">
            Deployment is executed through a network of institutional
            implementation partners — system integrators, procurement
            consultancies, and public sector technology firms with established
            relationships inside government and infrastructure organizations.
            Monakes does not sell direct into every market. It provides the
            engine. Partners provide the institutional access, the local
            regulatory knowledge, and the implementation infrastructure.
          </p>
          <p className="text-base text-[#5A5A5A] leading-relaxed">
            On data sovereignty: Monakes does not prescribe infrastructure. The
            platform deploys on the client&apos;s own sovereign cloud
            environment — whether that is an in-country Microsoft Azure region,
            a government private cloud, an on-premise installation, or a hybrid
            architecture. The institution&apos;s data never moves to a
            Monakes-controlled environment. It stays where the institution
            requires it to stay. This is not a configuration option. It is the
            architecture.
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

        {/* Partner CTA */}
        <div ref={ctaRef} className="text-center opacity-0">
          <p className="text-xs text-[#8A1538]/60 font-medium tracking-wide mb-0">
            That is it. No geographic claims. No hedging. The platform works,
            the model is proven, and it deploys through partners onto client
            infrastructure.
          </p>
        </div>
      </div>
    </section>
  )
}
