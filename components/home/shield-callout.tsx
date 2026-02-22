import { Button } from "@/components/ui/button"

const BRIEFING_URL = "https://calendly.com/wahidhamdat30/30min"

export function ShieldCallout() {
  return (
    <section className="px-6 py-20 bg-[#0a0a0a] border-t border-white/[0.08]">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4 leading-[1.2]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Shield Is Live. The Gap Is Closing.
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-8">
          15 minutes to see what real-time screening looks like against your current stack.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-[#0a0a0a] hover:bg-zinc-200 rounded-sm px-6 font-medium"
        >
          <a href={BRIEFING_URL} target="_blank" rel="noopener noreferrer">
            Request a Briefing
          </a>
        </Button>
      </div>
    </section>
  )
}
