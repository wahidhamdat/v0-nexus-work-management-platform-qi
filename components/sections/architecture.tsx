import type { CSSProperties } from "react"
import { Label } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Architecture({ content }: { content: SiteContent }) {
  const { architecture } = content
  return (
    <section className="section" id="architecture" aria-labelledby="architecture-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{architecture.label}</Label>
          <h2 className="h2 measure" id="architecture-heading">
            {architecture.heading}
          </h2>
        </div>

        <div className="measure reveal" style={{ "--i": 1 } as CSSProperties}>
          {architecture.paras.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        <div className="panels panels--3" style={{ marginTop: 56 }}>
          {architecture.pillars.map((pillar, i) => (
            <div key={pillar.title} className="reveal" style={{ "--i": i } as CSSProperties}>
              <span className="panel__num meta">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="panel__title h3">{pillar.title}</h3>
              <p className="panel__body muted">{pillar.body}</p>
            </div>
          ))}
        </div>

        <p className="display reveal" style={{ marginTop: 64, fontSize: "var(--t-closing)", lineHeight: 1.3 }}>
          {architecture.closing}
        </p>
      </div>
    </section>
  )
}
