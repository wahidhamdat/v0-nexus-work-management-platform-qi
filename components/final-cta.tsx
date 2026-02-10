"use client"

import React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const HUBSPOT_PORTAL_ID = "147781266"
const HUBSPOT_FORM_ID = "dc7bc7e3-6a71-4506-9a97-b7024927ad6d"
const HUBSPOT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

const quoteVolumes = [
  "Under 100",
  "100-300",
  "300-500",
  "500-1000",
  "1000+",
  "Not Sure",
]

const agentOptions = [
  "Sarah (Quoting)",
  "Alex (Booking)",
  "Leo (Containers)",
  "Maya (Hub Transfers)",
  "Nova (Comms)",
  "Finn (Financial)",
  "All Agents",
  "Not Sure",
]

type FieldErrors = {
  firstname?: string
  lastname?: string
  email?: string
  company?: string
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError("")

    const formData = new FormData(e.currentTarget)
    const firstname = (formData.get("firstname") as string || "").trim()
    const lastname = (formData.get("lastname") as string || "").trim()
    const email = (formData.get("email") as string || "").trim()
    const company = (formData.get("company") as string || "").trim()
    const phone = (formData.get("phone") as string || "").trim()
    const monthlyQuoteVolume = (formData.get("monthly_quote_volume") as string || "").trim()
    const agentInterest = (formData.get("agent_interest") as string || "").trim()
    const biggestOpsPain = (formData.get("biggest_ops_pain") as string || "").trim()

    // Validate required fields
    const errors: FieldErrors = {}
    if (!firstname) errors.firstname = "This field is required"
    if (!lastname) errors.lastname = "This field is required"
    if (!email) {
      errors.email = "This field is required"
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email"
    }
    if (!company) errors.company = "This field is required"

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setIsSubmitting(true)

    const fields = [
      { objectTypeId: "0-1", name: "firstname", value: firstname },
      { objectTypeId: "0-1", name: "lastname", value: lastname },
      { objectTypeId: "0-1", name: "email", value: email },
      { objectTypeId: "0-1", name: "company", value: company },
      { objectTypeId: "0-1", name: "lead_source_monakes", value: "Website Form" },
    ]

    if (phone) fields.push({ objectTypeId: "0-1", name: "phone", value: phone })
    if (monthlyQuoteVolume) fields.push({ objectTypeId: "0-1", name: "monthly_quote_volume", value: monthlyQuoteVolume })
    if (agentInterest) fields.push({ objectTypeId: "0-1", name: "agent_interest", value: agentInterest })
    if (biggestOpsPain) fields.push({ objectTypeId: "0-1", name: "biggest_ops_pain", value: biggestOpsPain })

    const payload = {
      fields,
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "https://monakes.com",
        pageName: "MonakesAI \u2014 Contact",
      },
    }

    try {
      const res = await fetch(HUBSPOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setIsSubmitted(true)
      } else {
        setSubmitError("Something went wrong. Email us at info@monakes.com")
      }
    } catch {
      setSubmitError("Something went wrong. Email us at info@monakes.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase =
    "w-full bg-[#0c1018] border rounded-lg px-4 py-3 text-[#e8ecf1] text-sm placeholder:text-[#5a6478] focus:outline-none focus:border-[#00e5a0] focus:ring-1 focus:ring-[#00e5a0]/30 transition-all"
  const inputClasses = (field?: keyof FieldErrors) =>
    `${inputBase} ${fieldErrors[field as keyof FieldErrors] ? "border-[#f43f5e]" : "border-[rgba(255,255,255,0.08)]"}`

  const labelClasses = "block text-sm text-[#8892a4] mb-2"

  return (
    <section id="contact" aria-label="Contact MonakesAI to deploy AI freight agents" className="relative py-28 px-6 bg-[#06090f] overflow-hidden">
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
            {"Book a 15-minute deployment call. We\u2019ll show you how Sarah quotes, Alex books, and Leo tracks \u2014 live on your actual freight scenarios. No pitch deck. No fluff. Just the agents doing their thing on YOUR operations."}
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-12"
            >
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
                className="text-2xl font-bold text-[#00e5a0] mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {"We\u2019ll be in touch within 24 hours."}
              </h3>
              <p className="text-[#8892a4] max-w-sm mx-auto">
                One of our team will reach out to discuss deploying your first digital employee.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Row 1: First Name + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstname" className={labelClasses}>
                    First Name <span className="text-[#f43f5e]">*</span>
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="Jane"
                    className={inputClasses("firstname")}
                    onChange={() => clearFieldError("firstname")}
                  />
                  {fieldErrors.firstname && (
                    <p className="text-xs text-[#f43f5e] mt-1.5">{fieldErrors.firstname}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastname" className={labelClasses}>
                    Last Name <span className="text-[#f43f5e]">*</span>
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Smith"
                    className={inputClasses("lastname")}
                    onChange={() => clearFieldError("lastname")}
                  />
                  {fieldErrors.lastname && (
                    <p className="text-xs text-[#f43f5e] mt-1.5">{fieldErrors.lastname}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email <span className="text-[#f43f5e]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@acmefreight.com"
                    className={inputClasses("email")}
                    onChange={() => clearFieldError("email")}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-[#f43f5e] mt-1.5">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone <span className="text-[#5a6478]">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    className={inputClasses()}
                  />
                </div>
              </div>

              {/* Row 3: Company Name — full width */}
              <div>
                <label htmlFor="company" className={labelClasses}>
                  Company Name <span className="text-[#f43f5e]">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Freight Co."
                  className={inputClasses("company")}
                  onChange={() => clearFieldError("company")}
                />
                {fieldErrors.company && (
                  <p className="text-xs text-[#f43f5e] mt-1.5">{fieldErrors.company}</p>
                )}
              </div>

              {/* Row 4: Monthly Quote Volume */}
              <div>
                <label htmlFor="monthly_quote_volume" className={labelClasses}>
                  Monthly Quote Volume <span className="text-[#5a6478]">(optional)</span>
                </label>
                <select
                  id="monthly_quote_volume"
                  name="monthly_quote_volume"
                  defaultValue=""
                  className={`${inputClasses()} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6478' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_1rem_center]`}
                >
                  <option value="" disabled>
                    Select volume...
                  </option>
                  {quoteVolumes.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Agent Interest */}
              <div>
                <label htmlFor="agent_interest" className={labelClasses}>
                  Agent Interest <span className="text-[#5a6478]">(optional)</span>
                </label>
                <select
                  id="agent_interest"
                  name="agent_interest"
                  defaultValue=""
                  className={`${inputClasses()} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6478' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_1rem_center]`}
                >
                  <option value="" disabled>
                    Which agent interests you?
                  </option>
                  {agentOptions.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 6: Biggest Ops Pain */}
              <div>
                <label htmlFor="biggest_ops_pain" className={labelClasses}>
                  {"What\u2019s your biggest operational headache?"} <span className="text-[#5a6478]">(optional)</span>
                </label>
                <textarea
                  id="biggest_ops_pain"
                  name="biggest_ops_pain"
                  rows={3}
                  placeholder="What's your biggest operational headache right now?"
                  className={`${inputClasses()} resize-none`}
                />
              </div>

              {/* Row 7: Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`shimmer-btn w-full bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-xl h-14 text-base font-semibold shadow-[0_0_30px_rgba(0,229,160,0.15)] hover:shadow-[0_0_40px_rgba(0,229,160,0.25)] transition-all ${isSubmitting ? "animate-pulse" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    {"Request a Demo \u2192"}
                  </>
                )}
              </Button>

              {/* Submit error */}
              {submitError && (
                <p className="text-xs text-[#f43f5e] text-center mt-2">{submitError}</p>
              )}

              {/* Legal text */}
              <p className="text-xs text-[#5a6478] text-center mt-3">
                {"By submitting, you agree to our Privacy Policy. We\u2019ll only contact you about MonakesAI."}
              </p>
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
