"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type QuoteBubbleProps = {
  visible: boolean;
  href?: string;
  onClose: () => void;
  onClick?: () => void;
};

export function QuoteBubble({ visible, href = "/contact", onClose, onClick }: QuoteBubbleProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="absolute bottom-[7.5rem] right-[7.5rem] z-30 sm:right-[8.25rem]"
          exit={{ opacity: 0, scale: 0.88, x: 12 }}
          initial={{ opacity: 0, scale: 0.88, x: 12 }}
          key="quote-bubble"
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        >
          <button
            aria-label="Dismiss quote"
            className="absolute -right-2 -top-2 z-40 flex h-7 w-7 items-center justify-center rounded-full bg-[#08112b] text-white shadow-[0_6px_20px_rgba(8,17,43,0.35)] transition hover:bg-[#1a2744]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            type="button"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>

          <Link
            className="quote-bubble-card group block min-w-[148px] rounded-2xl rounded-br-md bg-[#2dd4bf] px-4 py-3 shadow-[0_14px_36px_rgba(45,212,191,0.45)] transition hover:bg-[#2ecdb8] hover:shadow-[0_18px_44px_rgba(45,212,191,0.55)]"
            href={href}
            onClick={onClick}
          >
            <p className="text-[11px] font-semibold leading-tight text-[#08112b]/80">Get a Free</p>
            <p className="text-xl font-black leading-none tracking-tight text-[#08112b]">Quote</p>
          </Link>

          <span aria-hidden className="quote-bubble-tail absolute -bottom-2 right-6 block h-4 w-4 rotate-45 bg-[#2dd4bf] shadow-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
