"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { ArrowRight, Calculator } from "lucide-react"

export function QuotingCostCalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [quotesPerMonth, setQuotesPerMonth] = useState(400)
  const [minutesPerQuote, setMinutesPerQuote] = useState(35)
  const [hourlyCost, setHourlyCost] = useState(35)

  const monthlyCost = Math.round((quotesPerMonth * minutesPerQuote / 60) * hourlyCost)
  const annualCost = monthlyCost * 12

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }, [])

  return (
    <section
      id="calculator"
      aria-label="Quoting cost calculator"
      className="relative py-24 px-6"
      style={{
        backgroundColor: "#0c1018",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-[#00e5a0]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00e5a0]">
            Cost Calculator
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
          {"How Much Is Slow Quoting Actually Costing You?"}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892a4] text-base sm:text-lg max-w-3xl mb-16 leading-relaxed"
        >
          {"Every freight company says \u201Cour process works fine.\u201D Then they see this number."}
        </motion.p>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-[16px] bg-[#111822] border border-[rgba(255,255,255,0.06)] p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Left - Sliders */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              {/* Quotes per month */}
              <div>
                <div className="flex justify-between mb-3">
                  <label htmlFor="quotes-per-month" className="text-sm font-medium text-[#e8ecf1]">
                    Quotes per month
                  </label>
                  <span className="text-sm font-bold text-[#00e5a0] font-mono">{quotesPerMonth.toLocaleString()}</span>
                </div>
                <input
                  id="quotes-per-month"
                  type="range"
                  min={50}
                  max={2000}
                  step={10}
                  value={quotesPerMonth}
                  onChange={(e) => setQuotesPerMonth(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#0a0f16] border border-[rgba(255,255,255,0.06)] accent-[#00e5a0] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00e5a0] [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(0,229,160,0.4)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00e5a0] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[11px] text-[#5a6478]">50</span>
                  <span className="text-[11px] text-[#5a6478]">2,000</span>
                </div>
              </div>

              {/* Minutes per quote */}
              <div>
                <div className="flex justify-between mb-3">
                  <label htmlFor="minutes-per-quote" className="text-sm font-medium text-[#e8ecf1]">
                    Average minutes per quote
                  </label>
                  <span className="text-sm font-bold text-[#00e5a0] font-mono">{minutesPerQuote}</span>
                </div>
                <input
                  id="minutes-per-quote"
                  type="range"
                  min={10}
                  max={60}
                  step={1}
                  value={minutesPerQuote}
                  onChange={(e) => setMinutesPerQuote(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#0a0f16] border border-[rgba(255,255,255,0.06)] accent-[#00e5a0] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00e5a0] [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(0,229,160,0.4)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00e5a0] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[11px] text-[#5a6478]">10 min</span>
                  <span className="text-[11px] text-[#5a6478]">60 min</span>
                </div>
              </div>

              {/* Hourly cost */}
              <div>
                <div className="flex justify-between mb-3">
                  <label htmlFor="hourly-cost" className="text-sm font-medium text-[#e8ecf1]">
                    Hourly labour cost
                  </label>
                  <span className="text-sm font-bold text-[#00e5a0] font-mono">${hourlyCost}</span>
                </div>
                <input
                  id="hourly-cost"
                  type="range"
                  min={15}
                  max={80}
                  step={1}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#0a0f16] border border-[rgba(255,255,255,0.06)] accent-[#00e5a0] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00e5a0] [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(0,229,160,0.4)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00e5a0] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[11px] text-[#5a6478]">$15/hr</span>
                  <span className="text-[11px] text-[#5a6478]">$80/hr</span>
                </div>
              </div>
            </div>

            {/* Right - Results */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              <div className="text-center">
                {/* Calculator Icon */}
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,229,160,0.08)] flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-6 h-6 text-[#00e5a0]" strokeWidth={1.5} />
                </div>

                {/* Label */}
                <p className="text-sm text-[#8892a4] mb-2">
                  Your quoting costs you
                </p>

                {/* Monthly Cost */}
                <p
                  className="text-5xl sm:text-6xl font-bold text-[#00e5a0] mb-2 leading-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {formatCurrency(monthlyCost)}
                </p>
                <p className="text-sm text-[#8892a4] mb-6">per month</p>

                {/* Divider */}
                <div className="w-16 h-px bg-[rgba(255,255,255,0.06)] mx-auto mb-6" />

                {/* Annual Cost */}
                <p className="text-sm text-[#5a6478] mb-1">
                  {"That\u2019s"}
                </p>
                <p
                  className="text-2xl sm:text-3xl font-bold text-[#e8ecf1] mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {formatCurrency(annualCost)}
                </p>
                <p className="text-sm text-[#5a6478]">per year</p>
              </div>
            </div>
          </div>

          {/* CTA Below Calculator */}
          <div className="mt-10 pt-8 border-t border-[rgba(255,255,255,0.06)] text-center">
            <a
              href="#contact"
              className="shimmer-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00e5a0] text-[#06090f] font-semibold text-base hover:bg-[#00ffb2] transition-colors"
            >
              Get Your Free Speed Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
