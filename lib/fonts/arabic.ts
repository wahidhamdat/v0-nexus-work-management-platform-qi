import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google"

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
})

/** The spine and the legal citations stay Latin on the Arabic page. */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
  // Only small labels use mono; preloading it competes with the CSS and the
  // display face for bandwidth on the critical path.
  preload: false,
})

export const arabicVars = `${arabic.variable} ${mono.variable}`
