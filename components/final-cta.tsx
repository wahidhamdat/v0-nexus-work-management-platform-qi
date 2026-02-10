"use client"

import React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const quoteVolumes = [
  "Under 100",
  "100-300",
  "300-500",
  "500-1,000",
  "1,000+",
  "Not sure",
]

const agentOptions = [
  "Sarah (Quoting)",
  "Alex (Booking)",
  "Leo (Containers)",
  "Maya (Hub Transfers - Coming Soon)",
  "Nova (Communications - Coming Soon)",
  "Finn (Financial - Coming Soon)",
  "All of them",
  "Not sure yet",
]

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const inputClasses =
    "w-full bg-[#0c1018] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-[#e8ecf1] text-sm placeholder:text-[#5a6478] focus:outline-none focus:border-[#00e5a0] focus:ring-1 focus:ring-[#00e5a0]/30 transition-all"
  const labelClasses = "block text-sm text-[#8892a4] mb-2"

  return (
    <section id="contact" className="relative py-28 px-6 bg-[#06090f] overflow-hidden">
      {/* Green radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,229,160,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div ref={ref} className="relative max-w-[640px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8ecf1] mb-5 tracking-tight text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Deploy Your First{" "}
            <span className="text-[#00e5a0]">Digital Employee?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8892a4] leading-relaxed max-w-lg mx-auto">
            Book a 15-minute deployment call. We'll run a live quote on one of
            your actual routes — multi-carrier, under 4 minutes. No pitch deck.
            No fluff. Just the tool doing its thing on YOUR freight.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="bg-[#0a0e16] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-8 sm:p-12"
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#00e5a0]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold text-[#e8ecf1] mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                We're on it.
              </h3>
              <p className="text-[#8892a4] max-w-sm mx-auto">
                Expect a reply within 24 hours. We'll come prepared with
                insights specific to your operation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className={labelClasses}>
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClasses}>
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="Acme Freight Co."
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@acmefreight.com"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone{" "}
                    <span className="text-[#5a6478]">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+44 7700 900000"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Quote volume */}
              <div>
                <label htmlFor="quoteVolume" className={labelClasses}>
                  How many quotes does your team process monthly?
                </label>
                <select
                  id="quoteVolume"
                  name="quoteVolume"
                  required
                  defaultValue=""
                  className={`${inputClasses} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6478' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_1rem_center]`}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {quoteVolumes.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {/* Headache textarea */}
              <div>
                <label htmlFor="headache" className={labelClasses}>
                  {"What's your biggest ops headache right now?"}
                </label>
                <textarea
                  id="headache"
                  name="headache"
                  rows={3}
                  placeholder="e.g. Quoting takes forever, carrier bookings are chaos, container tracking is manual, hub transfers keep getting missed..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Agent interest */}
              <div>
                <label htmlFor="agent" className={labelClasses}>
                  Which agent interests you most?
                </label>
                <select
                  id="agent"
                  name="agent"
                  required
                  defaultValue=""
                  className={`${inputClasses} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6478' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_1rem_center]`}
                >
                  <option value="" disabled>
                    Select an agent...
                  </option>
                  {agentOptions.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-btn w-full bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-xl h-14 text-base font-semibold shadow-[0_0_30px_rgba(0,229,160,0.15)] hover:shadow-[0_0_40px_rgba(0,229,160,0.25)] transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book My Deployment Call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[#5a6478] mt-6"
        >
          No spam. No 47-slide pitch deck. Just a straight conversation about
          your operation.
        </motion.p>
      </div>
    </section>
  )
}
