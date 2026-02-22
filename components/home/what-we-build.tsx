export function WhatWeBuild() {
  const stats = [
    { value: "< 200ms", label: "Screening Latency" },
    { value: "Real-Time", label: "Regulatory Sync — No Weekly Batches" },
    { value: "100%", label: "Audit-Traceable Decisions" },
    { value: "Zero-Disruption", label: "API-First Deployment" },
  ]

  return (
    <section
      id="about"
      className="px-6 py-24 bg-[#06090f] border-t border-[rgba(255,255,255,0.06)]"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#5a6478] mb-4">
          What We Build
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e8ecf1] mb-8 leading-[1.15]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Autonomous AI for Environments Where Errors Have Consequences.
        </h2>
        <div className="space-y-6 text-[#8892a4] leading-relaxed">
          <p>
            Monakes AI builds intelligence systems for the most regulated corners of global commerce. We don&apos;t build productivity tools or workflow dashboards. We build systems that operate autonomously in environments where a single missed entity, a single misclassified item, or a single delayed decision carries legal, financial, and reputational weight.
          </p>
          <p>
            Shield is our answer to the export compliance liability gap — the window between a BIS rule change and the moment your screening tool catches up. That gap is where personal liability lives. Shield closes it. Every order. Every regulatory update. In real time.
          </p>
        </div>

        <hr className="border-[rgba(255,255,255,0.06)] my-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`lg:px-8 ${
                i < stats.length - 1 ? "lg:border-r border-[rgba(255,255,255,0.07)]" : ""
              }`}
            >
              <p className="text-2xl sm:text-3xl font-semibold text-[#e8ecf1] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-[#5a6478]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
