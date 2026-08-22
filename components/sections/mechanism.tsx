import type { CSSProperties } from "react"
import { Figures, Label } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Mechanism({ content }: { content: SiteContent }) {
  const { mechanism } = content
  return (
    <section className="section" id="mechanism" aria-labelledby="mechanism-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{mechanism.label}</Label>
          <h2 className="h2 measure" id="mechanism-heading">
            {mechanism.heading}
          </h2>
        </div>

        <div className="measure reveal" style={{ "--i": 1 } as CSSProperties}>
          {mechanism.paras.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
          <p className="strong" style={{ marginTop: 32 }}>
            {mechanism.emphasis}
          </p>
        </div>

        <div style={{ marginTop: 64 }}>
          <Figures figures={mechanism.figures} columns={2} />
        </div>
      </div>
    </section>
  )
}
