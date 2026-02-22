"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      aria-label="Hero introduction"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden bg-[#06090f]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 max-w-[800px] mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e8ecf1] mb-6 leading-[1.1]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The Company Behind Shield.
        </motion.h1>
        <p className="text-base sm:text-lg text-[#8892a4] max-w-[640px] leading-relaxed mb-10">
          Monakes AI builds autonomous compliance intelligence for enterprises operating in controlled and sanctioned trade environments. Shield is our flagship deployment — real-time export screening that closes the liability gap before BIS does.
        </p>
        <div className="flex flex-col items-start gap-3">
          <Button
            asChild
            size="lg"
            className="bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-md px-6 font-medium"
          >
            <Link href="/shield">See Shield</Link>
          </Button>
          <p className="text-sm text-[#5a6478]">Or scroll to learn who we are.</p>
        </div>
      </div>
    </section>
  )
}
