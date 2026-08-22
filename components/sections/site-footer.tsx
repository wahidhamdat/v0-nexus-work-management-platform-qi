import type { SiteContent } from "@/lib/content/types"

export function SiteFooter({ content }: { content: SiteContent }) {
  const { footer } = content
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="meta">{footer.entity}</p>
        <div className="footer__row muted" style={{ marginTop: 12, fontSize: 15 }}>
          <span>{footer.address}</span>
          <span>{footer.status}</span>
          <a className="link" href={`mailto:${footer.email}`}>
            {footer.email}
          </a>
        </div>
        <p className="meta" style={{ marginTop: 24 }}>
          {footer.rights}
        </p>
      </div>
    </footer>
  )
}
