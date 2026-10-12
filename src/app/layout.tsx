import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import { contact, site } from "@/data/portfolio";
import { Providers } from "@/components/providers/Providers";
import { themeScript } from "@/components/providers/ThemeProvider";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne", display: "swap" });

const url = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name, url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6fa" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url,
  jobTitle: "Web Developer",
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  address: { "@type": "PostalAddress", addressLocality: "Surat", addressRegion: "Gujarat", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Veer Narmad South Gujarat University" },
  knowsAbout: ["Angular", "TypeScript", ".NET Core", "Entity Framework Core", "SQL Server", "Azure OpenAI", "Tailwind CSS"],
  knowsLanguage: ["English", "Hindi", "Gujarati"],
  sameAs: [contact.linkedin, contact.github].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${syne.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-fg px-5 py-3 font-semibold text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
