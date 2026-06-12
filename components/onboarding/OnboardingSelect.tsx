"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

type OnboardingSelectProps = {
  label: string;
  hint?: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

export function OnboardingSelect({
  label,
  hint,
  value,
  placeholder,
  options,
  onChange
}: OnboardingSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="grid gap-2" ref={rootRef}>
      <span className="text-sm font-medium text-[#0a1b33]">{label}</span>
      {hint ? <span className="-mt-1 text-xs text-[#5a6d90]">{hint}</span> : null}

      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={clsx(
          "onboarding-select-trigger flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm transition",
          open
            ? "border-[#2090f0] ring-2 ring-[#2090f0]/15"
            : "border-slate-200 hover:border-slate-300",
          value ? "text-[#0a1b33]" : "text-slate-400"
        )}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={clsx("h-4 w-4 shrink-0 text-slate-400 transition", open && "rotate-180 text-[#2090f0]")}
        />
      </button>

      {open && (
        <ul
          className="onboarding-select-menu max-h-52 overflow-auto rounded-xl border border-slate-200/90 bg-white py-1 shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
          id={listId}
          role="listbox"
        >
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <li key={opt} role="option" aria-selected={selected}>
                <button
                  className={clsx(
                    "flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition",
                    selected
                      ? "bg-[#2090f0]/10 font-medium text-[#1878c9]"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  type="button"
                >
                  <span>{opt}</span>
                  {selected ? <Check className="h-4 w-4 shrink-0 text-[#2090f0]" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
