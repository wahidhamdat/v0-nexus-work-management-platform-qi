import { Button } from "@/components/ui/button"

const DEMO_URL = "https://calendly.com/wahidhamdat30/30min"

export function ShieldCallout() {
  return (
    <section className="px-6 py-24 bg-[#06090f] border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e8ecf1] mb-6 leading-[1.2]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Shield Is Live. The Gap Is Closing. The Question Is Whether You&apos;re on the Right Side of It.
        </h2>
        <p className="text-[#8892a4] leading-relaxed mb-10">
          Export control enforcement is accelerating. The entities list grows weekly. The penalty window is narrow and personal liability is real. Shield closes that gap for the companies that cannot afford to find out the hard way.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-[#00e5a0] text-[#06090f] hover:bg-[#00cc8e] rounded-md px-6 font-medium"
        >
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            See Shield in 15 Minutes
          </a>
        </Button>
      </div>
    </section>
  )
}
