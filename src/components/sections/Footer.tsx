"use client";

import { useEffect, useState } from "react";
import { contact, site } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialLinks } from "@/components/ui/SocialLinks";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: site.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--:--"} IST
    </span>
  );
}

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative border-t border-border">
      <div className="container-x flex flex-col gap-12 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-none font-bold tracking-tight">
              {site.name.split(" ")[0]}
              <span className="text-gradient">.</span>
            </p>
            <p className="mt-4 text-muted">Designed &amp; built by {site.name}</p>
          </div>

          <div className="flex items-center gap-3">
            <SocialLinks />
            <Magnetic>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Send me an email"
                className="glass grid h-12 w-12 place-items-center rounded-full transition-colors hover:bg-card-hover"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollTo(0)}
                aria-label="Back to top"
                data-cursor="Top"
                className="bg-accent-gradient grid h-12 w-12 place-items-center rounded-full text-white"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5m0 0-6 6m6-6 6 6" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-border pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            {site.location} · <LocalTime />
          </p>
        </div>
      </div>
    </footer>
  );
}
