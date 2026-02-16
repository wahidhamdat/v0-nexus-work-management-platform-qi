import { ShieldCheck, FileCheck, ArrowRight } from "lucide-react"

export function PharmaHero() {
  return (
    <section
      aria-label="Hero — AI-powered pharma cold chain quoting"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A1628]" />
      <div className="absolute inset-0 pharma-hex-pattern" />

      {/* Teal radial glow — top right */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,180,216,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
        {/* Left — Copy */}
        <div className="lg:w-[55%]">
          <h1
            className="pharma-fade-in text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance block">
              {"Every pharma quote your team sends is a compliance decision."}
            </span>
          </h1>

          <p className="pharma-fade-in pharma-delay-1 text-base sm:text-lg text-[#8892a4] leading-relaxed max-w-xl mb-10">
            {"Quinn is an AI quoting agent that builds GDP-compliant cold chain quotes in under 5 minutes \u2014 with carrier verification, pharma surcharges, and audit-ready documentation built in. Not bolted on."}
          </p>

          <div className="pharma-fade-in pharma-delay-2 flex flex-col sm:flex-row items-start gap-4 mb-6">
            <a
              href="#report"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00B4D8] text-white text-base font-semibold hover:bg-[#0096B7] transition-colors shadow-[0_0_24px_rgba(0,180,216,0.2)]"
            >
              {"Get the Compliance Report \u2014 Free"}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#quinn-features"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[rgba(255,255,255,0.15)] text-white text-base font-medium hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              See How Quinn Works
            </a>
          </div>

          <p className="pharma-fade-in pharma-delay-3 text-sm text-[#5a6478]">
            {"No demo required. No sales call. Just the data."}
          </p>
        </div>

        {/* Right — Abstract compliance visual */}
        <div className="pharma-fade-in pharma-delay-3 lg:w-[45%] flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-[rgba(0,180,216,0.04)] border border-[rgba(0,180,216,0.1)]" />

            {/* Card */}
            <div className="relative rounded-2xl bg-[#0F1D32] border border-[rgba(255,255,255,0.06)] p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00B4D8]" />
                <span className="text-sm text-[#8892a4] font-medium tracking-wide uppercase">
                  Quinn Compliance Check
                </span>
              </div>

              {/* Checklist items */}
              <div className="flex flex-col gap-5">
                {[
                  { label: "GDP carrier certification verified", done: true },
                  { label: "Reefer monitoring surcharge applied", done: true },
                  { label: "Thermal packaging premium confirmed", done: true },
                  { label: "Audit trail generated", done: true },
                  { label: "Quote ready for review", done: true },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3"
                    style={{
                      opacity: 0,
                      animation: `pharma-fade-in 0.4s cubic-bezier(0.22,1,0.36,1) ${0.8 + i * 0.15}s forwards`,
                    }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-[rgba(0,180,216,0.12)] border border-[rgba(0,180,216,0.25)] flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00B4D8]" />
                    </div>
                    <span className="text-sm text-[#c8cdd6]">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom status */}
              <div className="mt-8 pt-5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#00B4D8]" />
                  <span className="text-sm font-medium text-white">
                    Fully compliant
                  </span>
                </div>
                <span className="text-xs text-[#5a6478]">{"< 5 min"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
