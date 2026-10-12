import { marqueeWords, skillGroups } from "@/data/portfolio";
import { LazyTechSphere } from "@/components/three/LazyScene";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const allSkills = skillGroups.flatMap((g) => g.skills);

function SphereFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative grid aspect-square w-[min(80%,380px)] grid-cols-4 place-items-center gap-3 rounded-full p-10">
        <div aria-hidden className="absolute inset-0 rounded-full border border-border bg-[radial-gradient(circle,rgb(99_102_241/0.15),transparent_70%)]" />
        {allSkills.slice(0, 16).map((s, i) => (
          <span
            key={s.name}
            className="glass relative grid h-11 w-11 place-items-center rounded-full"
            style={{ animation: `float-y ${3 + (i % 4) * 0.4}s ease-in-out ${i * 0.15}s infinite` }}
          >
            <BrandIcon icon={s.icon} className="h-5 w-5" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="section-y relative overflow-hidden">
      <div className="container-x">
        <SectionHeading id="stack-title" index="02" eyebrow="Tech stack" title="Tools I use to bring ideas to life." gradientWords={["life."]} />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
            {skillGroups.map((g) => (
              <div
                key={g.title}
                className={`glass rounded-3xl p-6 ${g.skills.length >= 6 ? "sm:col-span-2" : ""}`}
              >
                <h3 className="eyebrow mb-4">{g.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-2 rounded-full border border-border bg-bg/40 px-3.5 py-2 text-sm transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-card-hover"
                    >
                      <BrandIcon icon={s.icon} className="h-4 w-4" />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <LazyTechSphere skills={allSkills} fallback={<SphereFallback />} />
            <p className="pointer-events-none absolute inset-x-0 -bottom-2 text-center text-xs tracking-[0.2em] text-subtle uppercase">
              <span className="hidden md:inline">Drag to spin · </span>
              {allSkills.length} technologies
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 flex flex-col gap-4 border-y border-border py-8 font-display text-[clamp(2rem,5vw,4rem)] font-bold">
        <Marquee items={marqueeWords} duration={40} />
        <Marquee
          items={marqueeWords.map((w) => (
            <span key={w} className="text-transparent [-webkit-text-stroke:1px_var(--muted)]">
              {w}
            </span>
          ))}
          duration={45}
          reverse
        />
      </div>
    </section>
  );
}
