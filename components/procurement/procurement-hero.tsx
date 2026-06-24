"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, FileText } from "lucide-react"

export function ProcurementHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const statusRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function initGSAP() {
      const { gsap } = await import("gsap")
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        // Floating glow
        gsap.to(glowRef.current, {
          x: 30,
          y: -20,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        // Badge
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 }
        )

        // Headline - split by words
        if (headlineRef.current) {
          const words = headlineRef.current.querySelectorAll(".word")
          tl.fromTo(
            words,
            { opacity: 0, y: 40, rotateX: 15 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.04 },
            "-=0.3"
          )
        }

        // Subtext
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )

        // CTA buttons
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )

        // Card
        tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.4"
        )

        // Card items
        tl.fromTo(
          cardItemsRef.current.filter(Boolean),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 },
          "-=0.3"
        )

        // Status bar
        tl.fromTo(
          statusRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.1"
        )
      }, sectionRef)
    }
    initGSAP()
    return () => ctx?.revert()
  }, [])

  const headlineText =
    "Protect the Decision. Close the Documentation Gap. Before It Costs You."
  const words = headlineText.split(" ")

  const cardItems = [
    { label: "RFP document ingested", score: "100%", width: "100%" },
    { label: "Technical criteria scored", score: "94%", width: "94%" },
    { label: "Financial analysis complete", score: "97%", width: "97%" },
    { label: "Compliance verified", score: "100%", width: "100%" },
    { label: "Audit trail generated", score: "100%", width: "100%" },
  ]

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F7F5F2]" />
      <div className="absolute inset-0 procurement-grid-pattern" />

      {/* Animated floating glow */}
      <div
        ref={glowRef}
        className="absolute -top-40 -right-40 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(138,21,56,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Maroon accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8A1538]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
        {/* Left - Copy */}
        <div className="lg:w-[58%]">
          <div ref={badgeRef} className="flex flex-col items-start gap-2 mb-6 opacity-0">
            <div className="flex items-center gap-2">
              <div className="relative w-2 h-2 rounded-full bg-[#8A1538]">
                <div className="absolute inset-0 rounded-full bg-[#8A1538] animate-ping opacity-40" />
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538]">
                AI-Powered Procurement
              </span>
            </div>
            <p className="text-xs text-[#5A5A5A] tracking-wide">
              A QSTP Portfolio Company · Education City, Doha, Qatar
            </p>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight text-[#1A1A1A] leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-heading)", perspective: "600px" }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="word inline-block opacity-0"
                style={{ marginRight: "0.3em" }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-[#5A5A5A] leading-relaxed max-w-xl mb-10 opacity-0"
          >
            Monakes gives governments and large enterprises AI-powered tender
            evaluation with complete, contemporaneous audit records — so every
            procurement decision is defensible the moment it is made.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 opacity-0">
            <a
              href="https://calendly.com/wahidhamdat30/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#8A1538] text-white text-base font-semibold hover:bg-[#6D1030] transition-all duration-300 shadow-[0_2px_16px_rgba(138,21,56,0.15)] hover:shadow-[0_4px_24px_rgba(138,21,56,0.25)]"
            >
              Request a Pilot Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:wahidhamdat30@gmail.com"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#1A1A1A]/15 text-[#1A1A1A] text-base font-medium hover:bg-[#1A1A1A]/5 transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              Investor & Partner Inquiry
            </a>
          </div>
        </div>

        {/* Right - Animated evaluation card */}
        <div className="lg:w-[42%] flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Floating accent dot */}
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#8A1538]/5 blur-sm" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#8A1538]/5 blur-md" />

            <div
              ref={cardRef}
              className="relative rounded-2xl bg-white/90 backdrop-blur-sm border border-[#1A1A1A]/8 p-8 shadow-[0_8px_60px_rgba(0,0,0,0.07)] opacity-0"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="relative w-2.5 h-2.5 rounded-full bg-[#8A1538]">
                  <div className="absolute inset-0 rounded-full bg-[#8A1538] animate-ping opacity-30" />
                </div>
                <span className="text-sm text-[#5A5A5A] font-medium tracking-wide uppercase">
                  Tender Evaluation
                </span>
                <span className="ml-auto text-[10px] font-mono text-[#8A1538]/60 bg-[#8A1538]/5 px-2 py-0.5 rounded">
                  LIVE
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {cardItems.map((item, i) => (
                  <div
                    key={item.label}
                    ref={(el) => { cardItemsRef.current[i] = el }}
                    className="opacity-0"
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#8A1538]/10 border border-[#8A1538]/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#8A1538]" />
                        </div>
                        <span className="text-sm text-[#3A3A3A]">{item.label}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#8A1538] tabular-nums">
                        {item.score}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="ml-8 h-1 rounded-full bg-[#8A1538]/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#8A1538]/25 procurement-progress-bar"
                        style={{ "--target-width": item.width } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                ref={statusRef}
                className="mt-7 pt-5 border-t border-[#1A1A1A]/8 flex items-center justify-between opacity-0"
              >
                <span className="text-sm font-semibold text-[#1A1A1A]">
                  Evaluation complete
                </span>
                <span className="text-xs text-[#5A5A5A] bg-[#8A1538]/8 px-2.5 py-1 rounded-md font-medium">
                  2 days vs 6 weeks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#5A5A5A]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#8A1538]/40 to-transparent procurement-scroll-line" />
      </div>
    </section>
  )
}
