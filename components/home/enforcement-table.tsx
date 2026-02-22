export function EnforcementTable() {
  const rows = [
    {
      company: "Applied Materials",
      penalty: "$252M",
      trigger: "Multi-tier routing to restricted fab — Feb 2026",
    },
    {
      company: "Cadence Design Systems",
      penalty: "$140M+",
      trigger: "EDA software via front companies to Entity List — Jul 2025",
    },
  ]

  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.08] py-16 px-6" id="about" aria-labelledby="enforcement-title">
      <div className="max-w-4xl mx-auto">
        <h2
          id="enforcement-title"
          className="text-2xl font-semibold text-white mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What BIS Is Settling At Right Now
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Enforcement benchmarks shaping the current standard of care.
        </p>
        <div className="border border-white/[0.12] rounded-sm overflow-hidden">
          <table className="w-full text-left" role="table">
            <thead>
              <tr className="border-b border-white/[0.12] bg-white/[0.03]">
                <th className="py-3 px-4 text-xs font-medium uppercase tracking-wider text-zinc-500">Company</th>
                <th className="py-3 px-4 text-xs font-medium uppercase tracking-wider text-zinc-500">Penalty</th>
                <th className="py-3 px-4 text-xs font-medium uppercase tracking-wider text-zinc-500">Trigger</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.company}
                  className="border-b border-white/[0.08] last:border-b-0"
                >
                  <td className="py-4 px-4 text-sm font-medium text-white">{row.company}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-red-600">{row.penalty}</td>
                  <td className="py-4 px-4 text-sm text-zinc-400">{row.trigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
