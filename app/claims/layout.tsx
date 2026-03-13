import type React from "react"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "MONAKESAI Claims — Pre-Submission Claims Intelligence | Monakes AI",
  description:
    "AI-powered claims validation that catches denial triggers before submission. Increase auto-adjudication rates, reduce manual review queues, and cut avoidable denial costs for health plans.",
  keywords: [
    "claims validation",
    "pre-submission intelligence",
    "denial prevention",
    "healthcare claims AI",
    "auto-adjudication",
    "claims scrubbing",
    "medical billing AI",
    "payer claims processing",
    "health plan automation",
    "EDI 837 validation",
  ],
  openGraph: {
    title: "MONAKESAI Claims — Pre-Submission Claims Intelligence",
    description:
      "Catch denial triggers before they cost you. AI-powered claims validation that sits upstream of your adjudication engine.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0F2B46",
}

export default function ClaimsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
