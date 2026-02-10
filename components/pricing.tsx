"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    tag: null,
    name: "Single Agent",
    description:
      "Deploy one AI agent \u2014 Sarah (Quoting), Alex (Booking), or Leo (Container Tracking) \u2014 to solve your most painful bottleneck first. Start with one, scale when ready.",
    features: [
      "One specialised AI agent",
      "Full dashboard access",
      "Human-in-the-loop approval",
      "Australian carrier integrations",
      "Professional document generation",
      "Email & chat support",
    ],
    cta: "Request a Custom Quote",
    highlighted: false,
  },
  {
    tag: "MOST POPULAR",
    name: "Full Digital Team",
    description:
      "Deploy all three live agents \u2014 Sarah, Alex, and Leo \u2014 as your complete Digital Workforce. The full automation stack for freight operations, plus priority access to Maya, Nova, and Finn when they launch.",
    features: [
      "All three live AI agents",
      "Unified command dashboard",
      "Priority human-in-the-loop flows",
      "All Australian carrier integrations",
      "Advanced analytics & reporting",
      "Dedicated onboarding specialist",
      "Priority support (< 2hr response)",
      "First access to new agents (Maya, Nova, Finn)",
    ],
    cta: "Book Your Deployment Call",
    highlighted: true,
  },
  {
    tag: null,
    name: "Enterprise & High-Volume",
    description:
      "For 3PLs and forwarders processing 500+ quotes a month. Custom integrations, dedicated infrastructure, bespoke agent training on your specific carrier network and workflows.",
    features: [
      "Custom agent configuration & training",
      "Bespoke carrier & TMS integrations",
      "Dedicated account manager",
      "Custom reporting & business intelligence",
      "SLA-backed uptime & accuracy guarantees",
      "On-site deployment & team training",
      "Volume-based pricing",
    ],
    cta: "Talk to Our Team",
    highlighted: false,
  },
]

function BorderBeam() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <div
        className="absolute w-24 h-24 bg-[#00e5a0]/20 blur-xl border-beam"
        style={{
          offsetPath: "rect(0 100% 100% 0 round 16px)",
        }}
      />
    </div>
  )
}

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="pricing"
      className="relative py-24 px-6 bg-[#0c1018] border-t border-b border-[rgba(255,255,255,0.04)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#00e5a0] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Investment
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8ecf1] mb-5 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cheaper Than a Hire. Faster Than a Contractor.
            <br className="hidden sm:block" />
            <span className="text-[#00e5a0]"> Scales Like Software.</span>
          </h2>
          <p className="text-[#8892a4] max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-4">
            {
              "You\u2019re not buying a licence. You\u2019re deploying specialist team members that pay for themselves within 2 weeks \u2014 whether you\u2019re a 10-person forwarder or a 200-person 3PL."
            }
          </p>
          <p className="text-[#5a6478] text-sm">
            All pricing in AUD. No lock-in contracts. Scales with your volume.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? "bg-[#111822] border-[rgba(0,229,160,0.25)] lg:scale-[1.03] lg:-my-2 shadow-[0_0_40px_rgba(0,229,160,0.06)]"
                  : "bg-[#111822]/50 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
              }`}
            >
              {/* Green gradient glow at top of featured card */}
              {plan.highlighted && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00e5a0]/60 to-transparent" />
              )}
              {plan.highlighted && (
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[rgba(0,229,160,0.04)] to-transparent rounded-t-2xl pointer-events-none" />
              )}
              {plan.highlighted && <BorderBeam />}

              <div className="relative flex flex-col flex-1 p-7">
                {/* Tag */}
                {plan.tag && (
                  <div className="mb-5">
                    <span className="inline-block px-3 py-1 bg-[#00e5a0] text-[#06090f] text-[10px] font-bold tracking-[0.1em] uppercase rounded-full">
                      {plan.tag}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3
                  className="text-xl font-bold text-[#e8ecf1] mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-[#8892a4] text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-[rgba(255,255,255,0.06)] mb-6" />

                {/* Feature list */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-[#c0c7d2]"
                    >
                      <span className="mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-[rgba(0,229,160,0.1)]">
                        <Check
                          className="w-2.5 h-2.5 text-[#00e5a0]"
                          strokeWidth={2.5}
                        />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full rounded-full font-semibold h-12 text-sm ${
                    plan.highlighted
                      ? "shimmer-btn bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e]"
                      : "bg-transparent text-[#e8ecf1] hover:bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
