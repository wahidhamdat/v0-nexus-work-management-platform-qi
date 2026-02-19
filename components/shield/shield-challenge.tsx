"use client"

import { useEffect, useRef } from "react"
import { Clock, AlertTriangle, ShieldAlert } from "lucide-react"

const vulnerabilities = [
  {
    icon: Clock,
    title: "Batch Processing Latency",
    description:
      "Traditional GTM systems rely on batch updates, creating a critical window where regulatory changes outpace your screening capabilities.",
  },
  {
    icon: AlertTriangle,
    title: "Static Data Exposure",
    description:
      "Legacy screening tools use static list snapshots, leaving organizations exposed to newly sanctioned entities between update cycles.",
  },
  {
    icon: ShieldAlert,
    title: "Personal & Corporate Liability",
    description:
      "For VPs of Export Compliance, this latency gap translates directly into heightened personal and corporate liability, exposing operations to enforcement actions.",
  },
]

export function ShieldChallenge() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 60, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.7,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            }
          )
        })

        cardsRef.current.filter(Boolean).forEach((card) => {
          const handleMove = (e: MouseEvent) => {
            if (!card) return
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const rotateX = ((y - centerY) / centerY) * -3
            const rotateY = ((x - centerX) / centerX) * 3
            gsap.to(card, {
              rotateX,
              rotateY,
              duration: 0.4,
              ease: "power2.out",
              transformPerspective: 800,
            })
          }
          const handleLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: "power2.out",
            })
          }
          card?.addEventListener("mousemove", handleMove)
          card?.addEventListener("mouseleave", handleLeave)
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="challenge"
      ref={sectionRef}
      aria-label="The Challenge"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0D1220]" />
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #00D4FF, #00D4FF 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div ref={headingRef} className="lg:w-[45%] opacity-0">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00D4FF] mb-4 block">
              The Challenge
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-balance block">
                The Inherent Vulnerability of Legacy Compliance.
              </span>
            </h2>
            <p className="text-base text-[#7A8BA8] leading-relaxed max-w-lg">
              Traditional Global Trade Management systems, while foundational,
              are constrained by batch processing and static data updates. This
              creates a critical latency gap -- a window of vulnerability where
              regulatory changes outpace your screening capabilities.
            </p>
            <div className="mt-8 w-16 h-[2px] bg-[#00D4FF]/20" />
          </div>

          <div className="lg:w-[55%] flex flex-col gap-6">
            {vulnerabilities.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="flex items-start gap-5 p-6 rounded-xl bg-[#111827]/80 border border-white/6 opacity-0 will-change-transform hover:border-[#00D4FF]/15 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#00D4FF]/8 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-white mb-1.5"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#7A8BA8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
