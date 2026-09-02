"use client"

import { useState } from "react"
import type { SiteContent } from "@/lib/content/types"

const ENDPOINT = "https://app.monakes.com/hooks/briefing"

/**
 * The one form on the page. It posts to an intake service on our own
 * infrastructure rather than a form SaaS, because a briefing request naming a
 * ministry and a tender should not transit a third party we have not named on
 * this page.
 */
export function BriefingForm({ content }: { content: SiteContent }) {
  const { briefing } = content
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === "sending") return
    setState("sending")
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      })
      setState(res.ok ? "sent" : "error")
    } catch {
      setState("error")
    }
  }

  if (state === "sent") {
    return (
      <div className="brief brief--done" role="status" aria-live="polite">
        <p className="brief__done-title">{briefing.success.title}</p>
        <p className="brief__done-body">{briefing.success.body}</p>
      </div>
    )
  }

  return (
    <form className="brief" onSubmit={onSubmit} noValidate={false}>
      <p className="brief__intro">{briefing.intro}</p>

      <div className="brief__grid">
        <label className="brief__field">
          <span className="brief__label mono">{briefing.fields.name}</span>
          <input name="name" required autoComplete="name" maxLength={120} />
        </label>
        <label className="brief__field">
          <span className="brief__label mono">{briefing.fields.email}</span>
          <input name="email" type="email" required autoComplete="email" maxLength={160} />
        </label>
        <label className="brief__field">
          <span className="brief__label mono">{briefing.fields.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label className="brief__field">
          <span className="brief__label mono">{briefing.fields.company}</span>
          <input name="company" autoComplete="organization" maxLength={120} />
        </label>
        <label className="brief__field brief__field--wide">
          <span className="brief__label mono">
            {briefing.fields.note} <em>{briefing.optional}</em>
          </span>
          <textarea name="note" rows={3} maxLength={500} />
        </label>
      </div>

      {/* Left empty by every human; filled by most bots. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="brief__trap"
      />

      <div className="brief__act">
        <button type="submit" className="brief__submit" disabled={state === "sending"}>
          {state === "sending" ? briefing.sending : briefing.submit}
        </button>
        <a className="brief__alt mono" href={briefing.fallbackHref}>
          {briefing.fallback}
        </a>
      </div>

      {state === "error" && (
        <p className="brief__error mono" role="alert">
          {briefing.error}
        </p>
      )}
    </form>
  )
}
