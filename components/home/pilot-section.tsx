"use client"

import { Button } from "@/components/ui/button"
import { useBriefingModal } from "@/components/home/briefing-modal-context"

export function PilotSection() {
  const briefingModal = useBriefingModal()

  return (
    <section className="bg-[#07111F] border-t border-white/[0.08] py-16 px-6" aria-labelledby="pilot-title">
      <div className="max-w-2xl mx-auto">
        <h2
          id="pilot-title"
          className="text-2xl font-semibold text-white mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Shield Pilot — 30 Days
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-8">
          A scoped 30-day engagement covering your China-facing transaction flow. Real-time screening active from day one. Every decision logged with timestamp, list version, and match rationale. Fixed fee. NDA available on request.
        </p>
        <Button
          variant="outline"
          className="border-white/25 text-white hover:bg-white/10 rounded-sm px-6 font-medium"
          onClick={() => briefingModal?.openBriefingModal()}
        >
          Request Pilot Terms
        </Button>
      </div>
    </section>
  )
}
