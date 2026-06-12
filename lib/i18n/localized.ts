import {
  services,
  caseStudies,
  aboutStats,
  process,
  trustPoints,
  portfolioExperience,
  getCaseStudy,
  HOME_FEATURED_CASE_STUDY_SLUGS,
  type Service,
  type CaseStudy,
  type AboutStatItem,
  type WorkflowStep
} from "@/lib/data";
import { WORKFLOW_TABS, type WorkflowTab } from "@/lib/workflow-tabs";
import { PORTFOLIO_CATEGORIES, type PortfolioCategory } from "@/lib/portfolio";
import { teamMembers, type TeamMember } from "@/lib/team";
import {
  SHOPIFY_PORTFOLIO_CATEGORIES,
  SHOPIFY_PORTFOLIO_DESCRIPTIONS
} from "@/lib/shopify-landing";
import type { Locale } from "@/lib/i18n/types";

// ─── Service translations ───────────────────────────────────────────────────

type ServiceText = Pick<Service, "title" | "eyebrow" | "description" | "outcomes">;

const SERVICES_AR: Record<string, ServiceText> = {
  shopify: {
    title: "هندسة Shopify والتجارة الإلكترونية",
    eyebrow: "أنظمة التجارة",
    description:
      "واجهات متاجر تركز على التحويل، وتكاملات Shopify مخصصة، وتجارب منتجات، وتدفقات تسوق مدعومة بالذكاء الاصطناعي للعلامات التي تحتاج أكثر من قالب جاهز.",
    outcomes: ["واجهات متاجر مخصصة", "تكاملات الدفع والتطبيقات", "تجارب تجارة بالذكاء الاصطناعي والواقع المعزز"]
  },
  "mvp-development": {
    title: "تطوير تطبيقات الجوال",
    eyebrow: "تطوير تطبيقات الجوال للسعودية ودول الخليج",
    description:
      "أكثر من 150 تطبيقاً للأعمال السعودية ودول الخليج. iOS و Android و Flutter. من الفكرة إلى المتجر خلال 60 يوماً.",
    outcomes: ["من نموذج تفاعلي إلى الإطلاق", "تسليم جوال وويب", "ضمان جودة جاهز للإصدار"]
  },
  "saas-applications": {
    title: "تطبيقات SaaS",
    eyebrow: "توسّع بوضوح",
    description:
      "لوحات تحكم، ولوحات إدارية، ومحركات حجز، وأسواق، واشتراكات، وأدوار، وتحليلات، وسير عمل تشغيلي مبني للاستخدام اليومي المتكرر.",
    outcomes: ["لوحات تحكم متعددة الأدوار", "أتمتة سير العمل", "بنية سحابية موثوقة"]
  },
  "ai-solutions": {
    title: "ميزات المنتج بالذكاء الاصطناعي",
    eyebrow: "ذكاء اصطناعي عملي",
    description:
      "مساعدون ذكيون، وتدفقات توصيات، وأدوات تعلم لغوي، وتجارب تجربة افتراضية، وميزات أتمتة مصممة حول رحلات المستخدم الفعلية.",
    outcomes: ["دردشة وإرشاد بالذكاء الاصطناعي", "أنظمة توصيات", "سير عمل أتمتة"]
  },
  "mobile-apps": {
    title: "تطبيقات الجوال",
    eyebrow: "iOS و Android",
    description:
      "تطبيقات Flutter بواجهة مصقولة، وFirebase أو خلفيات مخصصة، وتدفقات إصدار جاهزة للمتاجر، واشتراكات، وخرائط، ودردشة، ووسائط، ومدفوعات.",
    outcomes: ["بناء تطبيقات Flutter", "دعم إطلاق المتاجر", "ميزات فورية"]
  },
  "web-platforms": {
    title: "منصات الويب",
    eyebrow: "ويب متكامل",
    description:
      "Next.js و React و Node.js، ولوحات تحكم، ومواقع تسويقية، ومنصات محتوى، ومنتجات ويب سريعة وموثوقة وسهلة التشغيل.",
    outcomes: ["React و Next.js", "أنظمة إدارية", "صفحات عامة محسّنة لمحركات البحث"]
  }
};

const SERVICE_STICKY_TITLES_AR: Record<string, string> = {
  "mvp-development": "تطوير تطبيقات الجوال",
  "saas-applications": "منصات SaaS",
  "ai-solutions": "ميزات المنتج بالذكاء الاصطناعي",
  shopify: "هندسة التجارة الإلكترونية"
};

export const FEATURED_SERVICE_SLUGS = [
  "mvp-development",
  "saas-applications",
  "ai-solutions",
  "shopify"
] as const;

const SERVICE_STICKY_TITLES_EN: Record<(typeof FEATURED_SERVICE_SLUGS)[number], string> = {
  "mvp-development": "Mobile App Development",
  "saas-applications": "SaaS Platforms",
  "ai-solutions": "AI Product Features",
  shopify: "Commerce Engineering"
};

// ─── Case study translations ──────────────────────────────────────────────────

type CaseStudyText = Pick<
  CaseStudy,
  "title" | "category" | "summary" | "challenge" | "solution" | "impact" | "services"
>;

const CASE_STUDIES_AR: Record<string, CaseStudyText> = {
  "frenzone-live": {
    title: "Frenzone Live",
    category: "بث مباشر اجتماعي",
    summary:
      "منصة للمبدعين للبث المباشر والفيديو القصير والهدايا الافتراضية والمجتمعات المدفوعة — مبنية للتفاعل الفوري وتحقيق الدخل على iOS و Android.",
    challenge:
      "كان المبدعون يحتاجون تطبيقاً واحداً للبث المباشر وبناء الجمهور وإدارة الغرف المدفوعة وتحقيق الدخل عبر الهدايا والاشتراكات دون التنقل بين أدوات متعددة.",
    solution:
      "سلّمت SoftThrive تطبيق Flutter مع خلفية Node.js و MongoDB، وطبقات Socket.io فورية، ومعارك مشاركة المضيف، ومدفوعات المحفظة الإلكترونية، وإصدار جاهز للمتجر على كلا المنصتين.",
    impact: [
      "بث مباشر وفيديو قصير وغرف مدفوعة خاصة في منتج واحد",
      "هدايا فورية ومعارك وجلسات مشاركة مضيف عبر Socket.io",
      "متاح على App Store و Google Play مع تدفقات تحقيق دخل للمبدعين"
    ],
    services: ["تطبيقات الجوال", "تطوير تطبيقات الجوال", "حلول الذكاء الاصطناعي"]
  },
  "execlane-chauffeur-service": {
    title: "Execlane Chauffeur Service",
    category: "منصة SaaS للحجز",
    summary:
      "منصة حجز وعمليات سائق خاص لمانشستر وشمال إنجلترا مع التوزيع والسائق والأسطول وسير عمل الإدارة.",
    challenge:
      "كان العمل يحتاج تجربة حجز مصقولة للعملاء مع إبقاء التوزيع وتعيين السائقين وعمليات الأسطول قابلة للإدارة خلف الكواليس.",
    solution:
      "سلّمت SoftThrive واجهة React مع خلفية Node.js و MongoDB، مدعومة بلوحات إدارية ولوحات سائق للتحكم التشغيلي.",
    impact: [
      "حجوزات مركزية وتنسيق الأسطول",
      "سير عمل مخصص للإدارة والسائق",
      "منصة ويب نشطة لخدمة السوق البريطاني"
    ],
    services: ["تطبيقات SaaS", "منصات الويب", "لوحة تحكم إدارية"]
  },
  "scribbes-social-platform": {
    title: "Scribbes",
    category: "منصة اجتماعية على الويب",
    summary:
      "منصة Next.js للتواصل الاجتماعي والتدوين مع لوحة تحكم إدارية منفصلة لإدارة المحتوى والمنصة.",
    challenge:
      "كان المنتج يتطلب تجربة اجتماعية عامة وطبقة إدارية تشغيلية تدير النشاط دون إبطاء التطبيق الموجّه للمستخدم.",
    solution:
      "بنَت SoftThrive المنصة بـ Next.js و React و Node.js، مع فصل التدفقات العامة عن تجربة التحكم الإدارية.",
    impact: [
      "نشر إنتاجي على Next.js",
      "لوحة تحكم إدارية لعمليات المنصة",
      "ميزات المحتوى والمجتمع في نظام واحد"
    ],
    services: ["تطبيقات SaaS", "منصات الويب", "تطوير تطبيقات الجوال"]
  },
  "iammusic-lms": {
    title: "IAmMusic",
    category: "SaaS تعليمي",
    summary:
      "نظام LMS موسيقي يربط الطلاب بالمعلمين عبر واجهة React وخلفية Node وتدفقات سوق وأدوات إدارية.",
    challenge:
      "كان على المنصة دعم الاكتشاف والتعلم ومطابقة المعلم والطالب والإدارة الداخلية دون أن تبدو ثقيلة للمستخدمين.",
    solution:
      "أنشأت SoftThrive منصة ويب باستخدام React و Node.js و Tailwind CSS و PostgreSQL مع تجربة أمامية نظيفة وبنية جاهزة للإدارة.",
    impact: [
      "أساس سوق معلم-طالب",
      "سير عمل تعليمي في تطبيق ويب قابل للتوسع",
      "واجهة React حديثة للمتعلمين"
    ],
    services: ["تطبيقات SaaS", "تطوير تطبيقات الجوال", "منصات الويب"]
  },
  "dentclinic-healthcare-saas": {
    title: "DentClinic",
    category: "SaaS رعاية صحية",
    summary:
      "SaaS للعيادات السنية والمتعددة التخصصات مع المواعيد وسجلات المرضى ومطالبات التأمين والفوترة والمخزون ووصول جوال أولاً.",
    challenge:
      "كان فريق العيادة يحتاج نظاماً موحداً لسير عمل المرضى والعمليات اليومية، لاستبدال التعامل المجزّأ للمواعيد والسجلات والفوترة والمخزون.",
    solution:
      "سلّمت SoftThrive تطبيق Flutter مدعوماً بـ React و Node.js و Firebase لإدارة العيادات وعمليات الرعاية الصحية.",
    impact: [
      "مواعيد وسجلات مرضى في تدفق واحد",
      "دعم الفوترة والمخزون والمطالبات",
      "إثبات Android نشط لـ SaaS رعاية صحية"
    ],
    services: ["تطبيقات SaaS", "تطبيقات الجوال", "رعاية صحية"]
  },
  "prosready-marketplace": {
    title: "ProsReady",
    category: "سوق خدمات منزلية",
    summary:
      "سوق خدمات منزلية مع الحجز والمدفوعات والمراجعات وسير عمل جوال يدعم أكثر من 50 ألف دولار في المعاملات الشهرية.",
    challenge:
      "كان المنتج يحتاج تسهيل اكتشاف وحجز الخدمات المنزلية للعملاء مع دعم مزودين موثوقين واستخدام مكثف للمعاملات.",
    solution:
      "بنَت SoftThrive تجربة سوق Flutter و Firebase تغطي اكتشاف الخدمات والحجز والمدفوعات وحلقات المراجعات.",
    impact: [
      "إثبات معاملات شهرية +50 ألف دولار",
      "حجز ومدفوعات ومراجعات",
      "سير عمل سوق للمزودين والعملاء"
    ],
    services: ["تطوير تطبيقات الجوال", "تطبيقات الجوال", "سوق"]
  },
  "repairoo-service-bidding": {
    title: "Repairoo",
    category: "منصة مزايدة خدمات",
    summary:
      "سوق مزايدة خدمات يركز على دبي يربط العملاء بالمقاولين عبر نقاط تواصل جوال وويب.",
    challenge:
      "كان المستخدمون يحتاجون طريقة بسيطة لطلب الإصلاحات ومقارنة ردود المقاولين، بينما يحتاج المقاولون قناة موثوقة للعمل الوارد.",
    solution:
      "أنشأت SoftThrive سوقاً ثنائي الجانب بـ Flutter و Firebase، مدعوماً بحضور ويب نشط للعلامة.",
    impact: [
      "سوق خدمات ثنائي الجانب",
      "سير عمل مزايدة المقاولين",
      "حضور Android وموقع نشط"
    ],
    services: ["تطوير تطبيقات الجوال", "تطبيقات الجوال", "سوق"]
  },
  "fasal360-agtech-ai": {
    title: "Fasal360",
    category: "منصة زراعة بالذكاء الاصطناعي",
    summary:
      "منصة AgTech مع توصيات مدعومة بالذكاء الاصطناعي ودعم واجهة الطقس والتحقق من البذور وتدفقات السوق وتطبيقات جوال وموقع.",
    challenge:
      "كان المستخدمون الزراعيون يحتاجون ذكاءً عملياً لقرارات المحاصيل والتحقق وسياق الطقس واكتشاف المنتجات في منصة واحدة متاحة.",
    solution:
      "جمعت SoftThrive Flutter و Firebase وميزات الذكاء الاصطناعي في منتج زراعي جوال أولاً مع حضور ويب داعم.",
    impact: [
      "توصيات ذكاء اصطناعي لحالات الاستخدام الزراعية",
      "واجهة الطقس والتحقق من البذور",
      "نظام iOS و Android وموقع نشط"
    ],
    services: ["حلول الذكاء الاصطناعي", "تطبيقات الجوال", "منصات الويب"]
  },
  "food-buddy-restaurant-platform": {
    title: "Food Buddy",
    category: "سوق مطاعم",
    summary:
      "منتج عروض وحجز مطاعم مع استرداد QR واسترداد نقدي وحجز طاولات وسير عمل لوحة تحكم المطاعم.",
    challenge:
      "كان المطاعم تحتاج نظاماً ترويجياً يحوّل العروض إلى زيارات قابلة للقياس مع منح العملاء رحلة اكتشاف واسترداد بسيطة.",
    solution:
      "سلّمت SoftThrive منتج Flutter و Node.js و Firebase مع تدفقات العملاء واسترداد QR والحجوزات والاسترداد النقدي ودعم لوحة التحكم.",
    impact: [
      "استرداد عروض برمز QR",
      "تدفقات استرداد نقدي وحجز طاولات",
      "إدارة ترويج من جانب المطعم"
    ],
    services: ["تطوير تطبيقات الجوال", "تطبيقات الجوال", "سوق"]
  },
  "virtual-try-on-commerce": {
    title: "Virtual Try-On / Maryum n Maria",
    category: "تجارة Shopify بالذكاء الاصطناعي",
    summary:
      "تجربة تجارة إلكترونية وتجربة افتراضية بالذكاء الاصطناعي/الواقع المعزز باستخدام Shopify و OpenAI و ByteDance APIs و WordPress لعلامة أزياء.",
    challenge:
      "كانت العلامة تحتاج تحسين ثقة المنتج عبر الإنترنت بتمكين المتسوقين من تجربة قطع الأزياء بشكل تفاعلي قبل الشراء.",
    solution:
      "دعمت SoftThrive تجربة تجارة تجربة افتراضية بالذكاء الاصطناعي/الواقع المعزز مع تكاملات Shopify والذكاء الاصطناعي في رحلة التسوق العامة.",
    impact: [
      "تجربة تسوق بالذكاء الاصطناعي/الواقع المعزز",
      "طبقة تفاعل تجارة أزياء",
      "إثبات تكامل Shopify وواجهات API"
    ],
    services: ["Shopify", "حلول الذكاء الاصطناعي", "منصات الويب"]
  },
  "eurojobs-ecosystem": {
    title: "EuroJobs Ecosystem",
    category: "تطبيق توظيف",
    summary:
      "نظام توظيف ثنائي الجانب يجمع ملفات الباحثين عن عمل والتوصيات مع إدارة الوظائف من جانب مسؤولي التوظيف.",
    challenge:
      "كان على المنصة تجارب منفصلة للباحثين عن عمل والمسؤولين عن التوظيف مع الحفاظ على تماسك المنتج كنظام توظيف متكامل.",
    solution:
      "بنَت SoftThrive تطبيقات Flutter و Firebase للبحث عن وظائف وبناء الملفات والمطابقة والتوصيات وإدارة الوظائف للمسؤولين.",
    impact: [
      "تطبيقات منفصلة للباحثين والمسؤولين عن التوظيف",
      "تدفقات الملفات والمطابقة والتوصيات",
      "إثبات iOS نشط لكلا الجانبين"
    ],
    services: ["تطوير تطبيقات الجوال", "تطبيقات الجوال", "تطبيقات SaaS"]
  }
};

// ─── Workflow tabs translations ───────────────────────────────────────────────

type WorkflowStepText = Pick<WorkflowStep, "title" | "text" | "tag">;

type WorkflowTabText = Pick<WorkflowTab, "label" | "headline" | "summary"> & {
  steps: Record<string, WorkflowStepText>;
};

const WORKFLOW_TABS_AR: Record<WorkflowTab["id"], WorkflowTabText> = {
  mobile: {
    label: "تطبيقات الجوال",
    headline: "من الفكرة إلى App Store و Play Store",
    summary: "خمس مراحل مركزة — من الاكتشاف إلى إصدار المتجر — لمنتجات iOS و Android.",
    steps: {
      "m-discover": {
        title: "رسم خريطة المنتج",
        text: "المستخدمون ونطاق التطبيق وأهداف الإطلاق قبل التصميم.",
        tag: "اكتشاف"
      },
      "m-design": {
        title: "تصميم التجربة",
        text: "تدفقات وواجهة وحركة مضبوطة لكلا المنصتين.",
        tag: "تصميم"
      },
      "m-build": {
        title: "تطوير Flutter",
        text: "الميزات الأساسية والحالة وبنية تركز على الأداء.",
        tag: "بناء"
      },
      "m-integrate": {
        title: "التكامل والاختبار",
        text: "Firebase ومدفوعات وخرائط وإشعارات وواجهات API ودورات ضمان الجودة.",
        tag: "تكامل"
      },
      "m-launch": {
        title: "الإطلاق في المتاجر",
        text: "إصدار App Store و Play وتحليلات وتكرارات.",
        tag: "إطلاق"
      }
    }
  },
  web: {
    label: "تطبيقات الويب",
    headline: "SaaS ومنصات قابلة للتوسع",
    summary: "أربع مراحل لنقل منتجات الويب من النطاق إلى الإنتاج — لوحات تحكم وواجهات API وروابط نشطة.",
    steps: {
      "w-discover": {
        title: "تحديد النظام",
        text: "الأدوار ونموذج البيانات والمعالم مع فريقك.",
        tag: "اكتشاف"
      },
      "w-design": {
        title: "UX و UI للمنتج",
        text: "تخطيطات متجاوبة ونظام تصميم متماسك.",
        tag: "تصميم"
      },
      "w-build": {
        title: "الهندسة",
        text: "Next.js وواجهات API ومصادقة ولوحات إدارية وتكاملات.",
        tag: "بناء"
      },
      "w-launch": {
        title: "النشر والتحسين",
        text: "استضافة وأداء وأمان ودعم ما بعد الإطلاق.",
        tag: "إطلاق"
      }
    }
  },
  shopify: {
    label: "متاجر Shopify",
    headline: "تجارة تحقق التحويل",
    summary: "ثلاث مراحل — استراتيجية وبناء ونمو — لعلامات Shopify الجاهزة للبيع.",
    steps: {
      "s-strategy": {
        title: "الاستراتيجية وتجربة المستخدم",
        text: "العلامة وهيكل فهرس المنتجات وصفحات المنتج وتدفقات تركز على التحويل.",
        tag: "تخطيط"
      },
      "s-build": {
        title: "بناء المتجر",
        text: "قالب مخصص ودفع وتطبيقات وتكاملات طرف ثالث.",
        tag: "بناء"
      },
      "s-grow": {
        title: "الإطلاق والنمو",
        text: "أدوات تسوق بالذكاء الاصطناعي وSEO وCRO وتحسين مستمر.",
        tag: "نمو"
      }
    }
  }
};

// ─── Trust points, about stats, process, portfolio ────────────────────────────

const TRUST_POINTS_AR = [
  {
    title: "100+ متجر سعودي بنيناه",
    text: "متاجر Shopify عربية حقيقية في السعودية والخليج — أزياء، جمال، عطور، أغذية، والمزيد."
  },
  {
    title: "تطوير عربي أولاً",
    text: "كل متجر وتطبيق نبنيه يتضمن تخطيط RTL عربي وتسعير بالريال السعودي كمعيار."
  },
  {
    title: "تسليم في الوقت المحدد، دائماً",
    text: "من رواد الأعمال لأول مرة إلى الشركات الراسخة — نسلّم منتجات تعمل في الإنتاج، في الموعد المحدد."
  }
];

const ABOUT_STATS_AR: Pick<AboutStatItem, "label" | "detail">[] = [
  { label: "تطبيقات جوال نشطة", detail: "على App Store و Google Play" },
  { label: "تطبيقات ويب", detail: "SaaS وتجارة ومنصات" },
  { label: "طيف العملاء", detail: "من المؤسسين إلى الشركات المدرجة" }
];

const PROCESS_AR = [
  {
    title: "رسم خريطة المنتج",
    text: "نوضح الجمهور والقيمة وسير العمل والميزات وقيود الإطلاق قبل بدء التصميم."
  },
  {
    title: "تصميم التجربة",
    text: "رحلات المستخدم والشاشات والحركة والأنظمة البصرية تُصمَّم لانطباع مصقول للمشتري والمستخدم."
  },
  {
    title: "بناء النظام",
    text: "الواجهة الأمامية والخلفية والجوال والتكاملات واللوحات الإدارية وضمان الجودة تتحرك معاً في دورات تسليم منضبطة."
  },
  {
    title: "الإطلاق والتحسين",
    text: "نتحقق من الأداء والاستجابة والتدفقات الأساسية والخطوات التالية بعد الإطلاق بوضوح منتج."
  }
];

const PORTFOLIO_EXPERIENCE_AR =
  "150+ تطبيق جوال نشط و 300+ تطبيق ويب تم تسليمه. نعمل مع الشركات الناشئة والشركات الراسخة، بما في ذلك فرق مدرجة في ناسdaq. متخصصون في متاجر Shopify عربية أولاً وتطبيقات جوال للسعودية وأسواق الخليج.";

const PORTFOLIO_CATEGORIES_AR: Record<
  PortfolioCategory,
  { label: string; headline: string; blurb: string }
> = {
  mobile: {
    label: "تطبيقات الجوال",
    headline: "150+ تطبيق جوال نشط",
    blurb:
      "تطبيقات Flutter على App Store و Google Play — اجتماعي ورعاية صحية وأسواق ونقل وغيرها."
  },
  web: {
    label: "تطبيقات الويب",
    headline: "300+ تطبيق ويب",
    blurb: "لوحات SaaS ومنصات وأسواق ومواقع تسويقية — روابط نشطة وتجربة مستخدم جاهزة للإنتاج."
  },
  shopify: {
    label: "متاجر Shopify",
    headline: "100+ متجر Shopify نشط بنيناه",
    blurb:
      "متاجر Shopify سعودية وخليجية بالعربية — اضغط على أي متجر لزيارة الموقع المباشر. أزياء، جمال، عطور، والمزيد."
  }
};

// ─── Team translations ──────────────────────────────────────────────────────────

const TEAM_MEMBERS_AR: Pick<TeamMember, "role" | "bio">[] = [
  {
    role: "قائد المنتج",
    bio: "يحوّل أفكار المؤسسين إلى منتجات محددة النطاق — اكتشاف وخرائط طريق وخطط تسليم يمكن للفرق تنفيذها."
  },
  {
    role: "مديرة UI/UX",
    bio: "تصمم واجهات وتدفقات بمظهر متميز — من wireframes إلى أنظمة تصميم مصقولة وحركة."
  },
  {
    role: "مهندس جوال رئيسي",
    bio: "يبني تطبيقات Flutter لـ iOS و Android — ميزات فورية وإصدارات متاجر وضمان جودة إنتاجي."
  },
  {
    role: "مهندسة Full-Stack",
    bio: "تسلّم منصات Next.js وواجهات Node.js API ولوحات إدارية وتكاملات يمكن للعملاء تشغيلها يومياً."
  }
];

// ─── Shopify portfolio maps ─────────────────────────────────────────────────────

export const SHOPIFY_PORTFOLIO_CATEGORIES_AR: Record<string, string> = {
  virtualtryon: "أزياء",
  cannacabana: "تجزئة عامة",
  mybeautydeals: "جمال",
  repairoo: "تجزئة عامة",
  bmessentia: "إلكترونيات",
  vendup: "تجزئة عامة",
  myboutique: "أزياء"
};

export const SHOPIFY_PORTFOLIO_DESCRIPTIONS_AR: Record<string, string> = {
  virtualtryon: "تجارة أزياء مدعومة بالذكاء الاصطناعي مع تجربة افتراضية.",
  cannacabana: "تجارة إلكترونية تجزئة منظّمة مع فهرس منتجات.",
  mybeautydeals: "عروض جمال وتجربة تجارة صالونات.",
  repairoo: "سوق خدمات مع تدفقات تجارية.",
  bmessentia: "منصة تعلم طبي مع عناصر تجارية.",
  vendup: "سوق من نظير إلى نظير للشراء والبيع.",
  myboutique: "تجربة واجهة متجر بوتيك أزياء."
};

// ─── Getter functions ─────────────────────────────────────────────────────────

export function getLocalizedServices(locale: Locale): Service[] {
  if (locale === "en") return services;
  return services.map((service) => {
    const ar = SERVICES_AR[service.slug];
    return ar ? { ...service, ...ar } : service;
  });
}

export function getWorkflowTabs(locale: Locale): WorkflowTab[] {
  if (locale === "en") return WORKFLOW_TABS;
  return WORKFLOW_TABS.map((tab) => {
    const arTab = WORKFLOW_TABS_AR[tab.id];
    if (!arTab) return tab;
    return {
      ...tab,
      label: arTab.label,
      headline: arTab.headline,
      summary: arTab.summary,
      steps: tab.steps.map((step) => {
        const arStep = arTab.steps[step.id];
        return arStep ? { ...step, ...arStep } : step;
      })
    };
  });
}

export function getTrustPoints(locale: Locale) {
  if (locale === "en") return trustPoints;
  return trustPoints.map((point, i) => ({
    ...point,
    ...TRUST_POINTS_AR[i]
  }));
}

export function getAboutStats(locale: Locale): AboutStatItem[] {
  if (locale === "en") return aboutStats;
  return aboutStats.map((stat, i) => ({
    ...stat,
    ...ABOUT_STATS_AR[i]
  }));
}

export function getProcess(locale: Locale) {
  if (locale === "en") return process;
  return process.map((step, i) => ({
    ...step,
    ...PROCESS_AR[i]
  }));
}

export function getPortfolioExperience(locale: Locale): string {
  return locale === "en" ? portfolioExperience : PORTFOLIO_EXPERIENCE_AR;
}

export function getPortfolioCategories(locale: Locale) {
  if (locale === "en") return PORTFOLIO_CATEGORIES;
  return PORTFOLIO_CATEGORIES.map((cat) => ({
    ...cat,
    ...PORTFOLIO_CATEGORIES_AR[cat.id]
  }));
}

export function getLocalizedCaseStudy(slug: string, locale: Locale): CaseStudy | undefined {
  const study = getCaseStudy(slug);
  if (!study || locale === "en") return study;
  const ar = CASE_STUDIES_AR[slug];
  return ar ? { ...study, ...ar } : study;
}

export function getLocalizedCaseStudies(locale: Locale): CaseStudy[] {
  if (locale === "en") return caseStudies;
  return caseStudies.map((study) => {
    const ar = CASE_STUDIES_AR[study.slug];
    return ar ? { ...study, ...ar } : study;
  });
}

export function getHomeFeaturedCaseStudies(locale: Locale): CaseStudy[] {
  if (locale === "en") {
    return HOME_FEATURED_CASE_STUDY_SLUGS.map((slug) => caseStudies.find((s) => s.slug === slug)).filter(
      (s): s is CaseStudy => Boolean(s)
    );
  }
  return HOME_FEATURED_CASE_STUDY_SLUGS.map((slug) => getLocalizedCaseStudy(slug, locale)).filter(
    (s): s is CaseStudy => Boolean(s)
  );
}

export function getTeamMembers(locale: Locale): TeamMember[] {
  if (locale === "en") return teamMembers;
  return teamMembers.map((member, i) => ({
    ...member,
    ...TEAM_MEMBERS_AR[i]
  }));
}

export function getShopifyPortfolioCategory(id: string, locale: Locale): string | undefined {
  if (locale === "en") return SHOPIFY_PORTFOLIO_CATEGORIES[id];
  return SHOPIFY_PORTFOLIO_CATEGORIES_AR[id] ?? SHOPIFY_PORTFOLIO_CATEGORIES[id];
}

export function getShopifyPortfolioDescription(id: string, locale: Locale): string | undefined {
  if (locale === "en") return SHOPIFY_PORTFOLIO_DESCRIPTIONS[id];
  return SHOPIFY_PORTFOLIO_DESCRIPTIONS_AR[id] ?? SHOPIFY_PORTFOLIO_DESCRIPTIONS[id];
}

export function getServiceStickyTitles(locale: Locale): Record<string, string> {
  if (locale === "en") return { ...SERVICE_STICKY_TITLES_EN };
  return { ...SERVICE_STICKY_TITLES_AR };
}
