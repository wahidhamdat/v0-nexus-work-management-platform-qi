import type React from "react"
import type { Metadata } from "next"
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
  metadataBase: new URL("https://monakesai.com"),
  title: {
    default: "MonakesAI — AI Agents for Freight Forwarding & 3PL Operations",
    template: "%s | MonakesAI",
  },
  description:
    "Deploy AI agents that quote freight in 4 minutes, automate multi-carrier bookings, and track containers in real-time. Human-in-the-loop automation for freight forwarders and 3PLs. 85% faster operations.",
  keywords: [
    "AI freight forwarding",
    "freight quoting automation",
    "AI agents logistics",
    "automated freight quotes",
    "3PL automation software",
    "freight forwarding AI agents",
    "container tracking automation",
    "multi-carrier booking automation",
    "freight operations AI",
    "digital employees logistics",
    "AI-powered freight management",
    "freight forwarder software",
    "logistics automation platform",
    "automated carrier booking",
    "container lifecycle management",
    "freight quote software",
    "AI logistics agents",
    "human-in-the-loop logistics",
    "freight forwarding technology",
    "supply chain AI automation",
  ],
  authors: [{ name: "MonakesAI", url: "https://monakesai.com" }],
  creator: "MonakesAI",
  publisher: "MonakesAI",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "https://monakesai.com" },
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
    url: "https://monakesai.com",
    siteName: "MonakesAI",
    title: "MonakesAI — AI Agents That Quote, Book & Track Freight Automatically",
    description:
      "Deploy AI digital employees for freight forwarding. Quote in 4 minutes, automate bookings across 8+ carrier portals, track every container. 85% faster. $107K annual savings.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MonakesAI - AI Agents for Freight Forwarding and 3PL Operations",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MonakesAI — AI Agents for Freight & Logistics",
    description:
      "AI agents that quote freight in 4 min, automate multi-carrier bookings, and track containers. Human-in-the-loop. $107K avg annual savings.",
    images: ["/opengraph-image"],
    creator: "@monakesai",
    site: "@monakesai",
  },
  category: "technology",
  other: {
    "theme-color": "#06090f",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      </body>
    </html>
  )
}
