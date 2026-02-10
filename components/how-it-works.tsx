"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Cpu, ClipboardCheck, Send } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const steps = [
  {
    number: "1",
    icon: Mail,
    title: "Request Comes In",
    text: "A customer emails a quote request, a booking gets triggered, or a container needs tracking. The right agent picks it up automatically.",
  },
  {
    number: "2",
    icon: Cpu,
    title: "Agent Does the Work",
    text: "Route analysis. Carrier selection. Cost calculation. Document generation. Portal navigation. Container tracking. Done in minutes, not hours.",
  },
  {
    number: "3",
    icon: ClipboardCheck,
    title: "Your Team Reviews & Approves",
    text: "Everything lands on the dashboard. Check the numbers, tweak the margin, approve with one click. Your people stay in charge.",
  },
  {
    number: "4",
    icon: Send,
    title: "Customer Gets the Output",
    text: "Professional PDF sent. Booking confirmed. Container tracked. All logged, all audit-traceable, all compliant.",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="how-it-works"
      aria-label="How MonakesAI agents work with human-in-the-loop approval"
      className="relative py-24 px-6"
      style={{
        backgroundColor: "#0c1018",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-[#00e5a0]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00e5a0]">
            How It Works
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#e8ecf1] leading-tight max-w-4xl mb-5 text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {"They Work. Your Team Approves. That's It."}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892a4] text-base sm:text-lg max-w-3xl mb-20 leading-relaxed"
        >
          {"No AI black box. No loss of control. Your agents handle the repetitive work and present everything for human review. One dashboard. Full visibility. Whether you run a 5-person outfit or a 300-person operation."}
        </motion.p>

        {/* Steps Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Horizontal connector line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px border-t-2 border-dashed border-[rgba(0,229,160,0.25)] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle with number */}
                  <div className="relative w-20 h-20 rounded-full border-2 border-[#00e5a0] bg-[#06090f] flex items-center justify-center mb-6">
                    {/* Subtle glow behind */}
                    <div className="absolute inset-0 rounded-full bg-[rgba(0,229,160,0.08)] blur-md" />
                    <div className="relative flex flex-col items-center gap-0.5">
                      <span
                        className="text-2xl font-bold text-[#00e5a0]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,160,0.08)] flex items-center justify-center mb-4">
                    <Icon
                      className="w-5 h-5 text-[#00e5a0]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold text-[#e8ecf1] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>

                  {/* Text */}
                  <p className="text-[#8892a4] text-sm leading-relaxed max-w-[260px]">
                    {step.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* 90/10 Visual Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 rounded-[16px] bg-[#111822] border border-[rgba(255,255,255,0.06)] p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
            {/* Left — Progress Bar Visual */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              {/* Labels */}
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium text-[#e8ecf1]">
                  90% AI Automated
                </span>
                <span className="text-sm font-medium text-[#e8ecf1]">
                  10% Your Team
                </span>
              </div>

              {/* Track */}
              <div className="w-full h-10 rounded-full bg-[#0a0f16] border border-[rgba(255,255,255,0.06)] overflow-hidden flex">
                {/* 90% green-to-cyan */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "90%" } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-l-full relative"
                  style={{
                    background: "linear-gradient(90deg, #00e5a0, #00c9db)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#06090f]">
                      90%
                    </span>
                  </div>
                </motion.div>
                {/* 10% purple */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "10%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-r-full relative"
                  style={{
                    background: "#7c3aed",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">
                      10%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Mini legend */}
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(90deg, #00e5a0, #00c9db)" }} />
                  <span className="text-xs text-[#8892a4]">AI Agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#7c3aed]" />
                  <span className="text-xs text-[#8892a4]">Your Team</span>
                </div>
              </div>
            </div>

            {/* Right — Text block */}
            <div className="w-full lg:w-1/2">
              <h3
                className="text-xl sm:text-2xl font-bold text-[#e8ecf1] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The Human-in-the-Loop Guarantee
              </h3>
              <p className="text-[#8892a4] text-sm sm:text-base leading-relaxed">
                {"Your agents handle 90% of the repetitive workload \u2014 carrier lookups, rate calculations, document formatting, portal navigation, status tracking. The remaining 10% is your team\u2019s: final approval, exception handling, strategic decisions, customer relationships."}
              </p>
              <p className="text-[#e8ecf1] text-sm sm:text-base leading-relaxed mt-4 font-medium">
                {"Nobody loses their job. Everybody gets their evenings back."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
