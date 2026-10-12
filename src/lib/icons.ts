import { generatedIcons } from "./icons.generated";

export type IconDef = {
  title: string;
  /** Brand colour, tuned so it stays visible on dark surfaces */
  hex: string;
  path: string;
  fillRule?: "evenodd" | "nonzero";
};

/** Hand-drawn icons for brands not available in simple-icons (24×24 viewBox). */
const customIcons = {
  sqlserver: {
    title: "SQL Server",
    hex: "#E8383D",
    fillRule: "evenodd",
    path: "M12 2C7.03 2 3 3.79 3 6v12c0 2.21 4.03 4 9 4s9-1.79 9-4V6c0-2.21-4.03-4-9-4Zm0 2c4.2 0 7 1.38 7 2s-2.8 2-7 2-7-1.38-7-2 2.8-2 7-2ZM5 8.66C6.6 9.5 9.13 10 12 10s5.4-.5 7-1.34V12c0 .62-2.8 2-7 2s-7-1.38-7-2V8.66Zm0 6C6.6 15.5 9.13 16 12 16s5.4-.5 7-1.34V18c0 .62-2.8 2-7 2s-7-1.38-7-2v-3.34Z",
  },
  azureopenai: {
    title: "Azure OpenAI",
    hex: "#3BA0FF",
    path: "M10 1.5 12.6 8.4 19.5 11 12.6 13.6 10 20.5 7.4 13.6.5 11l6.9-2.6L10 1.5Zm8.5 11 1.25 3.25L23 17l-3.25 1.25L18.5 21.5l-1.25-3.25L14 17l3.25-1.25 1.25-3.25Z",
  },
  linkedin: {
    title: "LinkedIn",
    hex: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
} satisfies Record<string, IconDef>;

/** Colour overrides where the official brand colour is too dark for a dark UI. */
const colorOverrides: Partial<Record<string, string>> = {
  angular: "#DD0031",
  github: "#F4F4F8",
  efcore: "#6E8BFF",
  dotnet: "#8B6CEF",
  mysql: "#5C9DD1",
};

type GeneratedKey = keyof typeof generatedIcons;
type CustomKey = keyof typeof customIcons;
export type IconKey = GeneratedKey | CustomKey;

export function getIcon(key: IconKey): IconDef {
  const base: IconDef =
    key in customIcons ? customIcons[key as CustomKey] : { ...generatedIcons[key as GeneratedKey] };
  return { ...base, hex: colorOverrides[key] ?? base.hex };
}
