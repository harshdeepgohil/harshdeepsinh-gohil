"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const Ctx = createContext<{ done: boolean; finish: () => void }>({ done: false, finish: () => {} });
export const useIntro = () => useContext(Ctx);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  return <Ctx.Provider value={{ done, finish: () => setDone(true) }}>{children}</Ctx.Provider>;
}
