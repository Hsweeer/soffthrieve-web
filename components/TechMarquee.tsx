"use client";

import { BrandIcon } from "@/components/BrandIcon";

const partners = ["shopify", "google", "figma", "paypal", "amazon"] as const;

function PartnerItem({ brand }: { brand: (typeof partners)[number] }) {
  const label = brand.charAt(0).toUpperCase() + brand.slice(1);

  return (
    <div className="group flex shrink-0 items-center gap-3 px-2 transition duration-300 hover:scale-105">
      <BrandIcon brand={brand} size={36} />
      <span className="hidden text-sm font-bold text-slate-600 sm:inline">{label}</span>
    </div>
  );
}

export function TechMarquee() {
  const row = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden border-y border-sky-100 bg-white py-5">
      <div className="container-shell">
        <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-sky-600">
          Trusted technology partners
        </p>
        <p className="mx-auto mt-1 max-w-md text-center text-sm text-slate-500">
          Platforms we ship on every day
        </p>
      </div>

      <div className="relative mt-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track items-center gap-12 px-4 md:gap-16">
          {row.map((brand, index) => (
            <PartnerItem brand={brand} key={`${brand}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
