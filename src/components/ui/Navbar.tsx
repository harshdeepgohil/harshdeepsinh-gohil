"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { contact, navLinks, site } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import { SocialLinks } from "./SocialLinks";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { scrollTo, lock, unlock } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 300);
          last = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section indicator.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const hero = document.getElementById("home");
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  // Mobile menu: lock scroll + close on Escape.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    lock();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open, lock, unlock]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => scrollTo(`#${id}`));
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5 transition-[background-color,border-color,box-shadow] duration-500",
            scrolled || open ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]" : "border border-transparent"
          )}
        >
          <a
            href="#home"
            onClick={go("home")}
            className="font-display text-xl font-bold tracking-tight"
            aria-label={`${site.name} — back to top`}
          >
            {site.initials}
            <span className="text-gradient">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === l.id ? "text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-card-hover ring-1 ring-border"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden sm:inline-block">
              <Magnetic>
              <a
                href="#contact"
                onClick={go("contact")}
                className="bg-accent-gradient inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold text-white"
              >
                Let&apos;s talk
              </a>
              </Magnetic>
            </span>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass relative grid h-11 w-11 place-items-center rounded-full lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded bg-fg transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[4px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded bg-fg transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-bg-elev px-6 pt-28 pb-10 lg:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-accent-2/25 blur-[120px]"
            />
            <ul className="relative flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <li key={l.id} className="-mb-[0.3em] overflow-hidden pb-[0.3em]">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.4rem,11vw,4.5rem)] leading-tight font-bold"
                  >
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    <span className={active === l.id ? "text-gradient" : ""}>{l.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="relative flex flex-col gap-1 text-sm text-muted"
            >
              <a href={`mailto:${contact.email}`} className="hover:text-fg">
                {contact.email}
              </a>
              <span>{site.location}</span>
              <SocialLinks size="sm" className="mt-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
