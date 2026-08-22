export type Locale = "en" | "ar"

export interface Link {
  label: string
  href: string
}

export interface Figure {
  value: string
  label: string
}

export interface Source {
  label: string
  href: string
}

export interface Entry {
  name: string
  role: string
  bio: string
}

export interface Item {
  title: string
  body: string
}

export interface Column {
  title: string
  body: string
  cta: Link
}

export interface SiteContent {
  locale: Locale
  dir: "ltr" | "rtl"
  /** Section labels the audit spine logs, in scroll order. Always Latin. */
  spine: { id: string; label: string }[]
  nav: {
    brand: string
    links: Link[]
    cta: Link
    menu: string
    altLang: Link
  }
  skip: string
  hero: {
    eyebrow: string
    headline: string[]
    lede: string
    ctas: Link[]
    strip: string[]
  }
  thesis: {
    label: string
    heading: string
    paras: string[]
    /** Split so the case name can be italicised. */
    gestmin: { before: string; cite: string; after: string }
    emphasis: string
    close: string
    /** Speed as a co-equal promise beside defensibility. */
    speed: string
    sources: Source[]
  }
  exposure: {
    label: string
    heading: string
    figures: Figure[]
    body: string
    quote: { label: string; text: string; after: string; emphasis: string }
    sources: Source[]
  }
  mechanism: {
    label: string
    heading: string
    paras: string[]
    emphasis: string
    figures: Figure[]
  }
  architecture: {
    label: string
    heading: string
    paras: string[]
    pillars: Item[]
    closing: string
  }
  workflow: {
    label: string
    steps: Item[]
  }
  security: {
    label: string
    heading: string
    paras: string[]
    blocks: Item[]
  }
  team: {
    label: string
    heading: string
    intro: string
    people: Entry[]
    advisory: string
  }
  contact: {
    label: string
    columns: Column[]
  }
  footer: {
    entity: string
    address: string
    status: string
    email: string
    rights: string
  }
}
