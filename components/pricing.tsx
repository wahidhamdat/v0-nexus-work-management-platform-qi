"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    description: "For small forwarders getting started with AI",
    price: "A$1,490",
    period: "/month",
    features: [
      "1 AI Quoting Agent",
      "Up to 200 quotes/month",
      "5 carrier integrations",
      "Email & chat support",
      "Basic analytics dashboard",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For 3PLs scaling operations fast",
    price: "A$3,490",
    period: "/month",
    features: [
      "3 AI Agents (Quote + Track + Carrier)",
      "Unlimited quotes",
      "20+ carrier integrations",
      "Priority support & onboarding",
      "Advanced analytics & reporting",
      "Custom workflow rules",
      "API access",
    ],
    cta: "Deploy Now",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large logistics operations",
    price: "Custom",
    period: "",
    features: [
      "Unlimited AI Agents",
      "Unlimited everything",
      "Custom carrier integrations",
      "Dedicated success manager",
      "SLA guarantee",
      "SSO & audit logs",
      "On-premise option",
    ],
    cta: "Talk to Us",
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
    <section id="pricing" className="py-24 px-6 bg-[#06090f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#e8ecf1] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Transparent Pricing
          </h2>
          <p className="text-[#8892a4] max-w-2xl mx-auto">
            No setup fees. No lock-in contracts. Cancel anytime. ROI typically achieved within the first month.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? "bg-[#111822] border-[rgba(0,229,160,0.2)]"
                  : "bg-[#111822]/50 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
              }`}
            >
              {plan.highlighted && <BorderBeam />}

              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00e5a0] text-[#06090f] text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#e8ecf1] mb-2">{plan.name}</h3>
                <p className="text-[#8892a4] text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold text-[#e8ecf1]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-[#5a6478] text-sm">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-[#8892a4]">
                    <Check className="w-4 h-4 text-[#00e5a0] shrink-0" strokeWidth={1.5} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full font-semibold ${
                  plan.highlighted
                    ? "shimmer-btn bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e]"
                    : "bg-[#1a2332] text-[#e8ecf1] hover:bg-[#223043] border border-[rgba(255,255,255,0.06)]"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
