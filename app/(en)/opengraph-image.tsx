import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const alt = "Monakes — sealed, adversarially verified decision records"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** The card is the vault: the same ground the hero opens on. */
export default async function Image() {
  const [serif, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/SourceSerif4-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/IBMPlexMono-Medium.ttf")),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0D10",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, background: "#8A1538" }} />
            <span style={{ fontFamily: "Mono", fontSize: 20, letterSpacing: 4, color: "#FBFBFC" }}>
              MONAKES
            </span>
          </div>
          <span style={{ fontFamily: "Mono", fontSize: 15, letterSpacing: 2.4, color: "#6B727C" }}>
            EXHIBIT A
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Serif",
              fontSize: 66,
              lineHeight: 1.04,
              letterSpacing: -1.6,
              color: "#FBFBFC",
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>The decision was sound.</span>
            <span>Three years later, the record has to prove it.</span>
          </div>
          <div style={{ width: 96, height: 2, background: "#8A1538", marginTop: 36 }} />
        </div>

        <div
          style={{
            fontFamily: "Mono",
            fontSize: 16,
            letterSpacing: 1.6,
            color: "#6B727C",
            display: "flex",
          }}
        >
          DECISION PROTECTION · DPS-1 · MONAKES.COM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 600 },
        { name: "Mono", data: mono, style: "normal", weight: 500 },
      ],
    }
  )
}
