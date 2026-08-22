import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google"

const display = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
})

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
  // Only small labels use mono; preloading it competes with the CSS and the
  // display face for bandwidth on the critical path.
  preload: false,
})

/** Imported only by the English layout, so the Arabic family is never fetched here. */
export const latinVars = `${display.variable} ${body.variable} ${mono.variable}`
