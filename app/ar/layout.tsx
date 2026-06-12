import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionary";

const dict = getDictionary("ar");

export const metadata: Metadata = {
  title: dict.meta.defaultTitle,
  description: dict.meta.defaultDescription
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
