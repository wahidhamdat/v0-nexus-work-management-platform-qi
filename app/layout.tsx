import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Syne, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://monakes.com/"),
  title: {
    default: "Monakes AI — Autonomous Export Compliance | Shield",
    template: "%s | Monakes AI",
  },
  description:
    "Monakes AI builds autonomous compliance intelligence for enterprises operating in controlled and sanctioned trade environments. Shield is the flagship deployment.",
  keywords: [
    "export compliance",
    "denied party screening",
    "BIS entity list",
    "OFAC SDN",
    "ECCN classification",
    "sanctions screening",
    "export control",
    "compliance automation",
    "audit trail",
    "Shield",
    "Monakes AI",
  ],
  authors: [{ name: "Monakes AI", url: "https://monakes.com" }],
  creator: "Monakes AI",
  publisher: "Monakes AI",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "https://monakes.com/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monakes.com/",
    siteName: "Monakes AI",
    title: "Monakes AI — Autonomous Export Compliance | Shield",
    description:
      "Autonomous compliance intelligence for controlled and sanctioned trade. Real-time screening, deterministic classification, immutable audit trail.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Monakes AI — Shield Export Compliance",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monakes AI — Autonomous Export Compliance | Shield",
    description:
      "Autonomous compliance intelligence for controlled and sanctioned trade. Shield screens in real time. Sub-200ms. Deterministic. Immutable audit.",
    images: ["/opengraph-image"],
    creator: "@monakesai",
    site: "@monakesai",
  },
  category: "technology",
  other: {
    "theme-color": "#0a0a0a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${syne.variable} ${dmSans.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00e5a0] focus:text-[#06090f] focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Analytics />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vfblvmupfn");`}
        </Script>
      </body>
    </html>
  )
}
