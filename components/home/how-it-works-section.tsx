export function HowItWorksSection() {
  const steps = [
    {
      title: "Transaction Received",
      body: "Shipment data enters Shield via API. No manual entry. No human delay.",
    },
    {
      title: "Screened in Real Time",
      body: "Neural matching runs against current restricted lists in under 200ms. Pass. Flag. Block.",
    },
    {
      title: "Decision Logged Permanently",
      body: "Result recorded with full context. Immutable. Exportable. Audit-ready.",
    },
  ]

  return (
    <section className="bg-[#07111F] border-t border-white/[0.08] py-16 px-6" aria-labelledby="how-it-works-title">
      <div className="max-w-5xl mx-auto">
        <h2
          id="how-it-works-title"
          className="text-2xl font-semibold text-white mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Built for the Moment the Order Ships
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="md:border-r border-white/[0.08] last:border-r-0 md:pr-8 last:pr-0">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                Step {i + 1}
              </p>
              <h3 className="text-base font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
