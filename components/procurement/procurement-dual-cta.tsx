"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Building2 } from "lucide-react"

export function ProcurementDualCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const govCardRef = useRef<HTMLDivElement>(null)
  const investorCardRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

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
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
          .fromTo(
            govCardRef.current,
            { opacity: 0, y: 40, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.3"
          )
          .fromTo(
            investorCardRef.current,
            { opacity: 0, y: 40, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .fromTo(
            footerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Call to action"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#8A1538]" />
      <div className="absolute inset-0 procurement-grid-pattern-light" />

      {/* Animated radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight text-center mb-14 opacity-0"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Two conversations. Both matter.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Government CTA */}
          <div
            ref={govCardRef}
            className="relative p-8 lg:p-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] opacity-0 hover:border-white/15 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50">
                For Government &amp; Institutional Teams
              </span>
            </div>

            <p className="text-sm text-white/65 leading-relaxed mb-7">
              Monakes offers a non-disruptive parallel pilot. Your existing
              workflows, committees, legal timelines, and ERP systems remain
              unchanged. Monakes runs alongside a live tender cycle, generating
              its own record in parallel. At the end, you compare. There is no
              integration requirement, no disruption, and no commitment to
              replace existing systems. The pilot is designed to produce
              evidence — for your institution, on your terms.
            </p>

            <p className="text-sm text-white/50 leading-relaxed mb-7">
              If you are responsible for procurement governance at a government
              entity, state-owned enterprise, or major infrastructure
              organization in Qatar or the GCC, the right next step is a
              thirty-minute technical conversation.
            </p>

            <a
              href="https://calendly.com/wahidhamdat30/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#8A1538] text-base font-semibold hover:bg-white/90 transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8A1538]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                Request a Pilot Conversation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Investor CTA */}
          <div
            ref={investorCardRef}
            className="relative p-8 lg:p-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] opacity-0 hover:border-white/15 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50">
                For Investors &amp; Strategic Partners
              </span>
            </div>

            <p className="text-sm text-white/65 leading-relaxed mb-7">
              Monakes is building the compliance infrastructure layer for public
              procurement across the GCC and beyond. The market is structurally
              underserved: enterprise ERP platforms were not designed for
              evidentiary documentation, and manual advisory services do not
              scale. The regulatory environment across Qatar, Saudi Arabia, and
              the UAE is actively creating demand — national digital
              transformation mandates are converting what was once a
              best-practice into a legal requirement.
            </p>

            <p className="text-sm text-white/50 leading-relaxed mb-7">
              We are seeking investors and strategic partners who understand B2G
              infrastructure, the GCC institutional landscape, or both. If that
              describes you, we want to talk.
            </p>

            <a
              href="mailto:wahidhamdat30@gmail.com"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-white text-base font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Investor &amp; Partner Inquiry
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Supporting line */}
        <div ref={footerRef} className="text-center pt-10 border-t border-white/[0.08] opacity-0">
          <p className="text-sm text-white/40">
            Monakes is a QSTP portfolio company headquartered in Doha, Qatar,
            with a strategic roadmap extending to Saudi Arabia and the UAE by
            2027.
          </p>
        </div>
      </div>
    </section>
  )
}
