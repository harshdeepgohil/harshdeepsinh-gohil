"use client";

import { useRef } from "react";
import { about } from "@/data/portfolio";
import type { Stat } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";

function format(stat: Stat, v: number) {
  return `${stat.prefix ?? ""}${v.toFixed(stat.decimals)}${stat.suffix ?? ""}`;
}

function StatCard({ stat }: { stat: Stat }) {
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = num.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const o = { v: stat.from };
    el.textContent = format(stat, stat.from);
    gsap.to(o, {
      v: stat.to,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = format(stat, stat.decimals ? o.v : Math.round(o.v));
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  return (
    <div className="glass group relative overflow-hidden rounded-3xl p-6 transition-colors hover:bg-card-hover sm:p-7">
      <div
        aria-hidden
        className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent-2/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span ref={num} className="text-gradient block font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-none font-bold tabular-nums">
        {format(stat, stat.to)}
      </span>
      <span className="mt-3 block text-sm text-muted">{stat.label}</span>
    </div>
  );
}

/** Paragraph whose words brighten as you scroll through it. */
function ScrubText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current!.querySelectorAll("span"),
          { opacity: 0.22 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 55%", scrub: true },
          }
        );
      });
    },
    { scope: ref }
  );
  return (
    <p ref={ref} className="text-[clamp(1.15rem,2vw,1.6rem)] leading-relaxed font-medium">
      {text.split(" ").map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading id="about-title" index="01" eyebrow={about.eyebrow} title={about.heading} gradientWords={["precise"]} />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            {about.paragraphs.map((p) => (
              <ScrubText key={p} text={p} />
            ))}

            <Reveal className="mt-4 grid gap-4 sm:grid-cols-2">
              {about.education.map((e) => (
                <div key={e.degree} className="glass rounded-3xl p-6">
                  <p className="eyebrow mb-3">{e.period}</p>
                  <h3 className="font-display text-lg leading-snug font-semibold">{e.degree}</h3>
                  <p className="mt-2 text-sm text-muted">{e.school}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            <Reveal className="grid grid-cols-2 gap-4">
              {about.stats.map((s) => (
                <StatCard key={s.label} stat={s} />
              ))}
            </Reveal>

            <Reveal className="grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-3xl p-6">
                <h3 className="eyebrow mb-4">Languages I speak</h3>
                <ul className="flex flex-wrap gap-2">
                  {about.languages.map((l) => (
                    <li key={l} className="rounded-full border border-border px-3.5 py-1.5 text-sm">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-3xl p-6">
                <h3 className="eyebrow mb-4">Off the keyboard</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {about.hobbies.map((h, i) => (
                    <li
                      key={h.label}
                      className="group flex items-center gap-2 rounded-2xl border border-border px-3 py-2 text-sm transition-colors hover:bg-card-hover"
                    >
                      <span
                        aria-hidden
                        className="inline-block text-lg transition-transform duration-500 ease-out-expo group-hover:scale-125 group-hover:-rotate-12"
                        style={{ animation: `float-y 3s ease-in-out ${i * 0.3}s infinite` }}
                      >
                        {h.emoji}
                      </span>
                      {h.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
