import { HomePage } from "@/components/home/home-page"

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
      name: "Monakes AI — AI Agents for Regulated Industries",
      isPartOf: { "@id": "https://monakes.com/#website" },
      about: { "@id": "https://monakes.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://monakes.com/#shield",
      name: "Shield by Monakes AI",
      applicationCategory: "BusinessApplication",
      description:
        "Autonomous export compliance AI. Real-time denied party screening, ECCN classification, and immutable audit trail.",
      url: "https://monakes.com/shield",
      provider: { "@id": "https://monakes.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://monakes.com/#quinn",
      name: "Quinn by Monakes AI",
      applicationCategory: "BusinessApplication",
      description:
        "AI pharma cold chain quoting agent. GDP-compliant quotes in under 5 minutes with carrier verification and audit documentation.",
      url: "https://monakes.com/pharma",
      provider: { "@id": "https://monakes.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://monakes.com/#procurement",
      name: "Procurement Accelerator by Monakes AI",
      applicationCategory: "BusinessApplication",
      description:
        "AI-powered tender evaluation that cuts evaluation time by 80-90% with explainable scoring and hash-chained audit trails.",
      url: "https://monakes.com/procurement",
      provider: { "@id": "https://monakes.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://monakes.com/#claims",
      name: "Claims Intelligence by Monakes AI",
      applicationCategory: "BusinessApplication",
      description:
        "Pre-submission claims validation AI. Catches denial triggers upstream of adjudication with payer-specific rules and auto-correction.",
      url: "https://monakes.com/claims",
      provider: { "@id": "https://monakes.com/#organization" },
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
      <HomePage />
    </>
  )
}
