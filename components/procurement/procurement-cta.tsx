"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

export function ProcurementCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      aria-label="Call to action"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      {/* Maroon background */}
      <div className="absolute inset-0 bg-[#8A1538]" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 procurement-grid-pattern-light" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              See how Monakes would evaluate your next tender
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mx-auto mb-10">
            Book a 30-minute demo and see Monakes evaluate a real tender document live.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#8A1538] text-base font-semibold hover:bg-white/90 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
            >
              Book a 30-Minute Demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@monakesai.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white text-base font-medium hover:bg-white/10 transition-colors"
            >
              Talk to Founder
            </a>
          </div>
        </div>

        {/* Trust elements */}
        <div
          className={`mt-16 pt-10 border-t border-white/10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "Explainable AI",
              "Audit-Ready Reports",
              "ERP Integration",
              "Human-in-the-Loop",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-sm text-white/60 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
