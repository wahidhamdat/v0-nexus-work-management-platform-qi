import type { SiteContent } from "@/lib/content/types"

export function SiteNav({ content }: { content: SiteContent }) {
  const { nav } = content
  const external = { target: "_blank", rel: "noopener noreferrer" }

  return (
    <header>
      <nav className="nav" aria-label={content.locale === "ar" ? "التنقل الرئيسي" : "Main"}>
        <div className="wrap nav__inner">
          <a className="nav__brand" href={content.locale === "ar" ? "/ar" : "/"}>
            {nav.brand}
          </a>

          <ul className="nav__links">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a className="nav__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__end">
            <a className="lang" href={nav.altLang.href} hrefLang={content.locale === "ar" ? "en" : "ar"}>
              {nav.altLang.label}
            </a>
            <a className="btn btn--seal btn--sm" href={nav.cta.href} {...external}>
              {nav.cta.label}
            </a>
            <button type="button" className="nav__toggle" aria-expanded="false" aria-controls="nav-panel">
              {nav.menu}
            </button>
          </div>
        </div>
      </nav>

      <div className="nav__panel" id="nav-panel" hidden>
        <div className="wrap">
          <ul>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav__panel__actions">
            <a className="btn btn--seal" href={nav.cta.href} {...external}>
              {nav.cta.label}
            </a>
            <a className="btn btn--ghost" href={nav.altLang.href} hrefLang={content.locale === "ar" ? "en" : "ar"}>
              {nav.altLang.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
