"use client";

import clsx from "clsx";
import { useDictionary, useLocale } from "@/lib/i18n";

export function HeroHeadline() {
  const { dict } = useDictionary();
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <h1
      className={clsx(
        "hero-headline mt-4 sm:mt-5",
        isArabic && "locale-ar-text text-right leading-[1.2]"
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {dict.hero.headline.map((word) => (
        <span
          className={clsx(
            "hero-word inline-block",
            isArabic ? "ms-[0.24em] last:ms-0" : "mr-[0.24em] last:mr-0"
          )}
          key={word.text}
        >
          {word.accent ? (
            <span className="hero-headline__accent">{word.text}</span>
          ) : (
            <span className="text-white">{word.text}</span>
          )}
        </span>
      ))}
    </h1>
  );
}
