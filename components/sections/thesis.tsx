import type { CSSProperties } from "react"
import { Label, SourceLine } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Thesis({ content }: { content: SiteContent }) {
  const { thesis } = content
  return (
    <section className="section" id="thesis" aria-labelledby="thesis-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{thesis.label}</Label>
          <h2 className="h2 measure" id="thesis-heading">
            {thesis.heading}
          </h2>
        </div>

        <div className="measure reveal" style={{ "--i": 1 } as CSSProperties}>
          {thesis.paras.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}

          <p>
            {thesis.gestmin.before}
            <span className="cite">{thesis.gestmin.cite}</span>
            {thesis.gestmin.after}
          </p>

          <p className="strong" style={{ marginTop: 32 }}>
            {thesis.emphasis}
          </p>

          <p>{thesis.close}</p>

          <p className="strong" style={{ marginTop: 32 }}>
            {thesis.speed}
          </p>
        </div>

        <SourceLine sources={thesis.sources} />
      </div>
    </section>
  )
}
