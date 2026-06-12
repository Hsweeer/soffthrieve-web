"use client";

import Link from "next/link";
import { motion } from "motion/react";

type InteractiveRobotProps = {
  size?: "sm" | "lg";
  showBubble?: boolean;
  href?: string;
  onClick?: () => void;
};

export function InteractiveRobot({ size = "lg", showBubble = true, href, onClick }: InteractiveRobotProps) {
  const scale = size === "lg" ? 1 : 0.72;

  const robot = (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      className="relative cursor-pointer"
      onClick={onClick}
      style={{ scale }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: scale * 1.08, rotate: -3 }}
      whileTap={{ scale: scale * 0.95 }}
    >
      <div className="absolute -inset-6 rounded-full bg-[#20dcc7]/30 blur-2xl transition group-hover:bg-[#2090f0]/40" />

      <div className="relative flex h-[120px] w-[110px] flex-col items-center">
        <motion.span
          animate={{ y: [0, -4, 0], scale: [1, 1.15, 1] }}
          className="mb-1 h-4 w-4 rounded-full bg-gradient-to-br from-[#20dcc7] to-[#2090f0] shadow-[0_0_24px_rgba(32,220,199,0.9)]"
          transition={{ duration: 2.2, repeat: Infinity }}
        />

        <div className="relative w-full rounded-[28px] rounded-b-[20px] bg-gradient-to-b from-[#1e3a5f] to-[#08112b] p-3 shadow-[0_24px_60px_rgba(8,17,43,0.5)] ring-2 ring-[#20dcc7]/50">
          <div className="mx-auto h-14 w-[88%] rounded-2xl bg-gradient-to-br from-[#0d1b33] to-[#050a14] p-2">
            <div className="flex h-full items-center justify-center gap-3">
              <motion.span
                animate={{ scaleY: [1, 0.12, 1] }}
                className="h-3.5 w-3.5 rounded-full bg-[#20dcc7] shadow-[0_0_14px_#20dcc7]"
                transition={{ duration: 2.8, repeat: Infinity }}
              />
              <motion.span
                animate={{ scaleY: [1, 0.12, 1] }}
                className="h-3.5 w-3.5 rounded-full bg-[#20dcc7] shadow-[0_0_14px_#20dcc7]"
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.15 }}
              />
            </div>
            <motion.div
              className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-gradient-to-r from-[#2090f0] to-[#20dcc7]"
              whileHover={{ width: 14 }}
            />
          </div>
          <div className="mt-2 flex justify-between px-1">
            <motion.span
              animate={{ rotate: [-8, 8, -8] }}
              className="h-9 w-3.5 rounded-full bg-gradient-to-b from-[#20dcc7] to-[#2090f0]"
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.span
              animate={{ rotate: [8, -8, 8] }}
              className="h-9 w-3.5 rounded-full bg-gradient-to-b from-[#20dcc7] to-[#2090f0]"
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="group relative">
      {showBubble && href && (
        <Link
          className="absolute -top-14 right-0 z-20 block min-w-[140px] rounded-2xl rounded-br-sm bg-gradient-to-br from-[#20dcc7] to-[#2090f0] px-4 py-3 shadow-[0_16px_40px_rgba(32,144,240,0.4)] transition hover:scale-105"
          href={href}
        >
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#05070d]/70">Get a free</p>
          <p className="text-lg font-black text-[#05070d]">Quote</p>
        </Link>
      )}
      {robot}
    </div>
  );
}
