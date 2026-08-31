import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { arabicVars } from "@/lib/fonts/arabic"
import "../globals.css"

const TITLE = "موناكس — حماية القرار"
const DESCRIPTION =
  "موناكس شركة لحماية القرار. سجلات قرار مختومة ومتحقَّق منها خصومياً وفق معيار حماية القرار (DPS-1) — معاصرة لحظة إنشائها، ومُسندة إلى بندها، وقابلة للتحقق مستقلاً عنا."

export const metadata: Metadata = {
  metadataBase: new URL("https://monakes.com/"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://monakes.com/ar/",
    languages: { en: "https://monakes.com/", ar: "https://monakes.com/ar/" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ar_QA",
    url: "https://monakes.com/ar/",
    siteName: "Monakes",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "light",
}

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={arabicVars}>
      <head>
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
