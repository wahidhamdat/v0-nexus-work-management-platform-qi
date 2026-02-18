export function ProcurementFooter() {
  return (
    <footer className="relative px-6 py-10 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-white/80 font-bold text-lg tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Monakes
        </span>
        <p className="text-sm text-white/40">
          {"\u00A9"} {new Date().getFullYear()} Monakes. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
