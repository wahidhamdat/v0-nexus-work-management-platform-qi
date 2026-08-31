import type { SiteContent } from "@/lib/content/types"

/**
 * The case-file index. It fills as the reader descends — each entry stamped
 * with the real clock time it was reached, and never rewritten afterwards.
 * That is the argument the page makes, performed rather than described.
 */
export function CaseRail({ rail }: { rail: SiteContent["rail"] }) {
  return (
    <div className="rail" data-rail aria-hidden="true">
      <p className="rail__title">{rail.title}</p>
      <div className="rail__list">
        {rail.entries.map((entry) => (
          <div className="rail__row" key={entry.id} data-rail-row={entry.id}>
            <span className="rail__mark" />
            <span>
              §{entry.num} {entry.label.toUpperCase()}
            </span>
            <span className="rail__time" data-rail-time suppressHydrationWarning />
          </div>
        ))}
      </div>
    </div>
  )
}
