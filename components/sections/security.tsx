import type { CSSProperties } from "react"
import { Label } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Security({ content }: { content: SiteContent }) {
  const { security } = content
  return (
    <section className="section" id="security" aria-labelledby="security-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{security.label}</Label>
          <h2 className="h2 measure" id="security-heading">
            {security.heading}
          </h2>
        </div>

        <div className="measure reveal" style={{ "--i": 1 } as CSSProperties}>
          {security.paras.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        <div className="blocks" style={{ marginTop: 64 }}>
          {security.blocks.map((block, i) => (
            <div key={block.title} className="block reveal" style={{ "--i": i } as CSSProperties}>
              <h3 className="h3">{block.title}</h3>
              <p className="block__body muted">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
