import type { CSSProperties } from "react"
import { Grain, Kicker, MemoBlock } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

/** The peak of the scroll. One idea, one viewport, no supporting cast. */
export function Interval({ content }: { content: SiteContent }) {
  const { interval } = content

  return (
    <section
      className="section section--dark interval"
      id="interval"
      data-case
      data-dark
      aria-labelledby="interval-h"
    >
      <Grain />
      <div className="shift">
        <div className="reveal">
          <Kicker head={interval} />
        </div>

        <p className="interval__verdict reveal" id="interval-h" style={{ "--i": 1 } as CSSProperties}>
          {interval.verdict}
        </p>

        <MemoBlock memo={interval.memo} i={2} />
      </div>
    </section>
  )
}
