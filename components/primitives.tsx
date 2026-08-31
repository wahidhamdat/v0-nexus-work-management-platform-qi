import type { CSSProperties } from "react"
import type { Clause, Link, Memo, Monument, SectionHead } from "@/lib/content/types"

/** Runtime-applied film grain. The turbulence URI is set by the enhancement script. */
export function Grain() {
  return <div className="grain" aria-hidden="true" data-grain />
}

export function Reveal({
  i = 0,
  className = "",
  children,
}: {
  i?: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`reveal ${className}`.trim()} style={{ "--i": i } as CSSProperties}>
      {children}
    </div>
  )
}

/** "§04 — Method · DPS-1". The numeral never translates; the word does. */
export function Kicker({ head }: { head: SectionHead }) {
  return (
    <p className="kicker" data-scramble suppressHydrationWarning>
      <span className="latin" suppressHydrationWarning>
        {head.num}
      </span> — {head.kicker}
      {head.suffix ? <span className="latin"> {head.suffix}</span> : null}
    </p>
  )
}

export function MemoBlock({ memo, i = 0 }: { memo: Memo; i?: number }) {
  return (
    <details className="memo reveal" style={{ "--i": i } as CSSProperties}>
      <summary className="memo__summary mono">{memo.label} ↘</summary>
      <div className="memo__body">
        {memo.paras.map((para) => (
          <p key={para.slice(0, 48)}>{para}</p>
        ))}
      </div>
    </details>
  )
}

/**
 * A collapsed row. `named` swaps the numeral for a serif name — the same
 * component carries the DPS clauses, the applications and the firm.
 */
export function ClauseRow({ clause, named = false }: { clause: Clause; named?: boolean }) {
  return (
    <details className={`clause${named ? " clause--named" : ""}`}>
      <summary className="clause__summary">
        {clause.num ? <span className="clause__num latin">{clause.num}</span> : null}
        <span className={named ? "clause__name" : "clause__title"}>{clause.title}</span>
        {clause.flag ? <span className="clause__flag">{clause.flag}</span> : null}
        <span className="clause__plus" aria-hidden="true">
          +
        </span>
      </summary>
      <p className="clause__body">{clause.body}</p>
    </details>
  )
}

/** A person row reuses the clause chrome: name, mono role, disclosed bio. */
export function PersonRow({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <details className="clause clause--named">
      <summary className="clause__summary">
        <span className="clause__name">{name}</span>
        <span className="clause__role">{role}</span>
        <span className="clause__plus" aria-hidden="true">
          +
        </span>
      </summary>
      <p className="clause__body">{bio}</p>
    </details>
  )
}

/**
 * A number set as a monument. `numeral` carries {0}/{1} slots filled from
 * `counts`; each slot counts up on intersection and reserves its own width so
 * the line never reflows mid-animation.
 */
export function MonumentBlock({
  monument,
  size = "lg",
  wideLabel = false,
}: {
  monument: Monument
  size?: "lg" | "sm"
  wideLabel?: boolean
}) {
  const parts = monument.numeral.split(/(\{\d\})/).filter(Boolean)

  return (
    <div className="monument">
      <p className={`monument__value${size === "sm" ? " monument__value--sm" : ""}`}>
        <span className="latin">
          {parts.map((part, i) => {
            const slot = part.match(/^\{(\d)\}$/)
            if (!slot) return <span key={i}>{part}</span>
            const value = monument.counts[Number(slot[1])]
            return (
              <span
                key={i}
                className="monument__n"
                data-count={value}
                suppressHydrationWarning
                style={{ minWidth: `${String(value).length + 0.1}ch` }}
              >
                {value}
              </span>
            )
          })}
        </span>
        {monument.unit ? <span className="monument__unit"> {monument.unit}</span> : null}
      </p>
      <p className={`monument__label mono${wideLabel ? " monument__label--wide" : ""}`}>
        {monument.label}
      </p>
    </div>
  )
}

/**
 * The only action on the site. The wrapper is the magnetic field the script
 * reads; the anchor is what moves inside it.
 */
export function Cta({ cta, large = false }: { cta: Link; large?: boolean }) {
  return (
    <span className="mag" data-mag>
      <a
        className={`btn${large ? " btn--lg" : ""}`}
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{cta.label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </span>
  )
}
