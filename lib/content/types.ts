export type Locale = "en" | "ar"

export interface Link {
  label: string
  href: string
}

/** A cited authority, rendered as a stamped card. Never prose. */
export interface Exhibit {
  /** "Exhibit B" — translated. */
  tag: string
  /** "ICC · 2020" — stays Latin. */
  ref: string
  title: string
  /** The holding, compressed to one mono line. */
  note: string
  href: string
  /** Latin refs are isolated LTR on the Arabic page. */
  latinRef?: boolean
}

/** A collapsed row: title always visible, body only for the diligence reader. */
export interface Clause {
  /** "2.1" — omitted on rows that carry a name instead of a numeral. */
  num?: string
  title: string
  body: string
  /** Optional stamped chip beside the title. */
  flag?: string
}

export interface ChainLink {
  num: string
  title: string
  body: string
}

/**
 * A number set as a monument. `numeral` is a template whose {0}, {1} slots are
 * filled by `counts` in order, each counting up on intersection.
 */
export interface Monument {
  counts: number[]
  numeral: string
  unit?: string
  label: string
}

/** Depth demoted behind a disclosure — the prompt's "read the memorandum". */
export interface Memo {
  label: string
  paras: string[]
}

export interface Person {
  name: string
  role: string
  bio: string
}

export interface SectionHead {
  /** "§01" — always Latin, never translated. */
  num: string
  kicker: string
  /** Appended to the kicker in mono, e.g. "· DPS-1". */
  suffix?: string
  verdict: string
  support?: string
}

export interface SiteContent {
  locale: Locale
  dir: "ltr" | "rtl"
  skip: string
  /** The one action on the entire site. */
  cta: Link

  rail: {
    title: string
    /** Case-file index, in scroll order. Numerals stay Latin. */
    entries: { id: string; num: string; label: string }[]
  }

  nav: {
    brand: string
    links: Link[]
    menu: string
    altLang: Link
  }

  hero: {
    badge: string
    city: string
    headline: string
    sub: string
    standardLine: string
    rope: string
    exhibitA: string
  }

  thesis: SectionHead & {
    exhibits: Exhibit[]
    memo: Memo
  }

  standard: SectionHead & {
    degrees: { key: string; label?: string }[]
    /** Readouts keyed by degree, plus `def` at rest. */
    readouts: Record<string, string>
    clauses: Clause[]
  }

  interval: SectionHead & {
    memo: Memo
  }

  method: SectionHead & {
    chainLabel: string
    links: ChainLink[]
  }

  applications: SectionHead & {
    monuments: Monument[]
    items: Clause[]
  }

  security: SectionHead & {
    chips: string[]
    confidentiality: string
    memo: Memo
  }

  engagement: SectionHead & {
    monuments: Monument[]
    rope: string
  }

  firm: SectionHead & {
    people: Person[]
    stamps: string[]
  }

  seal: {
    sealed: string
    endOfRecord: string
    hashTitle: string
    closed: string
    legal: string
    address: string
    email: string
    rights: string
  }
}
