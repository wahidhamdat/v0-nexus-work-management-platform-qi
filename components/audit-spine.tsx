import type { SiteContent } from "@/lib/content/types"

/**
 * A running log of the reader's own passage through the page, written as it
 * happens and never rewritten — the argument the page makes, performed rather
 * than described. Entries are appended by the inline enhancement script.
 */
export function AuditSpine({ entries }: { entries: SiteContent["spine"] }) {
  return (
    <aside className="spine" aria-hidden="true" data-spine={JSON.stringify(entries)}>
      <ol />
    </aside>
  )
}
