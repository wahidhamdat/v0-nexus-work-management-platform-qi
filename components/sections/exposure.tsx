import { Figures, Label, SourceLine } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Exposure({ content }: { content: SiteContent }) {
  const { exposure } = content
  return (
    <section className="section section--dark" id="exposure" aria-labelledby="exposure-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{exposure.label}</Label>
          <h2 className="h2 measure" id="exposure-heading">
            {exposure.heading}
          </h2>
        </div>

        <Figures figures={exposure.figures} columns={3} />

        <p className="measure reveal" style={{ marginTop: 56 }}>
          {exposure.body}
        </p>

        <div className="quote reveal" style={{ marginTop: 56 }}>
          <p className="meta">{exposure.quote.label}</p>
          <p className="quote__body">{exposure.quote.text}</p>
        </div>

        <div className="measure reveal" style={{ marginTop: 40 }}>
          <p>{exposure.quote.after}</p>
          <p className="strong">{exposure.quote.emphasis}</p>
        </div>

        <SourceLine sources={exposure.sources} />
      </div>
    </section>
  )
}
