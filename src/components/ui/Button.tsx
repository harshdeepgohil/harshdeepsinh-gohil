"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-[transform,box-shadow,background-color] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 sm:px-7 sm:py-4 sm:text-[0.95rem]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-gradient text-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(124,58,237,0.85)]",
  ghost: "glass text-fg hover:bg-card-hover",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-x-full"
      />
    </>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  magnetic = true,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; magnetic?: boolean }) {
  const el = (
    <a className={cn(base, variants[variant], className)} {...props}>
      <Inner>{children}</Inner>
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function Button({
  variant = "primary",
  className,
  children,
  magnetic = true,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; magnetic?: boolean }) {
  const el = (
    <button className={cn(base, variants[variant], className)} {...props}>
      <Inner>{children}</Inner>
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn(
        "h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        className
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
