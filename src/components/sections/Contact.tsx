"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { contact } from "@/data/portfolio";
import { useToast } from "@/components/providers/ToastProvider";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Arrow, Button } from "@/components/ui/Button";
import { SplitReveal, Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full rounded-2xl border border-border bg-bg/50 px-5 pt-7 pb-3 text-fg outline-none transition-[border-color,box-shadow] placeholder:text-transparent focus:border-accent-2 focus:shadow-[0_0_0_4px_rgb(139_92_246/0.15)]";
const label =
  "pointer-events-none absolute top-5 left-5 origin-left text-sm text-muted transition-transform duration-200 peer-focus:-translate-y-3 peer-focus:scale-[0.8] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-[0.8]";

export function Contact() {
  const toast = useToast();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      toast("📋 Email copied to clipboard");
    } catch {
      toast(contact.email);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      toast("✅ Message sent — I'll get back to you soon!");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-40 h-[520px] w-[520px] animate-[mesh-drift_16s_ease-in-out_infinite] rounded-full bg-accent-1/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[560px] w-[560px] animate-[mesh-drift_20s_ease-in-out_infinite_reverse] rounded-full bg-accent-2/25 blur-[120px]" />
      </div>

      <div className="container-x">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="text-subtle">06</span>
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent-1 to-accent-2" />
          Contact
        </p>
        <SplitReveal
          id="contact-title"
          text="Let's build something great together."
          gradientWords={["great"]}
          className="max-w-6xl font-display text-[clamp(2.6rem,8.5vw,8rem)] leading-[0.92] font-bold tracking-tight text-balance"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <button
              type="button"
              onClick={copyEmail}
              data-cursor="Copy"
              className="glass group flex items-center justify-between gap-4 rounded-3xl p-6 text-left transition-colors hover:bg-card-hover"
            >
              <span className="min-w-0">
                <span className="eyebrow mb-2 block">Email · click to copy</span>
                <span className="block truncate font-display text-lg font-semibold sm:text-2xl">{contact.email}</span>
              </span>
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-fg" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            </button>

            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi Harshdeepsinh! I saw your portfolio and")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Chat"
              className="glass group flex items-center justify-between gap-4 rounded-3xl p-6 transition-colors hover:bg-card-hover"
            >
              <span>
                <span className="eyebrow mb-2 block">Phone · WhatsApp</span>
                <span className="block font-display text-lg font-semibold sm:text-2xl">{contact.phone}</span>
              </span>
              <BrandIcon icon="whatsapp" className="h-6 w-6" />
            </a>

            <SocialLinks size="lg" className="mt-2" />
          </Reveal>

          <Reveal>
            <form onSubmit={onSubmit} className="glass flex flex-col gap-4 rounded-[2rem] p-6 sm:p-8" noValidate={false}>
              {/* Honeypot — hidden from humans */}
              <div className="hidden" aria-hidden>
                <label>
                  Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
                  <label htmlFor="name" className={label}>Your name</label>
                </div>
                <div className="relative">
                  <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Email" className={field} />
                  <label htmlFor="email" className={label}>Email address</label>
                </div>
              </div>
              <div className="relative">
                <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Message" className={`${field} resize-none`} />
                <label htmlFor="message" className={label}>Tell me about your project</label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div aria-live="polite" className="min-h-5 text-sm">
                  <AnimatePresence mode="wait">
                    {status === "error" && (
                      <motion.p key="e" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-rose-500">
                        {error}{" "}
                        <a href={`mailto:${contact.email}`} className="underline">Email me directly</a>.
                      </motion.p>
                    )}
                    {status === "sent" && (
                      <motion.p key="s" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-emerald-600 dark:text-emerald-400">
                        Thanks! Your message is on its way.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                  <Arrow />
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
