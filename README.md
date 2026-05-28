# arobert.me

Personal portfolio and resume site for [Adrien Robert](https://arobert.me) — Senior Front-End Engineer based in Berlin.

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion (scroll reveals), p5.js (generative canvas) |
| Fonts | Geist Sans + Geist Mono |
| Testing | Vitest + Testing Library + jsdom |
| Deployment | Vercel |

## Features

- **Generative canvas hero** — p5.js animation ported from production, with glyph caching, off-screen rendering, and 60fps-normalised animation via `deltaTime`
- **Brittany Chiang-style two-column layout** — sticky left sidebar with active section tracking, scrollable right content
- **Glassmorphism nav** — transparent full-width at top, morphs into a glass pill after 80px scroll, hides on scroll down past 300px
- **Scroll-reveal** — `FadeUp` component using Framer Motion `useInView`
- **CV download** — PDF served from `/public`, linked in both the hero and sticky sidebar

## Project structure

```
app/
  layout.tsx        # Root layout, metadata, fonts
  page.tsx          # Home page composition
  globals.css       # Design tokens + base styles

components/
  canvas/           # GenerativeCanvas (p5.js)
  layout/           # Nav, StickyLeft
  sections/         # Hero, Work, About, Skills, SideProjects, Contact
  ui/               # Button, Card, Tag, FadeUp, SectionHeading

data/
  work.ts           # Work experience entries
  skills.ts         # Skill tiers and items
  projects.ts       # Side projects

hooks/
  useActiveSection  # IntersectionObserver-based nav highlighting

public/
  Adrien_ROBERT_CV_en_2026.pdf
  favicon.svg / favicon.ico
```

## Design tokens

Defined in `app/globals.css`:

```css
--bg: #000000
--surface: #0d0d0d
--accent: #00e5c8
--text-primary: #f0f0f0
--text-body: #a0a8b8
--text-muted: #4a5060
--ease: cubic-bezier(0.645, 0.045, 0.355, 1)
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:4000
npm test          # vitest run
npm run build     # production build
```

## Deployment

Deployed automatically on Vercel from the `main` branch of `koalabear974/arobertme_website_2`.
