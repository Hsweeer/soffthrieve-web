"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Service } from "@/lib/data";
import { localePath, useDictionary } from "@/lib/i18n";

export function ServiceCard({ service }: { service: Service }) {
  const { dict, locale } = useDictionary();
  const href = localePath(`/services/${service.slug}`, locale);
  const initials = service.title
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <Link
      className="group scroll-reveal rounded-[28px] border border-[#08112b]/10 bg-white p-6 shadow-[0_18px_60px_rgba(8,17,43,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#2090f0]/35 hover:shadow-[0_26px_80px_rgba(32,144,240,0.14)]"
      href={href}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#08112b] text-sm font-black text-white shadow-[0_16px_40px_rgba(8,17,43,0.18)]">
        {initials}
      </span>
      <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#2eca8b]">{service.eyebrow}</p>
      <h3 className="mt-2 text-2xl font-black text-[#08112b]">{service.title}</h3>
      <p className="mt-3 min-h-24 text-sm leading-7 text-[#5a6d90]">{service.description}</p>
      <div className="mt-5 grid gap-2">
        {service.outcomes.map((outcome) => (
          <span className="rounded-full bg-[#f8f9fc] px-3 py-2 text-xs font-bold text-[#3c4858]" key={outcome}>
            {outcome}
          </span>
        ))}
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#2090f0]">
        {dict.common.exploreService} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
