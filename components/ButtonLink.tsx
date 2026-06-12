import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      className={clsx(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font800 font-bold transition duration-300",
        variant === "primary" &&
          "bg-[#2090f0] text-white shadow-[0_18px_48px_rgba(32,144,240,0.28)] hover:-translate-y-0.5 hover:bg-[#1878c9]",
        variant === "secondary" &&
          "border border-[#2090f0]/25 bg-white text-[#08112b] shadow-[0_14px_40px_rgba(8,17,43,0.08)] hover:-translate-y-0.5 hover:border-[#2090f0]/50",
        variant === "ghost" && "text-[#08112b] hover:text-[#2090f0]",
        className
      )}
      href={href}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </Link>
  );
}
