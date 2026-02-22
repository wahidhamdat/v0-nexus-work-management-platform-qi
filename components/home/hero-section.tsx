"use client"

import { Button } from "@/components/ui/button"
import { useBriefingModal } from "@/components/home/briefing-modal-context"

export function HeroSection() {
  const briefingModal = useBriefingModal()

  return (
    <section
      aria-label="Hero introduction"
      className="relative min-h-[85vh] flex flex-col justify-center px-6 pt-28 pb-20 overflow-hidden bg-[#0a0a0a]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 max-w-[820px] mx-auto">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-[1.15]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Export Compliance Has a Liability Gap. Shield Closes It.
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-[640px] leading-relaxed mb-8">
          Monakes AI builds autonomous compliance intelligence for enterprises operating in controlled and sanctioned trade environments. Shield is the flagship deployment.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="bg-white text-[#0a0a0a] hover:bg-zinc-200 rounded-sm px-6 font-medium"
            onClick={() => briefingModal?.openBriefingModal()}
          >
            See Shield
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 text-white hover:bg-white/10 rounded-sm px-6 font-medium"
            onClick={() => briefingModal?.openBriefingModal()}
          >
            Download Sector Brief
          </Button>
        </div>
      </div>
    </section>
  )
}
