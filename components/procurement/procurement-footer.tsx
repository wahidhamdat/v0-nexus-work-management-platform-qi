export function ProcurementFooter() {
  return (
    <footer className="relative px-6 py-12 bg-[#1A1A1A]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A1538]/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <span
          className="text-white/80 font-bold text-lg tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Monakes
        </span>
        <div className="flex items-center gap-6">
          <a
            href="mailto:wahidhamdat30@gmail.com"
            className="text-sm text-white/50 hover:text-white/80 transition-colors duration-300"
          >
            wahidhamdat30@gmail.com
          </a>
          <div className="w-px h-4 bg-white/10" />
          <a
            href="https://calendly.com/wahidhamdat30/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-white/80 transition-colors duration-300"
          >
            Schedule a call
          </a>
        </div>
        <p className="text-sm text-white/30">
          {"\u00A9"} {new Date().getFullYear()} Monakes. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
