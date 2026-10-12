# Harshdeepsinh Gohil — Portfolio

An interactive 3D portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **React Three Fiber + drei**, **GSAP + ScrollTrigger**, **Lenis** and **Framer Motion**.

Highlights: intro loader with curtain reveal, mouse-reactive iridescent 3D blob, draggable 3D tech-logo sphere, self-drawing experience timeline, pinned horizontal project gallery with 3D tilt cards, bento services grid, working contact form (Resend), custom cursor, magnetic buttons, light/dark theme, scroll progress bar, and a hidden easter egg (Konami code, or type `hire`).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

Requires Node.js 18.18+ (20+ recommended).

---

## Editing content

**All text lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** You never need to touch components to update copy.

| Export         | What it controls                                                   |
| -------------- | ------------------------------------------------------------------ |
| `site`         | Name, SEO title/description, location, resume path, keywords       |
| `contact`      | Email, phone, WhatsApp number, LinkedIn & GitHub URLs              |
| `hero`         | Greeting, rotating roles, tagline, CTA labels                      |
| `about`        | Paragraphs, education, animated stats, languages, hobbies          |
| `skillGroups`  | Tech stack groups (also feed the 3D sphere)                        |
| `experience`   | Timeline entries                                                   |
| `projects`     | Featured projects (status, URL, screenshot, tags, highlights)      |
| `services`     | Bento-grid service cards                                           |
| `marqueeWords` | Words in the scrolling marquee                                     |
| `navLinks`     | Navbar items (ids must match section ids)                          |

Search the file for **`TODO`** to find content still to fill in:

- `contact.linkedin` — your LinkedIn URL (hidden while empty)
- `projects → dreambodycode` — production `url` and a one-to-two line `summary`

### Stats

Each stat animates from `from` → `to`. Use `prefix`/`suffix`/`decimals` to format, e.g. `{ from: 11, to: 19, prefix: "v11 → v" }` renders `v11 → v19`.

### Skill icons

Each skill has an `icon` key (see `IconKey` in [`src/lib/icons.ts`](src/lib/icons.ts)). Brand icons come from [Simple Icons](https://simpleicons.org). To add one:

1. Add it to the `pick` map in [`scripts/generate-icons.mjs`](scripts/generate-icons.mjs)
2. Run `npm run icons`
3. Use the new key in `portfolio.ts`

(Only the icons you use are bundled — the full Simple Icons library never reaches the browser.)

---

## Replacing images & resume

| File                                   | Purpose                                         |
| -------------------------------------- | ----------------------------------------------- |
| `public/resume.pdf`                    | **Add your resume here** — the "Download Resume" button links to it |
| `public/projects/getfitwithsudhir.png` | Project screenshot (placeholder — replace)      |
| `public/projects/dreambodycode.png`    | Project screenshot (placeholder — replace)      |

Screenshots display at a **16:10** ratio, anchored to the top. A 1600×1000 PNG/JPG/WebP works best — `next/image` serves optimized AVIF/WebP automatically.

To add a screenshot for the enterprise case studies, set `image: "/projects/your-file.png"` on that project; otherwise the coded `visual` (`"chat"` or `"migration"`) is shown.

The Open Graph / Twitter image is generated from your content at build time (`src/app/opengraph-image.tsx`).

---

## Contact form (Resend)

The form posts to `src/app/api/contact/route.ts`, which sends email via [Resend](https://resend.com). It includes validation, a honeypot field and basic rate-limiting.

Create `.env.local` (and add the same variables in Vercel → Project → Settings → Environment Variables):

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx          # required — https://resend.com/api-keys
CONTACT_TO_EMAIL=harshdeepgohil21@gmail.com # where messages are delivered
CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"  # optional — a sender on a domain verified in Resend
NEXT_PUBLIC_SITE_URL=https://your-domain.com            # optional — canonical URL for SEO (auto-detected on Vercel)
```

Without a verified domain, leave `CONTACT_FROM_EMAIL` unset: Resend's test sender (`onboarding@resend.dev`) is used, which can only deliver to **the email address you signed up to Resend with**.

If the variables are missing, the form shows a friendly error with a direct email link.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo — the Next.js preset is detected automatically.
3. Add the environment variables above.
4. Deploy. Every push to `main` redeploys automatically.

Or with the CLI:

```bash
npx vercel login
npx vercel            # preview deployment
npx vercel --prod     # production deployment
```

`sitemap.xml`, `robots.txt`, canonical URLs and OG tags use `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's production URL automatically.

---

## Project structure

```
src/
├─ app/                    # layout, page, API route, SEO (sitemap, robots, OG image, icon)
├─ components/
│  ├─ providers/           # Lenis smooth scroll, theme, toast, intro state
│  ├─ sections/            # Hero, About, TechStack, Experience, Projects, Services, Contact, Footer
│  ├─ three/               # R3F scenes + lazy loader with fallbacks
│  └─ ui/                  # Navbar, Loader, Cursor, Magnetic, Reveal, Marquee, buttons…
├─ data/portfolio.ts       # ← all content
├─ hooks/                  # media queries, 3D capability check, in-view
└─ lib/                    # gsap setup, icons, utils
```

## Performance & accessibility notes

- WebGL scenes are code-split and only mount on capable devices (≥768px wide, ≥4 cores / 4 GB RAM, WebGL, no Save-Data, no reduced motion), when near the viewport and after the intro. They pause when off-screen. Everyone else gets lightweight CSS fallbacks.
- Device pixel ratio is capped at 1.5; the environment lighting is procedural (no HDR downloads).
- `prefers-reduced-motion` disables Lenis, scroll animations, the cursor and 3D scenes.
- The pinned horizontal project scroll is only used on desktop viewports at least 800px tall. Smaller screens get a stacked layout.
- Semantic landmarks, skip link, visible focus rings, labelled controls, keyboard-accessible menu (Esc to close).
