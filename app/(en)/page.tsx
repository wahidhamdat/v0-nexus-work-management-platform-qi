import { PageShell } from "@/components/page-shell"
import { en } from "@/lib/content"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://monakes.com/#organization",
      name: "Monakes",
      legalName: "Monakes for Artificial Intelligence Solutions LLC",
      url: "https://monakes.com",
      email: "info@monakes.com",
      description:
        "Monakes builds AI tender evaluation that produces a complete, contemporaneous record of every procurement decision.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Qatar Science & Technology Park, Education City",
        addressLocality: "Doha",
        addressCountry: "QA",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://monakes.com/#website",
      url: "https://monakes.com",
      name: "Monakes",
      inLanguage: ["en", "ar"],
      publisher: { "@id": "https://monakes.com/#organization" },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageShell content={en} />
    </>
  )
}
