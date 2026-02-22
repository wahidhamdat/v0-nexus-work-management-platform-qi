export function LeadershipSection() {
  const people = [
    {
      initials: "FH",
      name: "Dr. Fadel Hamdat",
      title: "Strategic Advisor & Board Member",
      bio: "Dr. Hamdat is a former entrepreneur and senior business consultant with over 20 years of operating experience building and advising companies across Europe, the Middle East, and North Africa. He has founded businesses, scaled operations, and sat across the table from the kind of enterprise clients Monakes AI now serves. That track record is not decorative — it shapes how we position our products, structure our client relationships, and think about long-term company building. He joined Monakes AI because he recognised what Shield solves, and because he has spent two decades watching organisations get compliance wrong with tools that were never built to get it right.",
      useDotGrid: false,
    },
    {
      initials: "MH",
      name: "Mohamed Hamdat",
      title: "Founder · CEO · CTO",
      bio: "Mohamed founded Monakes AI and personally architectures its core systems. He holds both the commercial and technical mandates — not as a delegation of convenience, but because the product demands it. The decisions that determine how Shield screens, classifies, and logs are his decisions. The clients who trust Shield with their compliance exposure trust it because the person who built it is still responsible for it. He does not have an engineering team he manages from a distance. He is the engineering team.",
      useDotGrid: false,
    },
    {
      initials: null,
      name: "Engineering & AI Research",
      title: "Distributed · World-Class · Specialist",
      bio: "Our engineering and AI research capability is built from specialists recruited for the precision requirements of compliance automation and real-time regulatory systems. They are not generalists repurposed from other domains. Every engineer and researcher working on Shield was brought in for a specific reason and is accountable for a specific outcome. The team is distributed across multiple countries and time zones, which means Shield runs, monitors, and improves around the clock — not because we scheduled it, but because the people responsible for it are always awake.",
      useDotGrid: true,
    },
  ]

  return (
    <section
      id="leadership"
      className="px-6 py-24 bg-[#06090f] border-t border-[rgba(255,255,255,0.06)]"
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
              className="p-6 rounded-lg bg-[#0d1117] border border-[rgba(255,255,255,0.07)] transition-transform hover:scale-[1.005]"
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
