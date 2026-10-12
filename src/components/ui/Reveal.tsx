"use client";

import { Fragment, useRef, type ComponentType, type ReactNode, type Ref } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Tags = "div" | "ul" | "ol" | "section" | "h1" | "h2" | "h3" | "p";
type TagProps = { ref?: Ref<HTMLElement>; className?: string; id?: string; children?: ReactNode };

/**
 * Fades + lifts its direct children in as they scroll into view.
 * Content is fully visible without JS; animation only applies after hydration.
 */
export function Reveal({
  children,
  className,
  as = "div",
  stagger = 0.08,
  y = 40,
  delay = 0,
  selector = ":scope > *",
}: {
  children: ReactNode;
  className?: string;
  as?: Tags;
  stagger?: number;
  y?: number;
  delay?: number;
  selector?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as unknown as ComponentType<TagProps>;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = ref.current?.querySelectorAll(selector);
        if (!targets?.length) return;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 1,
          delay,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Splits text into words and reveals them with a masked slide-up. */
export function SplitReveal({
  text,
  as = "h2",
  id,
  className,
  wordClassName,
  trigger = "scroll",
  play = true,
  delay = 0,
  gradientWords = [],
}: {
  text: string;
  as?: Tags;
  id?: string;
  className?: string;
  wordClassName?: string;
  /** "scroll" animates on enter; "manual" animates when `play` becomes true */
  trigger?: "scroll" | "manual";
  play?: boolean;
  delay?: number;
  /** Words (exact match) rendered with the accent gradient */
  gradientWords?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as unknown as ComponentType<TagProps>;
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = ref.current?.querySelectorAll("[data-word]");
        if (!targets?.length) return;
        if (trigger === "manual" && !play) {
          gsap.set(targets, { yPercent: 110 });
          return;
        }
        gsap.fromTo(
          targets,
          { yPercent: 110, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.05,
            delay,
            scrollTrigger:
              trigger === "scroll" ? { trigger: ref.current, start: "top 88%", once: true } : undefined,
          }
        );
      });
    },
    { scope: ref, dependencies: [play] }
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span
              data-word
              className={cn(
                "inline-block will-change-transform",
                gradientWords.includes(w) && "text-gradient",
                wordClassName
              )}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
