import type { CSSProperties } from "react"
import { Cta, Grain } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Hero({ content }: { content: SiteContent }) {
  const { hero } = content

  return (
    <header className="hero section--dark" id="main" data-case data-dark aria-label={hero.badge}>
      <Grain />
      <div className="shift">
        <div className="hero__meta mono reveal">
          <p data-scramble suppressHydrationWarning>
            {hero.badge}
          </p>
          <p>
            <span>{hero.city}</span>&nbsp;{" "}
            <span className="latin" data-clock suppressHydrationWarning>
              --:--:--
            </span>
            &nbsp;{" "}
            <span className="rec" data-pulse aria-hidden="true">
              ▪
            </span>{" "}
            REC
          </p>
        </div>

        <div className="hero__body">
          <h1 className="hero__headline reveal" style={{ "--i": 1 } as CSSProperties}>
            {hero.headline}
          </h1>

          <div className="split hero__split">
            <div className="reveal" style={{ "--i": 2 } as CSSProperties}>
              <p className="hero__sub">{hero.sub}</p>
              <p className="hero__standard mono" data-scramble suppressHydrationWarning>
                {hero.standardLine}
              </p>
            </div>

            <div className="hero__act reveal" style={{ "--i": 3 } as CSSProperties}>
              <p className="rope mono">{hero.rope}</p>
              <Cta cta={content.cta} />
            </div>
          </div>
        </div>

        <div className="hero__foot mono reveal" style={{ "--i": 4 } as CSSProperties}>
          <p>{hero.exhibitA}</p>
          <p className="latin" data-herohash suppressHydrationWarning>
            SHA-256 —
          </p>
        </div>
      </div>
    </header>
  )
}
