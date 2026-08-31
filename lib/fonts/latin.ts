import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google"

/** Verdicts and monuments. 300 carries the big numerals, 500 the headlines. */
const display = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
})

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

/** Metadata only: timestamps, grades, hashes, § numerals. Nothing else. */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

/** Imported only by the English layout, so the Arabic family is never fetched here. */
export const latinVars = `${display.variable} ${body.variable} ${mono.variable}`
