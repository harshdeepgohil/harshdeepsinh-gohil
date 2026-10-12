"use client";

import { useEffect, useRef, useState } from "react";
import { hero, site } from "@/data/portfolio";
import { useIntro } from "@/components/providers/IntroProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { LazyHeroScene } from "@/components/three/LazyScene";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { gsap, useGSAP } from "@/lib/gsap";

/** Types out each role, pauses, deletes, moves to the next. */
function RoleTyper({ roles, play }: { roles: string[]; play: boolean }) {
  const [text, setText] = useState(roles[0]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      let i = 0;
      const id = window.setInterval(() => setText(roles[(i = (i + 1) % roles.length)]), 2600);
      return () => window.clearInterval(id);
    }
    let role = 0;
    let char = roles[0].length;
    let deleting = true;
    let timer = window.setTimeout(function tick() {
      const current = roles[role];
      if (deleting) {
        char--;
        if (char === 0) {
          deleting = false;
          role = (role + 1) % roles.length;
        }
      } else {
        char++;
      }
      const next = roles[role];
      setText(next.slice(0, char));
      let delay = deleting ? 35 : 70;
      if (!deleting && char === next.length) {
        deleting = true;
        delay = 1900;
      }
      void current;
      timer = window.setTimeout(tick, delay);
    }, 1900);
    return () => window.clearTimeout(timer);
  }, [play, reduced, roles]);

  return (
    <span aria-hidden className="inline-flex items-center">
      <span className="text-gradient">{text || "​"}</span>
      <span className="ml-1 inline-block h-[1.05em] w-[3px] translate-y-[1px] animate-[blink_1s_steps(1)_infinite] rounded bg-accent-2" />
    </span>
  );
}

function FallbackBlob() {
  return (
    <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[8vw]">
      <div className="fallback-blob h-[min(70vw,520px)] w-[min(70vw,520px)] opacity-60 blur-[2px] md:opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg)_75%)]" />
    </div>
  );
}

export function Hero() {
  const { done } = useIntro();
  const { scrollTo } = useSmoothScroll();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!done) {
          gsap.set(q("[data-hero-line]"), { yPercent: 140 });
          gsap.set(q("[data-hero-fade]"), { autoAlpha: 0, y: 24 });
          return;
        }
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(q("[data-hero-line]"), { yPercent: 0, duration: 1.3, stagger: 0.09 }).to(
          q("[data-hero-fade]"),
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 },
          0.35
        );
        // Subtle parallax as the hero scrolls away.
        gsap.to(q("[data-hero-content]"), {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root, dependencies: [done] }
  );

  const [first, ...rest] = site.name.split(" ");

  return (
    <section
      id="home"
      ref={root}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0">
        <LazyHeroScene ready={done} fallback={<FallbackBlob />} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div data-hero-content className="container-x relative z-10 pt-28 pb-24">
        <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-[pulse-ring_1.6s_ease-out_infinite] rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new projects
        </p>

        <h1 className="font-display leading-[0.92] font-bold tracking-tight">
          <span className="block overflow-hidden pb-[0.24em] -mb-[0.24em] text-[clamp(1.4rem,3.6vw,2.6rem)]">
            <span data-hero-line className="block font-semibold text-muted">
              {hero.greeting}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.24em] -mb-[0.24em] text-[clamp(2.1rem,8.6vw,9.5rem)]">
            <span data-hero-line className="block">
              {first}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.24em] -mb-[0.14em] text-[clamp(2.1rem,8.6vw,9.5rem)]">
            <span data-hero-line className="text-gradient block">
              {rest.join(" ")}
            </span>
          </span>
        </h1>

        <p data-hero-fade className="mt-6 font-display text-[clamp(1.1rem,2.4vw,1.75rem)] font-semibold">
          <span className="sr-only">{hero.roles.join(" · ")}</span>
          <RoleTyper roles={hero.roles} play={done} />
        </p>

        <p data-hero-fade className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {hero.tagline}
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink
            href={hero.primaryCta.href}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(hero.primaryCta.href);
            }}
          >
            {hero.primaryCta.label}
            <Arrow className="rotate-90 group-hover:translate-x-0 group-hover:translate-y-0.5" />
          </ButtonLink>
          <ButtonLink href={site.resumeUrl} download="Harshdeepsinh-Gohil-Resume.pdf" variant="ghost">
            {hero.secondaryCta.label}
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
            </svg>
          </ButtonLink>
          <SocialLinks size="sm" include={["linkedin", "github"]} className="sm:ml-2" />
        </div>
      </div>

      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#about");
        }}
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-xs tracking-[0.25em] text-muted uppercase"
        aria-label="Scroll to About section"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-border pt-2">
          <span className="h-2 w-1 animate-[scroll-dot_1.6s_ease-in-out_infinite] rounded-full bg-fg" />
        </span>
        <span className="hidden sm:block">Scroll</span>
      </a>
    </section>
  );
}
