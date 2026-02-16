"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, FileText, AlertTriangle, DollarSign } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

const reportTopics = [
  {
    icon: AlertTriangle,
    text: "The hidden link between quoting errors and temperature excursions",
  },
  {
    icon: FileText,
    text: "GDP documentation gaps that surface during inspections",
  },
  {
    icon: DollarSign,
    text: "The cost breakdown: manual vs AI-assisted pharma quoting",
  },
]

export function PharmaReportCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("sending")
    setErrorMessage("")

    try {
      const { error } = await supabase.from("form_submissions").insert([
        {
          email: email.trim(),
          first_name: "Pharma Report",
          last_name: "Lead",
          company_name: "N/A - Pharma Report Download",
          biggest_ops_pain: "Pharma Report Download Request",
        },
      ])

      if (error) throw error
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
    }
  }

  return (
    <section
      id="report"
      ref={ref}
      aria-label="Download the pharma quoting compliance gap report"
      className="relative bg-white py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1628] leading-tight mb-5 text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The Pharma Quoting Compliance Gap
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base text-[#3D4B5E] leading-relaxed max-w-2xl mx-auto mb-12"
        >
          {"We published a 7-page report on the real cost of non-compliant quoting in pharma cold chain \u2014 and how leading operations are closing the gap."}
        </motion.p>

        {/* Topics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4 max-w-lg mx-auto mb-12"
        >
          {reportTopics.map((topic) => (
            <div key={topic.text} className="flex items-center gap-4 text-left">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[rgba(0,180,216,0.06)] border border-[rgba(0,180,216,0.12)] flex items-center justify-center">
                <topic.icon className="w-4 h-4 text-[#00B4D8]" />
              </div>
              <span className="text-sm text-[#3D4B5E] leading-relaxed">
                {topic.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {status === "success" ? (
            <div className="bg-[rgba(0,180,216,0.06)] border border-[rgba(0,180,216,0.15)] rounded-xl p-6 max-w-md mx-auto">
              <p className="text-sm font-medium text-[#0A1628]">
                {"Thank you. The report is on its way to your inbox."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-3 max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <label htmlFor="report-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="report-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                  className="w-full sm:flex-1 px-5 py-3.5 rounded-full border border-[#D1D9E6] bg-white text-[#0A1628] text-sm placeholder:text-[#8892a4] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#00B4D8] text-white text-sm font-semibold hover:bg-[#0096B7] transition-colors shadow-[0_0_20px_rgba(0,180,216,0.15)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Me the Report
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && (
                <div className="w-full p-3 rounded-lg bg-[rgba(244,63,94,0.06)] border border-[rgba(244,63,94,0.15)]">
                  <p className="text-xs text-[#f43f5e]">{errorMessage}</p>
                </div>
              )}
            </form>
          )}

          <p className="text-xs text-[#8892a4] mt-4">
            {"Free. No opt-in gate. No sales call required."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
