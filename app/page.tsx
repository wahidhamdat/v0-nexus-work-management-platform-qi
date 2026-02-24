import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { AlertBar } from "@/components/home/alert-bar"
import { HeroSection } from "@/components/home/hero-section"
import ClientSections from "@/components/home/client-sections"
import { BriefingModalProvider } from "@/components/home/briefing-modal-context"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://monakes.com/#organization",
      name: "Monakes AI",
      url: "https://monakes.com",
      email: "ceo@monakes.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "UK",
      },
      description:
        "Monakes AI builds autonomous compliance intelligence for enterprises operating in controlled and sanctioned trade environments.",
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
      name: "Monakes AI",
      isPartOf: { "@id": "https://monakes.com/#website" },
      about: { "@id": "https://monakes.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://monakes.com/#shield",
      name: "Shield by Monakes AI",
      applicationCategory: "BusinessApplication",
      description:
        "Autonomous export compliance AI. Real-time denied party screening, ECCN classification, and immutable audit trail. Closes the liability gap between BIS rule changes and your screening tool.",
      url: "https://monakes.com/shield",
      provider: { "@id": "https://monakes.com/#organization" },
    },
  ],
}

export default function Home() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/*
      <BriefingModalProvider>
        <main id="main-content" className="min-h-screen bg-[#07111F]">
          <AlertBar />
          <Navbar belowAlertBar />
          <HeroSection />
          <ClientSections />

          <div className="sr-only" aria-hidden="true">
            <p>
              Monakes AI is the company behind Shield — autonomous export compliance
              infrastructure screening China-facing transactions against real-time
              BIS Entity Lists, OFAC SDN, and MEU Lists. Neural fuzzy matching.
              Immutable audit logs. London. ceo@monakes.com. This website is currently
              under construction; Shield is live in production.
            </p>
          </div>
        </main>
      </BriefingModalProvider>
      */}

      <main
        id="main-content"
        className="min-h-screen bg-[#07111F] flex items-center justify-center px-6"
      >
        <section className="max-w-xl mx-auto text-center">
          <h1
            className="text-2xl sm:text-3xl font-semibold text-[#e8ecf1] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            This website is currently under construction.
          </h1>
          <p className="text-sm sm:text-base text-[#8892a4] mb-6 leading-relaxed">
            Shield, the autonomous export compliance infrastructure built by Monakes AI,
            is live in production and available for evaluation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:ceo@monakes.com"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-sm bg-[#07111F] text-white border border-[#4A7FA5] text-sm sm:text-base font-medium hover:bg-[#0a1628] transition-colors"
            >
              Contact ceo@monakes.com
            </a>
            <a
              href="/shield"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-sm border border-white/20 text-sm sm:text-base text-[#e8ecf1] hover:bg-white/5 transition-colors"
            >
              View Shield page
            </a>
          </div>
        </section>
      </main>
    </SmoothScroll>
  )
}
