"use client"

import dynamic from "next/dynamic"

const MetricsStrip = dynamic(
  () => import("@/components/home/metrics-strip").then((mod) => mod.MetricsStrip),
  { ssr: false }
)
const EnforcementTable = dynamic(
  () => import("@/components/home/enforcement-table").then((mod) => mod.EnforcementTable),
  { ssr: false }
)
const WhyNowSection = dynamic(
  () => import("@/components/home/why-now-section").then((mod) => mod.WhyNowSection),
  { ssr: false }
)
const WhatShieldDoes = dynamic(
  () => import("@/components/home/what-shield-does").then((mod) => mod.WhatShieldDoes),
  { ssr: false }
)
const HowItWorksSection = dynamic(
  () => import("@/components/home/how-it-works-section").then((mod) => mod.HowItWorksSection),
  { ssr: false }
)
const PilotSection = dynamic(
  () => import("@/components/home/pilot-section").then((mod) => mod.PilotSection),
  { ssr: false }
)
const SectorBriefs = dynamic(
  () => import("@/components/home/sector-briefs").then((mod) => mod.SectorBriefs),
  { ssr: false }
)
const ShieldCallout = dynamic(
  () => import("@/components/home/shield-callout").then((mod) => mod.ShieldCallout),
  { ssr: false }
)
const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  { ssr: false }
)

export default function ClientSections() {
  return (
    <>
      <MetricsStrip />
      <EnforcementTable />
      <WhyNowSection />
      <WhatShieldDoes />
      <HowItWorksSection />
      <PilotSection />
      <SectorBriefs />
      <ShieldCallout />
      <Footer />
    </>
  )
}
