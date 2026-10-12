"use client";

import { useEffect } from "react";
import { useToast } from "@/components/providers/ToastProvider";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];
const WORD = "hire";

/** Konami code or typing "hire" (outside form fields) fires confetti. */
export function EasterEgg() {
  const toast = useToast();

  useEffect(() => {
    let keys: string[] = [];

    const celebrate = async () => {
      const confetti = (await import("canvas-confetti")).default;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const colors = ["#3b82f6", "#8b5cf6", "#c084fc", "#22d3ee", "#ffffff"];
      confetti({ particleCount: reduced ? 40 : 160, spread: 90, origin: { y: 0.65 }, colors, disableForReducedMotion: false });
      if (!reduced) {
        setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors }), 200);
        setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors }), 350);
      }
      toast("🎉 You found the easter egg — let's work together!");
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      keys = [...keys, e.key.toLowerCase()].slice(-KONAMI.length);
      const joined = keys.join(",");
      if (joined === KONAMI.join(",") || keys.slice(-WORD.length).join("") === WORD) {
        keys = [];
        celebrate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toast]);

  return null;
}
