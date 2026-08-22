import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { latinVars } from "@/lib/fonts/latin"
import { JS_FLAG } from "@/lib/fonts/flag"
import "../globals.css"

const TITLE = "Monakes — Tender Evaluation That Produces a Defensible Record"
const DESCRIPTION =
  "Monakes turns tender evaluation into a fast, defensible record: every score timestamped at creation, attributed to its evaluator, locked against edit, and traced to the clause it came from. In a third of the time. Runs online or inside your own environment."

export const metadata: Metadata = {
  metadataBase: new URL("https://monakes.com/"),
  title: { default: TITLE, template: "%s | Monakes" },
  description: DESCRIPTION,
  applicationName: "Monakes",
  authors: [{ name: "Monakes", url: "https://monakes.com" }],
  creator: "Monakes",
  publisher: "Monakes",
  keywords: [
    "tender evaluation",
    "public procurement",
    "contemporaneous record",
    "evidentiary record",
    "procurement audit trail",
    "arbitration evidence",
    "bid protest defence",
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
  themeColor: "#8A1538",
  colorScheme: "light",
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={latinVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
