"use client"

import { Button } from "@/components/ui/button"
import { useBriefingModal } from "@/components/home/briefing-modal-context"

export function SectorBriefs() {
  const briefingModal = useBriefingModal()

  return (
    <section className="bg-[#07111F] border-t border-white/[0.08] py-16 px-6" aria-labelledby="sector-briefs-title">
      <div className="max-w-3xl mx-auto">
        <h2
          id="sector-briefs-title"
          className="text-2xl font-semibold text-white mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Sector Compliance Briefs
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          Company-specific briefs are prepared for compliance and legal teams operating in the current enforcement environment. Based on public filings, enforcement records, and regulatory analysis. Available on request.
        </p>
        <div className="border border-white/[0.12] rounded-sm bg-white/[0.02] p-6">
          <p className="text-base font-medium text-white mb-4">
            Semiconductor Sector — Export Compliance Situational Brief, February 2026
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10 rounded-sm font-medium"
              onClick={() => briefingModal?.openBriefingModal()}
            >
              Request Brief
            </Button>
            <a
              href="mailto:ceo@monakes.com"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              ceo@monakes.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
