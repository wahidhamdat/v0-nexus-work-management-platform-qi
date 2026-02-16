import dynamic from "next/dynamic"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PharmaNavbar } from "@/components/pharma/pharma-navbar"
import { PharmaHero } from "@/components/pharma/pharma-hero"

const PharmaProblem = dynamic(
  () =>
    import("@/components/pharma/pharma-problem").then(
      (mod) => mod.PharmaProblem
    )
)
const PharmaFeatures = dynamic(
  () =>
    import("@/components/pharma/pharma-features").then(
      (mod) => mod.PharmaFeatures
    )
)
const PharmaComparison = dynamic(
  () =>
    import("@/components/pharma/pharma-comparison").then(
      (mod) => mod.PharmaComparison
    )
)
const PharmaStats = dynamic(
  () =>
    import("@/components/pharma/pharma-stats").then((mod) => mod.PharmaStats)
)
const PharmaPersonas = dynamic(
  () =>
    import("@/components/pharma/pharma-personas").then(
      (mod) => mod.PharmaPersonas
    )
)
const PharmaReportCta = dynamic(
  () =>
    import("@/components/pharma/pharma-report-cta").then(
      (mod) => mod.PharmaReportCta
    )
)
const PharmaFooter = dynamic(
  () =>
    import("@/components/pharma/pharma-footer").then(
      (mod) => mod.PharmaFooter
    )
)

export default function PharmaPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white">
        <PharmaNavbar />
        <PharmaHero />
        <PharmaProblem />
        <PharmaFeatures />
        <PharmaComparison />
        <PharmaStats />
        <PharmaPersonas />
        <PharmaReportCta />
        <PharmaFooter />
      </div>
    </SmoothScroll>
  )
}
