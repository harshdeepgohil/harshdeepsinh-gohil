"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollCtx = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;
  lock: () => void;
  unlock: () => void;
};

const Ctx = createContext<ScrollCtx>({
  lenis: null,
  scrollTo: () => {},
  lock: () => {},
  unlock: () => {},
});

export const useSmoothScroll = () => useContext(Ctx);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lockCount = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in lock-step with Lenis, driven by GSAP's ticker.
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (lockCount.current > 0) instance.stop();
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback<ScrollCtx["scrollTo"]>(
    (target, opts) => {
      const el =
        typeof target === "string" ? (document.querySelector(target) as HTMLElement | null) : target;
      if (el === null) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: opts?.offset ?? 0, immediate: opts?.immediate });
        return;
      }
      if (typeof el === "number") window.scrollTo({ top: el });
      else el.scrollIntoView({ block: "start" });
    },
    [lenis]
  );

  const lock = useCallback(() => {
    lockCount.current += 1;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  }, [lenis]);

  const unlock = useCallback(() => {
    lockCount.current = Math.max(0, lockCount.current - 1);
    if (lockCount.current > 0) return;
    lenis?.start();
    document.documentElement.style.overflow = "";
  }, [lenis]);

  return <Ctx.Provider value={{ lenis, scrollTo, lock, unlock }}>{children}</Ctx.Provider>;
}
