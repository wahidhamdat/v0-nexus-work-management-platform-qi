import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { arabicVars } from "@/lib/fonts/arabic"
import { JS_FLAG } from "@/lib/fonts/flag"
import "../globals.css"

const TITLE = "مُناكس — تقييم عطاءات يُنتج سجلاً قابلاً للدفاع عنه"
const DESCRIPTION =
  "تحوّل مُناكس تقييم العطاءات إلى سجل سريع وقابل للدفاع عنه: كل درجة مختومة زمنياً لحظة إنشائها، ومنسوبة إلى مُقيّمها، ومحصّنة ضد التعديل، ومُسندة إلى البند الذي استُخلصت منه. وفي ثلث الوقت. يعمل عبر الإنترنت أو داخل بيئتكم الخاصة."

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
  themeColor: "#8A1538",
  colorScheme: "light",
}

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={arabicVars}>
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
