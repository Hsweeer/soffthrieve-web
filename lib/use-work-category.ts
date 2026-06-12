"use client";

import { useSearchParams } from "next/navigation";
import { parsePortfolioCategory, type PortfolioCategory } from "@/lib/portfolio";

export function useWorkCategory(defaultCategory: PortfolioCategory = "mobile"): PortfolioCategory {
  const searchParams = useSearchParams();
  return parsePortfolioCategory(searchParams.get("category")) ?? defaultCategory;
}
