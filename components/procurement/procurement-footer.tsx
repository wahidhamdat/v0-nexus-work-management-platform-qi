export function ProcurementFooter() {
  return (
    <footer className="relative px-6 py-12 bg-[#1A1A1A]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A1538]/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
        <span
          className="text-white/80 font-bold text-lg tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Monakes
        </span>
        <p className="text-sm text-white/50">
          Monakes for Artificial Intelligence Solutions LLC
        </p>
        <p className="text-sm text-white/30">
          Qatar Science &amp; Technology Park, Education City, Doha, Qatar
        </p>
        <p className="text-sm text-white/50">
          A QSTP Portfolio Company
        </p>
        <div className="flex items-center gap-6 mt-4">
          <a
            href="mailto:info@monakes.com"
            className="text-sm text-white/50 hover:text-white/80 transition-colors duration-300"
          >
            info@monakes.com
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
        <p className="text-sm text-white/25 mt-4">
          {"\u00A9"} {new Date().getFullYear()} Monakes for Artificial
          Intelligence Solutions LLC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
