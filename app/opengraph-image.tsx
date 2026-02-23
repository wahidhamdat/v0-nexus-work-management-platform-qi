import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Monakes AI — Autonomous Export Compliance | Shield"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07111F",
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
            color: "#4A7FA5",
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
              background: "#4A7FA5",
              transform: "rotate(45deg)",
            }}
          />
          Monakes AI
        </div>
        <div
          style={{
            color: "#e8ecf1",
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 800,
          }}
        >
          Autonomous Export Compliance | Shield
        </div>
        <div
          style={{
            color: "#8892a4",
            fontSize: 22,
            marginTop: 24,
          }}
        >
          Real-time screening. Deterministic classification. Immutable audit trail.
        </div>
        <div
          style={{
            color: "#5a6478",
            fontSize: 16,
            marginTop: 16,
          }}
        >
          monakes.com
        </div>
      </div>
    ),
    { ...size },
  )
}
