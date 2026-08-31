import type { CSSProperties } from "react"
import { Cta, Kicker, MonumentBlock } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

/** One door. No secondary action exists anywhere on the page. */
export function Engagement({ content }: { content: SiteContent }) {
  const { engagement } = content

  return (
    <section
      className="section section--ruled engagement"
      id="engagement"
      data-case
      aria-labelledby="engagement-h"
    >
      <div className="shift">
        <div className="reveal">
          <Kicker head={engagement} />
        </div>

        <h2 className="verdict reveal" id="engagement-h" style={{ "--i": 1 } as CSSProperties}>
          {engagement.verdict}
        </h2>

        <div className="monrow">
          {engagement.monuments.map((monument, i) => (
            <div key={monument.label} className="reveal" style={{ "--i": i + 2 } as CSSProperties}>
              <MonumentBlock monument={monument} size="sm" wideLabel />
            </div>
          ))}
        </div>

        <div className="split engagement__foot">
          <p className="engagement__rope reveal" style={{ "--i": 4 } as CSSProperties}>
            {engagement.rope}
          </p>
          <div className="engagement__act reveal" style={{ "--i": 5 } as CSSProperties}>
            <Cta cta={content.cta} large />
          </div>
        </div>
      </div>
    </section>
  )
}
