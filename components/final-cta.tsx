"use client"

import React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const volumeOptions = [
  "Under 50",
  "50 - 200",
  "200 - 500",
  "500 - 1,000",
  "1,000+",
]

const agentOptions = [
  "Sarah \u2014 Quote Orchestration",
  "Alex \u2014 Booking Orchestration",
  "Leo \u2014 Container Tracking",
  "Full Digital Team (All 3)",
  "Not sure yet \u2014 just exploring",
]

interface FormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  company: string
  monthly_quote_volume: string
  agent_interest: string
  message: string
}

interface FormErrors {
  first_name?: string
  last_name?: string
  email?: string
  company?: string
}

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    monthly_quote_volume: "",
    agent_interest: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required"
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus("sending")
    setErrorMessage("")

    try {
      const { error } = await supabase.from("form_submissions").insert([
        {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          company_name: formData.company.trim(),
          monthly_quote_volume: formData.monthly_quote_volume || null,
          biggest_ops_pain: formData.message.trim() || null,
          agent_interest: formData.agent_interest || null,
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

  const inputBase =
    "w-full bg-[#0c1018] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-[#e8ecf1] placeholder-[#5a6478] outline-none transition-all duration-200 focus:border-[#00e5a0] focus:ring-2 focus:ring-[rgba(0,229,160,0.15)]"
  const inputError = "border-[#f43f5e] focus:border-[#f43f5e] focus:ring-[rgba(244,63,94,0.15)]"
  const labelBase = "block text-sm text-[#8892a4] mb-2"

  return (
    <section
      id="contact"
      aria-label="Contact MonakesAI to deploy AI freight agents"
      className="relative py-28 px-6 bg-[#06090f] overflow-hidden"
    >
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
            {"Find Out What Slow Freight Ops Are Actually "}
            <span className="text-[#00e5a0]">Costing You</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8892a4] leading-relaxed max-w-lg mx-auto">
            {"Book a free 15-minute speed audit with our founder. We\u2019ll diagnose your quoting bottleneck, calculate what it\u2019s actually costing you, and show you \u2014 live \u2014 what the fix looks like on your actual freight scenarios. No pitch deck. No pressure. Just the math."}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0a0e16] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-8 sm:p-12"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-12 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-[rgba(0,229,160,0.1)] flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-[#00e5a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold text-[#e8ecf1]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Message Received
              </h3>
              <p className="text-[#8892a4] text-center max-w-sm">
                {"We\u2019ll be in touch within 24 hours to schedule your deployment call. Check your inbox for a confirmation."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1: First + Last name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="first_name" className={labelBase}>
                    First Name <span className="text-[#f43f5e]">*</span>
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="Sarah"
                    value={formData.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    className={`${inputBase} ${errors.first_name ? inputError : ""}`}
                  />
                  {errors.first_name && (
                    <p className="text-xs text-[#f43f5e] mt-1.5">{errors.first_name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="last_name" className={labelBase}>
                    Last Name <span className="text-[#f43f5e]">*</span>
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Connor"
                    value={formData.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                    className={`${inputBase} ${errors.last_name ? inputError : ""}`}
                  />
                  {errors.last_name && (
                    <p className="text-xs text-[#f43f5e] mt-1.5">{errors.last_name}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="email" className={labelBase}>
                    Work Email <span className="text-[#f43f5e]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="sarah@yourcompany.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`${inputBase} ${errors.email ? inputError : ""}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-[#f43f5e] mt-1.5">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className={labelBase}>
                    Phone <span className="text-[#5a6478] text-xs">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+44 7000 000000"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Row 3: Company */}
              <div className="mb-5">
                <label htmlFor="company" className={labelBase}>
                  Company <span className="text-[#f43f5e]">*</span>
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your Logistics Co."
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className={`${inputBase} ${errors.company ? inputError : ""}`}
                />
                {errors.company && (
                  <p className="text-xs text-[#f43f5e] mt-1.5">{errors.company}</p>
                )}
              </div>

              {/* Row 4: Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="monthly_quote_volume" className={labelBase}>
                    Monthly Quote Volume
                  </label>
                  <select
                    id="monthly_quote_volume"
                    value={formData.monthly_quote_volume}
                    onChange={(e) => handleChange("monthly_quote_volume", e.target.value)}
                    className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%235a6478%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]`}
                  >
                    <option value="">Select volume...</option>
                    {volumeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="agent_interest" className={labelBase}>
                    Which Agent?
                  </label>
                  <select
                    id="agent_interest"
                    value={formData.agent_interest}
                    onChange={(e) => handleChange("agent_interest", e.target.value)}
                    className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%235a6478%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]`}
                  >
                    <option value="">Select agent...</option>
                    {agentOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Message */}
              <div className="mb-8">
                <label htmlFor="message" className={labelBase}>
                  Tell Us About Your Operation <span className="text-[#5a6478] text-xs">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="What does your freight operation look like? How many quotes do you process? What's your biggest bottleneck?"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <div className="mb-5 p-4 rounded-lg bg-[rgba(244,63,94,0.08)] border border-[rgba(244,63,94,0.2)]">
                  <p className="text-sm text-[#f43f5e]">
                    {errorMessage}{" "}
                    <a href="mailto:info@monakes.com" className="underline hover:text-[#e8ecf1] transition-colors">
                      Email us directly
                    </a>
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="shimmer-btn w-full bg-[#00e5a0] text-[#06090f] font-semibold py-3.5 px-6 rounded-xl text-base transition-all duration-200 hover:bg-[#00cc8e] hover:shadow-[0_0_40px_rgba(0,229,160,0.25)] shadow-[0_0_30px_rgba(0,229,160,0.15)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#06090f] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Get My Free Speed Audit"
                )}
              </button>
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
          {"No spam. No 47-slide pitch deck. Just a 15-minute diagnosis that shows you the exact number \u2014 and how to fix it."}
        </motion.p>
      </div>
    </section>
  )
}
