import dynamic from "next/dynamic"
import { ProcurementNavbar } from "@/components/procurement/procurement-navbar"
import { ProcurementHero } from "@/components/procurement/procurement-hero"
import { ProcurementTenSecondBar } from "@/components/procurement/procurement-ten-second-bar"
import { ProcurementMarketMoment } from "@/components/procurement/procurement-market-moment"

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
const ProcurementDifferent = dynamic(
  () =>
    import("@/components/procurement/procurement-different").then(
      (mod) => mod.ProcurementDifferent
    )
)
const ProcurementHowItWorks = dynamic(
  () =>
    import("@/components/procurement/procurement-how-it-works").then(
      (mod) => mod.ProcurementHowItWorks
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
const ProcurementWhyNow = dynamic(
  () =>
    import("@/components/procurement/procurement-why-now").then(
      (mod) => mod.ProcurementWhyNow
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://monakes.com/#organization",
      name: "Monakes AI",
      url: "https://monakes.com",
      email: "info@monakes.com",
      description:
        "Monakes AI builds autonomous AI agents for regulated industries — export compliance, pharmaceutical logistics, government procurement, and healthcare claims.",
    },
    {
      "@type": "WebSite",
      "@id": "https://monakes.com/#website",
      url: "https://monakes.com",
      name: "Monakes AI",
      publisher: { "@id": "https://monakes.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://monakes.com/#webpage",
      url: "https://monakes.com",
      name: "AI-Powered Tender Evaluation for Public Procurement | Monakes",
      isPartOf: { "@id": "https://monakes.com/#website" },
      about: { "@id": "https://monakes.com/#organization" },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-[#F7F5F2]">
        <ProcurementNavbar />
        <main id="main-content">
          <ProcurementHero />
          <ProcurementTenSecondBar />
          <ProcurementMarketMoment />
          <ProcurementProblem />
          <ProcurementSolution />
          <ProcurementDifferent />
          <ProcurementHowItWorks />
          <ProcurementTraction />
          <ProcurementImpact />
          <ProcurementWhyNow />
          <ProcurementTeam />
          <ProcurementCompliance />
          <ProcurementDualCTA />
        </main>
        <ProcurementFooter />
      </div>
    </>
  )
}
