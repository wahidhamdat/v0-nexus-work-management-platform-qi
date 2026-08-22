import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString()
  return [
    {
      url: "https://monakes.com/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: "https://monakes.com/", ar: "https://monakes.com/ar/" } },
    },
    {
      url: "https://monakes.com/ar/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: "https://monakes.com/", ar: "https://monakes.com/ar/" } },
    },
  ]
}
