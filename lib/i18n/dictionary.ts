import type { Locale, Dictionary } from "./types";
import { en } from "./en";
import { ar } from "./ar";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
