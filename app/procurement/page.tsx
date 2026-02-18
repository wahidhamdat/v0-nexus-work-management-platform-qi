import { ProcurementNavbar } from "@/components/procurement/procurement-navbar"
import { ProcurementHero } from "@/components/procurement/procurement-hero"
import { ProcurementProblem } from "@/components/procurement/procurement-problem"
import { ProcurementSolution } from "@/components/procurement/procurement-solution"
import { ProcurementHowItWorks } from "@/components/procurement/procurement-how-it-works"
import { ProcurementImpact } from "@/components/procurement/procurement-impact"
import { ProcurementWhyNow } from "@/components/procurement/procurement-why-now"
import { ProcurementFounder } from "@/components/procurement/procurement-founder"
import { ProcurementCTA } from "@/components/procurement/procurement-cta"
import { ProcurementFooter } from "@/components/procurement/procurement-footer"

export default function ProcurementPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <ProcurementNavbar />
      <main id="main-content">
        <ProcurementHero />
        <ProcurementProblem />
        <ProcurementSolution />
        <ProcurementHowItWorks />
        <ProcurementImpact />
        <ProcurementWhyNow />
        <ProcurementFounder />
        <ProcurementCTA />
      </main>
      <ProcurementFooter />
    </div>
  )
}
