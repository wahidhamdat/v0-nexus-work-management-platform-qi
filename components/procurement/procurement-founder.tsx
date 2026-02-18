"use client"

import { useEffect, useRef, useState } from "react"

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

export function ProcurementFounder() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="founder"
      ref={sectionRef}
      aria-label="Founder"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8A1538] mb-4 block text-center">
            Founder
          </span>

          <div className="relative p-10 lg:p-14 rounded-2xl bg-white border border-[#1A1A1A]/6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            {/* Maroon accent bar */}
            <div className="absolute top-0 left-10 right-10 h-px bg-[#8A1538]/20" />

            <div className="flex flex-col items-center text-center">
              {/* Monogram */}
              <div className="w-16 h-16 rounded-full bg-[#8A1538]/8 border border-[#8A1538]/15 flex items-center justify-center mb-8">
                <span
                  className="text-lg font-bold text-[#8A1538]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  M
                </span>
              </div>

              <h2
                className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Leadership
              </h2>

              <p className="text-base text-[#5A5A5A] leading-relaxed max-w-2xl">
                Monakes is led by a self-taught technical founder with hands-on experience building AI systems for logistics and operations-heavy companies. He has worked directly with teams dealing with complex documents, tight SLAs, and high-stakes decisions, and brings that {"\u201C"}ship fast, fix real bottlenecks{"\u201D"} mindset into public procurement.
              </p>

              {/* Subtle divider */}
              <div className="w-12 h-px bg-[#8A1538]/15 my-8" />

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#8A1538]" />
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
