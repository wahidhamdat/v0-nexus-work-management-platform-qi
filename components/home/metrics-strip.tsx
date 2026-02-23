export function MetricsStrip() {
  const items = [
    { value: "< 200ms", label: "Screening Latency Per Transaction" },
    { value: "Real-Time", label: "Entity List Sync — No Weekly Gaps" },
    { value: "100%", label: "Decisions Logged & Audit-Traceable" },
    { value: "Neural", label: "Fuzzy Matching — Catches Name Variants" },
  ]

  return (
    <section className="bg-[#07111F] border-t border-white/[0.08] py-12 px-6" aria-label="Key metrics">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`lg:px-8 text-center lg:text-left ${
              i < items.length - 1 ? "lg:border-r border-white/[0.08]" : ""
            }`}
          >
            <p className="text-xl font-semibold text-white mb-1">{item.value}</p>
            <p className="text-sm text-zinc-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
