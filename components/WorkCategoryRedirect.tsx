"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parsePortfolioCategory } from "@/lib/portfolio";

/** Default /work to mobile portfolio tab so header selection always matches content. */
export function WorkCategoryRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const normalized = pathname.replace(/\/$/, "") || "/";
    if (normalized !== "/work" && normalized !== "/ar/work") return;
    if (parsePortfolioCategory(searchParams.get("category"))) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", "mobile");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [pathname, router, searchParams]);

  return null;
}
