export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  source?: "upwork" | "fiverr";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed K.",
    role: "Fashion Store Owner",
    location: "Riyadh",
    rating: 5,
    text: "Softhrive delivered my store in 5 days. Professional, responsive, and exactly what I needed. Sales started coming in the same week it launched. Highly recommended for any Saudi business.",
    source: "upwork"
  },
  {
    id: "2",
    name: "Fatima A.",
    role: "Beauty Brand Owner",
    location: "Jeddah",
    rating: 5,
    text: "They built our Arabic Shopify store with perfect RTL layout and SAR pricing. The team was fast on WhatsApp and handled every revision patiently.",
    source: "fiverr"
  },
  {
    id: "3",
    name: "Omar S.",
    role: "Electronics Retailer",
    location: "Doha",
    rating: 5,
    text: "Clear pricing, no hidden fees, and the store went live on schedule. We now manage products ourselves after their training session.",
    source: "upwork"
  }
];

export const TESTIMONIALS_AR: Testimonial[] = [
  {
    id: "1",
    name: "أحمد ك.",
    role: "صاحب متجر أزياء",
    location: "الرياض",
    rating: 5,
    text: "Softhrive سلّمت متجري خلال 5 أيام. احترافية وسريعة الاستجابة وبالضبط ما احتجته. بدأت المبيعات في نفس الأسبوع. أنصح بها لأي عمل سعودي.",
    source: "upwork"
  },
  {
    id: "2",
    name: "فاطمة أ.",
    role: "صاحبة علامة تجميل",
    location: "جدة",
    rating: 5,
    text: "بنوا متجر Shopify بالعربية مع RTL مثالي وأسعار بالريال. الفريق سريع على واتساب وتعامل مع كل تعديل بصبر.",
    source: "fiverr"
  },
  {
    id: "3",
    name: "عمر س.",
    role: "تاجر إلكترونيات",
    location: "الدوحة",
    rating: 5,
    text: "أسعار واضحة بدون رسوم مخفية والمتجر أُطلق في الموعد. ندير المنتجات بأنفسنا بعد جلسة التدريب.",
    source: "upwork"
  }
];

export function getTestimonials(locale: "en" | "ar" = "en"): Testimonial[] {
  return locale === "ar" ? TESTIMONIALS_AR : TESTIMONIALS;
}
