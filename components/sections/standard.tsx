import type { CSSProperties } from "react"
import { ClauseRow, Kicker } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Standard({ content }: { content: SiteContent }) {
  const { standard } = content

  return (
    <section className="section section--ruled" id="standard" data-case aria-labelledby="standard-h">
      <div className="shift">
        <div className="reveal">
          <Kicker head={standard} />
        </div>

        <h2 className="verdict reveal" id="standard-h" style={{ "--i": 1 } as CSSProperties}>
          {standard.verdict}
        </h2>

        <p className="support reveal" style={{ "--i": 2 } as CSSProperties}>
          {standard.support}
        </p>

        {/* The instrument: the grade a conclusion holds, made touchable. */}
        <div
          className="reveal"
          style={{ marginTop: 72, "--i": 3 } as CSSProperties}
          data-readouts={JSON.stringify(standard.readouts)}
        >
          <div className="scale">
            {standard.degrees.map((degree) => {
              const top = degree.key === "E4"
              const dim = !degree.label && !top
              return (
                <button
                  type="button"
                  key={degree.key}
                  className={`deg${top ? " deg--top" : ""}${dim ? " deg--dim" : ""}`}
                  data-deg={degree.key}
                >
                  <span className="deg__key latin">{degree.key}</span>
                  {degree.label ? <span className="deg__label">{degree.label}</span> : null}
                </button>
              )
            })}
          </div>
          <p className="scale__read mono" data-scale-read aria-live="polite" suppressHydrationWarning>
            {standard.readouts.def}
          </p>
        </div>

        <div className="clauses reveal" style={{ "--i": 4 } as CSSProperties}>
          {standard.clauses.map((clause) => (
            <ClauseRow key={clause.title} clause={clause} />
          ))}
        </div>
      </div>
    </section>
  )
}
