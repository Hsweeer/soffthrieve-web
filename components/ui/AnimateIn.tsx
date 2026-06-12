"use client";

import { motion, type Variants } from "motion/react";
import { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
};

export function AnimateIn({ children, className, delay = 0, as = "div" }: AnimateInProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={stagger}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

export function AnimateItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
