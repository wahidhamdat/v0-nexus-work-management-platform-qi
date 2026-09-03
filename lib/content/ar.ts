import type { SiteContent } from "./types"

const BRIEFING = "https://calendly.com/wahidhamdat30/30min"

/**
 * Arabic (MSA, institutional register). Three things stay in Latin script on
 * purpose, exactly as the v4 design specifies: the case-file rail, the cited
 * authorities (a case name is checked as filed), and the memoranda — the long
 * exhibits are marked "(بالإنجليزية)" rather than machine-rendered into Arabic.
 */
export const ar: SiteContent = {
  locale: "ar",
  dir: "rtl",
  skip: "انتقل إلى المحتوى",
  cta: { label: "اطلب إحاطة", href: "#briefing" },

  rail: {
    title: "Case file",
    entries: [
      { id: "main", num: "00", label: "Record" },
      { id: "thesis", num: "01", label: "Thesis" },
      { id: "standard", num: "02", label: "Standard" },
      { id: "interval", num: "03", label: "Interval" },
      { id: "method", num: "04", label: "Method" },
      { id: "applications", num: "05", label: "Applications" },
      { id: "security", num: "06", label: "Security" },
      { id: "engagement", num: "07", label: "Engagement" },
      { id: "firm", num: "08", label: "Firm" },
      { id: "seal", num: "09", label: "Seal" },
    ],
  },

  nav: {
    brand: "MONAKES",
    links: [
      { label: "الأطروحة", href: "#thesis" },
      { label: "المعيار", href: "#standard" },
      { label: "المنهج", href: "#method" },
      { label: "التطبيقات", href: "#applications" },
      { label: "الأمن", href: "#security" },
      { label: "الشركة", href: "#firm" },
    ],
    menu: "القائمة",
    altLang: { label: "EN", href: "/" },
  },

  hero: {
    badge: "شركة ضمن محفظة واحة قطر للعلوم والتكنولوجيا · المدينة التعليمية، الدوحة",
    city: "الدوحة",
    headline: "القرار كان سليمًا. بعد ثلاث سنوات، على السجل أن يثبت ذلك.",
    sub: "السجل المعاصر وراء الأحكام المؤسسية المصيرية — مختوم لحظة إنشائه، وقابل للتحقق مستقلاً عنا.",
    standardLine: "وفق معيار حماية القرار (DPS-1)",
    rope: "بقيادة الشركاء. تكليفات محدودة كل ربع. فحص تعارض المصالح قائم.",
    exhibitA: "المستند «أ» — هذه الصفحة",
  },

  thesis: {
    num: "§01",
    kicker: "الأطروحة",
    verdict: "أفضل دليل لديك ذاكرة. والذاكرة تعيد كتابة نفسها.",
    support: "الوثائق المعاصرة هي الدليل الأول، والذاكرة تُختبر في ضوئها — لا العكس.",
    exhibits: [
      {
        tag: "المستند «ب»",
        ref: "ICC · 2020",
        title: "The Accuracy of Fact Witness Memory in International Arbitration",
        note: "Memory is fragile and malleable · post-event information overwrites fact",
        href: "https://iccwbo.org/news-publications/arbitration-adr-rules-and-tools/icc-arbitration-and-adr-commission-report-on-the-accuracy-of-fact-witness-memory-in-international-arbitration/",
        latinRef: true,
      },
      {
        tag: "المستند «ج»",
        ref: "[2013] EWHC 3560",
        title: "Gestmin SGPS SA v Credit Suisse (UK) Ltd",
        note: "Little reliance on recollection · findings from the documentary record",
        href: "https://www.bailii.org/ew/cases/EWHC/Comm/2013/3560.html",
        latinRef: true,
      },
    ],
    memo: {
      label: "اقرأ المذكرة الكاملة (بالإنجليزية)",
      paras: [
        "When a consequential decision is challenged — a bid protest, an audit finding, an arbitration claim — the institution defends it with two things: whatever documentation exists, and the recollection of the people who were in the room. The second is worth less than almost anyone assumes.",
        "In 2020 the ICC Commission on Arbitration published a report on the accuracy of fact witness memory, produced with scientific input from psychologists specialising in memory. Its findings: human memory is fragile and malleable. Memories become corrupted without the person knowing. Post-event information can overwrite a factual memory rather than merely add to it — and it arrives through entirely ordinary channels. A conversation with a colleague. A discussion with counsel. Simply retelling the same account several times.",
        "Courts arrived at the same place independently. In Gestmin v Credit Suisse, the English Commercial Court held that a judge should place little reliance on witnesses' recollections of meetings, and base findings on inferences drawn from the documentary record instead.",
        "This is true of a tender score, a compliance determination, a financial-reporting judgment, and a closed investigation alike. The failure is never the decision. It is the distance between the decision and its record.",
      ],
    },
  },

  standard: {
    num: "§02",
    kicker: "المعيار",
    suffix: "· DPS-1",
    verdict: "منهجية، لا وعود.",
    support: "منهجية منشورة لإنتاج سجلات قرار تصمد أمام الفحص الخصومي.",
    degrees: [
      { key: "E0", label: "غائب" },
      { key: "E1", label: "مُدّعى" },
      { key: "E2" },
      { key: "E3" },
      { key: "E4", label: "معاصر ومستقل" },
    ],
    readouts: {
      def: "درجات الإثبات الخمس — الاستنتاج يحمل درجة أضعف أدلته",
      E0: "E0 · غائب — لا يوجد سجل وراء الاستنتاج",
      E1: "E1 · مُدّعى — الادعاء ليس دليلاً على الواقعة المدّعاة، بل دليل على وقوع الادعاء",
      E2: "E2 · درجة وسيطة معرَّفة في DPS-1",
      E3: "E3 · درجة وسيطة معرَّفة في DPS-1",
      E4: "E4 · معاصر ومستقل — الدرجة التي يُبنى سجل القرار ليحوزها",
    },
    clauses: [
      {
        num: "2.1",
        title: "درجات الإثبات",
        body: "Every conclusion is graded on a five-degree scale, from E0 (absent) through E1 (asserted) to E4 (contemporaneous and independent). A conclusion holds the grade of its weakest load-bearing evidence. An assertion is not evidence of the fact asserted; it is evidence that an assertion was made.",
      },
      {
        num: "2.2",
        title: "حزم المعايير",
        body: "Each domain is examined against a versioned pack of criteria — what must be evidenced, to what degree, and what an adversary asks first. Packs are maintained against the live enforcement and case record and versioned like any controlled document.",
      },
      {
        num: "2.3",
        title: "التحقق الخصومي",
        body: "Before any finding reaches a human reviewer, an independent verification pass — isolated from the first analysis — attacks it on four fronts: fidelity to the quoted source, integrity of the inference, contradiction elsewhere in the corpus, and congruence with scope. Findings that fail do not survive.",
      },
      {
        num: "2.4",
        title: "البتّ البشري",
        body: "People decide; the methodology proves they did. Every finding is accepted, overridden with recorded rationale, or escalated — by a named person, at a recorded time, with what they saw preserved alongside what they decided.",
      },
      {
        num: "2.5",
        title: "سجل القرار",
        body: "The output: a sealed, hash-chained record in which every claim is traceable to its page and verifiable by your own counsel, auditor or committee — without Monakes in the room.",
      },
    ],
  },

  interval: {
    num: "§03",
    kicker: "الفاصل",
    verdict: "الخطر ليس في القرار، بل في الفاصل بين القرار وسجله.",
    memo: {
      label: "اقرأ الآلية (بالإنجليزية)",
      paras: [
        "Committees evaluate rigorously, under real pressure and real time constraints. The evaluations are careful. The decisions are usually right. The documentation is assembled afterwards. Sometimes days. Often weeks. Occasionally only once a challenge has already been filed — at which point the institution is reconstructing, from notes and email and recollection, a decision made by people whose memory of it has been quietly reorganising ever since.",
        "That reconstruction becomes the institution's account of what happened. And every element of it faces one question: did this exist at the time, or was it produced for this proceeding?",
      ],
    },
  },

  method: {
    num: "§04",
    kicker: "المنهج",
    verdict: "معاصرٌ بالبناء، لا بالانضباط.",
    chainLabel: "السلسلة تُختم أثناء قراءتك",
    links: [
      {
        num: "01",
        title: "إدخال الملف",
        body: "الوثائق التي يقوم عليها القرار — لا غيرها — تُحدد كتابةً، وتُستوعب، وتُجزّأ (هاش).",
      },
      {
        num: "02",
        title: "الفحص وفق الحزمة",
        body: "يُقرأ الملف كاملاً وفق كل معيار — لا عيّنة. كل نتيجة تُربط ببندها وصفحتها ونصها. اقتباس، لا تلخيص.",
      },
      { num: "03", title: "التحقق", body: "مسار مستقل يهاجم كل نتيجة قبل أن يراها إنسان." },
      {
        num: "04",
        title: "البتّ",
        body: "فريقكم يقبل أو يتجاوز أو يُصعّد. باسم صاحبه وتوقيته. والتعديلات تُسجل بوصفها تعديلات.",
      },
      { num: "05", title: "الختم", body: "يُقفل لحظة إنشائه، وقابل لإعادة التحقق من دوننا." },
    ],
  },

  applications: {
    num: "§05",
    kicker: "التطبيقات",
    verdict: "معيار واحد، حيثما تُفحص السجلات.",
    monuments: [
      {
        counts: [150, 300],
        numeral: "{0}–{1}",
        label: "ساعة عمل لكل دورة مناقصة على التقييم والتوثيق اليدويين",
      },
      {
        counts: [6],
        numeral: "{0}+",
        unit: "أسابيع",
        label: "قبل اكتمال سجل التقييم في معظم المؤسسات",
      },
    ],
    items: [
      {
        title: "تقييم المناقصات والعطاءات",
        flag: "الأداة الرائدة",
        body: "Evaluation and record produced simultaneously: every score timestamped, attributed, locked, and traced to the clause it came from — in a fraction of committee time. Runs in parallel with a live evaluation; nothing in your process changes.",
      },
      {
        title: "برامج الامتثال",
        body: "The distance between a programme that exists and one that can be evidenced as operating is where modern examinations are decided. We read the record behind effectiveness assertions — escalations, dispositions, attestations — before someone else does.",
      },
      {
        title: "التقارير المالية والتصديق",
        body: "Certifications rest on chains of internal attestations and judgment memoranda. We read what the file would produce if examined: what each signature rested on, whether the basis of each judgment is contemporaneous, and what the representation letter is actually supported by.",
      },
      {
        title: "الملفات القانونية والتحقيقات واللجان",
        body: "Closed matters, deliberations and determinations — read for whether the file shows who decided what, when, on what basis.",
      },
    ],
  },

  security: {
    num: "§06",
    kicker: "الأمن والسيادة",
    verdict: "أنت تختار أين يقيم عملك، وما الذي يقرؤه.",
    chips: ["سحابي", "على بنيتكم التحتية", "سيادي · معزول تمامًا"],
    confidentiality:
      "التكليفات سرية للجهة المكلِّفة. تُجزّأ الملفات عند الاستلام وتُتلف بعد التأكيد عند الإقفال.",
    memo: {
      label: "اقرأ مذكرة النشر (بالإنجليزية)",
      paras: [
        "Run Monakes online for speed and zero setup, or deploy it inside your own environment when the work demands it. Either way, you choose the model that reads the work — your own keys, an in-region model, or a fully self-hosted one — and your data goes nowhere you didn't configure. Sovereign, on-premise, and air-gapped deployments are available for the most sensitive work.",
        "The compliance layer configures to national procurement law and data governance frameworks rather than being locked to one regime. Identity, actions, timestamps, and amendments are logged, attributed, and immutable — the record that existed at the moment of decision is the record that exists at the moment of challenge. Most software is built so a process runs smoothly. Monakes is built so the output of that process survives being read by someone whose job is to find the gap in it.",
      ],
    },
  },

  engagement: {
    num: "§07",
    kicker: "التكليف",
    verdict: "باب واحد.",
    monuments: [
      {
        counts: [30],
        numeral: "{0}",
        unit: "دقيقة",
        label: "إحاطة · معيار واحد من البداية إلى النهاية على عيّنة اصطناعية — وأنتم مدعوون لمهاجمتها",
      },
      {
        counts: [10],
        numeral: "{0}",
        unit: "أيام عمل",
        label: "تشخيص · ملف واحد، بأتعاب ثابتة، يُسلَّم مذكرةً مكتوبة",
      },
    ],
    rope: "بقيادة الشركاء. عدد محدود من التكليفات كل ربع. نعمل حصراً للجهة التي تكلّفنا، ولا نعمل أبداً لأطراف خصومة معها، ويسبق كلَّ تكليفٍ فحصُ تعارض مصالح. لسنا شركة تدقيق ولا نقدم رأي تأكيد؛ ويمكن أن يتم التكليف عبر المستشار القانوني.",
  },

  briefing: {
    title: "اطلب جلسة إحاطة",
    intro:
      "ثلاثون دقيقة، يقودها الشريك، على نموذج اصطناعي ندعوك إلى مهاجمته. اترك لنا وسيلة التواصل وسنعود إليك قريبًا.",
    fields: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      company: "الجهة",
      note: "ما الذي تريد أن تغطيه الجلسة",
    },
    optional: "اختياري",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال…",
    success: {
      title: "تم الاستلام.",
      body: "سنعود إليك قريبًا على العنوان الذي تركته. لا يُستخدم لأي غرض آخر.",
    },
    error: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا على info@monakes.com.",
    fallback: "أو احجز موعدًا مباشرة",
    fallbackHref: BRIEFING,
  },

  firm: {
    num: "§08",
    kicker: "الشركة",
    verdict: "أشخاص يعرفون كلفة سجلٍ لا يصمد.",
    people: [
      {
        name: "Wahid Hamdat",
        role: "القائد",
        bio: "Background in AI systems for operations-heavy environments where the output is read under pressure by people looking for gaps. Designed the Decision Protection Standard and the instrument that executes it.",
      },
      {
        name: "Abdelfadel Hamdat",
        role: "مجلس الإدارة · الاستراتيجية والشراكات المؤسسية",
        bio: "Ensures the commercial model maps to how public institutions actually evaluate, procure, and adopt technology — a process that does not resemble private-sector sales.",
      },
      {
        name: "Sofiene Chouchine",
        role: "البنية التحتية",
        bio: "Veteran of Qatar's TASMU national digital transformation programme. Designed the infrastructure architecture from inside a sovereign regulatory environment rather than from outside it.",
      },
      {
        name: "Husain Sairy",
        role: "مجلس الإدارة · عمليات المشتريات",
        bio: "Has served on government procurement evaluation committees. Knows how scores are assigned under institutional pressure and where documentation gaps form.",
      },
    ],
    stamps: [
      "ضمن محفظة واحة قطر للعلوم والتكنولوجيا",
      "برنامج تسمو — خبرة سابقة",
      "رئيس سابق للجنة المشتريات الحكومية — استشاري",
      "متخصص تحكيم لدى غرفة التجارة الدولية — استشاري",
    ],
  },

  seal: {
    sealed: "خُتم",
    endOfRecord: "نهاية السجل",
    hashTitle: "هذه الصفحة، مُجزّأة في متصفحك — الخاصية التي يحملها كل سجل من موناكس.",
    closed: "أُقفل السجل في",
    legal: "شركة موناكس لحلول الذكاء الاصطناعي ذ.م.م",
    address: "واحة قطر للعلوم والتكنولوجيا، المدينة التعليمية، الدوحة · 182 High Street North, London E6 2JA",
    email: "info@monakes.com",
    rights: "جميع الحقوق محفوظة",
  },
}
