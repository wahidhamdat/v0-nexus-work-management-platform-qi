import type { CSSProperties } from "react"
import { Kicker, PersonRow } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Firm({ content }: { content: SiteContent }) {
  const { firm } = content

  return (
    <section className="section section--ruled" id="firm" data-case aria-labelledby="firm-h">
      <div className="shift">
        <div className="reveal">
          <Kicker head={firm} />
        </div>

        <h2 className="verdict reveal" id="firm-h" style={{ "--i": 1 } as CSSProperties}>
          {firm.verdict}
        </h2>

        <div className="clauses clauses--wide reveal" style={{ "--i": 2 } as CSSProperties}>
          {firm.people.map((person) => (
            <PersonRow key={person.name} name={person.name} role={person.role} bio={person.bio} />
          ))}
        </div>

        <div className="stamps mono reveal" style={{ "--i": 3 } as CSSProperties}>
          {firm.stamps.map((stamp) => (
            <span className="stamp" key={stamp}>
              {stamp}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
