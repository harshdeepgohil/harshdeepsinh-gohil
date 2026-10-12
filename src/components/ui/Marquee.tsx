import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  duration = 30,
  reverse = false,
  className,
  separator = "✦",
}: {
  items: ReactNode[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  separator?: ReactNode;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <span aria-hidden className="text-gradient text-[0.6em]">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]",
        className
      )}
    >
      <div
        className="marquee-track flex w-max"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
