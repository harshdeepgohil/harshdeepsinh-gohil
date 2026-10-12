"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/portfolio";
import { useIntro } from "@/components/providers/IntroProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * ≤1.5s intro: initials rise in, a 0→100 counter runs, then a curtain lifts.
 * Rendered on the server so it covers the page from the very first paint.
 */
export function Loader() {
  const { finish } = useIntro();
  const { lock, unlock } = useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    window.scrollTo(0, 0);
    lock();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      unlock();
    };
    const done = () => {
      release();
      finish();
      setGone(true);
      ScrollTrigger.refresh();
    };
    // Safety net: never leave the page locked, even if the timeline stalls.
    const failsafe = window.setTimeout(done, 4000);

    if (reduced) {
      const t = gsap.to(el, { autoAlpha: 0, duration: 0.3, delay: 0.1, onStart: finish, onComplete: done });
      return () => {
        t.kill();
        window.clearTimeout(failsafe);
        release();
      };
    }

    const count = { v: 0 };
    const tl = gsap.timeline({ onComplete: done });
    tl.fromTo(
      el.querySelectorAll("[data-letter]"),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.55, ease: "expo.out", stagger: 0.08 },
      0
    )
      .to(
        count,
        {
          v: 100,
          duration: 0.95,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(count.v)).padStart(3, "0");
          },
        },
        0
      )
      .fromTo(el.querySelector("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 0.95, ease: "power2.inOut" }, 0)
      .to(el.querySelectorAll("[data-letter], [data-meta]"), { yPercent: -110, duration: 0.35, ease: "power3.in" }, 0.98)
      .add(finish, 1.05)
      .to(el, { yPercent: -100, duration: 0.45, ease: "power4.inOut" }, 1.05);

    return () => {
      tl.kill();
      window.clearTimeout(failsafe);
      release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
    >
      <div className="flex overflow-hidden font-display text-[clamp(5rem,22vw,14rem)] leading-none font-bold tracking-tighter">
        {site.initials.split("").map((l, i) => (
          <span key={i} data-letter className="inline-block">
            <span className={i === 1 ? "text-gradient" : ""}>{l}</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-x-6 bottom-8 flex items-end justify-between overflow-hidden sm:inset-x-10">
        <span data-meta className="eyebrow inline-block">
          Portfolio ’{new Date().getFullYear().toString().slice(2)}
        </span>
        <span data-meta className="inline-block font-display text-5xl font-bold tabular-nums sm:text-7xl">
          <span ref={counter}>000</span>
        </span>
      </div>
      <div
        data-bar
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-accent-1 to-accent-2"
      />
    </div>
  );
}
