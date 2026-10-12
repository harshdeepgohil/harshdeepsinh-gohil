"use client";

import { useRef } from "react";
import { experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";

export function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The SVG line draws itself as you scroll through the timeline.
        gsap.fromTo(
          q("[data-line]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
          }
        );
        q("[data-entry]").forEach((entry) => {
          gsap.from(entry.querySelector("[data-card]"), {
            x: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: entry, start: "top 80%", once: true },
          });
          gsap.from(entry.querySelectorAll("[data-meta]"), {
            y: 20,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: entry, start: "top 80%", once: true },
          });
        });
      });
      // Light up each dot as the line reaches it (also with reduced motion).
      q("[data-dot]").forEach((dot) => {
        gsap.to(dot, {
          scrollTrigger: { trigger: dot, start: "top 70%", toggleClass: { targets: dot, className: "is-active" } },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading id="experience-title" index="03" eyebrow="Experience" title="Where I've been building." gradientWords={["building."]} />

        <div ref={root} className="relative">
          {/* Track + gradient line that draws itself as you scroll */}
          <div aria-hidden className="absolute top-0 bottom-0 left-[11px] w-[2px] rounded-full bg-border md:left-[calc(30%-1px)]">
            <div
              data-line
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-accent-1 via-accent-2 to-fuchsia-400"
            />
          </div>

          <ol className="flex flex-col gap-16 md:gap-24">
            {experience.map((job) => (
              <li data-entry key={job.company} className="relative grid grid-cols-[minmax(0,1fr)] gap-6 pl-10 md:grid-cols-[30%_minmax(0,1fr)] md:gap-12 md:pl-0">
                <span
                  data-dot
                  aria-hidden
                  className="absolute top-2 left-[4px] h-4 w-4 rounded-full border-2 border-border bg-bg transition-[background-color,border-color,box-shadow] duration-500 md:left-[calc(30%-8px)] [&.is-active]:border-accent-2 [&.is-active]:bg-accent-2 [&.is-active]:shadow-[0_0_0_6px_rgb(139_92_246/0.2)]"
                />
                <div className="md:pr-16 md:text-right">
                  <p data-meta className="eyebrow">{job.period}</p>
                  <h3 data-meta className="mt-3 font-display text-2xl font-bold md:text-3xl">{job.company}</h3>
                  <p data-meta className="mt-1 text-muted">{job.role}</p>
                </div>

                <article data-card className="glass rounded-3xl p-6 sm:p-8 md:ml-4">
                  <ul className="flex flex-col gap-4">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent-1 to-accent-2" />
                        <span>
                          {h.title && <strong className="mb-1 block font-display text-base text-fg">{h.title}</strong>}
                          {h.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6" aria-label="Technologies">
                    {job.tags.map((t) => (
                      <li key={t} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-accent-text">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
