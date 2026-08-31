import type { CSSProperties } from "react"
import { Kicker, MemoBlock } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Security({ content }: { content: SiteContent }) {
  const { security } = content

  return (
    <section className="section section--ruled" id="security" data-case aria-labelledby="security-h">
      <div className="shift">
        <div className="reveal">
          <Kicker head={security} />
        </div>

        <h2
          className="verdict verdict--wide reveal"
          id="security-h"
          style={{ "--i": 1 } as CSSProperties}
        >
          {security.verdict}
        </h2>

        <div className="chips mono reveal" style={{ "--i": 2 } as CSSProperties}>
          {security.chips.map((chip) => (
            <span className="chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>

        <p
          className="reveal"
          style={
            {
              marginTop: 44,
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--prose)",
              maxWidth: "56ch",
              textWrap: "pretty",
              "--i": 3,
            } as CSSProperties
          }
        >
          {security.confidentiality}
        </p>

        <MemoBlock memo={security.memo} i={4} />
      </div>
    </section>
  )
}
