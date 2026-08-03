import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Available",
  description: "This page is no longer available.",
}

export default function PharmaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold mb-4">Page Not Available</h1>
        <p className="text-muted-foreground mb-6">
          This page is no longer available. Please visit our home page or procurement section.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Go Home
          </a>
          <a href="/procurement" className="px-6 py-2 border border-input rounded-md hover:bg-accent">
            View Procurement
          </a>
        </div>
      </div>
    </div>
  )
}
