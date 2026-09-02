import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { latinVars } from "@/lib/fonts/latin"
import "../globals.css"
import { OpenReplay } from "@/components/openreplay"

const TITLE = "Monakes — Decision Protection"
const DESCRIPTION =
  "Monakes is a decision-protection firm. Sealed, adversarially verified decision records under the Decision Protection Standard (DPS-1) — contemporaneous at creation, traceable to the clause, verifiable without us."

export const metadata: Metadata = {
  metadataBase: new URL("https://monakes.com/"),
  title: { default: TITLE, template: "%s | Monakes" },
  description: DESCRIPTION,
  applicationName: "Monakes",
  authors: [{ name: "Monakes", url: "https://monakes.com" }],
  creator: "Monakes",
  publisher: "Monakes",
  keywords: [
    "decision protection",
    "Decision Protection Standard",
    "DPS-1",
    "contemporaneous record",
    "decision record",
    "adversarial verification",
    "tender evaluation",
    "bid protest defence",
    "arbitration evidence",
    "sovereign deployment",
    "Monakes",
  ],
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "https://monakes.com/",
    languages: { en: "https://monakes.com/", ar: "https://monakes.com/ar/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monakes.com/",
    siteName: "Monakes",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "light",
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={latinVars}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <OpenReplay />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
