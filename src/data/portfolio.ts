/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit everything here, no components needed.
 *  Search for "TODO" to find the content you still need to fill in.
 * ─────────────────────────────────────────────────────────────
 */

import type { IconKey } from "@/lib/icons";

export const site = {
  name: "Harshdeepsinh Gohil",
  firstName: "Harshdeepsinh",
  initials: "HG",
  title: "Harshdeepsinh Gohil — Web Developer",
  description:
    "Web Developer from Surat, India specialising in Angular, .NET Core and AI-powered web platforms. I build fast, modern web experiences.",
  location: "Surat, India",
  timezone: "Asia/Kolkata",
  /** Path inside /public. Drop your file at public/resume.pdf */
  resumeUrl: "/resume.pdf",
  keywords: [
    "Harshdeepsinh Gohil",
    "Web Developer",
    "Angular Developer",
    ".NET Developer",
    "UI Engineer",
    "Frontend Developer Surat",
    "Portfolio",
  ],
};

export const contact = {
  email: "harshdeepgohil21@gmail.com",
  phone: "+91 9499880808",
  /** Digits only, with country code — used for the WhatsApp click-to-chat link */
  whatsapp: "919499880808",
  /** LinkedIn profile URL. Leave "" to hide. */
  linkedin: "https://www.linkedin.com/in/harshdeepsinh-gohil-776938212",
  /** GitHub profile URL. Leave "" to hide. */
  github: "https://github.com/harshdeepgohil",
};

export const hero = {
  greeting: "Hi, I'm",
  roles: ["Web Developer", "Angular Specialist", ".NET Developer", "UI Engineer"],
  tagline:
    "I build fast, modern web experiences — from enterprise Angular apps to AI-powered platforms.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Download Resume" },
};

export const about = {
  eyebrow: "About me",
  heading: "Curious by nature, precise by craft.",
  paragraphs: [
    "I'm a self-motivated web developer from Surat, India who genuinely loves learning new things. I enjoy turning complex requirements into interfaces that feel effortless — and the systems behind them that stay maintainable.",
    "My day-to-day lives at the intersection of enterprise Angular, .NET Core APIs and AI-driven features. I care about clean architecture, smooth UX, and shipping work I'm proud of.",
  ],
  education: [
    { degree: "MCA — Master of Computer Applications", school: "Veer Narmad South Gujarat University", period: "2023 – 2025" },
    { degree: "BCA — Bachelor of Computer Applications", school: "Veer Narmad South Gujarat University", period: "2020 – 2023" },
  ],
  /**
   * Animated stats. `from`/`to` animate as a counter; `prefix`/`suffix` wrap the number.
   * Use `text` instead for non-numeric stats.
   */
  stats: [
    { from: 0, to: 1.5, decimals: 1, suffix: "+", label: "Years Experience" },
    { from: 0, to: 2, decimals: 0, suffix: "", label: "Companies" },
    { from: 11, to: 19, decimals: 0, prefix: "v11 → v", suffix: "", label: "Angular Migration Led" },
    { from: 0, to: 1, decimals: 0, suffix: "", label: "AI Platform Built" },
  ] as Stat[],
  languages: ["English", "Hindi", "Gujarati"],
  hobbies: [
    { label: "Football", emoji: "⚽" },
    { label: "Cricket", emoji: "🏏" },
    { label: "Volleyball", emoji: "🏐" },
    { label: "Gaming", emoji: "🎮" },
  ],
};

export type Stat = {
  from: number;
  to: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Skill = { name: string; icon: IconKey };
export type SkillGroup = { title: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "SCSS", icon: "scss" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "Angular 19", icon: "angular" },
      { name: ".NET Core Web API", icon: "dotnet" },
      { name: "Entity Framework Core", icon: "efcore" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "SQL Server", icon: "sqlserver" },
    ],
  },
  {
    title: "AI",
    skills: [{ name: "Azure OpenAI Services", icon: "azureopenai" }],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitLab", icon: "gitlab" },
      { name: "ClickUp", icon: "clickup" },
      { name: "Figma", icon: "figma" },
      { name: "Private NPM Packages", icon: "npm" },
    ],
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: { title?: string; text: string }[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "WRT Infotech",
    role: "Jr. Web Developer",
    period: "Sep 2025 – Present",
    highlights: [
      { text: "Worked on a polyrepo architecture where independent repositories connect through private NPM packages to deliver one unified UI." },
      { text: "Managed private scoped NPM packages — publishing, versioning and consuming across repositories." },
      { text: "Executed a full Angular v11 → v19 migration with incremental upgrades, resolving breaking changes across all interconnected packages." },
      { text: "Led UI modernization post-migration, rebuilding the entire interface from scratch to match new Figma designs." },
      { text: "Migrated the full codebase from PrimeFlex to Tailwind CSS." },
    ],
    tags: ["Angular 19", "Private NPM", "Polyrepo", "Tailwind CSS", "Figma"],
  },
  {
    company: "NatRIX Software Pvt Ltd",
    role: "Jr. Web Developer",
    period: "Jan 2025 – Aug 2025",
    highlights: [
      {
        title: "Roadside Assist",
        text: "Full-stack app with .NET Core Web API + Angular 19, Repository Pattern, Dependency Injection, EF Core Code-First migrations, optimized SQL Server schemas and RESTful APIs.",
      },
      {
        title: "AI-Powered Rules & Regulations Platform",
        text: "Voice-capable NLP chatbot for organizational rules with voice input + text-to-speech, AI-driven PDF version comparison that highlights rule changes, and an admin panel for API keys, model config and feature toggles.",
      },
    ],
    tags: [".NET Core", "Angular 19", "EF Core", "SQL Server", "Azure OpenAI"],
  },
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  status: "live" | "in-progress" | "case-study";
  summary: string;
  highlights: string[];
  tags: string[];
  /** Live URL. Leave "" to show "Case Study" / "Coming soon" instead. */
  url: string;
  /** Screenshot in /public/projects. Leave undefined to use a coded visual. */
  image?: string;
  /** Coded visual used when there is no screenshot. */
  visual?: "chat" | "migration";
  /** Domain shown in the mock browser bar */
  displayUrl: string;
};

export const projects: Project[] = [
  {
    slug: "getfitwithsudhir",
    title: "GetFitWithSudhir",
    kind: "Client Project",
    status: "live",
    summary:
      "Complete marketing website for an online fitness coaching brand — About, How It Works, Coaching, Results, Memberships (3 pricing tiers), FAQ and an enquiry / consultation flow.",
    highlights: [
      "Conversion-focused landing page",
      "Four-pillar framework storytelling",
      "Six-step journey section",
      "SEO meta / OG setup",
      "Privacy & analytics consent",
      "Fully responsive",
    ],
    tags: ["Marketing Site", "SEO", "Responsive", "Conversion UX"],
    url: "https://getfitwithsudhir.com/",
    image: "/projects/getfitwithsudhir.png",
    displayUrl: "getfitwithsudhir.com",
  },
  {
    slug: "dreambodycode",
    title: "DreamBodyCode",
    kind: "Personal Product",
    status: "in-progress",
    // TODO: replace with a one-to-two line description of DreamBodyCode.
    summary:
      "A personal fitness product I'm designing and building end-to-end — currently in active development and launching soon.",
    highlights: ["Product design", "Full-stack build", "Shipping soon"],
    tags: ["Product", "In Development"],
    // TODO: add the production URL once live, e.g. "https://dreambodycode.com".
    url: "",
    image: "/projects/dreambodycode.png",
    displayUrl: "dreambodycode.com",
  },
  {
    slug: "ai-rules-platform",
    title: "AI-Powered Rules & Regulations Platform",
    kind: "Enterprise · NatRIX",
    status: "case-study",
    summary:
      "A voice-capable NLP chatbot that lets employees ask questions about organizational rules — and an AI engine that compares PDF versions and highlights exactly what changed.",
    highlights: [
      "Voice input + text-to-speech",
      "AI-driven PDF version comparison",
      "Admin panel: API keys, model config, feature toggles",
      "Built on Azure OpenAI",
    ],
    tags: ["Azure OpenAI", "NLP", ".NET Core", "Angular 19"],
    url: "",
    visual: "chat",
    displayUrl: "rules.internal",
  },
  {
    slug: "angular-migration",
    title: "Angular v11 → v19 Enterprise Migration",
    kind: "Enterprise · WRT Infotech",
    status: "case-study",
    summary:
      "An incremental, version-by-version upgrade of a polyrepo enterprise app — resolving breaking changes across every interconnected private package, then rebuilding the UI from scratch.",
    highlights: [
      "8 major versions, upgraded incrementally",
      "Breaking changes fixed across private NPM packages",
      "PrimeFlex → Tailwind CSS",
      "UI rebuilt to new Figma designs",
    ],
    tags: ["Angular", "Migration", "Private NPM", "Tailwind CSS"],
    url: "",
    visual: "migration",
    displayUrl: "ng update",
  },
];

export const services = [
  {
    title: "Frontend Development",
    subtitle: "Angular / React",
    text: "Pixel-perfect, accessible interfaces with clean component architecture and smooth motion.",
    visual: "code",
  },
  {
    title: "Full-Stack Web Apps",
    subtitle: ".NET Core",
    text: "RESTful APIs, EF Core and SQL Server — structured with Repository Pattern & DI.",
    visual: "stack",
  },
  {
    title: "AI-Integrated Features",
    subtitle: "Azure OpenAI",
    text: "Chatbots, voice interfaces and document intelligence woven into real products.",
    visual: "ai",
  },
  {
    title: "Portfolio & Business Websites",
    subtitle: "Fast · SEO-ready",
    text: "Conversion-focused, responsive sites that load fast and rank well.",
    visual: "web",
  },
] as const;

export const marqueeWords = [
  "Angular",
  "TypeScript",
  ".NET Core",
  "Tailwind CSS",
  "Azure OpenAI",
  "SQL Server",
  "Figma",
  "Entity Framework",
  "SCSS",
  "Private NPM",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];
