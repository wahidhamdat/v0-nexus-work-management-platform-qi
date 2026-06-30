"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

export function ProcurementCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
          }
        )

        gsap.fromTo(
          trustRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: { trigger: trustRef.current, start: "top 90%" },
          }
        )
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      aria-label="Call to action"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#8A1538]" />
      <div className="absolute inset-0 procurement-grid-pattern-light" />

      {/* Animated radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div ref={contentRef} className="opacity-0">
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              See how Monakes would evaluate your next tender
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mx-auto mb-10">
            Book a 30-minute demo and see Monakes evaluate a real tender
            document live.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/wahidhamdat30/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#8A1538] text-base font-semibold hover:bg-white/90 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8A1538]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                Book a 30-Minute Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a
              href="mailto:info@monakes.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white text-base font-medium hover:bg-white/10 transition-colors duration-300"
            >
              Talk to Founder
            </a>
          </div>
        </div>

        <div ref={trustRef} className="mt-16 pt-10 border-t border-white/10 opacity-0">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "Explainable AI",
              "Audit-Ready Reports",
              "ERP Integration",
              "Human-in-the-Loop",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-sm text-white/60 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
