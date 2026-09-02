import type { SiteContent } from "@/lib/content/types"
import { BrandMark } from "@/components/brand-mark"

export function SiteNav({ content }: { content: SiteContent }) {
  const { nav } = content

  return (
    <div className="nav" data-nav>
      <div className="nav__inner">
        <a className="nav__brand" href={content.locale === "ar" ? "/ar" : "/"}>
          <BrandMark />
          {nav.brand}
        </a>

        <nav className="nav__links mono" aria-label={content.locale === "ar" ? "الأقسام" : "Sections"}>
          {nav.links.map((link) => (
            <a key={link.href} className="nav__link" data-navlink href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__side">
          <a className="lang" href={nav.altLang.href} hrefLang={content.locale === "ar" ? "en" : "ar"}>
            {nav.altLang.label}
          </a>
        </div>

        <button
          type="button"
          className="nav__toggle mono"
          data-menubtn
          aria-expanded="false"
          aria-controls="nav-panel"
        >
          {nav.menu}
        </button>
      </div>

      <div className="nav__panel" id="nav-panel" data-menupanel>
        <nav aria-label={content.locale === "ar" ? "الأقسام" : "Sections"}>
          {nav.links.map((link) => (
            <a key={link.href} className="mono" href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="lang" href={nav.altLang.href} hrefLang={content.locale === "ar" ? "en" : "ar"}>
            {nav.altLang.label}
          </a>
        </nav>
      </div>
    </div>
  )
}
