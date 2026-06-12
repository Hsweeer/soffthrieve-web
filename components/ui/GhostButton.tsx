import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export function GhostButton({ href, children, className, dark = false }: ButtonProps) {
  return (
    <Link
      className={clsx(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border px-6 text-sm font-bold tracking-wide transition hover:-translate-y-0.5",
        dark
          ? "border-white/45 bg-white/10 text-white hover:border-white hover:bg-white/15"
          : "border-sky-200 bg-white text-[#082f49] hover:border-sky-400 hover:bg-sky-50 hover:shadow-[0_12px_32px_rgba(32,144,240,0.12)]",
        className
      )}
      href={href}
    >
      {children}
      <ArrowRight
        className={clsx(
          "h-4 w-4 transition group-hover:translate-x-0.5",
          dark ? "text-white/80 group-hover:text-white" : "text-sky-600"
        )}
      />
    </Link>
  );
}
