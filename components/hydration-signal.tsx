"use client"

import { useEffect } from "react"

/**
 * The only client component on the page, and it renders nothing.
 *
 * It exists to answer one question the DOM cannot: has React finished
 * hydrating? `load` does not mean it has — React hydrates concurrently and may
 * still be walking the tree when the last subresource lands. An imperative
 * write that arrives mid-hydration reads as a server/client mismatch, and
 * React's answer is to throw the tree away and re-render it, silently taking
 * every class the enhancement script has applied. A useEffect cannot run before
 * hydration is complete, so this is the signal the script waits for.
 */
export function HydrationSignal() {
  useEffect(() => {
    ;(window as unknown as { __monakesHydrated?: boolean }).__monakesHydrated = true
    window.dispatchEvent(new Event("monakes:hydrated"))
  }, [])
  return null
}
