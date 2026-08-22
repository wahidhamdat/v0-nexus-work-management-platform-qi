import type { CSSProperties } from "react"
import { Label } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Team({ content }: { content: SiteContent }) {
  const { team } = content
  return (
    <section className="section section--panel" id="team" aria-labelledby="team-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{team.label}</Label>
          <h2 className="h2 measure" id="team-heading">
            {team.heading}
          </h2>
        </div>

        <p className="measure muted reveal" style={{ "--i": 1 } as CSSProperties}>
          {team.intro}
        </p>

        <div className="people" style={{ marginTop: 64 }}>
          {team.people.map((person, i) => (
            <div key={person.role} className="person reveal" style={{ "--i": i } as CSSProperties}>
              <p className="person__name">{person.name}</p>
              <p className="person__role meta">{person.role}</p>
              <p className="person__bio">{person.bio}</p>
            </div>
          ))}
        </div>

        <p className="measure muted reveal" style={{ marginTop: 56 }}>
          {team.advisory}
        </p>
      </div>
    </section>
  )
}
