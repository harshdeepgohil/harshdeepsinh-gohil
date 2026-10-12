"use client";

import type { ReactNode } from "react";
import { IntroProvider } from "./IntroProvider";
import { SmoothScrollProvider } from "./SmoothScroll";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <ToastProvider>
          <IntroProvider>{children}</IntroProvider>
        </ToastProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
