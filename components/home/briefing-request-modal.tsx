"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabaseClient"

const CALENDLY_URL = "https://calendly.com/wahidhamdat30/30min"

const ROLE_OPTIONS = [
  "Compliance Officer",
  "VP Trade",
  "General Counsel",
  "Other",
]

type BriefingRequestModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BriefingRequestModal({ open, onOpenChange }: BriefingRequestModalProps) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [company, setCompany] = useState("")
  const [proEmail, setProEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function resetForm() {
    setName("")
    setRole("")
    setCompany("")
    setProEmail("")
    setErrorMessage("")
    setStatus("idle")
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm()
    onOpenChange(next)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !role.trim() || !company.trim() || !proEmail.trim()) return

    setStatus("sending")
    setErrorMessage("")

    try {
      const [first, ...rest] = name.trim().split(/\s+/)
        const lastName = rest.length > 0 ? rest.join(" ") : ""
        const { error } = await supabase.from("form_submissions").insert([
          {
            first_name: first ?? name.trim(),
            last_name: lastName,
            email: proEmail.trim(),
            company_name: company.trim(),
            role: role.trim(),
            pro_email: proEmail.trim(),
          },
        ])

      if (error) throw error
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
    }
  }

  const inputClass =
    "w-full bg-[#0a0a0a] border border-white/[0.12] rounded-sm px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5"

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="border-white/[0.08] bg-[#0a0a0a] text-white sm:max-w-md [&_[data-slot=dialog-close]]:text-zinc-400 [&_[data-slot=dialog-close]]:hover:text-white [&_[data-slot=dialog-close]]:ring-offset-[#0a0a0a]"
        onPointerDownOutside={(e) => status === "sending" && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#e8ecf1]">
            Request a Briefing
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Submit your details and we&apos;ll be in touch.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="py-4">
            <p className="text-sm text-zinc-300 mb-4">
              Thanks, we&apos;ll be in touch.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#e8ecf1] underline hover:no-underline"
            >
              Or book a time now
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="briefing-name" className={labelClass}>
                Name
              </Label>
              <Input
                id="briefing-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className={inputClass}
                disabled={status === "sending"}
              />
            </div>
            <div>
              <Label htmlFor="briefing-role" className={labelClass}>
                Role
              </Label>
              <select
                id="briefing-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className={inputClass}
                disabled={status === "sending"}
              >
                <option value="">Select role</option>
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="briefing-company" className={labelClass}>
                Company
              </Label>
              <Input
                id="briefing-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                required
                className={inputClass}
                disabled={status === "sending"}
              />
            </div>
            <div>
              <Label htmlFor="briefing-pro-email" className={labelClass}>
                Work email
              </Label>
              <Input
                id="briefing-pro-email"
                type="email"
                value={proEmail}
                onChange={(e) => setProEmail(e.target.value)}
                placeholder="work@company.com"
                required
                className={inputClass}
                disabled={status === "sending"}
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            <DialogFooter className="gap-2 pt-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-[#e8ecf1] hover:bg-white/10"
                onClick={() => handleOpenChange(false)}
                disabled={status === "sending"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-white text-[#0a0a0a] hover:bg-zinc-200"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
