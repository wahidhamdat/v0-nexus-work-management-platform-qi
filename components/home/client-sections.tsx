"use client"

import dynamic from "next/dynamic"

const WhatWeBuild = dynamic(
  () => import("@/components/home/what-we-build").then((mod) => mod.WhatWeBuild),
  { ssr: false }
)
const MissionSection = dynamic(
  () => import("@/components/home/mission-section").then((mod) => mod.MissionSection),
  { ssr: false }
)
const LeadershipSection = dynamic(
  () => import("@/components/home/leadership-section").then((mod) => mod.LeadershipSection),
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
      <WhatWeBuild />
      <MissionSection />
      <LeadershipSection />
      <ShieldCallout />
      <Footer />
    </>
  )
}
