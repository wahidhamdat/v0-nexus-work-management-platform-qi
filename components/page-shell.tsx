import { CaseRail } from "@/components/case-rail"
import { Enhancements } from "@/components/enhancements"
import { HydrationSignal } from "@/components/hydration-signal"
import { SiteNav } from "@/components/site-nav"
import { Applications } from "@/components/sections/applications"
import { Engagement } from "@/components/sections/engagement"
import { Firm } from "@/components/sections/firm"
import { Hero } from "@/components/sections/hero"
import { Interval } from "@/components/sections/interval"
import { Method } from "@/components/sections/method"
import { Seal } from "@/components/sections/seal"
import { Security } from "@/components/sections/security"
import { Standard } from "@/components/sections/standard"
import { Thesis } from "@/components/sections/thesis"
import type { SiteContent } from "@/lib/content/types"

/**
 * Alternating acts: the vault opens and closes the record, paper carries the
 * argument, and §03 — the fear — gets a dark viewport to itself.
 */
export function PageShell({ content }: { content: SiteContent }) {
  return (
    <>
      <a className="skip" href="#main">
        {content.skip}
      </a>

      <CaseRail rail={content.rail} />
      <SiteNav content={content} />

      <Hero content={content} />
      <Thesis content={content} />
      <Standard content={content} />
      <Interval content={content} />
      <Method content={content} />
      <Applications content={content} />
      <Security content={content} />
      <Engagement content={content} />
      <Firm content={content} />
      <Seal content={content} />

      <HydrationSignal />
      <Enhancements />
    </>
  )
}
