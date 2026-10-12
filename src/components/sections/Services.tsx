import { services } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Visual = (typeof services)[number]["visual"];

/** Small looping illustrations that speed up / come alive on hover. */
function ServiceVisual({ kind }: { kind: Visual }) {
  if (kind === "code")
    return (
      <div aria-hidden className="glass flex flex-col gap-2 rounded-2xl p-4 font-mono text-xs">
        {[
          ["<", "app-hero", " />"],
          ["@Input", "() title", ";"],
          ["signal", "(0)", ""],
        ].map(([a, b, c], i) => (
          <p
            key={i}
            className="w-max overflow-hidden whitespace-nowrap transition-[max-width] duration-700 ease-out-expo [max-width:4ch] group-hover:[max-width:20ch]"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span className="text-accent-text">{a}</span>
            <span className="text-fg">{b}</span>
            <span className="text-subtle">{c}</span>
          </p>
        ))}
      </div>
    );
  if (kind === "stack")
    return (
      <div aria-hidden className="relative h-28 [perspective:600px]">
        {[
          "top-0 group-hover:-translate-y-3",
          "top-[18px] group-hover:translate-y-0",
          "top-[36px] group-hover:translate-y-3",
        ].map((pos, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-x-6 h-14 rounded-xl border border-border bg-gradient-to-br from-accent-1/30 to-accent-2/30 backdrop-blur transition-transform duration-700 ease-out-expo",
              pos
            )}
            style={{ transitionDelay: `${i * 60}ms`, rotate: "x 55deg" }}
          />
        ))}
        <span className="absolute right-8 bottom-1 font-mono text-[0.65rem] text-muted">API · DB · UI</span>
      </div>
    );
  if (kind === "ai")
    return (
      <div aria-hidden className="relative grid h-28 place-items-center">
        <span className="absolute h-24 w-24 rounded-full border border-dashed border-accent-2/50 animate-[spin_14s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]" />
        <span className="absolute h-16 w-16 rounded-full border border-accent-1/40 animate-[spin_10s_linear_infinite_reverse]" />
        <span className="text-gradient text-4xl transition-transform duration-700 ease-out-expo group-hover:scale-125 group-hover:rotate-180">✦</span>
      </div>
    );
  return (
    <div aria-hidden className="glass overflow-hidden rounded-2xl">
      <div className="flex gap-1 border-b border-border px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        {[70, 45, 85].map((w, i) => (
          <span
            key={i}
            className="h-2 origin-left rounded-full bg-gradient-to-r from-accent-1 to-accent-2 transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
            style={{ width: `${w}%`, transform: "scaleX(0.35)", transitionDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

const layout = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading id="services-title" index="05" eyebrow="What I do" title="Services built for impact." gradientWords={["impact."]} />

        <Reveal className="grid gap-4 md:grid-cols-6" stagger={0.1}>
          {services.map((s, i) => (
            <article
              key={s.title}
              className={cn(
                "glass group relative flex min-h-[300px] flex-col justify-between gap-8 overflow-hidden rounded-[2rem] p-7 transition-[background-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-card-hover sm:p-9",
                layout[i]
              )}
            >
              <div
                aria-hidden
                className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-gradient-to-br from-accent-1/30 to-accent-2/30 opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="relative flex items-start justify-between gap-6">
                <span className="font-mono text-sm text-subtle">0{i + 1}</span>
                <div className="w-full max-w-[220px]">
                  <ServiceVisual kind={s.visual} />
                </div>
              </div>
              <div className="relative">
                <p className="eyebrow mb-3">{s.subtitle}</p>
                <h3 className="font-display text-2xl leading-tight font-bold sm:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-muted">{s.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
