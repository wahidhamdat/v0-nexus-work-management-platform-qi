export function WhatShieldDoes() {
  const columns = [
    {
      title: "Real-Time Entity Screening",
      text: "Every transaction checked against the current Entity List, SDN List, and MEU List at the moment it is processed. Not yesterday's list. Not last week's. The list as it stands right now.",
    },
    {
      title: "Neural Fuzzy Matching",
      text: "Restricted entities don't always appear under their registered name. Shield catches variants, transliterations, and abbreviated trade names that exact-match screening misses. The match that saves you is the one a human would have skipped.",
    },
    {
      title: "Immutable Audit Logs",
      text: "Every screening decision logged with timestamp, list version, match rationale, and result. When BIS asks for your compliance record, you send one file. Complete. Timestamped. Defensible.",
    },
  ]

  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.08] py-16 px-6" aria-labelledby="what-shield-title">
      <div className="max-w-5xl mx-auto">
        <h2
          id="what-shield-title"
          className="text-2xl font-semibold text-white mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What Shield Does
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {columns.map((col) => (
            <div key={col.title} className="md:border-r border-white/[0.08] last:border-r-0 md:pr-8 last:pr-0">
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">{col.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{col.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
