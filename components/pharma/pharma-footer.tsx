export function PharmaFooter() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#0A1628] border-t border-[rgba(255,255,255,0.06)] py-10 px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#5a6478]">
          {"© 2026 Monakes Ltd"}
        </p>
        <a
          href="https://monakes.com"
          className="text-xs text-[#8892a4] hover:text-white transition-colors"
        >
          monakes.com
        </a>
        <p className="text-xs text-[#5a6478]">London, UK</p>
      </div>
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 mt-5">
        <a
          href="#"
          className="text-xs text-[#5a6478] hover:text-[#8892a4] transition-colors"
        >
          Privacy Policy
        </a>
        <span className="text-xs text-[#5a6478]/40">|</span>
        <a
          href="mailto:info@monakes.com"
          className="text-xs text-[#5a6478] hover:text-[#8892a4] transition-colors"
        >
          Contact
        </a>
      </div>
    </footer>
  )
}
