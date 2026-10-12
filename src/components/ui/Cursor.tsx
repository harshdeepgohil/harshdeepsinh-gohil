"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Custom cursor (dot + lagging ring that grows / shows a label) and a soft
 * gradient glow that trails the pointer. Desktop / fine pointers only.
 * Add `data-cursor="Label"` to any element to show a label on hover.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    const glowPos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
    };
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, label, [role='button']"
      );
      setHovering(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    const onLeave = () => setVisible(false);

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.2;
      ringPos.y += (target.y - ringPos.y) * 0.2;
      glowPos.x += (target.x - glowPos.x) * 0.08;
      glowPos.y += (target.y - glowPos.y) * 0.08;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      if (glow.current) glow.current.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 56 : 34;

  return (
    <>
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-0 h-[600px] w-[600px]"
        style={{ willChange: "transform" }}
      >
        <div
          className="h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 65%)" }}
        />
      </div>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}
      >
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-semibold tracking-widest text-white uppercase transition-[width,height,background-color,border-color] duration-300 ease-out-expo"
          style={{
            width: size,
            height: size,
            borderColor: label ? "transparent" : "rgb(139 92 246 / 0.6)",
            background: label ? "linear-gradient(110deg,#2563eb,#7c3aed)" : hovering ? "rgb(139 92 246 / 0.12)" : "transparent",
          }}
        >
          {label}
        </div>
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ opacity: visible && !label ? 1 : 0 }}
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg" />
      </div>
    </>
  );
}
