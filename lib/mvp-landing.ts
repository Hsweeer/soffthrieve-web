export const MVP_PRICING = [
  {
    id: "basic",
    name: "Business App Basic",
    price: "$5,000",
    pages: "Single platform",
    delivery: "60 days",
    includes: "iOS or Android, core features, basic backend, and App Store submission",
    popular: false
  },
  {
    id: "standard",
    name: "Business App Standard",
    price: "$10,000",
    pages: "iOS + Android",
    delivery: "90 days",
    includes: "Full backend, admin panel, push notifications, and analytics on both stores",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    pages: "Multi-platform",
    delivery: "Timeline agreed",
    includes: "Complex multi-platform products with AI features and custom infrastructure",
    popular: false
  }
] as const;

export const MVP_GUARANTEES = [
  "Your app delivered within the agreed timeline or we keep building at no extra cost.",
  "Not satisfied with the final product — full refund. No questions asked.",
  "NDA signed before any project discussion — your idea is protected from day one.",
  "Free 30 days support after your app goes live on the App Store and Play Store."
] as const;

export const MVP_TESTIMONIALS = [
  {
    id: "mvp-1",
    name: "Khalid M.",
    role: "Startup Founder",
    location: "Riyadh",
    rating: 5,
    text: "Softhrive delivered our iOS and Android app in 58 days. Professional team, clean code, and daily updates on WhatsApp throughout the build.",
    source: "upwork" as const
  },
  {
    id: "mvp-2",
    name: "Sara A.",
    role: "App Owner",
    location: "Jeddah",
    rating: 5,
    text: "They built our complete app with backend, admin panel, and push notifications. Exactly what we needed for our Saudi market launch.",
    source: "fiverr" as const
  },
  {
    id: "mvp-3",
    name: "Mohammed R.",
    role: "Business Owner",
    location: "Doha",
    rating: 5,
    text: "Great team with real experience. Our app went live on both stores on time without any issues.",
    source: "upwork" as const
  }
];
