"use client"

import { useEffect, useRef } from "react"

export function ProcurementFounder() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
          }
        )
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="founder"
      ref={sectionRef}
      aria-label="Founder"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-6 block text-center">
            Founder
          </span>

          <div
            ref={cardRef}
            className="relative p-10 lg:p-14 rounded-2xl bg-white border border-[#1A1A1A]/6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] opacity-0 overflow-hidden"
          >
            {/* Maroon gradient accent top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8A1538]/30 to-transparent" />

            <div className="flex flex-col items-center text-center">
              {/* Monogram with glow */}
              <div className="relative w-16 h-16 rounded-full bg-[#8A1538]/8 border border-[#8A1538]/15 flex items-center justify-center mb-8">
                <span
                  className="text-lg font-bold text-[#8A1538]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  M
                </span>
                <div className="absolute inset-0 rounded-full bg-[#8A1538]/5 blur-md -z-10" />
              </div>

              <h2
                className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Leadership
              </h2>

              <p className="text-base text-[#5A5A5A] leading-relaxed max-w-2xl">
                Monakes is led by a self-taught technical founder with hands-on
                experience building AI systems for logistics and
                operations-heavy companies. He has worked directly with teams
                dealing with complex documents, tight SLAs, and high-stakes
                decisions, and brings that {"\u201C"}ship fast, fix real
                bottlenecks{"\u201D"} mindset into public procurement.
              </p>

              <div className="w-12 h-px bg-[#8A1538]/15 my-8" />

              <div className="flex items-center gap-3">
                <div className="relative w-2 h-2 rounded-full bg-[#8A1538]">
                  <div className="absolute inset-0 rounded-full bg-[#8A1538] animate-ping opacity-30" />
                </div>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  Execution-first. No hype.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
