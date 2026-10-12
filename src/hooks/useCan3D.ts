"use client";

import { useEffect, useState } from "react";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides whether the heavy WebGL scenes should render.
 * Falls back on small screens, low-end hardware, reduced motion, missing WebGL
 * or when the user has enabled "Save-Data".
 */
export function useCan3D(minWidth = 768) {
  const [can, setCan] = useState<boolean | null>(null);

  useEffect(() => {
    const evaluate = () => {
      const nav = navigator as NavigatorWithMemory & { connection?: { saveData?: boolean } };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < minWidth;
      const lowCpu = (nav.hardwareConcurrency ?? 8) < 4;
      const lowMem = (nav.deviceMemory ?? 8) < 4;
      const saveData = !!nav.connection?.saveData;
      setCan(!reduced && !small && !lowCpu && !lowMem && !saveData && hasWebGL());
    };
    evaluate();
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", evaluate);
    return () => mql.removeEventListener("change", evaluate);
  }, [minWidth]);

  return can;
}
