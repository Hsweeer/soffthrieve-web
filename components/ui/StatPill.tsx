import clsx from "clsx";

type StatPillProps = {
  value: string;
  label: string;
  dark?: boolean;
};

export function StatPill({ value, label, dark }: StatPillProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border px-4 py-3",
        dark ? "border-white/12 bg-white/6 backdrop-blur" : "border-[#08112b]/8 bg-white shadow-[0_8px_28px_rgba(8,17,43,0.05)]"
      )}
    >
      <div className={clsx("text-xl font-black", dark ? "text-white" : "text-[#08112b]")}>{value}</div>
      <div className={clsx("mt-0.5 text-xs font-semibold leading-5", dark ? "text-white/58" : "text-[#5a6d90]")}>{label}</div>
    </div>
  );
}
