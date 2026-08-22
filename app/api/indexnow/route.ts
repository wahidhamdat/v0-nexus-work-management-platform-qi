import { NextResponse } from "next/server"

export async function POST() {
  const key = process.env.INDEXNOW_KEY || "indexnow-key"
  const baseUrl = "https://monakes.com"

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "monakes.com",
      key,
      keyLocation: `${baseUrl}/${key}.txt`,
      urlList: [`${baseUrl}/`, `${baseUrl}/ar/`],
    }),
  })

  return NextResponse.json({ status: res.status })
}
