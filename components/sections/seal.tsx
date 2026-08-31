import { Grain } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

const NODES = 5

/**
 * The peak-end. The chain closes link by link, the stamp settles, and the page
 * prints the SHA-256 of its own text — the property every Monakes record
 * carries, demonstrated on the one record the visitor has actually read.
 */
export function Seal({ content }: { content: SiteContent }) {
  const { seal, nav } = content

  return (
    <footer className="section--dark seal" id="seal" data-case data-dark>
      <Grain />
      <div className="shift">
        <div className="sealstage" data-sealstage>
          <div className="sealchain" aria-hidden="true">
            {Array.from({ length: NODES }, (_, i) => (
              <span key={i} style={{ display: "contents" }}>
                {i > 0 ? <span className="sealchain__link" data-slink /> : null}
                <span className="sealchain__node" data-schain />
              </span>
            ))}
          </div>

          <p className="sealstamp" data-stamp>
            {seal.sealed}
          </p>

          <p className="seal__eor mono">{seal.endOfRecord}</p>

          <p className="seal__hash mono latin" data-pagehash title={seal.hashTitle} suppressHydrationWarning>
            SHA-256 —
          </p>

          <p className="seal__time mono">
            {seal.closed}{" "}
            <span className="latin" data-sealtime suppressHydrationWarning>
              --:--:--
            </span>
          </p>
        </div>

        <div className="seal__legal mono">
          <p>
            {seal.legal}
            <br />
            {seal.address}
            <br />
            <a className="latin" href={`mailto:${seal.email}`}>
              {seal.email}
            </a>
          </p>
          <p style={{ textAlign: "end" }}>
            <span className="latin">© 2026</span> · {seal.rights}
            <br />
            <a className="lang" href={nav.altLang.href} hrefLang={content.locale === "ar" ? "en" : "ar"}>
              {nav.altLang.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
