import { NextResponse } from "next/server"

export async function POST() {
  const key = process.env.INDEXNOW_KEY || "monakesai2025"
  const url = "https://monakesai.com/"

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "monakesai.com",
      key,
      keyLocation: `https://monakesai.com/${key}.txt`,
      urlList: [url],
    }),
  })

  return NextResponse.json({ status: res.status })
}
