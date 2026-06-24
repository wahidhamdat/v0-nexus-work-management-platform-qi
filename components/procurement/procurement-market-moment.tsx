"use client"

import { useEffect, useRef } from "react"

const stats = [
  { value: "USD 15T", label: "annual global public procurement flow" },
  { value: "USD 39.2B", label: "projected AI procurement market by 2035" },
  { value: "28% CAGR", label: "growth rate of AI in procurement, 2026\u20132035" },
]

export function ProcurementMarketMoment() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

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
            bodyRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.3"
          )

        statsRef.current.filter(Boolean).forEach((el, i) => {
          tl.fromTo(
            el,
            { opacity: 0, y: 30, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            `-=${i === 0 ? 0.2 : 0.35}`
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
      aria-label="Market moment"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(138,21,56,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(138,21,56,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient glows */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(138,21,56,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(138,21,56,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span
            ref={labelRef}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-6 block opacity-0"
          >
            The Market Moment
          </span>

          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6 opacity-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Public procurement is the largest undigitized market on earth. That
            is changing now.
          </h2>

          <div ref={bodyRef} className="opacity-0">
            <p className="text-base text-white/60 leading-relaxed mb-4">
              Governments worldwide spend between 13 and 20 percent of GDP
              through public procurement systems — over USD 15 trillion
              annually. For decades, the evaluation of that spending has relied
              on manual committee work, paper-based scoring, and retrospective
              documentation assembled under legal pressure.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-4">
              That model is breaking. In 2025, the UK government doubled its AI
              procurement spend year-on-year. The United States committed USD
              5.6 billion to federal AI projects between 2022 and 2024. Across
              the GCC, Saudi Arabia, the UAE, and Qatar are under national
              mandate to make every procurement decision transparent, auditable,
              and digitally defensible — not as a future ambition, but as a
              present regulatory requirement.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              The window to define the infrastructure layer for this shift is
              open. It will not stay open. Monakes is built for this moment:
              purpose-built for the legal, regulatory, and institutional
              realities of public procurement — not adapted from enterprise
              software designed for something else.
            </p>
          </div>
        </div>

        {/* Stat bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => {
                statsRef.current[i] = el
              }}
              className="relative p-8 rounded-xl bg-white/[0.03] border border-white/[0.06] opacity-0 hover:border-[#8A1538]/20 transition-colors duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A1538]/20 to-transparent opacity-0 group-hover:opacity-100" />
              <div
                className="text-3xl lg:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Source note */}
        <p className="mt-8 text-xs text-white/25">
          Sources: OECD, Precedence Research, Open Contracting Partnership,
          Jaggaer GCC market analysis (2025–2026)
        </p>
      </div>
    </section>
  )
}
