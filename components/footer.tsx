"use client"

const DEMO_URL = "https://calendly.com/wahidhamdat30/30min"

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-[rgba(255,255,255,0.06)] bg-[#06090f]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <p
              className="font-bold text-[#e8ecf1] text-lg mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Monakes AI
            </p>
            <p className="text-sm text-[#8892a4] mb-3">
              Autonomous Compliance Intelligence.
            </p>
            <p className="text-sm text-[#5a6478] leading-relaxed mb-2">
              182-184 High Street North, East Ham, London E6 2JA
            </p>
            <a
              href="mailto:info@monakes.com"
              className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors"
            >
              info@monakes.com
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="/shield"
              className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors"
            >
              The Shield
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors"
            >
              Book a Demo
            </a>
            <a
              href="mailto:info@monakes.com"
              className="text-sm text-[#5a6478] hover:text-[#e8ecf1] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <p className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] text-xs text-[#5a6478] text-center">
          © 2026 Monakes AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
