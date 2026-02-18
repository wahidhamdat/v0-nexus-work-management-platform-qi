import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Tender Evaluation for Public Procurement | Monakes",
  description:
    "Cut tender evaluation time by 80\u201390% with explainable AI. Monakes helps governments and large enterprises evaluate complex construction and infrastructure tenders in days instead of 6+ weeks.",
  openGraph: {
    title: "Monakes \u2014 AI Tender Evaluation for Public Procurement",
    description:
      "Evaluate complex tenders in days, not weeks. Explainable AI with full auditability and human control.",
    type: "website",
  },
}

export default function ProcurementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
