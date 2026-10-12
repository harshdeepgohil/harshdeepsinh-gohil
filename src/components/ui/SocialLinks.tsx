import { contact } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { BrandIcon } from "./BrandIcon";
import { Magnetic } from "./Magnetic";

type Social = { href: string; label: string; icon: "linkedin" | "github" | "whatsapp" };

/** Social profiles from portfolio.ts — empty URLs are skipped. */
export function getSocials(): Social[] {
  const list: (Social | false)[] = [
    !!contact.linkedin && { href: contact.linkedin, label: "LinkedIn", icon: "linkedin" },
    !!contact.github && { href: contact.github, label: "GitHub", icon: "github" },
    { href: `https://wa.me/${contact.whatsapp}`, label: "WhatsApp", icon: "whatsapp" },
  ];
  return list.filter((s): s is Social => !!s);
}

export function SocialLinks({
  size = "md",
  include,
  className,
}: {
  size?: "sm" | "md" | "lg";
  /** Limit to specific networks (defaults to all) */
  include?: Social["icon"][];
  className?: string;
}) {
  const box = { sm: "h-11 w-11", md: "h-12 w-12", lg: "h-14 w-14" }[size];
  const socials = getSocials().filter((s) => !include || include.includes(s.icon));

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {socials.map((s) => (
        <li key={s.label}>
          <Magnetic>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (opens in a new tab)`}
              className={cn(
                "glass grid place-items-center rounded-full text-fg transition-colors hover:bg-card-hover",
                box
              )}
            >
              <BrandIcon icon={s.icon} colored={false} className="h-5 w-5" />
            </a>
          </Magnetic>
        </li>
      ))}
    </ul>
  );
}
