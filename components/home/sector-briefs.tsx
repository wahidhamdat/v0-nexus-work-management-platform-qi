"use client"

import { Button } from "@/components/ui/button"

const BRIEFING_URL = "https://calendly.com/wahidhamdat30/30min"

export function SectorBriefs() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.08] py-16 px-6" aria-labelledby="sector-briefs-title">
      <div className="max-w-3xl mx-auto">
        <h2
          id="sector-briefs-title"
          className="text-2xl font-semibold text-white mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Sector Compliance Briefs
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Prepared for the current enforcement environment.
        </p>
        <div className="border border-white/[0.12] rounded-sm bg-white/[0.02] p-6">
          <p className="text-base font-medium text-white mb-4">
            Semiconductor Sector — Export Compliance Situational Brief, February 2026
          </p>
          <Button
            asChild
            variant="outline"
            className="border-white/25 text-white hover:bg-white/10 rounded-sm font-medium"
          >
            <a href={BRIEFING_URL} target="_blank" rel="noopener noreferrer">
              Request Brief
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
