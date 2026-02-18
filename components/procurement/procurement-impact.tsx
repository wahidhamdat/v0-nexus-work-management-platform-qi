"use client"

import { useEffect, useRef, useState, useCallback } from "react"

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

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  const animate = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])

  useEffect(() => {
    if (inView) animate()
  }, [inView, animate])

  return count
}

const metrics = [
  {
    value: 80,
    suffix: "\u201390%",
    label: "faster evaluation",
    description: "Compress 6-week evaluations into a few days.",
  },
  {
    value: 70,
    suffix: "\u201392%",
    label: "time savings",
    description: "On manual document review and scoring.",
  },
  {
    value: 25,
    suffix: "\u201340%",
    label: "productivity gains",
    description: "For procurement teams across tender cycles.",
  },
  {
    value: 4.8,
    suffix: "M USD",
    label: "annual ROI",
    description: "Mid-sized government agencies see up to 4.8M USD annual ROI from AI-powered bid evaluation.",
    isDecimal: true,
  },
]

export function ProcurementImpact() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="impact"
      ref={sectionRef}
      aria-label="Quantified impact"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8A1538] mb-4 block">
            Quantified Impact
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Results that speak for themselves
          </h2>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricCard({
  metric,
  index,
  inView,
}: {
  metric: (typeof metrics)[number]
  index: number
  inView: boolean
}) {
  const count = useCountUp(
    metric.isDecimal ? Math.round(metric.value * 10) : metric.value,
    inView
  )
  const displayValue = metric.isDecimal ? (count / 10).toFixed(1) : count

  return (
    <div
      className={`relative p-8 rounded-xl bg-white border border-[#1A1A1A]/6 text-center transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${200 + index * 150}ms` }}
    >
      <div className="mb-4">
        <span
          className="text-4xl lg:text-5xl font-bold text-[#8A1538] tabular-nums"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {displayValue}
        </span>
        <span
          className="text-lg font-bold text-[#8A1538]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {metric.suffix}
        </span>
      </div>
      <p className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">
        {metric.label}
      </p>
      <p className="text-sm text-[#5A5A5A] leading-relaxed">
        {metric.description}
      </p>
    </div>
  )
}
