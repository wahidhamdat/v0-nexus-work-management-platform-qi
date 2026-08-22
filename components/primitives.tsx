import type { CSSProperties } from "react"
import type { Source } from "@/lib/content/types"

export function Label({ children }: { children: string }) {
  return <p className="meta">{children}</p>
}

export function SourceLine({ sources }: { sources: Source[] }) {
  return (
    <p className="source meta measure">
      {sources.map((source, i) => (
        <span key={source.href}>
          {i > 0 ? " · " : null}
          <a className="link" href={source.href} target="_blank" rel="noopener noreferrer">
            {source.label}
          </a>
        </span>
      ))}
    </p>
  )
}

export function Figures({
  figures,
  columns,
}: {
  figures: { value: string; label: string }[]
  columns: 2 | 3
}) {
  return (
    <div className={`figures figures--${columns}`}>
      {figures.map((figure, i) => (
        <div key={figure.label} className="reveal" style={{ "--i": i } as CSSProperties}>
          {/* Static in the HTML — no count-up, nothing to fail. */}
          <p className="figure__value">{figure.value}</p>
          <p className="figure__label meta">{figure.label}</p>
        </div>
      ))}
    </div>
  )
}
