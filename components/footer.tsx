"use client"

import { useBriefingModal } from "@/components/home/briefing-modal-context"

const BRIEFING_URL = "https://calendly.com/wahidhamdat30/30min"

export function Footer() {
  const briefingModal = useBriefingModal()

  return (
    <footer role="contentinfo" className="border-t border-white/[0.08] bg-[#07111F]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p
              className="font-semibold text-white text-lg mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Monakes AI
            </p>
            <p className="text-sm text-zinc-500 mb-2">
              London · Operating Globally
            </p>
            <a
              href="mailto:ceo@monakes.com"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              ceo@monakes.com
            </a>
            <p className="text-xs text-zinc-500 mt-2">
              Site content is currently being updated.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="/shield"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              The Shield
            </a>
            {briefingModal ? (
              <button
                type="button"
                onClick={() => briefingModal.openBriefingModal()}
                className="text-sm text-zinc-400 hover:text-white transition-colors text-left"
              >
                Request Briefing
              </button>
            ) : (
              <a
                href={BRIEFING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Request Briefing
              </a>
            )}
          </div>
        </div>
        <p className="mt-10 pt-6 border-t border-white/[0.08] text-xs text-zinc-500 text-center">
          © 2026 Monakes AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
