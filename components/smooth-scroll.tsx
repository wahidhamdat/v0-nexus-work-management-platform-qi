"use client"

import type React from "react"
import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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
        lenis.scrollTo(el, { offset: -80 })
      }
    }

    document.addEventListener("click", handleAnchorClick)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
