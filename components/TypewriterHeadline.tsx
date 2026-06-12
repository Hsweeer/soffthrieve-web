"use client";

import { useEffect, useState } from "react";

const lineOne = "Build products";
const lineTwo = "users trust.";

const CHAR_MS = 48;
const LINE_PAUSE_MS = 220;
const START_DELAY_MS = 450;

export function TypewriterHeadline() {
  const [phase, setPhase] = useState<"idle" | "line1" | "line2" | "done">("idle");
  const [charIndex, setCharIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduced = mq.matches;
      setReduceMotion(reduced);
      if (reduced) {
        setPhase("done");
        setCharIndex(lineTwo.length);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const start = window.setTimeout(() => setPhase("line1"), START_DELAY_MS);
    return () => window.clearTimeout(start);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || phase === "idle" || phase === "done") return;

    const target = phase === "line1" ? lineOne : lineTwo;

    if (charIndex < target.length) {
      const t = window.setTimeout(() => setCharIndex((c) => c + 1), CHAR_MS);
      return () => window.clearTimeout(t);
    }

    if (phase === "line1") {
      const t = window.setTimeout(() => {
        setPhase("line2");
        setCharIndex(0);
      }, LINE_PAUSE_MS);
      return () => window.clearTimeout(t);
    }

    setPhase("done");
  }, [phase, charIndex, reduceMotion]);

  const lineOneText = phase === "idle" ? "" : lineOne.slice(0, phase === "line1" ? charIndex : lineOne.length);
  const lineTwoText =
    phase === "line1" || phase === "idle" ? "" : lineTwo.slice(0, phase === "line2" ? charIndex : lineTwo.length);
  const showCursor = phase === "line1" || phase === "line2";

  return (
    <h1 className="hero-headline mt-8">
      <span className="hero-headline__line block text-white">{lineOneText}</span>
      <span className="hero-headline__line block bg-gradient-to-r from-[#20dcc7] via-[#5eead4] to-[#2090f0] bg-clip-text text-transparent">
        {lineTwoText}
        {showCursor && (
          <span aria-hidden className="typing-cursor ml-1 inline-block text-[#20dcc7]">
            |
          </span>
        )}
      </span>
    </h1>
  );
}
