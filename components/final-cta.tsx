"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"

const HUBSPOT_PORTAL_ID = "147781266"
const HUBSPOT_FORM_ID = "dc7bc7e3-6a71-4506-9a97-b7024927ad6d"

export function FinalCTA() {
  const ref = useRef(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formReady, setFormReady] = useState(false)

  const createForm = useCallback(() => {
    if (
      formContainerRef.current &&
      typeof window !== "undefined" &&
      (window as any).hbspt
    ) {
      formContainerRef.current.innerHTML = ""
      ;(window as any).hbspt.forms.create({
        region: "eu1",
        portalId: HUBSPOT_PORTAL_ID,
        formId: HUBSPOT_FORM_ID,
        target: `#hubspot-form-container`,
        onFormReady: () => {
          setFormReady(true)
        },
      })
    }
  }, [])

  useEffect(() => {
    // Check if script already loaded
    if ((window as any).hbspt) {
      createForm()
      return
    }

    const script = document.createElement("script")
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js"
    script.async = true
    script.onload = () => {
      createForm()
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup: don't remove script as other instances may need it
    }
  }, [createForm])

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
            Ready to Deploy Your First{" "}
            <span className="text-[#00e5a0]">Digital Employee?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8892a4] leading-relaxed max-w-lg mx-auto">
            {
              "Book a 15-minute deployment call. We\u2019ll show you how Sarah quotes, Alex books, and Leo tracks \u2014 live on your actual freight scenarios. No pitch deck. No fluff. Just the agents doing their thing on YOUR operations."
            }
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
          className="hubspot-form-wrapper bg-[#0a0e16] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-8 sm:p-12"
        >
          {/* Loading state before HubSpot form renders */}
          {!formReady && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-8 h-8 border-2 border-[#00e5a0] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#5a6478]">Loading form...</p>
            </div>
          )}

          {/* HubSpot embedded form container */}
          <div
            id="hubspot-form-container"
            ref={formContainerRef}
            className={formReady ? "block" : "hidden"}
          />
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
