import type { CSSProperties } from "react"
import { Label } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Workflow({ content }: { content: SiteContent }) {
  const { workflow } = content
  return (
    <section className="section" id="workflow" aria-labelledby="workflow-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{workflow.label}</Label>
          <h2 className="visually-hidden" id="workflow-heading">
            {workflow.label}
          </h2>
        </div>

        <ol className="steps">
          {workflow.steps.map((step, i) => (
            <li key={step.title} className="step reveal" style={{ "--i": i } as CSSProperties}>
              <span className="meta">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="step__title h3">{step.title}</h3>
              <p className="step__body muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
