"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PIN_QUERY = "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "live")
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
      </span>
    );
  if (status === "in-progress")
    return (
      <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute h-full w-full animate-[pulse-ring_1.4s_ease-out_infinite] rounded-full bg-amber-500" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-amber-500" />
        </span>
        In Progress
      </span>
    );
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
      Case Study
    </span>
  );
}

function ChatVisual() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 bg-[radial-gradient(circle_at_80%_0%,rgb(139_92_246/0.25),transparent_60%)] p-5 text-[0.7rem] sm:p-7 sm:text-xs">
      <div className="max-w-[75%] self-end rounded-2xl rounded-br-sm bg-accent-gradient px-4 py-2.5 text-white">
        What changed in the leave policy between v3 and v4?
      </div>
      <div className="glass max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 text-fg">
        <p className="mb-2 font-semibold">3 changes found in Section 4.2</p>
        <p className="text-muted">
          <span className="rounded bg-rose-500/20 px-1 line-through">12 days</span>{" "}
          <span className="rounded bg-emerald-500/20 px-1">15 days</span> casual leave per year…
        </p>
      </div>
      <div className="glass flex items-center gap-3 rounded-full px-4 py-2.5 text-muted">
        <span className="flex h-4 items-end gap-0.5" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-0.5 rounded bg-accent-2"
              style={{ height: `${40 + ((i * 37) % 60)}%`, animation: `float-y ${0.8 + i * 0.1}s ease-in-out infinite` }}
            />
          ))}
        </span>
        Listening… ask about any rule
      </div>
    </div>
  );
}

function MigrationVisual() {
  const versions = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return (
    <div className="flex h-full flex-col justify-center gap-6 bg-[radial-gradient(circle_at_20%_100%,rgb(59_130_246/0.25),transparent_60%)] p-5 sm:p-8">
      <div className="flex items-center justify-between font-display font-bold">
        <div>
          <p className="eyebrow mb-1">Before</p>
          <p className="text-3xl text-muted line-through decoration-rose-500/70 sm:text-5xl">v11</p>
        </div>
        <Arrow className="h-8 w-8 rotate-45 text-accent-2" />
        <div className="text-right">
          <p className="eyebrow mb-1">After</p>
          <p className="text-gradient text-3xl sm:text-5xl">v19</p>
        </div>
      </div>
      <ol className="flex items-center gap-1" aria-label="Upgrade path">
        {versions.map((v, i) => (
          <li key={v} className="flex flex-1 flex-col items-center gap-2">
            <span
              className="h-1.5 w-full rounded-full"
              style={{
                background: `linear-gradient(90deg, #3b82f6, #8b5cf6)`,
                opacity: 0.35 + (i / (versions.length - 1)) * 0.65,
              }}
            />
            <span className="font-mono text-[0.6rem] text-muted sm:text-xs">{v}</span>
          </li>
        ))}
      </ol>
      <div className="glass rounded-xl p-3 font-mono text-[0.6rem] leading-relaxed text-muted sm:text-xs">
        <p>
          <span className="text-accent-text">$</span> ng update @angular/core@19 @angular/cli@19
        </p>
        <p className="text-emerald-600 dark:text-emerald-400">✔ Packages successfully migrated</p>
        <p>
          <span className="text-accent-text">$</span> primeflex → tailwindcss
        </p>
      </div>
    </div>
  );
}

function BrowserFrame({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-elev shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-full bg-card px-3 py-1 text-center font-mono text-[0.7rem] text-subtle">
          {project.displayUrl}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
            priority={priority}
          />
        ) : project.visual === "chat" ? (
          <ChatVisual />
        ) : (
          <MigrationVisual />
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = fine && !reduced;
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const actionLabel = project.url ? "Visit" : project.status === "in-progress" ? "Soon" : "Read";

  return (
    <article
      data-project
      className="group relative w-full shrink-0 pin:w-[min(78vw,1100px,calc((100vh-180px)*1.75))]"
      style={{ perspective: 1400 }}
      aria-labelledby={`p-${project.slug}`}
    >
      <motion.div
        data-cursor={actionLabel}
        onPointerMove={(e) => {
          if (!tilt) return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          mx.set(x);
          my.set(y);
          setShine({ x: x * 100, y: y * 100 });
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={tilt ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined}
        className="glass relative grid gap-8 overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-10 lg:p-10"
      >
        {tilt && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(600px circle at ${shine.x}% ${shine.y}%, rgb(139 92 246 / 0.14), transparent 45%)` }}
          />
        )}
        <div style={tilt ? { transform: "translateZ(40px)" } : undefined}>
          <BrowserFrame project={project} priority={index === 0} />
        </div>

        <div className="relative flex flex-col gap-5" style={tilt ? { transform: "translateZ(60px)" } : undefined}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-subtle">0{index + 1}</span>
            <span className="eyebrow">{project.kind}</span>
            <StatusBadge status={project.status} />
          </div>
          <h3 id={`p-${project.slug}`} className="font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.05] font-bold">
            {project.title}
          </h3>
          <p className="leading-relaxed text-muted">{project.summary}</p>
          <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm text-muted sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span aria-hidden className="text-accent-text">✦</span>
                {h}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                {t}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            {project.url ? (
              <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer">
                Live Site <Arrow />
                <span className="sr-only">(opens {project.title} in a new tab)</span>
              </ButtonLink>
            ) : project.status === "in-progress" ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-6 py-3.5 text-sm font-semibold text-muted">
                Launching soon
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-muted">
                Enterprise · Case Study (NDA)
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pin the section and scroll the cards horizontally.
      mm.add(PIN_QUERY, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.9, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 95%",
                end: "left 35%",
                scrub: true,
              },
            }
          );
        });
        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        return () => ScrollTrigger.refresh();
      });
      // Mobile/tablet: cards rise in one by one.
      mm.add("(prefers-reduced-motion: no-preference) and (not ((min-width: 1024px) and (min-height: 800px)))", () => {
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: section }
  );

  return (
    <section id="projects" ref={section} aria-labelledby="projects-title" className="relative overflow-hidden pin:min-h-screen">
      <div className="section-y pin:flex pin:min-h-screen pin:flex-col pin:justify-center pin:py-0">
        <div className="container-x pin:pt-20">
          <SectionHeading
            id="projects-title"
            index="04"
            eyebrow="Selected work"
            title="Featured projects."
            gradientWords={["projects."]}
            className="pin:mb-8! pin:gap-3!"
            titleClassName="pin:text-[clamp(2.4rem,4.6vw,4.5rem)]"
          />
        </div>

        <div
          ref={track}
          className={cn(
            "container-x flex flex-col gap-10",
            "pin:w-max pin:max-w-none pin:flex-row pin:items-center pin:gap-[5vw] pin:pr-[11vw] pin:pl-[max(1rem,calc((100vw-1440px)/2+3rem))]"
          )}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="container-x mt-10 hidden pin:block" aria-hidden>
          <div className="h-px w-full bg-border">
            <div data-progress className="h-px origin-left scale-x-0 bg-gradient-to-r from-accent-1 to-accent-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
