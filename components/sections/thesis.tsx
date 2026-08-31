import type { CSSProperties } from "react"
import { Kicker, MemoBlock } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Thesis({ content }: { content: SiteContent }) {
  const { thesis } = content

  return (
    <section className="section" id="thesis" data-case aria-labelledby="thesis-h">
      <div className="shift">
        <div className="reveal">
          <Kicker head={thesis} />
        </div>

        <h2 className="verdict reveal" id="thesis-h" style={{ "--i": 1 } as CSSProperties}>
          {thesis.verdict}
        </h2>

        <p className="support reveal" style={{ "--i": 2 } as CSSProperties}>
          {thesis.support}
        </p>

        <div className="c2">
          {thesis.exhibits.map((exhibit, i) => (
            <a
              key={exhibit.href}
              className="exhibit reveal"
              href={exhibit.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--i": i + 3 } as CSSProperties}
            >
              <p className="exhibit__head mono">
                <span>{exhibit.tag}</span>
                <span className={exhibit.latinRef ? "latin" : undefined}>{exhibit.ref}</span>
              </p>
              <p className="exhibit__title">{exhibit.title}</p>
              <p className="exhibit__note mono">{exhibit.note} ↗</p>
            </a>
          ))}
        </div>

        <MemoBlock memo={thesis.memo} i={5} />
      </div>
    </section>
  )
}
