"use client"

import { useEffect, useRef, useState, useCallback } from "react"

function useCountUp(target: number, shouldStart: boolean, duration = 1800) {
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
    if (shouldStart) animate()
  }, [shouldStart, animate])

  return count
}

interface Metric {
  value: number
  suffix: string
  label: string
  description: string
  isDecimal?: boolean
}

const metrics: Metric[] = [
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
    description:
      "Mid-sized government agencies see up to 4.8M USD annual ROI from AI-powered bid evaluation.",
    isDecimal: true,
  },
]

export function ProcurementImpact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: i * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                onEnter: () => setCounting(true),
              },
            }
          )
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="impact"
      ref={sectionRef}
      aria-label="Quantified impact"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-20 opacity-0">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-4 block">
            Quantified Impact
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Results that speak for themselves
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={i}
              counting={counting}
              cardRef={(el) => { cardsRef.current[i] = el }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricCard({
  metric,
  index,
  counting,
  cardRef,
}: {
  metric: Metric
  index: number
  counting: boolean
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const count = useCountUp(
    metric.isDecimal ? Math.round(metric.value * 10) : metric.value,
    counting
  )
  const displayValue = metric.isDecimal ? (count / 10).toFixed(1) : count

  return (
    <div
      ref={cardRef}
      className="group relative p-8 rounded-xl bg-white border border-[#1A1A1A]/6 text-center opacity-0 hover:border-[#8A1538]/15 transition-colors duration-300 overflow-hidden"
    >
      {/* Top accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#8A1538] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative z-10">
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
    </div>
  )
}
