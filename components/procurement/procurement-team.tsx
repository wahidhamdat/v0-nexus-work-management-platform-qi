"use client"

import { useEffect, useRef } from "react"

const team = [
  {
    name: "Mohameda H",
    role: "Founder & Systems Architect",
    bio: "Mohameda engineered the core platform and the three-pillar evidentiary architecture. His background is in building AI systems for operations-heavy environments — logistics, complex document workflows, high-stakes decision pipelines — where the output of a system is read under pressure by people who are looking for gaps. At Monakes, that discipline is applied to an environment where the reader is an arbitrator. The platform is built to that standard throughout.",
  },
  {
    name: "Dr. Abdelfadel H",
    role: "Board Member, Strategy & Institutional Partnerships",
    bio: "Dr. Abdelfadel\u2019s role is to ensure that Monakes\u2019 commercial model maps precisely to how public institutions actually evaluate, procure, and adopt technology. That process does not resemble private sector sales. It requires institutional credibility, regulatory alignment, and the ability to operate across government decision-making structures. His network spans senior principals across GCC government and development institutions.",
  },
  {
    name: "Sofiene C",
    role: "Head of Secure Infrastructure",
    bio: "Sofiene is a veteran of Qatar\u2019s TASMU national digital transformation program — the sovereign technology initiative that established Qatar\u2019s smart government infrastructure baseline. He designed Monakes\u2019 infrastructure architecture from inside Qatar\u2019s regulatory environment, not from the outside looking for compliance. NCSA alignment, data sovereignty, and encryption architecture are not additions. They are the foundation.",
  },
  {
    name: "Hussein S",
    role: "Board Member, Procurement Operations",
    bio: "Hussein has served on government procurement evaluation committees. He knows how scores are assigned under institutional pressure, where documentation gaps form, and what the record looks like when a challenge arrives. That operational knowledge is embedded directly into Monakes\u2019 evaluation workflow. The platform does not model how procurement should work. It models how it works — and where it needs protection.",
  },
]

export function ProcurementTeam() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const advisoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined
    async function init() {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })

        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        )
          .fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.2"
          )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )

        cardsRef.current.filter(Boolean).forEach((card, i) => {
          tl.fromTo(
            card,
            { opacity: 0, y: 30, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            `-=${i === 0 ? 0.2 : 0.45}`
          )
        })

        tl.fromTo(
          advisoryRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Team and board"
      className="relative px-6 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span
            ref={labelRef}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A1538] mb-6 block opacity-0"
          >
            Team &amp; Board
          </span>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1A1A] leading-tight mb-4 opacity-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The team that built this understands the room where procurement
            decisions are made.
          </h2>
          <p
            ref={subRef}
            className="text-base text-[#5A5A5A] leading-relaxed opacity-0"
          >
            Monakes was not built by software engineers who discovered a market.
            It was built by people who understand what happens when a procurement
            record fails — legally, institutionally, and operationally.
          </p>
        </div>

        {/* Team grid */}
        <div className="flex flex-col gap-8 mb-20">
          {team.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="group relative p-8 lg:p-10 rounded-xl bg-[#F7F5F2] border border-[#1A1A1A]/6 hover:border-[#8A1538]/15 transition-all duration-500 opacity-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Avatar monogram */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#8A1538]/8 border border-[#8A1538]/15 flex items-center justify-center group-hover:bg-[#8A1538]/12 transition-colors duration-300">
                  <span
                    className="text-lg font-bold text-[#8A1538]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {member.name.charAt(0)}
                  </span>
                </div>

                <div>
                  <h3
                    className="text-xl font-bold text-[#1A1A1A] mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#8A1538] mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#5A5A5A] leading-relaxed max-w-3xl">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Network */}
        <div
          ref={advisoryRef}
          className="relative p-8 lg:p-10 rounded-xl bg-[#F7F5F2] border border-[#1A1A1A]/8 opacity-0"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A1538]/15 to-transparent" />

          <h3
            className="text-lg font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Advisory Network
          </h3>
          <p className="text-sm text-[#5A5A5A] leading-relaxed max-w-3xl">
            The Monakes advisory network includes a former Qatar Government
            Procurement Committee Chair and an ICC Arbitration Specialist. Their
            role is to ensure the platform&apos;s evidentiary architecture
            survives the precise conditions in which it will be tested: formal
            arbitration, institutional audit, and regulatory inquiry.
          </p>
        </div>
      </div>
    </section>
  )
}
