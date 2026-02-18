"use client"

import { ArrowRight, FileText } from "lucide-react"

export function ProcurementHero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#F7F5F2]" />
      <div className="absolute inset-0 procurement-grid-pattern" />

      {/* Subtle maroon radial glow top-right */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(138,21,56,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
        {/* Left - Copy */}
        <div className="lg:w-[58%]">
          <div className="procurement-fade-in flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#8A1538]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#8A1538]">
              AI-Powered Procurement
            </span>
          </div>

          <h1
            className="procurement-fade-in procurement-delay-1 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight text-[#1A1A1A] leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              Cut Tender Evaluation Time by 80{"\u2013"}90% with Explainable AI for Public Procurement
            </span>
          </h1>

          <p className="procurement-fade-in procurement-delay-2 text-base sm:text-lg text-[#5A5A5A] leading-relaxed max-w-xl mb-10">
            Monakes helps governments and large enterprises evaluate complex construction and infrastructure tenders in days instead of 6+ weeks {"\u2013"} with full transparency, auditability, and human control.
          </p>

          <div className="procurement-fade-in procurement-delay-3 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#final-cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#8A1538] text-white text-base font-semibold hover:bg-[#6D1030] transition-colors shadow-[0_2px_16px_rgba(138,21,56,0.15)]"
            >
              Book a 30-Minute Demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#1A1A1A]/15 text-[#1A1A1A] text-base font-medium hover:bg-[#1A1A1A]/5 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View 1-Page Overview
            </a>
          </div>
        </div>

        {/* Right - Abstract visual */}
        <div className="procurement-fade-in procurement-delay-3 lg:w-[42%] flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Card */}
            <div className="relative rounded-2xl bg-white border border-[#1A1A1A]/8 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              {/* Header */}
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8A1538]" />
                <span className="text-sm text-[#5A5A5A] font-medium tracking-wide uppercase">
                  Tender Evaluation
                </span>
              </div>

              {/* Evaluation progress */}
              <div className="flex flex-col gap-5">
                {[
                  { label: "RFP document ingested", score: "100%" },
                  { label: "Technical criteria scored", score: "94%" },
                  { label: "Financial analysis complete", score: "97%" },
                  { label: "Compliance verified", score: "100%" },
                  { label: "Audit trail generated", score: "100%" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3"
                    style={{
                      opacity: 0,
                      animation: `procurement-fade-in 0.4s cubic-bezier(0.22,1,0.36,1) ${0.8 + i * 0.15}s forwards`,
                    }}
                  >
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
                ))}
              </div>

              {/* Bottom status */}
              <div className="mt-7 pt-5 border-t border-[#1A1A1A]/8 flex items-center justify-between">
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
    </section>
  )
}
