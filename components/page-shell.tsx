import { AuditSpine } from "@/components/audit-spine"
import { Enhancements } from "@/components/enhancements"
import { SiteNav } from "@/components/site-nav"
import { Architecture } from "@/components/sections/architecture"
import { Contact } from "@/components/sections/contact"
import { Exposure } from "@/components/sections/exposure"
import { Hero } from "@/components/sections/hero"
import { Mechanism } from "@/components/sections/mechanism"
import { Security } from "@/components/sections/security"
import { SiteFooter } from "@/components/sections/site-footer"
import { Team } from "@/components/sections/team"
import { Thesis } from "@/components/sections/thesis"
import { Workflow } from "@/components/sections/workflow"
import type { SiteContent } from "@/lib/content/types"

export function PageShell({ content }: { content: SiteContent }) {
  return (
    <>
      <a className="skip" href="#main">
        {content.skip}
      </a>

      <SiteNav content={content} />
      <AuditSpine entries={content.spine} />

      <main id="main">
        <Hero content={content} />
        <Thesis content={content} />
        <Exposure content={content} />
        <Mechanism content={content} />
        <Architecture content={content} />
        <Workflow content={content} />
        <Security content={content} />
        <Team content={content} />
        <Contact content={content} />
      </main>

      <SiteFooter content={content} />
      <Enhancements content={content} />
    </>
  )
}
