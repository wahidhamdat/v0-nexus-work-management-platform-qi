import dynamic from "next/dynamic"
import { ProcurementNavbar } from "@/components/procurement/procurement-navbar"
import { ProcurementHero } from "@/components/procurement/procurement-hero"

const ProcurementMarketMoment = dynamic(
  () =>
    import("@/components/procurement/procurement-market-moment").then(
      (mod) => mod.ProcurementMarketMoment
    )
)
const ProcurementProblem = dynamic(
  () =>
    import("@/components/procurement/procurement-problem").then(
      (mod) => mod.ProcurementProblem
    )
)
const ProcurementSolution = dynamic(
  () =>
    import("@/components/procurement/procurement-solution").then(
      (mod) => mod.ProcurementSolution
    )
)
const ProcurementHowItWorks = dynamic(
  () =>
    import("@/components/procurement/procurement-how-it-works").then(
      (mod) => mod.ProcurementHowItWorks
    )
)
const ProcurementDifferent = dynamic(
  () =>
    import("@/components/procurement/procurement-different").then(
      (mod) => mod.ProcurementDifferent
    )
)
const ProcurementTraction = dynamic(
  () =>
    import("@/components/procurement/procurement-traction").then(
      (mod) => mod.ProcurementTraction
    )
)
const ProcurementImpact = dynamic(
  () =>
    import("@/components/procurement/procurement-impact").then(
      (mod) => mod.ProcurementImpact
    )
)
const ProcurementTeam = dynamic(
  () =>
    import("@/components/procurement/procurement-team").then(
      (mod) => mod.ProcurementTeam
    )
)
const ProcurementCompliance = dynamic(
  () =>
    import("@/components/procurement/procurement-compliance").then(
      (mod) => mod.ProcurementCompliance
    )
)
const ProcurementWhyNow = dynamic(
  () =>
    import("@/components/procurement/procurement-why-now").then(
      (mod) => mod.ProcurementWhyNow
    )
)
const ProcurementDualCTA = dynamic(
  () =>
    import("@/components/procurement/procurement-dual-cta").then(
      (mod) => mod.ProcurementDualCTA
    )
)
const ProcurementFooter = dynamic(
  () =>
    import("@/components/procurement/procurement-footer").then(
      (mod) => mod.ProcurementFooter
    )
)

export default function ProcurementPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <ProcurementNavbar />
      <main id="main-content">
        <ProcurementHero />
        <ProcurementMarketMoment />
        <ProcurementProblem />
        <ProcurementSolution />
        <ProcurementHowItWorks />
        <ProcurementDifferent />
        <ProcurementTraction />
        <ProcurementImpact />
        <ProcurementTeam />
        <ProcurementCompliance />
        <ProcurementWhyNow />
        <ProcurementDualCTA />
      </main>
      <ProcurementFooter />
    </div>
  )
}
