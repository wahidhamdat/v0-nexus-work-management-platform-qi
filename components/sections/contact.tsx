import type { CSSProperties } from "react"
import { Label } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

export function Contact({ content }: { content: SiteContent }) {
  const { contact } = content
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <Label>{contact.label}</Label>
          <h2 className="visually-hidden" id="contact-heading">
            {contact.label}
          </h2>
        </div>

        <div className="columns">
          {contact.columns.map((column, i) => (
            <div key={column.title} className="column reveal" style={{ "--i": i } as CSSProperties}>
              <h3 className="h3">{column.title}</h3>
              <p className="column__body muted">{column.body}</p>
              <p className="column__cta">
                <a
                  className="btn btn--ghost"
                  href={column.cta.href}
                  {...(column.cta.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {column.cta.label}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
