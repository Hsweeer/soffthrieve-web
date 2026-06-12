import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  dark?: boolean;
};

export function PrimaryButton({ href, children, className, showArrow = true, dark = false }: ButtonProps) {
  return (
    <Link
      className={clsx(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-bold tracking-wide transition hover:-translate-y-0.5",
        dark
          ? "bg-white text-[#082f49] shadow-[0_16px_40px_rgba(32,144,240,0.12)] hover:bg-sky-50"
          : "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-[0_16px_40px_rgba(32,144,240,0.28)] hover:brightness-110",
        className
      )}
      href={href}
    >
      {children}
      {showArrow && (
        <ArrowRight
          className={clsx(
            "h-4 w-4 rounded-full p-0.5 transition group-hover:translate-x-0.5",
            dark ? "bg-sky-100 text-sky-700 group-hover:bg-sky-200" : "bg-white/25"
          )}
        />
      )}
    </Link>
  );
}
