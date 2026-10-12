import { cn } from "@/lib/utils";
import { SplitReveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  index,
  gradientWords,
  className,
  titleClassName,
  id,
}: {
  eyebrow: string;
  title: string;
  index: string;
  gradientWords?: string[];
  className?: string;
  titleClassName?: string;
  /** id for aria-labelledby on the parent section */
  id?: string;
}) {
  return (
    <div className={cn("mb-14 flex flex-col gap-5 md:mb-20", className)}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-subtle">{index}</span>
        <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent-1 to-accent-2" />
        {eyebrow}
      </p>
      <SplitReveal
        id={id}
        text={title}
        gradientWords={gradientWords}
        className={cn(
          "max-w-5xl font-display text-[clamp(2.4rem,7vw,6rem)] leading-[0.95] font-bold tracking-tight text-balance",
          titleClassName
        )}
      />
    </div>
  );
}
