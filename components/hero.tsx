"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.12,
    },
  }),
}

const stats = [
  { value: "4 min", label: "Your Quote Hits the Inbox (Theirs Takes 35)" },
  { value: "85%", label: "Faster Than Manual Booking" },
  { value: "$0", label: "Storage Penalties (Was $200/Day)" },
]

export function Hero() {
  return (
    <section aria-label="Hero introduction to MonakesAI freight automation" className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#06090f] pointer-events-none" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 animated-grid pointer-events-none" />

      {/* Green radial glow - top right */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,229,160,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Blue radial glow - bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(56,97,251,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111822] border border-[rgba(255,255,255,0.06)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00e5a0] pulse-glow" />
          <span className="text-sm text-[#8892a4]">Trusted by Freight Teams Across 3 Continents</span>
        </motion.div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#e8ecf1] mb-6 leading-[1.05]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {"Your Quote Lands First. Every Time."}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <span className="text-[#00e5a0]">{"While Your Competitor Is Still Opening Their Spreadsheet."}</span>
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg text-[#8892a4] max-w-[640px] mx-auto mb-10 leading-relaxed"
        >
          {"Freight companies lose $100K+ a year to slow quoting, portal chaos, and missed container deadlines. We fix all three. Your team doesn\u2019t learn new software. Doesn\u2019t change how they work. They just stop losing jobs to faster competitors and start going home on time."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="shimmer-btn bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-full px-8 h-12 text-base font-semibold shadow-[0_0_30px_rgba(0,229,160,0.2)] hover:shadow-[0_0_40px_rgba(0,229,160,0.3)] transition-shadow"
          >
            Get Your Free Speed Audit
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-medium border-[rgba(255,255,255,0.12)] text-[#e8ecf1] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#e8ecf1] hover:border-[rgba(255,255,255,0.2)] bg-transparent"
          >
            <Play className="mr-2 w-4 h-4" />
            Watch a 60-Second Live Demo
          </Button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center gap-0 ${
                index < stats.length - 1
                  ? "sm:border-r sm:border-[rgba(255,255,255,0.08)] sm:pr-8 sm:mr-8"
                  : ""
              }`}
            >
              <div>
                <div
                  className="text-2xl sm:text-3xl font-bold text-[#e8ecf1] tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#5a6478]">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
