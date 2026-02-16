import type React from "react"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Monakes | AI-Powered Pharma Cold Chain Quoting — GDP Compliance Built In",
  description:
    "Quinn is an AI quoting agent that builds GDP-compliant cold chain quotes in under 5 minutes — with carrier verification, pharma surcharges, and audit-ready documentation built in.",
  keywords: [
    "pharma cold chain quoting",
    "GDP compliance automation",
    "pharmaceutical logistics",
    "cold chain compliance",
    "temperature controlled shipping",
    "pharma freight quoting",
    "GDP carrier verification",
    "audit-ready documentation",
    "pharma surcharge automation",
    "cold chain AI",
  ],
  openGraph: {
    title: "Monakes | AI-Powered Pharma Cold Chain Quoting",
    description:
      "Quinn builds GDP-compliant cold chain quotes in under 5 minutes. Carrier verification, pharma surcharges, and audit-ready documentation — built in, not bolted on.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A1628",
}

export default function PharmaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
