import { getIcon, type IconKey } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function BrandIcon({
  icon,
  className,
  colored = true,
  title,
}: {
  icon: IconKey;
  className?: string;
  colored?: boolean;
  title?: string;
}) {
  const def = getIcon(icon);
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill={colored ? def.hex : "currentColor"}
    >
      <path d={def.path} fillRule={def.fillRule} />
    </svg>
  );
}
