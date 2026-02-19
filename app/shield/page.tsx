import dynamic from "next/dynamic"
import { ShieldNavbar } from "@/components/shield/shield-navbar"
import { ShieldHero } from "@/components/shield/shield-hero"

const ShieldChallenge = dynamic(
  () =>
    import("@/components/shield/shield-challenge").then(
      (mod) => mod.ShieldChallenge
    )
)
const ShieldSolution = dynamic(
  () =>
    import("@/components/shield/shield-solution").then(
      (mod) => mod.ShieldSolution
    )
)
const ShieldIntegration = dynamic(
  () =>
    import("@/components/shield/shield-integration").then(
      (mod) => mod.ShieldIntegration
    )
)

const ShieldCTA = dynamic(
  () =>
    import("@/components/shield/shield-cta").then(
      (mod) => mod.ShieldCTA
    )
)
const ShieldFooter = dynamic(
  () =>
    import("@/components/shield/shield-footer").then(
      (mod) => mod.ShieldFooter
    )
)

export default function ShieldPage() {
  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <ShieldNavbar />
      <main id="main-content">
        <ShieldHero />
        <ShieldChallenge />
        <ShieldSolution />
        <ShieldIntegration />
        <ShieldCTA />
      </main>
      <ShieldFooter />
    </div>
  )
}
