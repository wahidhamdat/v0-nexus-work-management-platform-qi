export function MissionSection() {
  return (
    <section className="px-6 py-24 bg-[#0a0a0a] border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
        <div className="md:pr-12 md:border-r border-[rgba(255,255,255,0.07)]">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#5a6478] mb-4">
            Mission
          </p>
          <p className="text-lg text-[#e8ecf1] leading-relaxed">
            To make autonomous AI the compliance backbone of global trade — so the companies moving goods across borders can move at the speed of their markets without exposing their people to regulatory liability.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#5a6478] mb-4">
            Vision
          </p>
          <p className="text-lg text-[#e8ecf1] leading-relaxed">
            A world where every export transaction is screened, classified, and audited against the current regulatory list — in real time, without human intervention, without a gap, and without exception.
          </p>
        </div>
      </div>
    </section>
  )
}
