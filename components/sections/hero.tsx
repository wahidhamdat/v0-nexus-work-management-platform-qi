import type { CSSProperties } from "react"
import type { SiteContent } from "@/lib/content/types"

export function Hero({ content }: { content: SiteContent }) {
  const { hero } = content
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="wrap">
        <p className="meta reveal">{hero.eyebrow}</p>

        <h1 className="h1 measure reveal" id="hero-heading" style={{ "--i": 1 } as CSSProperties}>
          {hero.headline.map((line, i) => (
            <span key={line} style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </h1>

        <p className="hero__lede lede measure muted reveal" style={{ "--i": 2 } as CSSProperties}>
          {hero.lede}
        </p>

        <div className="hero__actions reveal" style={{ "--i": 3 } as CSSProperties}>
          {hero.ctas.map((cta, i) => (
            <a
              key={cta.href}
              className={`btn ${i === 0 ? "btn--seal" : "btn--ghost"}`}
              href={cta.href}
              {...(cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ marginTop: "clamp(56px, 7vw, 96px)" }}>
        <hr className="rule" />
        <ul className="strip meta">
          {hero.strip.map((item, i) => (
            <li key={item} className="reveal" style={{ "--i": i } as CSSProperties}>
              {item}
            </li>
          ))}
        </ul>
        <hr className="rule" />
      </div>
    </section>
  )
}
