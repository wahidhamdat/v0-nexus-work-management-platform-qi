import type { CSSProperties } from "react"
import { ClauseRow, Kicker, MonumentBlock } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Applications({ content }: { content: SiteContent }) {
  const { applications } = content

  return (
    <section
      className="section section--ruled"
      id="applications"
      data-case
      aria-labelledby="applications-h"
    >
      <div className="shift">
        <div className="reveal">
          <Kicker head={applications} />
        </div>

        <h2 className="verdict reveal" id="applications-h" style={{ "--i": 1 } as CSSProperties}>
          {applications.verdict}
        </h2>

        <div className="monrow" style={{ marginTop: 80 }}>
          {applications.monuments.map((monument, i) => (
            <div key={monument.label} className="reveal" style={{ "--i": i + 2 } as CSSProperties}>
              <MonumentBlock monument={monument} />
            </div>
          ))}
        </div>

        <div
          className="clauses clauses--wide reveal"
          style={{ marginTop: 72, "--i": 4 } as CSSProperties}
        >
          {applications.items.map((item) => (
            <ClauseRow key={item.title} clause={item} named />
          ))}
        </div>
      </div>
    </section>
  )
}
