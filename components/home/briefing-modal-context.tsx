"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { BriefingRequestModal } from "@/components/home/briefing-request-modal"

type BriefingModalContextValue = {
  openBriefingModal: () => void
}

const BriefingModalContext = createContext<BriefingModalContextValue | null>(null)

export function BriefingModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const openBriefingModal = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <BriefingModalContext.Provider value={{ openBriefingModal }}>
      {children}
      <BriefingRequestModal open={open} onOpenChange={setOpen} />
    </BriefingModalContext.Provider>
  )
}

export function useBriefingModal(): BriefingModalContextValue | null {
  return useContext(BriefingModalContext)
}
