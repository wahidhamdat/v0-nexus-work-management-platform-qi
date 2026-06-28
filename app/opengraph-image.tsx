import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Monakes — Protect the Decision. Close the Documentation Gap."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            color: "#8A1538",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              background: "#8A1538",
              transform: "rotate(45deg)",
            }}
          />
          Monakes
        </div>
        <div
          style={{
            color: "#F7F5F2",
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 800,
          }}
        >
          Protect the Decision. Close the Documentation Gap.
        </div>
        <div
          style={{
            color: "#5A5A5A",
            fontSize: 22,
            marginTop: 24,
          }}
        >
          AI-powered procurement evaluation. 48-hour evidentiary record. Deployed on your infrastructure.
        </div>
        <div
          style={{
            color: "#8A1538",
            fontSize: 16,
            marginTop: 16,
            fontWeight: 600,
          }}
        >
          monakes.com
        </div>
      </div>
    ),
    { ...size },
  )
}
