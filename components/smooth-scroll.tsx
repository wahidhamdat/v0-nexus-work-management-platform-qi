"use client"

import type React from "react"
import { useEffect } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default> | null = null
    let rafId: number | null = null

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    // Handle anchor link clicks for smooth scrolling with offset
    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null
      if (!anchor) return

      const hash = anchor.getAttribute("href")
      if (!hash || hash === "#") return

      const el = document.querySelector(hash) as HTMLElement | null
      if (el) {
        e.preventDefault()
        if (lenis) {
          lenis.scrollTo(el, { offset: -80 })
        } else {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
