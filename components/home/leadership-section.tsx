export function LeadershipSection() {
  const people = [
    {
      initials: "FH",
      name: "Dr. Fadel Hamdat",
      title: "Strategic Advisor & Board Member",
      bio: "Dr. Hamdat is a former entrepreneur with deep operational roots in quality management. He has spent decades building and running organisations where precision, process integrity, and accountability are not optional — they are the baseline. That background is directly relevant to what Shield does: autonomous systems operating in environments where a single classification error or missed entity carries real consequences. He joined Monakes AI because he recognised that Shield is, at its core, a quality infrastructure play — and quality infrastructure is what he has built his career on.",
      useDotGrid: false,
    },
    {
      initials: "MH",
      name: "Mohamed Hamdat",
      title: "Founder · CEO · CTO",
      bio: "Mohamed founded Monakes AI and personally architects its production systems. The decisions governing how Shield screens, classifies, and logs — in real time, at scale, under regulatory scrutiny — are his decisions. He is not a CEO who delegates engineering. He is the engineer who built the company around it. Shield's screening architecture, matching logic, and audit infrastructure are his direct work.",
      useDotGrid: false,
    },
    {
      initials: null,
      name: "Engineering & AI Research",
      title: "Distributed · World-Class · Specialist",
      bio: "Our engineering capability is assembled from specialists recruited for the precision demands of compliance automation and real-time regulatory systems. Every person working on Shield is accountable for a specific outcome and operates with the understanding that errors in this domain carry legal and financial consequences.",
      useDotGrid: true,
    },
  ]

  return (
    <section
      id="leadership"
      className="px-6 py-24 bg-[#0a0a0a] border-t border-white/[0.08]"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#5a6478] mb-4">
          Leadership
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e8ecf1] mb-3 leading-[1.15]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The People Responsible for What We Ship.
        </h2>
        <p className="text-[#8892a4] mb-16 max-w-2xl">
          No advisory board theatre. The people listed here are the people making decisions and building the product.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {people.map((person) => (
            <div
              key={person.name}
              className="p-6 rounded-lg bg-[#0d1117] border border-white/[0.07] transition-transform hover:scale-[1.005]"
            >
              <div className="mb-5">
                {person.useDotGrid ? (
                  <div
                    className="w-20 h-20 rounded-full bg-[#161b22] flex items-center justify-center"
                    aria-hidden
                  >
                    <div
                      className="grid grid-cols-3 grid-rows-3 gap-1"
                      style={{ width: 24, height: 24 }}
                    >
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#5a6478]"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#161b22] flex items-center justify-center">
                    {/* TODO: swap with <Image src="/headshots/[name].jpg" /> */}
                    <span className="text-lg font-medium text-[#5a6478]">
                      {person.initials}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[#e8ecf1] mb-1">
                {person.name}
              </h3>
              <p className="text-sm text-[#5a6478] mb-4">{person.title}</p>
              <p className="text-sm text-[#e8ecf1]/70 leading-relaxed">
                {person.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
