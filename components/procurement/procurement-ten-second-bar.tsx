"use client"

import { useEffect, useRef } from "react"

const facts = [
  "Parallel deployment — no changes to your ERP, committee, or legal timelines.",
  "Complete audit record generated in 48 hours, not weeks.",
  "Every score tied to the exact clause and page it came from.",
  "Deployed on your infrastructure. Your data never leaves your environment.",
  "Operational now. Configurable to your evaluation matrix before the first tender.",
]

export function ProcurementTenSecondBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        itemsRef.current.filter(Boolean).forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                toggleActions: "play none none none",
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
      ref={sectionRef}
      aria-label="At a glance"
      className="relative px-6 py-10 lg:py-14 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col gap-1.5">
          {facts.map((fact, i) => (
            <div
              key={i}
              ref={(el) => {
                itemsRef.current[i] = el
              }}
              className="flex items-start gap-3 py-2.5 border-b border-[#1A1A1A]/5 last:border-b-0 opacity-0"
            >
              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8A1538] mt-[7px]" />
              <p className="text-sm text-[#3A3A3A] leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
