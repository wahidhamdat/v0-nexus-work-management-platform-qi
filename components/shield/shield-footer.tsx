export function ShieldFooter() {
  return (
    <footer className="relative px-6 py-12 bg-[#060810]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A7FA5]/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#4A7FA5]/10 border border-[#4A7FA5]/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-[#4A7FA5] rotate-45" />
          </div>
          <span
            className="text-white/80 font-bold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Shield
          </span>
          <span className="text-xs text-white/30 ml-1">by Monakes AI</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm text-white/50 hover:text-white/80 transition-colors duration-300"
          >
            Home
          </a>
          <div className="w-px h-4 bg-white/10" />
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
        <p className="text-sm text-white/30">
          {"\u00A9"} {new Date().getFullYear()} Monakes AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
