"use client"

import { useEffect, useRef } from "react"
import { AlertTriangle } from "lucide-react"

const timelineSteps = [
  {
    time: "Tuesday 5 PM",
    event: "BIS adds 15 Chinese entities",
    highlight: false,
  },
  {
    time: "Wednesday 10 AM",
    event: "Order ships to newly-added entity",
    highlight: true,
  },
  {
    time: "Thursday 8 AM",
    event: "Your tool updates",
    highlight: false,
  },
  {
    time: "Friday 9 AM",
    event: "Investigator calls",
    highlight: true,
  },
]

export function ShieldChallenge() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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

        gsap.fromTo(
          timelineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 88%",
            },
          }
        )

        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bodyRef.current,
              start: "top 90%",
            },
          }
        )

        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 92%",
            },
          }
        )
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="challenge"
      ref={sectionRef}
      aria-label="The 24-Hour Gap"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0D1220]" />
      <div
        className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #00D4FF, #00D4FF 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <div ref={headingRef} className="opacity-0 mb-14">
          <div className="flex items-center justify-center gap-2 mb-5">
            <AlertTriangle className="w-4 h-4 text-[#FF6B6B]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF6B6B]">
              The Liability Gap
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              The 24-Hour Gap Where Liability Lives
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="opacity-0 mb-14">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {timelineSteps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Dot on the line */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-4 ${
                      step.highlight
                        ? "border-[#FF6B6B] bg-[#FF6B6B]/15"
                        : "border-[#00D4FF]/40 bg-[#00D4FF]/10"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        step.highlight ? "bg-[#FF6B6B]" : "bg-[#00D4FF]"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-xl p-5 w-full border ${
                      step.highlight
                        ? "bg-[#FF6B6B]/5 border-[#FF6B6B]/20"
                        : "bg-[#111827]/80 border-white/6"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold tracking-wide block mb-2 ${
                        step.highlight ? "text-[#FF6B6B]" : "text-[#00D4FF]"
                      }`}
                    >
                      {step.time}
                    </span>
                    <p
                      className={`text-sm leading-relaxed ${
                        step.highlight ? "text-white font-medium" : "text-[#7A8BA8]"
                      }`}
                    >
                      {step.event}
                    </p>
                  </div>

                  {/* Arrow between steps (mobile only) */}
                  {i < timelineSteps.length - 1 && (
                    <div className="md:hidden flex flex-col items-center my-2">
                      <div className="w-px h-4 bg-[#00D4FF]/20" />
                      <div className="w-2 h-2 border-b border-r border-[#00D4FF]/30 rotate-45 -mt-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body text */}
        <div ref={bodyRef} className="opacity-0 max-w-2xl mx-auto mb-10">
          <p className="text-base sm:text-lg text-[#7A8BA8] leading-relaxed">
            Every shipment in that timeline carries a signature. The question is
            whether screening was executed against the current list.
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0">
          <a
            href="https://calendly.com/wahidhamdat30/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#00D4FF]/30 text-[#00D4FF] text-base font-semibold hover:bg-[#00D4FF]/10 transition-all duration-300"
          >
            Request a Demonstration
          </a>
        </div>
      </div>
    </section>
  )
}
