"use client";

import { motion } from "motion/react";

type MascotRobotProps = {
  className?: string;
};

/** Friendly teal assistant — matches reference peeking robot style */
export function MascotRobot({ className = "" }: MascotRobotProps) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      className={className}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg aria-hidden className="h-[168px] w-[132px] drop-shadow-[0_18px_40px_rgba(32,144,240,0.35)]" viewBox="0 0 180 240">
        <defs>
          <linearGradient id="mascot-body" x1="20%" x2="85%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="55%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#2090f0" />
          </linearGradient>
          <linearGradient id="mascot-head" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8faf8" />
          </linearGradient>
          <linearGradient id="mascot-shine" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="92" cy="228" fill="#08112b" opacity="0.14" rx="48" ry="8" />

        {/* Body */}
        <path
          d="M52 118 C52 98 68 88 90 88 C112 88 128 98 128 118 L128 198 C128 214 114 224 90 224 C66 224 52 214 52 198 Z"
          fill="url(#mascot-body)"
        />
        <ellipse cx="118" cy="130" fill="url(#mascot-shine)" opacity="0.55" rx="14" ry="36" />

        {/* Left arm — points toward quote bubble */}
        <path
          d="M48 138 C28 132 18 118 14 108 C12 104 16 100 22 102 C34 108 42 120 54 128 Z"
          fill="#2dd4bf"
        />
        <path d="M14 108 C10 106 8 100 12 96 C16 92 22 94 24 100" fill="#5eead4" />

        {/* Head shell */}
        <rect fill="url(#mascot-head)" height="88" rx="28" stroke="#08112b" strokeWidth="2.5" width="96" x="42" y="24" />
        <ellipse cx="118" cy="52" fill="url(#mascot-shine)" opacity="0.7" rx="18" ry="28" />

        {/* Antenna */}
        <rect fill="#2dd4bf" height="14" rx="3" width="6" x="87" y="10" />
        <circle cx="90" cy="8" fill="#20dcc7" r="7" stroke="#08112b" strokeWidth="1.5" />

        {/* Visor */}
        <rect fill="#1a2744" height="34" rx="14" width="72" x="54" y="48" />
        <rect fill="#243352" height="30" opacity="0.6" rx="12" width="68" x="56" y="50" />

        {/* Eyes */}
        <ellipse cx="72" cy="64" fill="#ffffff" rx="9" ry="11" />
        <ellipse cx="108" cy="64" fill="#ffffff" rx="9" ry="11" />
        <circle cx="74" cy="62" fill="#ffffff" r="3" opacity="0.95" />
        <circle cx="110" cy="62" fill="#ffffff" r="3" opacity="0.95" />
        <circle cx="76" cy="66" fill="#d1fae5" r="1.5" />

        {/* Smile below visor */}
        <path
          d="M78 92 Q90 100 102 92"
          fill="none"
          stroke="#94a3b8"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M80 93 Q90 98 100 93"
          fill="#f8fafc"
          stroke="none"
        />

        {/* Right arm hint */}
        <path
          d="M132 142 C148 138 156 128 158 118"
          fill="none"
          stroke="#2dd4bf"
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
    </motion.div>
  );
}
