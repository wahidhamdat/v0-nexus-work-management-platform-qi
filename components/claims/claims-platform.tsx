"use client"

import { useState, useEffect, useRef } from "react"

/* ═══════════════════════════════════════════
   MONAKESAI — Enterprise Healthcare Palette
   Clean, trustworthy, what health plans expect
   ═══════════════════════════════════════════ */

const C = {
  // Core
  white: "#FFFFFF",
  bg: "#F7F8FA",
  bgAlt: "#EEF1F5",
  surface: "#FFFFFF",
  // Blues — primary brand
  navy: "#0F2B46",
  navyLight: "#1A3A5C",
  blue: "#1B6EC2",
  blueLight: "#E8F0FE",
  blueMid: "#3B82C4",
  // Functional
  green: "#0D8A5E",
  greenLight: "#E6F5EE",
  greenBg: "#F0FDF4",
  red: "#C4392D",
  redLight: "#FEF2F2",
  amber: "#B45309",
  amberLight: "#FFFBEB",
  // Text
  text: "#1A202C",
  textSecondary: "#4A5568",
  textMuted: "#718096",
  textLight: "#A0AEC0",
  // Borders
  border: "#E2E8F0",
  borderLight: "#EDF2F7",
  // Accents
  teal: "#0D8A7C",
  tealLight: "#E6FAF8",
}

const FONT =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

/* ═══════ SAMPLE CLAIMS DATA ═══════ */

const SAMPLE_CLAIMS = [
  {
    id: "CLM-2026-00471",
    type: "837P (Professional)",
    patient: "M. Gonzalez",
    memberId: "UHC-****1205",
    payer: "UnitedHealthcare",
    provider: "Dr. James Park, MD",
    npi: "1234567890",
    dos: "03/08/2026",
    dx: ["M54.5 — Low back pain", "M47.816 — Spondylosis, lumbar"],
    cpt: [
      {
        code: "99214",
        desc: "Office visit, established patient",
        charge: "$185.00",
      },
      {
        code: "72148",
        desc: "MRI lumbar spine w/o contrast",
        charge: "$1,240.00",
      },
      {
        code: "20610",
        desc: "Arthrocentesis, major joint",
        charge: "$320.00",
      },
    ],
    pos: "11 — Office",
    totalCharge: "$1,745.00",
    issues: [
      {
        severity: "HIGH",
        type: "Prior Authorization Missing",
        detail:
          "CPT 72148 (MRI lumbar spine) requires prior authorization for UnitedHealthcare commercial plans. No auth number found in Loop 2300 REF*G1.",
        recommendation:
          "Obtain prior auth before submission. Auth can be retroactive within 72 hours for urgent cases.",
        autoCorrect: false,
      },
      {
        severity: "MEDIUM",
        type: "Medical Necessity Flag",
        detail:
          "CPT 72148 paired with Dx M54.5 may be denied. UHC policy requires 6 weeks of conservative treatment documentation before imaging.",
        recommendation:
          "Add supporting Dx M47.816 as primary for MRI line item. Attach clinical notes documenting failed conservative treatment. Approval rate improves from 34% to 89%.",
        autoCorrect: false,
      },
      {
        severity: "LOW",
        type: "Modifier Missing",
        detail:
          "CPT 20610 performed same day as 99214 — modifier -25 required on E/M code to indicate separately identifiable service.",
        recommendation: "Auto-applying modifier -25 to CPT 99214.",
        autoCorrect: true,
      },
    ],
    score: 42,
    scoreLabel: "HIGH RISK",
  },
  {
    id: "CLM-2026-00472",
    type: "837I (Institutional)",
    patient: "R. Chen",
    memberId: "BCBS-****4219",
    payer: "BlueCross BlueShield TX",
    provider: "Memorial Hermann Hospital",
    npi: "9876543210",
    dos: "03/05/2026 — 03/07/2026",
    dx: [
      "I21.01 — STEMI, LAD",
      "I25.10 — Coronary artery disease",
      "E11.9 — Type 2 diabetes",
    ],
    cpt: [
      {
        code: "92928",
        desc: "PCI with stent, single vessel",
        charge: "$18,450.00",
      },
      {
        code: "93458",
        desc: "Left heart catheterization",
        charge: "$4,200.00",
      },
      {
        code: "99223",
        desc: "Initial hospital care, high complexity",
        charge: "$580.00",
      },
    ],
    pos: "21 — Inpatient Hospital",
    totalCharge: "$23,230.00",
    issues: [
      {
        severity: "MEDIUM",
        type: "DRG Optimization",
        detail:
          "Current coding maps to MS-DRG 247 (PCI w/o MCC). Adding E11.9 as secondary Dx with HbA1c documentation may qualify for MS-DRG 246 (PCI w/ MCC), increasing reimbursement by ~$4,200.",
        recommendation:
          "Verify HbA1c lab results in chart. If ≥6.5%, ensure E11.9 is coded with appropriate specificity. Revenue impact: +$4,200.",
        autoCorrect: false,
      },
      {
        severity: "LOW",
        type: "Eligibility Verified",
        detail:
          "Member eligibility confirmed through BCBS TX real-time 270/271. Coverage active, deductible met ($3,500/$3,500).",
        recommendation: "No action needed. Claim is eligible for processing.",
        autoCorrect: false,
      },
    ],
    score: 78,
    scoreLabel: "MODERATE RISK",
  },
]

const PAYER_RULES_LOG = [
  "Loading UnitedHealthcare commercial rule set v2026.03...",
  "Checking medical policy: Imaging — Lumbar Spine (Policy #2024-RAD-041)...",
  "Validating prior authorization requirements per plan config...",
  "Cross-referencing CCI edits for procedure combinations...",
  "Checking MUE limits for CPT 20610 (unit limit: 1 per DOS)...",
  "Applying modifier logic — same-day E/M + procedure rules...",
  "Validating NPI against provider network file...",
  "Running medical necessity scoring against payer criteria...",
  "Generating corrective recommendations...",
  "Validation complete.",
]
const PAYER_RULES_LOG_2 = [
  "Loading BlueCross BlueShield TX institutional rule set v2026.03...",
  "Checking MS-DRG assignment logic for cardiac procedures...",
  "Validating 270/271 eligibility response...",
  "Cross-referencing CCI edits for catheterization + PCI bundle...",
  "Checking inpatient admission criteria...",
  "Analyzing DRG optimization opportunities (MCC/CC evaluation)...",
  "Validating provider contract rates for facility claims...",
  "Running medical necessity scoring against payer criteria...",
  "Generating corrective recommendations...",
  "Validation complete.",
]

/* ═══════ DASHBOARD DATA ═══════ */

const DASHBOARD_CLAIMS = [
  {
    id: "CLM-2026-00847",
    type: "837P",
    provider: "Mercy General Hospital",
    member: "****6721",
    dos: "03/08/2026",
    amount: "$4,280",
    status: "corrected",
    issues: 1,
    severity: "low",
    correction: "Place of Service code corrected from 22 to 11.",
  },
  {
    id: "CLM-2026-00848",
    type: "837I",
    provider: "Atlantic Surgical Center",
    member: "****3394",
    dos: "03/07/2026",
    amount: "$18,750",
    status: "flagged",
    issues: 3,
    severity: "high",
    correction:
      "Missing prior authorization for total knee arthroplasty. CCI edit conflict: 27447 + 29881 bundling violation. Medical necessity documentation insufficient.",
  },
  {
    id: "CLM-2026-00849",
    type: "837P",
    provider: "Lakeside Family Practice",
    member: "****8812",
    dos: "03/09/2026",
    amount: "$320",
    status: "passed",
    issues: 0,
    severity: "none",
    correction: null,
  },
  {
    id: "CLM-2026-00850",
    type: "837P",
    provider: "Summit Cardiology Group",
    member: "****1057",
    dos: "03/06/2026",
    amount: "$2,140",
    status: "flagged",
    issues: 2,
    severity: "medium",
    correction:
      "Modifier -26 missing for professional component. Frequency limit exceeded: same procedure within 90-day window.",
  },
  {
    id: "CLM-2026-00851",
    type: "837I",
    provider: "Children's Medical Center",
    member: "****5543",
    dos: "03/08/2026",
    amount: "$7,890",
    status: "corrected",
    issues: 1,
    severity: "low",
    correction: "NDC code added for administered antibiotic.",
  },
  {
    id: "CLM-2026-00852",
    type: "837P",
    provider: "Desert Pain Management",
    member: "****9920",
    dos: "03/05/2026",
    amount: "$1,650",
    status: "passed",
    issues: 0,
    severity: "none",
    correction: null,
  },
]

/* ═══════ REUSABLE COMPONENTS ═══════ */

const Section = ({
  children,
  bg = C.white,
  id,
  py = "80px",
}: {
  children: React.ReactNode
  bg?: string
  id?: string
  py?: string
}) => (
  <section id={id} style={{ background: bg, padding: `${py} 0` }}>
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
      {children}
    </div>
  </section>
)

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: C.blue,
      marginBottom: 12,
    }}
  >
    {children}
  </div>
)

const SectionTitle = ({
  children,
  sub,
}: {
  children: React.ReactNode
  sub?: string
}) => (
  <div style={{ marginBottom: sub ? 12 : 40 }}>
    <h2
      style={{
        fontSize: 32,
        fontWeight: 700,
        color: C.navy,
        lineHeight: 1.2,
        margin: 0,
      }}
    >
      {children}
    </h2>
    {sub && (
      <p
        style={{
          fontSize: 17,
          color: C.textSecondary,
          marginTop: 12,
          lineHeight: 1.6,
          maxWidth: 640,
        }}
      >
        {sub}
      </p>
    )}
  </div>
)

const Btn = ({
  children,
  primary,
  onClick,
  style = {},
}: {
  children: React.ReactNode
  primary?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "12px 28px",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
      background: primary ? C.blue : C.white,
      color: primary ? C.white : C.navy,
      boxShadow: primary
        ? "0 2px 8px rgba(27,110,194,0.3)"
        : "0 1px 3px rgba(0,0,0,0.1)",
      transition: "all 0.2s",
      ...style,
    }}
  >
    {children}
  </button>
)

const StatCard = ({
  num,
  label,
  sub,
}: {
  num: string
  label: string
  sub?: string
}) => (
  <div style={{ textAlign: "center", flex: 1 }}>
    <div
      style={{
        fontSize: 40,
        fontWeight: 800,
        color: C.navy,
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}
    >
      {num}
    </div>
    <div
      style={{
        fontSize: 14,
        fontWeight: 600,
        color: C.textSecondary,
        marginTop: 8,
      }}
    >
      {label}
    </div>
    {sub && (
      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>
        {sub}
      </div>
    )}
  </div>
)

const Badge = ({
  children,
  color,
  bg,
}: {
  children: React.ReactNode
  color: string
  bg: string
}) => (
  <span
    style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.04em",
      color,
      background: bg,
      border: `1px solid ${color}18`,
    }}
  >
    {children}
  </span>
)

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { l: string; c: string; b: string }> = {
    passed: { l: "PASSED", c: C.green, b: C.greenLight },
    corrected: { l: "AUTO-CORRECTED", c: C.blue, b: C.blueLight },
    flagged: { l: "FLAGGED", c: C.red, b: C.redLight },
  }
  const m = map[status] || map.passed
  return (
    <Badge color={m.c} bg={m.b}>
      {m.l}
    </Badge>
  )
}

const SevBadge = ({ severity }: { severity: string }) => {
  const map: Record<string, { c: string; b: string }> = {
    HIGH: { c: C.red, b: C.redLight },
    MEDIUM: { c: C.amber, b: C.amberLight },
    LOW: { c: C.green, b: C.greenLight },
  }
  const m = map[severity] || map.LOW
  return (
    <Badge color={m.c} bg={m.b}>
      {severity}
    </Badge>
  )
}

/* ═══════ SCORE RING ═══════ */

const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const color = score < 50 ? C.red : score < 75 ? C.amber : C.green
  const circ = 2 * Math.PI * 36
  const offset = circ - (score / 100) * circ
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle
          cx="45"
          cy="45"
          r="36"
          fill="none"
          stroke={C.border}
          strokeWidth="7"
        />
        <circle
          cx="45"
          cy="45"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
        <text
          x="45"
          y="42"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill={C.navy}
        >
          {score}
        </text>
        <text
          x="45"
          y="56"
          textAnchor="middle"
          fontSize="8"
          fill={C.textMuted}
        >
          / 100
        </text>
      </svg>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color,
          marginTop: 4,
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ═══════ NAV ═══════ */

const Nav = ({
  page,
  setPage,
}: {
  page: string
  setPage: (p: string) => void
}) => (
  <nav
    style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: C.white,
      borderBottom: `1px solid ${C.border}`,
      padding: "0 32px",
    }}
  >
    <div
      style={{
        maxWidth: 1140,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: C.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: C.navy,
            letterSpacing: "-0.01em",
          }}
        >
          MONAKESAI
        </span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {[
          { id: "landing", label: "Overview" },
          { id: "demo", label: "Live Demo" },
          { id: "dashboard", label: "Dashboard" },
          { id: "book", label: "Book a Call" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setPage(t.id)}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: page === t.id ? 600 : 400,
              cursor: "pointer",
              border: "none",
              transition: "all 0.2s",
              background: page === t.id ? C.blueLight : "transparent",
              color: page === t.id ? C.blue : C.textSecondary,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Btn primary onClick={() => setPage("book")}>
        Schedule a Call
      </Btn>
    </div>
  </nav>
)

/* ═══════════════════════════════════════════
   ROI CALCULATOR
   ═══════════════════════════════════════════ */

const ROICalculator = ({ setPage }: { setPage: (p: string) => void }) => {
  const [vals, setVals] = useState({
    claimsMonth: 500000,
    autoAdjRate: 81,
    manualCost: 20,
    examinerSalary: 55000,
    claimsPerExaminer: 40,
    denialRate: 12,
    appealPct: 40,
    overturnPct: 54,
  })

  const set = (k: string, v: number) =>
    setVals((p) => ({ ...p, [k]: v }))
  const n = (v: number) => Number(v) || 0

  const manualBefore = Math.round(
    n(vals.claimsMonth) * (1 - n(vals.autoAdjRate) / 100)
  )
  const manualCostBefore = manualBefore * n(vals.manualCost)
  const ftesBefore = Math.ceil(manualBefore / (n(vals.claimsPerExaminer) * 21))
  const fteCostBefore = Math.round((ftesBefore * n(vals.examinerSalary)) / 12)
  const deniedBefore = Math.round(
    n(vals.claimsMonth) * (n(vals.denialRate) / 100)
  )
  const appealedBefore = Math.round(deniedBefore * (n(vals.appealPct) / 100))
  const appealUnitCost = 65
  const appealCostBefore = appealedBefore * appealUnitCost
  const overturnedBefore = Math.round(
    appealedBefore * (n(vals.overturnPct) / 100)
  )
  const totalBefore = manualCostBefore + appealCostBefore

  const newAutoAdj = Math.min(n(vals.autoAdjRate) + 12, 97)
  const manualAfter = Math.round(
    n(vals.claimsMonth) * (1 - newAutoAdj / 100)
  )
  const manualCostAfter = manualAfter * n(vals.manualCost)
  const ftesAfter = Math.ceil(manualAfter / (n(vals.claimsPerExaminer) * 21))
  const fteCostAfter = Math.round((ftesAfter * n(vals.examinerSalary)) / 12)
  const ftesFreed = ftesBefore - ftesAfter
  const deniedAfter = Math.round(deniedBefore * 0.42)
  const appealedAfter = Math.round(deniedAfter * (n(vals.appealPct) / 100))
  const appealCostAfter = appealedAfter * appealUnitCost
  const overturnedAfter = Math.round(
    appealedAfter * (n(vals.overturnPct) / 100)
  )
  const platformCost = n(vals.claimsMonth) * 0.75
  const totalAfter = manualCostAfter + appealCostAfter + platformCost
  const monthlySavings = totalBefore - totalAfter
  const annualSavings = monthlySavings * 12
  const roi =
    platformCost > 0
      ? Math.round((monthlySavings / platformCost) * 100) / 100
      : 0

  const fmt = (v: number) => {
    if (Math.abs(v) >= 1000000) return "$" + (v / 1000000).toFixed(1) + "M"
    if (Math.abs(v) >= 1000) return "$" + Math.round(v).toLocaleString()
    return "$" + v.toFixed(0)
  }
  const fK = (v: number) =>
    v >= 1000
      ? Math.round(v / 1000).toLocaleString() + "K"
      : v.toLocaleString()

  const Slider = ({
    label,
    tip,
    field,
    min,
    max,
    step = 1,
    pre = "",
    suf = "",
    fmtFn,
  }: {
    label: string
    tip?: string
    field: string
    min: number
    max: number
    step?: number
    pre?: string
    suf?: string
    fmtFn?: (v: number) => string
  }) => {
    const v = n((vals as Record<string, number>)[field])
    const pct = ((v - min) / (max - min)) * 100
    const display = fmtFn
      ? fmtFn(v)
      : `${pre}${v.toLocaleString()}${suf}`
    return (
      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 3,
          }}
        >
          <label
            style={{ fontSize: 13, fontWeight: 500, color: C.textSecondary }}
          >
            {label}
          </label>
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: C.navy,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {display}
          </span>
        </div>
        {tip && (
          <div style={{ fontSize: 11, color: C.textLight, marginBottom: 6 }}>
            {tip}
          </div>
        )}
        <div
          style={{
            position: "relative",
            height: 32,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: 5,
              borderRadius: 3,
              background: C.bgAlt,
            }}
          />
          <div
            style={{
              position: "absolute",
              height: 5,
              borderRadius: 3,
              background: C.blue,
              width: `${pct}%`,
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={v}
            onChange={(e) => set(field, Number(e.target.value))}
            style={{
              position: "absolute",
              width: "100%",
              height: 32,
              opacity: 0,
              cursor: "pointer",
              margin: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `calc(${pct}% - 9px)`,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: C.white,
              border: `3px solid ${C.blue}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              pointerEvents: "none",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <span style={{ fontSize: 10, color: C.textLight }}>
            {pre}
            {min.toLocaleString()}
            {suf}
          </span>
          <span style={{ fontSize: 10, color: C.textLight }}>
            {pre}
            {max.toLocaleString()}
            {suf}
          </span>
        </div>
      </div>
    )
  }

  const Row = ({
    label,
    before,
    after,
    indent,
    bold,
  }: {
    label: string
    before: string
    after: string
    indent?: boolean
    bold?: boolean
  }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 100px 100px",
        padding: "9px 0",
        borderBottom: `1px solid ${C.borderLight}`,
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: bold ? C.navy : C.textSecondary,
          paddingLeft: indent ? 14 : 0,
          fontWeight: bold ? 600 : 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: C.text,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {before}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: C.blue,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {after}
      </span>
    </div>
  )

  const Divider = ({ label }: { label: string }) => (
    <div style={{ padding: "10px 0 4px", borderBottom: `1px solid ${C.border}` }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: C.textMuted,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
  )

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 28,
        marginTop: 32,
      }}
    >
      {/* LEFT: Inputs */}
      <div
        style={{
          background: C.bg,
          borderRadius: 12,
          padding: 28,
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.blue}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 20V10M18 20V4M6 20v-4" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.navy }}>
            Your Plan&apos;s Numbers
          </span>
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 14,
            paddingBottom: 8,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          Claims Operations
        </div>
        <Slider
          label="Monthly Claims Volume"
          field="claimsMonth"
          min={50000}
          max={2000000}
          step={10000}
          fmtFn={(v) => fK(v)}
        />
        <Slider
          label="Auto-Adjudication Rate"
          tip="% of claims processed without human touch"
          field="autoAdjRate"
          min={60}
          max={95}
          suf="%"
        />
        <Slider
          label="Cost Per Manual Adjudication"
          tip="Fully loaded examiner cost per manually reviewed claim"
          field="manualCost"
          min={10}
          max={35}
          pre="$"
        />
        <Slider
          label="Claims Per Examiner Per Day"
          tip="Average throughput for manual adjudication queue"
          field="claimsPerExaminer"
          min={20}
          max={80}
        />
        <Slider
          label="Examiner Annual Salary"
          tip="Fully loaded (salary + benefits + overhead)"
          field="examinerSalary"
          min={40000}
          max={85000}
          step={1000}
          pre="$"
        />

        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 14,
            marginTop: 20,
            paddingBottom: 8,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          Denials &amp; Appeals
        </div>
        <Slider
          label="Denial Rate"
          tip="% of claims your adjudication system initially denies"
          field="denialRate"
          min={3}
          max={25}
          suf="%"
        />
        <Slider
          label="Provider Appeal Rate"
          tip="% of denied claims where providers file an appeal"
          field="appealPct"
          min={10}
          max={70}
          suf="%"
        />
        <Slider
          label="Appeal Overturn Rate"
          tip="% of appeals where your plan reverses the denial"
          field="overturnPct"
          min={20}
          max={70}
          suf="%"
        />
      </div>

      {/* RIGHT: Results */}
      <div>
        {/* Headline savings */}
        <div
          style={{
            background: C.navy,
            borderRadius: 12,
            padding: 28,
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.03)",
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}
          >
            Estimated Annual Savings to Your Plan
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: C.white,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {annualSavings > 0 ? fmt(annualSavings) : "$0"}
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 2,
                }}
              >
                Monthly
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {fmt(monthlySavings)}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 2,
                }}
              >
                ROI
              </div>
              <div
                style={{ fontSize: 15, fontWeight: 700, color: "#4ADE80" }}
              >
                {roi}x
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 2,
                }}
              >
                Examiners Freed
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {ftesFreed > 0 ? ftesFreed + " FTEs" : "—"}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 2,
                }}
              >
                Staffing Savings
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {fmt(
                  fteCostBefore - fteCostAfter > 0
                    ? fteCostBefore - fteCostAfter
                    : 0
                )}
                /mo
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div
          style={{
            background: C.white,
            borderRadius: 12,
            padding: 20,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 100px",
              padding: "0 0 8px",
              borderBottom: `2px solid ${C.border}`,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Metric
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                textAlign: "right",
              }}
            >
              Current
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.blue,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                textAlign: "right",
              }}
            >
              With MONAKESAI
            </span>
          </div>

          <Divider label="Manual Adjudication" />
          <Row
            label="Auto-adjudication rate"
            before={`${vals.autoAdjRate}%`}
            after={`${newAutoAdj}%`}
            bold
          />
          <Row
            label="Claims to manual queue"
            before={fK(manualBefore) + "/mo"}
            after={fK(manualAfter) + "/mo"}
            indent
          />
          <Row
            label="Examiners required"
            before={`${ftesBefore} FTEs`}
            after={`${ftesAfter} FTEs`}
            indent
          />
          <Row
            label="Manual adjudication cost"
            before={fmt(manualCostBefore) + "/mo"}
            after={fmt(manualCostAfter) + "/mo"}
            indent
          />

          <Divider label="Denials & Provider Appeals" />
          <Row
            label="Claims denied"
            before={fK(deniedBefore) + "/mo"}
            after={fK(deniedAfter) + "/mo"}
            bold
          />
          <Row
            label="Provider appeals filed"
            before={appealedBefore.toLocaleString() + "/mo"}
            after={appealedAfter.toLocaleString() + "/mo"}
            indent
          />
          <Row
            label="Appeals overturned (wasted)"
            before={overturnedBefore.toLocaleString() + "/mo"}
            after={overturnedAfter.toLocaleString() + "/mo"}
            indent
          />
          <Row
            label="Appeals processing cost"
            before={fmt(appealCostBefore) + "/mo"}
            after={fmt(appealCostAfter) + "/mo"}
            indent
          />

          <Divider label="Platform Investment" />
          <Row
            label="MONAKESAI (@$0.75/claim)"
            before="—"
            after={fmt(platformCost) + "/mo"}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 100px",
              padding: "12px 0 0",
              marginTop: 4,
              borderTop: `2px solid ${C.border}`,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>
              Total Monthly Cost
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.red,
                textAlign: "right",
              }}
            >
              {fmt(totalBefore)}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.green,
                textAlign: "right",
              }}
            >
              {fmt(totalAfter)}
            </span>
          </div>
        </div>

        {/* Not included */}
        <div
          style={{
            marginTop: 12,
            padding: 14,
            borderRadius: 8,
            background: C.bg,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C.textMuted,
              marginBottom: 4,
            }}
          >
            Additional value not quantified above
          </div>
          <div
            style={{ fontSize: 12, color: C.textLight, lineHeight: 1.6 }}
          >
            Provider network retention (fewer disputes, faster payments),
            prompt-pay law compliance, reduced member grievances, improved STAR
            ratings for MA plans, and reallocation of freed examiner FTEs to
            complex case management or fraud prevention.
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <Btn
            primary
            onClick={() => setPage("book")}
            style={{ width: "100%", padding: "14px 0", fontSize: 15 }}
          >
            Discuss These Numbers With Our Team
          </Btn>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════ */

const LandingPage = ({ setPage }: { setPage: (p: string) => void }) => (
  <div>
    {/* HERO */}
    <section
      style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        padding: "100px 0 80px",
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.1)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "0.04em",
              }}
            >
              PRE-SUBMISSION CLAIMS INTELLIGENCE
            </span>
          </div>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.15,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            Catch Denial Triggers
            <br />
            Before They Cost You
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              margin: "0 0 36px",
              maxWidth: 480,
            }}
          >
            AI-powered claims validation that sits upstream of your adjudication
            engine. Increase auto-adjudication rates, reduce manual review
            queues, and cut avoidable denial costs.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn
              primary
              onClick={() => setPage("demo")}
              style={{
                background: C.white,
                color: C.navy,
                boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              See Live Demo
            </Btn>
            <Btn
              onClick={() => setPage("book")}
              style={{
                background: "transparent",
                color: C.white,
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "none",
              }}
            >
              Request Pilot
            </Btn>
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.1)",
            padding: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ADE80",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              AGENT PROCESSING
            </span>
          </div>
          {[
            "EDI 837P parsed — 3 procedure lines identified",
            "Cross-referencing UHC commercial rule set v2026.03",
            "Prior auth required for CPT 72148 — no auth found",
            "CCI edit check: 99214 + 20610 — modifier -25 needed",
            "Medical necessity: M54.5 + 72148 — conservative tx required",
            "Auto-correction applied: modifier -25 → CPT 99214",
            "2 issues flagged with recommendations generated",
            "Validation complete — 1.2s processing time",
          ].map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "6px 0",
                borderBottom:
                  i < 7 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "monospace",
                  width: 20,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color:
                    i === 2
                      ? "#FCA5A5"
                      : i === 5
                        ? "#86EFAC"
                        : "rgba(255,255,255,0.5)",
                  fontFamily: "monospace",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* STATS BAR */}
    <section
      style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          gap: 32,
          justifyContent: "space-around",
        }}
      >
        <StatCard num="11.8%" label="Average Denial Rate" sub="2024 — MDaudit" />
        <StatCard
          num="$25.7B"
          label="Annual Adjudication Spend"
          sub="Premier Analysis"
        />
        <StatCard
          num="54%"
          label="Denials Overturned on Appeal"
          sub="Plan pays after wasted processing"
        />
        <StatCard
          num="15–20%"
          label="Claims Still Need Manual Review"
          sub="At most U.S. health plans"
        />
      </div>
    </section>

    {/* HOW IT WORKS */}
    <Section bg={C.bg} id="how">
      <SectionLabel>HOW IT WORKS</SectionLabel>
      <SectionTitle sub="The platform intercepts claims after the clearinghouse and before your adjudication engine. Three layers of intelligent validation in under 2 seconds.">
        Upstream Intelligence Layer
      </SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          marginTop: 40,
        }}
      >
        {[
          {
            step: "01",
            title: "Parse & Validate",
            desc: "Inbound EDI 837P and 837I files are parsed against X12 5010 standards. Every segment, loop, and data element is structurally validated.",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          },
          {
            step: "02",
            title: "Cross-Reference Rules",
            desc: "Each claim is validated against payer-specific adjudication rules, CCI edits, MUE limits, medical policies, and benefit configurations via RAG.",
            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
          },
          {
            step: "03",
            title: "Correct & Recommend",
            desc: "Simple issues are auto-corrected. Complex cases get detailed recommendations with supporting evidence, denial probability, and corrective actions.",
            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: C.white,
              borderRadius: 12,
              padding: 32,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: C.blueLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.blue}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
            </div>
            <div
              style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 8 }}
            >
              STEP {item.step}
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: C.navy,
                margin: "0 0 10px",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: C.textSecondary,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>

    {/* WHAT WE CATCH */}
    <Section bg={C.white} id="catches">
      <SectionLabel>DENIAL TRIGGERS IDENTIFIED</SectionLabel>
      <SectionTitle sub="The platform catches the issues that cause 85% of preventable denials across all major payers.">
        What the Agent Catches
      </SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 32,
        }}
      >
        {[
          {
            title: "Missing or Incorrect Modifiers",
            desc: "Modifier -25, -59, -26, laterality modifiers. Auto-corrected when deterministic.",
          },
          {
            title: "Prior Authorization Gaps",
            desc: "Missing, expired, or mismatched auth numbers. Retroactive auth windows flagged.",
          },
          {
            title: "CCI Edit Violations",
            desc: "Bundling conflicts, MUE limit breaches, and procedure combination rules.",
          },
          {
            title: "Medical Necessity",
            desc: "Diagnosis-procedure mismatch against payer medical policies and LCD/NCD criteria.",
          },
          {
            title: "Eligibility Mismatches",
            desc: "Real-time 270/271 verification. COB conflicts, terminated coverage, benefit limits.",
          },
          {
            title: "Coding Errors",
            desc: "Invalid CPT/HCPCS/ICD-10 codes, place of service mismatches, NDC omissions.",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              padding: 20,
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: C.white,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.blue,
                marginTop: 6,
                flexShrink: 0,
              }}
            />
            <div>
              <h4
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.navy,
                  margin: "0 0 6px",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: 13,
                  color: C.textSecondary,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* COMPARISON TABLE */}
    <Section bg={C.bg} id="compare">
      <SectionLabel>WHY MONAKESAI</SectionLabel>
      <SectionTitle sub="Traditional tools are either reactive (post-denial) or static (rules-based). We're proactive, intelligent, and adaptive.">
        How We Compare
      </SectionTitle>
      <div
        style={{
          marginTop: 32,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${C.border}`,
          background: C.white,
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <thead>
            <tr style={{ background: C.navy }}>
              {[
                "Capability",
                "RPA Tools",
                "Rules-Based Scrubbers",
                "Post-Denial Platforms",
                "MONAKESAI",
              ].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "14px 20px",
                    textAlign: "left",
                    color: C.white,
                    fontWeight: 600,
                    fontSize: 13,
                    borderRight:
                      i < 4 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Pre-submission validation", "—", "Partial", "—", "✓"],
              ["Dynamic rule adaptation", "—", "—", "—", "✓"],
              ["Auto-correction", "—", "Limited", "—", "✓"],
              ["AI-powered reasoning", "—", "—", "Partial", "✓"],
              ["Payer-specific logic", "—", "Static", "Partial", "✓"],
              ["Medical necessity analysis", "—", "—", "—", "✓"],
              ["Real-time processing (<2s)", "—", "✓", "—", "✓"],
              ["Continuous learning loop", "—", "—", "—", "✓"],
            ].map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: `1px solid ${C.borderLight}`,
                  background: i % 2 === 0 ? C.white : C.bg,
                }}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "12px 20px",
                      color:
                        j === 0
                          ? C.text
                          : cell === "✓"
                            ? C.green
                            : cell === "—"
                              ? C.textLight
                              : C.textSecondary,
                      fontWeight:
                        j === 0 ? 500 : cell === "✓" ? 700 : 400,
                      fontSize: cell === "✓" ? 16 : 13,
                      borderRight:
                        j < 4 ? `1px solid ${C.borderLight}` : "none",
                      background:
                        j === 4 ? "rgba(27,110,194,0.04)" : "transparent",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    {/* BENEFITS */}
    <Section bg={C.white} id="benefits">
      <SectionLabel>IMPACT FOR HEALTH PLANS</SectionLabel>
      <SectionTitle>Measurable Outcomes</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
        }}
      >
        {[
          {
            metric: "↑",
            label: "Auto-Adjudication Rate Increase",
            desc: "More claims pass through without human intervention. Exact improvement validated during 12-week pilot with your claims data.",
          },
          {
            metric: "↓",
            label: "Reduction in Manual Review Queue",
            desc: "Fewer claims pend to manual queue. Staff reallocated to complex case management and audit response. Reduction measured during pilot.",
          },
          {
            metric: "Fewer FTEs",
            label: "Examiner Capacity Freed",
            desc: "More claims auto-adjudicate. Fewer examiners needed for routine review. Redeploy to complex cases, fraud prevention, or audits.",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: 32,
              borderRadius: 12,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: C.blue,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              {item.metric}
            </div>
            <h4
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: C.navy,
                margin: "0 0 10px",
              }}
            >
              {item.label}
            </h4>
            <p
              style={{
                fontSize: 13,
                color: C.textSecondary,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>

    {/* ROI MODEL */}
    <Section bg={C.bg} id="roi">
      <SectionLabel>ROI MODEL</SectionLabel>
      <SectionTitle sub="Projected annual impact for a mid-size health plan processing 500,000 claims per month. Exact improvements validated during pilot.">
        Financial Impact — Illustrative
      </SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginTop: 32,
        }}
      >
        <div
          style={{
            background: C.white,
            borderRadius: 12,
            padding: 32,
            border: `1px solid ${C.border}`,
          }}
        >
          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: C.navy,
              margin: "0 0 24px",
            }}
          >
            Before MONAKESAI
          </h4>
          {[
            ["Auto-adjudication rate", "81%"],
            ["Claims to manual queue", "95,000/month"],
            ["Examiners required", "~113 FTEs"],
            ["Manual adjudication cost", "$1,900,000/month"],
            ["Provider appeals to process", "~24,000/month"],
            ["Appeals processing cost", "$1,560,000/month"],
          ].map(([l, v], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: `1px solid ${C.borderLight}`,
              }}
            >
              <span
                style={{ fontSize: 13, color: C.textSecondary }}
              >
                {l}
              </span>
              <span
                style={{ fontSize: 13, fontWeight: 600, color: C.text }}
              >
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 8,
              background: C.redLight,
              border: `1px solid ${C.red}18`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.red,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Total Monthly Cost
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: C.navy,
                marginTop: 4,
              }}
            >
              $3.46M
            </div>
            <div
              style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}
            >
              Manual adjudication + appeals processing — $41.5M annually
            </div>
          </div>
        </div>
        <div
          style={{
            background: C.white,
            borderRadius: 12,
            padding: 32,
            border: `2px solid ${C.blue}`,
          }}
        >
          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: C.blue,
              margin: "0 0 24px",
            }}
          >
            After MONAKESAI
          </h4>
          {[
            ["Auto-adjudication rate", "Improved*"],
            ["Claims to manual queue", "Reduced"],
            ["Examiners required", "Fewer FTEs needed"],
            ["Manual adjudication cost", "Reduced"],
            ["Provider appeals to process", "Reduced"],
            ["Appeals processing cost", "Reduced"],
            ["MONAKESAI platform ($0.50–$1.00/claim)", "Varies by plan"],
          ].map(([l, v], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom:
                  i < 6 ? `1px solid ${C.borderLight}` : "none",
              }}
            >
              <span
                style={{ fontSize: 13, color: C.textSecondary }}
              >
                {l}
              </span>
              <span
                style={{ fontSize: 13, fontWeight: 600, color: C.green }}
              >
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 8,
              background: C.greenBg,
              border: `1px solid ${C.green}22`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.green,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Estimated Savings
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: C.navy,
                marginTop: 4,
              }}
            >
              Validated During Pilot
            </div>
            <div
              style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}
            >
              *Use the ROI calculator below with your actual plan data to model
              projected impact
            </div>
          </div>
        </div>
      </div>
    </Section>

    {/* ROI CALCULATOR */}
    <Section bg={C.white} id="calculator">
      <SectionLabel>ROI CALCULATOR</SectionLabel>
      <SectionTitle sub="Enter your plan's numbers. Model the projected impact. Exact results validated during pilot.">
        Model Your Savings
      </SectionTitle>
      <ROICalculator setPage={setPage} />
    </Section>

    {/* COMPATIBILITY */}
    <Section bg={C.white} id="compat">
      <SectionLabel>PLATFORM COMPATIBILITY</SectionLabel>
      <SectionTitle sub="REST API for real-time integration. SFTP for batch processing. Compatible with your existing infrastructure.">
        Integrates With Your Stack
      </SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginTop: 32,
        }}
      >
        {[
          {
            cat: "Core Admin Systems",
            items: [
              "TriZetto QNXT",
              "TriZetto Facets",
              "HealthEdge HealthRules",
              "McKesson ClaimCheck",
              "Cognizant CAPS",
            ],
          },
          {
            cat: "EDI & Clearinghouses",
            items: [
              "AXIOM (Cotiviti)",
              "EDIFECS",
              "Change Healthcare",
              "Availity",
              "Waystar",
            ],
          },
          {
            cat: "Integration Modes",
            items: [
              "REST API (real-time)",
              "SFTP batch processing",
              "270/271 eligibility",
              "EDI 837P / 837I X12 5010",
              "HIPAA-compliant",
            ],
          },
        ].map((group, i) => (
          <div
            key={i}
            style={{
              padding: 28,
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              background: C.bg,
            }}
          >
            <h4
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: C.navy,
                margin: "0 0 16px",
              }}
            >
              {group.cat}
            </h4>
            {group.items.map((item, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom:
                    j < 4 ? `1px solid ${C.borderLight}` : "none",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={C.green}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: 13, color: C.textSecondary }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>

    {/* PILOT CTA */}
    <section style={{ background: C.navy, padding: "80px 0" }}>
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: C.white,
            margin: "0 0 16px",
          }}
        >
          Start With a 12-Week Pilot
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          Structured deployment against a subset of your claims volume.
          Measurable success metrics: auto-adjudication rate improvement, manual
          queue reduction, denial prediction accuracy. Full ROI validation before
          commitment.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Btn
            primary
            onClick={() => setPage("book")}
            style={{
              background: C.white,
              color: C.navy,
              padding: "14px 36px",
              fontSize: 15,
            }}
          >
            Schedule a Discussion
          </Btn>
          <Btn
            onClick={() => setPage("demo")}
            style={{
              background: "transparent",
              color: C.white,
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "none",
            }}
          >
            View Live Demo
          </Btn>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer
      style={{
        background: C.navy,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "32px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            MONAKESAI LIMITED
          </span>
          <span
            style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}
          >
            Company No. 17023329
          </span>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
          Office 17207, 182-184 High Street North, East Ham, London E6 2JA
        </span>
      </div>
    </footer>
  </div>
)

/* ═══════════════════════════════════════════
   DEMO PAGE
   ═══════════════════════════════════════════ */

const DemoPage = () => {
  const [sel, setSel] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [logLines, setLogLines] = useState<string[]>([])
  const [showScore, setShowScore] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)
  const claim = SAMPLE_CLAIMS[sel]
  const ruleLog = sel === 0 ? PAYER_RULES_LOG : PAYER_RULES_LOG_2

  useEffect(() => {
    setProcessed(false)
    setProcessing(false)
    setLogLines([])
    setShowScore(false)
  }, [sel])

  const run = () => {
    setProcessing(true)
    setProcessed(false)
    setLogLines([])
    setShowScore(false)
    ruleLog.forEach((line, i) => {
      setTimeout(() => {
        setLogLines((p) => [...p, line])
        if (logRef.current)
          logRef.current.scrollTop = logRef.current.scrollHeight
        if (i === ruleLog.length - 1)
          setTimeout(() => {
            setProcessing(false)
            setProcessed(true)
            setTimeout(() => setShowScore(true), 300)
          }, 600)
      }, (i + 1) * 400)
    })
  }

  return (
    <Section bg={C.bg} py="48px">
      <SectionLabel>INTERACTIVE DEMO</SectionLabel>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 24,
        }}
      >
        <SectionTitle sub="Select a claim type and run the validation agent. This simulates real platform behavior.">
          Live Agent Demonstration
        </SectionTitle>
        <div style={{ display: "flex", gap: 6 }}>
          {SAMPLE_CLAIMS.map((c, i) => (
            <button
              key={i}
              onClick={() => setSel(i)}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: sel === i ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
                border: `1px solid ${sel === i ? C.blue : C.border}`,
                background: sel === i ? C.blueLight : C.white,
                color: sel === i ? C.blue : C.textSecondary,
              }}
            >
              {c.type.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
      >
        {/* INBOUND CLAIM */}
        <div
          style={{
            background: C.white,
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: C.bg,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.blue,
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>
              INBOUND CLAIM
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: C.textMuted,
              }}
            >
              {claim.id}
            </span>
          </div>
          <div style={{ padding: 20 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
            >
              {(
                [
                  ["Patient", claim.patient],
                  ["Member ID", claim.memberId],
                  ["Payer", claim.payer],
                  ["Provider", claim.provider],
                  ["Date of Service", claim.dos],
                  ["Place of Service", claim.pos],
                ] as const
              ).map(([l, v], i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      marginBottom: 3,
                    }}
                  >
                    {l}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: l === "Payer" ? C.blue : C.text,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                Diagnosis Codes
              </div>
              {claim.dx.map((d, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: C.bg,
                    marginBottom: 4,
                    fontSize: 13,
                    color: C.textSecondary,
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                Procedure Lines
              </div>
              <div
                style={{
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  overflow: "hidden",
                }}
              >
                {claim.cpt.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderBottom:
                        i < claim.cpt.length - 1
                          ? `1px solid ${C.borderLight}`
                          : "none",
                      background: i % 2 === 0 ? C.white : C.bg,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontFamily: "monospace",
                        color: C.blue,
                        fontWeight: 600,
                        width: 54,
                      }}
                    >
                      {c.code}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: C.textSecondary,
                        flex: 1,
                        padding: "0 12px",
                      }}
                    >
                      {c.desc}
                    </span>
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: C.text }}
                    >
                      {c.charge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderTop: `1px solid ${C.border}`,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Total Charge
              </span>
              <span
                style={{ fontSize: 20, fontWeight: 700, color: C.navy }}
              >
                {claim.totalCharge}
              </span>
            </div>

            <button
              onClick={run}
              disabled={processing || processed}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                fontWeight: 600,
                cursor:
                  processing || processed ? "default" : "pointer",
                transition: "all 0.2s",
                background: processing
                  ? C.amberLight
                  : processed
                    ? C.bg
                    : C.blue,
                color: processing
                  ? C.amber
                  : processed
                    ? C.textMuted
                    : C.white,
              }}
            >
              {processing
                ? "Agent Processing..."
                : processed
                  ? "Validation Complete"
                  : "Run AI Validation Agent"}
            </button>
          </div>
        </div>

        {/* AGENT OUTPUT */}
        <div
          style={{
            background: C.white,
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: C.bg,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: processing
                  ? C.amber
                  : processed
                    ? C.green
                    : C.textLight,
                transition: "background 0.3s",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>
              AGENT OUTPUT
            </span>
            {processed && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.green,
                }}
              >
                Analysis complete
              </span>
            )}
          </div>
          <div
            style={{ padding: 20, maxHeight: 560, overflowY: "auto" }}
          >
            {(processing || processed) && (
              <div
                ref={logRef}
                style={{
                  background: C.navy,
                  borderRadius: 8,
                  padding: 14,
                  marginBottom: 16,
                  maxHeight: 160,
                  overflowY: "auto",
                  fontFamily: "monospace",
                  fontSize: 12,
                }}
              >
                {logLines.map((line, i) => (
                  <div
                    key={i}
                    style={{ padding: "3px 0", display: "flex", gap: 8 }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>
                      {">"}
                    </span>
                    <span
                      style={{
                        color:
                          i === logLines.length - 1 && !processed
                            ? "#FCD34D"
                            : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {line}
                    </span>
                  </div>
                ))}
                {processing && (
                  <div
                    style={{
                      padding: "3px 0",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>
                      {">"}
                    </span>
                    <span style={{ color: "#FCD34D" }}>...</span>
                  </div>
                )}
              </div>
            )}

            {processed && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    marginBottom: 20,
                  }}
                >
                  {showScore && (
                    <ScoreRing score={claim.score} label={claim.scoreLabel} />
                  )}
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: C.textMuted,
                        marginBottom: 4,
                      }}
                    >
                      Claim Passthrough Score
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: C.textSecondary,
                        lineHeight: 1.6,
                        margin: "0 0 8px",
                      }}
                    >
                      {claim.issues.filter((x) => x.severity === "HIGH")
                        .length > 0
                        ? "This claim has issues that will likely result in denial if submitted as-is."
                        : "This claim has optimization opportunities but may pass adjudication."}
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.red,
                        }}
                      >
                        {
                          claim.issues.filter((x) => x.severity === "HIGH")
                            .length
                        }{" "}
                        Critical
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.amber,
                        }}
                      >
                        {
                          claim.issues.filter((x) => x.severity === "MEDIUM")
                            .length
                        }{" "}
                        Warning
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.green,
                        }}
                      >
                        {
                          claim.issues.filter((x) => x.severity === "LOW")
                            .length
                        }{" "}
                        Info
                      </span>
                    </div>
                  </div>
                </div>

                {claim.issues.map((issue, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 10,
                      border: `1px solid ${C.border}`,
                      padding: 18,
                      marginBottom: 12,
                      background: C.bg,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 10,
                      }}
                    >
                      <SevBadge severity={issue.severity} />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: C.navy,
                        }}
                      >
                        {issue.type}
                      </span>
                      {issue.autoCorrect && (
                        <Badge color={C.green} bg={C.greenLight}>
                          AUTO-CORRECTED
                        </Badge>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: C.textSecondary,
                        lineHeight: 1.65,
                        margin: "0 0 12px",
                      }}
                    >
                      {issue.detail}
                    </p>
                    <div
                      style={{
                        padding: 14,
                        borderRadius: 8,
                        background: C.white,
                        borderLeft: `3px solid ${C.blue}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: C.textMuted,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          marginBottom: 4,
                        }}
                      >
                        Recommendation
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: C.blue,
                          lineHeight: 1.6,
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {issue.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {!processing && !processed && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 0",
                  color: C.textLight,
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <p style={{ marginTop: 16, fontSize: 14 }}>
                  Click &quot;Run AI Validation Agent&quot; to start
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: 16,
          fontSize: 12,
          color: C.textLight,
        }}
      >
        Demo Mode — Simulated claim data for demonstration purposes
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════
   DASHBOARD PAGE
   ═══════════════════════════════════════════ */

interface DashboardClaim {
  id: string
  type: string
  provider: string
  member: string
  dos: string
  amount: string
  status: string
  issues: number
  severity: string
  correction: string | null
}

const DashboardPage = () => {
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState<DashboardClaim | null>(null)
  const filtered =
    filter === "all"
      ? DASHBOARD_CLAIMS
      : DASHBOARD_CLAIMS.filter((c) => c.status === filter)

  return (
    <Section bg={C.bg} py="48px">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div>
          <SectionLabel>CLIENT DASHBOARD</SectionLabel>
          <h2
            style={{ fontSize: 24, fontWeight: 700, color: C.navy, margin: 0 }}
          >
            Claims Validation Monitor
          </h2>
          <p
            style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}
          >
            Real-time view — what your claims operations team sees daily
          </p>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 6,
              background: C.greenLight,
              border: `1px solid ${C.green}22`,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.green,
              }}
            />
            <span
              style={{ fontSize: 11, fontWeight: 600, color: C.green }}
            >
              LIVE
            </span>
          </div>
          <span style={{ fontSize: 13, color: C.textMuted }}>
            Horizon Blue Cross
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Claims Processed Today",
            value: "4,287",
            trend: "+8.8%",
            color: C.green,
          },
          {
            label: "Auto-Adjudication Rate",
            value: "93.4%",
            trend: "+12.2pp",
            color: C.blue,
          },
          {
            label: "Denials Prevented",
            value: "612",
            trend: "+15.1%",
            color: C.teal,
          },
          {
            label: "Avg Processing Time",
            value: "1.2s",
            trend: null,
            color: C.navy,
          },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              background: C.white,
              borderRadius: 10,
              padding: "20px 24px",
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: C.navy,
                letterSpacing: "-0.02em",
              }}
            >
              {m.value}
            </div>
            {m.trend && (
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: m.color,
                  marginTop: 6,
                }}
              >
                {m.trend}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filter + Table */}
      <div
        style={{
          background: C.white,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>
            Claims Queue
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { id: "all", l: "All" },
              { id: "flagged", l: "Flagged" },
              { id: "corrected", l: "Corrected" },
              { id: "passed", l: "Passed" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id)
                  setSelected(null)
                }}
                style={{
                  padding: "5px 14px",
                  borderRadius: 5,
                  fontSize: 12,
                  fontWeight: filter === f.id ? 600 : 400,
                  border: `1px solid ${filter === f.id ? C.blue : C.border}`,
                  background: filter === f.id ? C.blueLight : C.white,
                  color: filter === f.id ? C.blue : C.textMuted,
                  cursor: "pointer",
                }}
              >
                {f.l}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "130px 50px 1fr 90px 90px 90px 110px",
            padding: "10px 20px",
            borderBottom: `1px solid ${C.border}`,
            background: C.bg,
          }}
        >
          {[
            "Claim ID",
            "Type",
            "Provider",
            "Member",
            "DOS",
            "Amount",
            "Status",
          ].map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {filtered.map((claim, i) => (
          <div
            key={i}
            onClick={() =>
              setSelected(selected?.id === claim.id ? null : claim)
            }
            style={{
              display: "grid",
              gridTemplateColumns: "130px 50px 1fr 90px 90px 90px 110px",
              padding: "12px 20px",
              borderBottom: `1px solid ${C.borderLight}`,
              cursor: "pointer",
              background:
                selected?.id === claim.id ? C.blueLight : "transparent",
              transition: "background 0.15s",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: 13, fontWeight: 600, color: C.blue }}
            >
              {claim.id}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>
              {claim.type}
            </div>
            <div
              style={{
                fontSize: 13,
                color: C.text,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                paddingRight: 8,
              }}
            >
              {claim.provider}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted }}>
              {claim.member}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted }}>
              {claim.dos}
            </div>
            <div
              style={{ fontSize: 13, fontWeight: 600, color: C.text }}
            >
              {claim.amount}
            </div>
            <div>
              <StatusBadge status={claim.status} />
            </div>
          </div>
        ))}

        {/* Expanded detail */}
        {selected && selected.correction && (
          <div
            style={{
              padding: "16px 20px",
              background: C.bg,
              borderTop: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.blue}
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span
                style={{ fontSize: 13, fontWeight: 600, color: C.navy }}
              >
                AI Analysis — {selected.id}
              </span>
            </div>
            {selected.correction
              .split(". ")
              .filter(Boolean)
              .map((issue, i) => (
                <div
                  key={i}
                  style={{
                    padding: 14,
                    borderRadius: 8,
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderLeft: `3px solid ${selected.status === "flagged" ? C.red : C.blue}`,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Issue {i + 1}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: C.textSecondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {issue.trim()}
                    {issue.trim().endsWith(".") ? "" : "."}
                  </div>
                </div>
              ))}
            {selected.status === "flagged" && (
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  style={{
                    padding: "8px 20px",
                    borderRadius: 6,
                    border: "none",
                    background: C.blue,
                    color: C.white,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Approve &amp; Release
                </button>
                <button
                  style={{
                    padding: "8px 20px",
                    borderRadius: 6,
                    border: `1px solid ${C.border}`,
                    background: C.white,
                    color: C.textSecondary,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Return to Provider
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════
   BOOK A CALL PAGE
   ═══════════════════════════════════════════ */

const BookPage = () => (
  <Section bg={C.bg} py="48px">
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <SectionLabel>SCHEDULE A CALL</SectionLabel>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: C.navy,
            margin: "0 0 12px",
          }}
        >
          Let&apos;s Discuss Your Requirements
        </h2>
        <p
          style={{
            fontSize: 15,
            color: C.textSecondary,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Select a time that works for you. We&apos;ll walk through the
          platform, discuss your claims environment, and determine next steps.
        </p>
      </div>
      <div
        style={{
          background: C.white,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <iframe
          src="https://app.simplymeet.me/monakes/monakes-30-1773397100120?is_widget=1&view=compact&specific-meeting-type=1"
          style={{ width: "100%", height: 650, border: "none" }}
          scrolling="yes"
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <p style={{ fontSize: 13, color: C.textMuted }}>
          30-minute introductory call&nbsp;&nbsp;·&nbsp;&nbsp;No commitment
          required
        </p>
      </div>
    </div>
  </Section>
)

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */

export function ClaimsPlatform() {
  const [page, setPage] = useState("landing")

  return (
    <div
      style={{
        fontFamily: FONT,
        color: C.text,
        background: C.bg,
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <Nav page={page} setPage={setPage} />
      {page === "landing" && <LandingPage setPage={setPage} />}
      {page === "demo" && <DemoPage />}
      {page === "dashboard" && <DashboardPage />}
      {page === "book" && <BookPage />}
    </div>
  )
}
