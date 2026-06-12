import type { Locale } from "./types";

export function localePath(path: string, locale: Locale): string {
  const qIndex = path.indexOf("?");
  const rawPath = qIndex >= 0 ? path.slice(0, qIndex) : path;
  const query = qIndex >= 0 ? path.slice(qIndex) : "";
  let pathname = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  if (pathname !== "/" && !pathname.endsWith("/")) pathname = `${pathname}/`;

  if (locale === "en") {
    return `${pathname === "/" ? "/" : pathname}${query}`;
  }

  if (pathname === "/") {
    return `/ar/${query}`;
  }

  return `/ar${pathname}${query}`;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  return localePath(stripped, target);
}
