import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Shield — Autonomous AI Export Compliance | Monakes",
  description:
    "The Shield by Monakes delivers real-time, deterministic denied party screening and ECCN classification with Agentic AI. Fortify your global trade operations with autonomous export compliance.",
  openGraph: {
    title: "The Shield — Autonomous AI Export Compliance | Monakes",
    description:
      "Real-time denied party screening, deterministic ECCN classification, and immutable audit trails. Agentic AI for uncompromising export compliance.",
    type: "website",
  },
}

export default function ShieldLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
