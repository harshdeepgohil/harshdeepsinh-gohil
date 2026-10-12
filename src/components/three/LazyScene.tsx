"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCan3D } from "@/hooks/useCan3D";
import { useInView } from "@/hooks/useInView";
import type { Skill } from "@/data/portfolio";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const TechSphere = dynamic(() => import("./TechSphere"), { ssr: false });

/**
 * Mounts a WebGL scene only when the device can handle it and the element is
 * near the viewport. Pauses rendering whenever it scrolls out of view.
 * Renders `fallback` everywhere else (SSR, mobile, low-end, reduced motion).
 */
function useLazyMount(ready = true) {
  const ref = useRef<HTMLDivElement>(null);
  const can = useCan3D();
  const near = useInView(ref, "200px");
  const [mounted, setMounted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!can || !near || !ready || mounted) return;
    // Defer to idle time so the main thread stays free during first load.
    const ric =
      (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    ric(() => setMounted(true), { timeout: 1200 });
  }, [can, near, ready, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const t = window.setTimeout(() => setFadeIn(true), 150);
    return () => window.clearTimeout(t);
  }, [mounted]);

  return { ref, mounted, active: near, fadeIn, can };
}

function Layer({
  fallback,
  mounted,
  fadeIn,
  children,
}: {
  fallback: ReactNode;
  mounted: boolean;
  fadeIn: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: mounted && fadeIn ? 0 : 1 }}
      >
        {fallback}
      </div>
      {mounted && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: fadeIn ? 1 : 0 }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export function LazyHeroScene({ fallback, ready }: { fallback: ReactNode; ready: boolean }) {
  const { ref, mounted, active, fadeIn } = useLazyMount(ready);
  return (
    <div ref={ref} className="absolute inset-0">
      <Layer fallback={fallback} mounted={mounted} fadeIn={fadeIn}>
        <HeroScene active={active} />
      </Layer>
    </div>
  );
}

export function LazyTechSphere({ skills, fallback }: { skills: Skill[]; fallback: ReactNode }) {
  const { ref, mounted, active, fadeIn } = useLazyMount(true);
  return (
    <div ref={ref} className="absolute inset-0" data-cursor={mounted ? "Drag" : undefined}>
      <Layer fallback={fallback} mounted={mounted} fadeIn={fadeIn}>
        <TechSphere skills={skills} active={active} />
      </Layer>
    </div>
  );
}
