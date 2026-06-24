"use client"

import { useEffect, useRef } from "react"
import { Upload, Cpu, Users } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Documents in",
    items: [
      {
        label: "ERP Integration",
        text: "Pulls RFPs and bids from SAP, Oracle, Procore, or your existing procurement system. The evaluation clock starts. So does the evidentiary record.",
      },
      {
        label: "Direct Upload",
        text: "Accepts PDFs, Word documents, and Excel sheets. The record starts the moment the documents do.",
      },
    ],
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI evaluates",
    items: [
      {
        label: "Multi-Agent Analysis",
        text: "Multi-agent models score compliance, technical response, and financial criteria in parallel. Anomalies and risks are flagged automatically. Every scoring action is timestamped, attributed, and locked.",
      },
    ],
  },
  {
    number: "03",
    icon: Users,
    title: "Committees decide",
    items: [
      {
        label: "Human Review",
        text: "Your team reviews ranked bids with full clause-level justifications, adjusts scores where required, and exports a complete audit-ready report. The record is not produced after the committee decides. It is produced as the committee works.",
      },
    ],
  },
]

export function ProcurementHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Heading
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

        // Animated connector line (desktop)
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power2.inOut",
              scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
            }
          )
        }

        // Steps cascade
        stepsRef.current.filter(Boolean).forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 60, rotateY: -5 },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              duration: 0.8,
              delay: i * 0.2,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 88%" },
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
      id="how-it-works"
      ref={sectionRef}
      aria-label="How it works"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-20 opacity-0">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-4 block">
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Three steps to a record that holds.
          </h2>
        </div>

        {/* Animated connector line */}
        <div className="hidden lg:block relative h-px mb-12">
          <div
            ref={lineRef}
            className="absolute top-0 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#8A1538]/5 via-[#8A1538]/20 to-[#8A1538]/5 origin-left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el }}
                className="relative opacity-0 will-change-transform"
                style={{ perspective: "600px" }}
              >
                <div className="relative z-10 lg:px-8">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-[#8A1538]/8 flex items-center justify-center relative group">
                      <Icon className="w-6 h-6 text-[#8A1538]" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#8A1538] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(138,21,56,0.3)]">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold text-[#1A1A1A] mb-5"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {step.items.map((item) => (
                      <div
                        key={item.label}
                        className="p-4 rounded-lg bg-[#F7F5F2]/80 border border-[#1A1A1A]/4 hover:border-[#8A1538]/10 transition-colors duration-300"
                      >
                        <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm text-[#5A5A5A] leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
