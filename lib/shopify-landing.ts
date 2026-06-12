export const SHOPIFY_PORTFOLIO_CATEGORIES: Record<string, string> = {
  virtualtryon: "Fashion",
  cannacabana: "General retail",
  mybeautydeals: "Beauty",
  repairoo: "General retail",
  bmessentia: "Electronics",
  vendup: "General retail",
  myboutique: "Fashion"
};

export const SHOPIFY_PORTFOLIO_DESCRIPTIONS: Record<string, string> = {
  virtualtryon: "AI-powered fashion commerce with virtual try-on.",
  cannacabana: "Regulated retail e-commerce with product catalog.",
  mybeautydeals: "Beauty deals and salon commerce experience.",
  repairoo: "Service marketplace with commerce flows.",
  bmessentia: "Medical learning platform with commerce elements.",
  vendup: "Peer-to-peer marketplace for buying and selling.",
  myboutique: "Fashion boutique storefront experience."
};

export const SHOPIFY_PRICING = [
  {
    id: "basic",
    name: "Basic",
    price: "$499",
    pages: "5 pages",
    delivery: "7 days",
    includes: "Home, Products, About, Contact, Policy",
    popular: false
  },
  {
    id: "standard",
    name: "Standard",
    price: "$999",
    pages: "8 pages",
    delivery: "14 days",
    includes: "Basic + Blog, FAQ, Collections, Arabic",
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "$1,999",
    pages: "10+ pages",
    delivery: "21 days",
    includes: "Standard + SEO, Speed optimization, Custom features",
    popular: false
  }
] as const;

export const SHOPIFY_GUARANTEES = [
  "Your store ready in 7 days — or we keep working until it is",
  "Not satisfied? Full refund — no questions asked",
  "Dedicated project manager from day one",
  "Free revisions during the build process"
] as const;

export const SHOPIFY_PROCESS = [
  {
    step: "1",
    title: "Free Consultation",
    description:
      "Tell us about your business and what you need. We respond within 30 minutes on WhatsApp."
  },
  {
    step: "2",
    title: "Design and Build",
    description:
      "Our team designs and builds your store. You approve every step before we move forward."
  },
  {
    step: "3",
    title: "Launch in 7 Days",
    description: "Your store goes live. We train you on how to use it and stay available for support."
  }
] as const;

export const SHOPIFY_FAQ = [
  {
    question: "Do you build Arabic Shopify stores?",
    answer:
      "Yes — all our stores include full Arabic language support, right-to-left layout, and Saudi Riyal pricing."
  },
  {
    question: "How long does it take?",
    answer:
      "Basic stores are ready in 7 days. Standard in 14 days. Premium in 21 days. We guarantee these timelines."
  },
  {
    question: "What if I am not satisfied?",
    answer: "We offer a full refund if you are not satisfied with the delivered store. No questions asked."
  },
  {
    question: "Do you accept payment in Saudi Riyal?",
    answer: "Yes — we accept bank transfers in SAR, USD, and other major currencies."
  },
  {
    question: "Can I add products myself after launch?",
    answer:
      "Yes — we train you on how to manage your store and add products independently."
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes — we provide 30 days of free support after your store goes live."
  }
] as const;

export const SHOPIFY_FAQ_AR = [
  {
    question: "هل تبنون متاجر Shopify بالعربية؟",
    answer: "نعم — جميع متاجرنا تتضمن دعم العربية الكامل، وتخطيط RTL، وأسعار بالريال السعودي."
  },
  {
    question: "كم يستغرق البناء؟",
    answer: "المتاجر الأساسية جاهزة خلال 7 أيام. Standard خلال 14 يوماً. Premium خلال 21 يوماً. نضمن هذه المدد."
  },
  {
    question: "ماذا لو لم أكن راضياً؟",
    answer: "نقدم استرداداً كاملاً إذا لم تكن راضياً عن المتجر المُسلّم. بدون أسئلة."
  },
  {
    question: "هل تقبلون الدفع بالريال السعودي؟",
    answer: "نعم — نقبل التحويلات البنكية بالريال السعودي والدولار والعملات الرئيسية."
  },
  {
    question: "هل يمكنني إضافة المنتجات بنفسي بعد الإطلاق؟",
    answer: "نعم — ندربك على إدارة متجرك وإضافة المنتجات بشكل مستقل."
  },
  {
    question: "هل تقدمون دعماً بعد الإطلاق؟",
    answer: "نعم — نقدم 30 يوماً من الدعم المجاني بعد إطلاق متجرك."
  }
] as const;

export const SHOPIFY_GUARANTEES_AR = [
  "متجرك جاهز خلال 7 أيام — أو نستمر بالعمل حتى يكون",
  "غير راضٍ؟ استرداد كامل — بدون أسئلة",
  "مدير مشروع مخصص من اليوم الأول",
  "مراجعات مجانية أثناء البناء"
] as const;

export const SHOPIFY_PROCESS_AR = [
  {
    step: "1",
    title: "استشارة مجانية",
    description: "أخبرنا عن عملك واحتياجاتك. نرد خلال 30 دقيقة على واتساب."
  },
  {
    step: "2",
    title: "التصميم والبناء",
    description: "فريقنا يصمم ويبني متجرك. توافق على كل خطوة قبل المتابعة."
  },
  {
    step: "3",
    title: "الإطلاق خلال 7 أيام",
    description: "متجرك يصبح نشطاً. ندربك على الاستخدام ونبقى متاحين للدعم."
  }
] as const;

export const SHOPIFY_PRICING_AR = [
  {
    id: "basic",
    name: "أساسي",
    price: "499$",
    pages: "5 صفحات",
    delivery: "7 أيام",
    includes: "الرئيسية، المنتجات، من نحن، التواصل، السياسات",
    popular: false
  },
  {
    id: "standard",
    name: "Standard",
    price: "999$",
    pages: "8 صفحات",
    delivery: "14 يوماً",
    includes: "أساسي + مدونة، أسئلة، مجموعات، عربي",
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "1,999$",
    pages: "10+ صفحات",
    delivery: "21 يوماً",
    includes: "Standard + SEO، تحسين السرعة، ميزات مخصصة",
    popular: false
  }
] as const;
