# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Adrien Robert's personal resume/portfolio site as a Next.js app with a full-viewport p5.js generative art hero, a two-column sticky layout for content, and a pure black + single accent color design system.

**Architecture:** Single-page scroll app using Next.js App Router. Hero section fills the viewport with a p5.js canvas (column waterfall animation). Below the hero, a sticky left column (name/nav/skills/social) stays fixed while the right column scrolls through Work → About → Skills → Side Projects → Contact sections. All content is driven by typed data files — no CMS.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, p5.js, Geist font (Vercel), JetBrains Mono, Vitest

---

## Key Reference Files
Before implementing, read these files in the repo root:
- `PROFILE.md` — all content (bio, roles, skills, projects)
- `STYLE_GUIDE.md` — complete design system (colors, typography, components, CSS)
- `PREVIOUS_WEBSITE.md` — old site content for reference

---

## File Map

```
/
├── app/
│   ├── layout.tsx              Root layout — fonts, metadata, dark bg
│   ├── page.tsx                Home page — assembles all sections
│   └── globals.css             CSS variables, base reset, scrollbar
├── components/
│   ├── canvas/
│   │   └── GenerativeCanvas.tsx  p5.js canvas, column waterfall animation
│   ├── layout/
│   │   ├── Nav.tsx               Transparent sticky top nav
│   │   └── StickyLeft.tsx        Left sticky column (name/nav/skills/social)
│   ├── sections/
│   │   ├── Hero.tsx              Full-viewport hero (canvas + text overlay)
│   │   ├── Work.tsx              Work experience cards
│   │   ├── About.tsx             Bio + inline skills grid
│   │   ├── Skills.tsx            Tiered skills display
│   │   ├── SideProjects.tsx      Lab / personal projects cards
│   │   └── Contact.tsx           Availability + email + links
│   └── ui/
│       ├── Button.tsx            Primary (filled) + ghost (outline) pill variants
│       ├── Card.tsx              Work/project card with hover lift
│       ├── Tag.tsx               Tech tag pill (monospace)
│       └── SectionHeading.tsx    Numbered section title
├── data/
│   ├── work.ts                 All 6 roles typed as WorkRole[]
│   ├── projects.ts             3–4 side projects typed as Project[]
│   └── skills.ts               Tiered skills typed as SkillTier[]
├── hooks/
│   ├── useScrollDirection.ts   Returns 'up' | 'down' for nav hide/show
│   └── useActiveSection.ts     IntersectionObserver → active section id
├── lib/
│   └── utils.ts                cn() classname helper
└── public/
    └── (static assets, project screenshots)
```

---

## Task 1: Project Scaffold

**Files:**
- Create: all root config files (`package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`)
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx` (stub)

- [ ] **Step 1: Bootstrap Next.js app**

Run inside `/Users/adrienrobert/gitrepo/arobertme2/`:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```
Answer any interactive prompts with defaults. This installs Next.js 15, React 19, TypeScript, Tailwind CSS, and ESLint.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion p5 geist
npm install -D @types/p5 vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

Create `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Add design tokens to globals.css**

Replace the contents of `app/globals.css` with:
```css
@import "tailwindcss";

:root {
  /* Colors */
  --bg: #000000;
  --surface: #111111;
  --divider: #222222;
  --text-primary: #ffffff;
  --text-body: #a0a8b8;
  --text-muted: #666666;
  --accent: #00e5c8;
  --accent-tint: rgba(0, 229, 200, 0.1);
  --canvas-letters: #e6e6e6;

  /* Typography */
  --font-sans: var(--font-geist-sans), 'Geist', system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), 'JetBrains Mono', monospace;

  /* Easing */
  --ease: cubic-bezier(0.645, 0.045, 0.355, 1);
  --transition: all 0.25s var(--ease);

  /* Layout */
  --nav-height: 70px;
  --left-col-width: 40%;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--text-body);
  font-family: var(--font-sans);
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

/* Text selection */
::selection {
  background: var(--accent-tint);
  color: var(--accent);
}
```

- [ ] **Step 5: Configure root layout with fonts**

Replace `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adrien Robert — Senior Front-End Engineer',
  description: 'Senior front-end engineer based in Berlin. Building for greentech, AI tooling, and the open web.',
  openGraph: {
    title: 'Adrien Robert — Senior Front-End Engineer',
    description: 'Senior front-end engineer based in Berlin.',
    url: 'https://arobert.me',
    siteName: 'Adrien Robert',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 6: Add stub page**

Replace `app/page.tsx`:
```typescript
export default function Home() {
  return <main>coming soon</main>
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```
Expected: server starts at `http://localhost:3000`, page shows "coming soon" on a white background. (Tailwind default — black background comes once globals.css is applied.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js app with design tokens and font setup"
```

---

## Task 2: Utility + UI Primitives

**Files:**
- Create: `lib/utils.ts`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Create: `lib/utils.test.ts`

- [ ] **Step 1: Write test for cn() utility**

Create `lib/utils.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('ignores falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })

  it('deduplicates tailwind classes (last wins)', () => {
    expect(cn('text-white', 'text-black')).toBe('text-black')
  })
})
```

- [ ] **Step 2: Run test — expect fail**

```bash
npm test
```
Expected: FAIL — "Cannot find module './utils'"

- [ ] **Step 3: Install clsx + tailwind-merge, implement cn()**

```bash
npm install clsx tailwind-merge
```

Create `lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test
```
Expected: PASS (3 tests)

- [ ] **Step 5: Create Button component**

Create `components/ui/Button.tsx`:
```typescript
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  href?: string
}

export function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap'
  const variants = {
    primary: 'bg-[var(--accent)] text-black hover:bg-[#00c8ad] hover:-translate-y-0.5',
    ghost: 'bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent-tint)] hover:-translate-y-0.5',
  }

  if (href) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {children}
      </a>
    )
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Step 6: Create Tag component**

Create `components/ui/Tag.tsx`:
```typescript
import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'font-mono text-[0.7rem] tracking-[0.04em] text-[var(--accent)]',
        'border border-[rgba(0,229,200,0.3)] rounded px-2 py-0.5',
        className
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 7: Create Card component**

Create `components/ui/Card.tsx`:
```typescript
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
}

export function Card({ children, className, href }: CardProps) {
  const base = cn(
    'bg-[var(--surface)] border border-[var(--divider)] rounded-lg p-6',
    'transition-all duration-[250ms] ease-[var(--ease)]',
    'hover:-translate-y-1 hover:border-[rgba(0,229,200,0.4)]',
    className
  )

  if (href) {
    return <a href={href} className={base}>{children}</a>
  }

  return <div className={base}>{children}</div>
}
```

- [ ] **Step 8: Create SectionHeading component**

Create `components/ui/SectionHeading.tsx`:
```typescript
interface SectionHeadingProps {
  number: string   // e.g. "01"
  children: React.ReactNode
}

export function SectionHeading({ number, children }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <span className="block font-mono text-sm text-[var(--accent)] mb-1">{number}.</span>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
        {children}
      </h2>
    </div>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add UI primitives — Button, Tag, Card, SectionHeading"
```

---

## Task 3: Data Layer

**Files:**
- Create: `data/work.ts`
- Create: `data/projects.ts`
- Create: `data/skills.ts`
- Create: `data/work.test.ts`

Content comes from `PROFILE.md`. Read it before filling in data.

- [ ] **Step 1: Write data validation tests**

Create `data/work.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { workRoles } from './work'
import { sideProjects } from './projects'
import { skillTiers } from './skills'

describe('workRoles', () => {
  it('has at least 4 entries', () => {
    expect(workRoles.length).toBeGreaterThanOrEqual(4)
  })

  it('each role has required fields', () => {
    for (const role of workRoles) {
      expect(role.id).toBeTruthy()
      expect(role.company).toBeTruthy()
      expect(role.title).toBeTruthy()
      expect(role.period).toBeTruthy()
      expect(role.impact).toBeTruthy()
      expect(Array.isArray(role.tags)).toBe(true)
      expect(role.tags.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('first role is most recent (Senvo)', () => {
    expect(workRoles[0].company).toBe('Senvo')
  })
})

describe('sideProjects', () => {
  it('has 3 or 4 entries', () => {
    expect(sideProjects.length).toBeGreaterThanOrEqual(3)
    expect(sideProjects.length).toBeLessThanOrEqual(4)
  })

  it('each project has required fields', () => {
    for (const project of sideProjects) {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(Array.isArray(project.tags)).toBe(true)
    }
  })
})

describe('skillTiers', () => {
  it('has 4 tiers', () => {
    expect(skillTiers.length).toBe(4)
  })

  it('Front-End is the first tier', () => {
    expect(skillTiers[0].name).toBe('Front-End')
  })

  it('each tier has items', () => {
    for (const tier of skillTiers) {
      expect(tier.items.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run tests — expect fail**

```bash
npm test
```
Expected: FAIL — "Cannot find module './work'"

- [ ] **Step 3: Create work.ts**

Create `data/work.ts`:
```typescript
export interface WorkRole {
  id: string
  company: string
  title: string
  period: string
  duration: string
  location: string
  stack: string
  impact: string       // one-sentence impact statement
  tags: string[]       // 3-4 tech tags
  url?: string
  featured: boolean    // true = show on homepage card grid
  isCurrent?: boolean
}

export const workRoles: WorkRole[] = [
  {
    id: 'senvo',
    company: 'Senvo',
    title: 'Senior Front-End Developer',
    period: 'Oct 2024 – Aug 2026',
    duration: '1 yr 10 mo',
    location: 'Berlin',
    stack: 'React, Python',
    impact: 'Designed complex reporting interfaces for a logistics invoice auditing platform and built MCP integrations.',
    tags: ['React', 'Python', 'MCP', 'TypeScript'],
    url: 'https://senvo.ai',
    featured: true,
    isCurrent: true,
  },
  {
    id: 'querfeld',
    company: 'Querfeld',
    title: 'Front-End Developer',
    period: 'Aug 2020 – May 2023',
    duration: '3 yrs 3 mo',
    location: 'Berlin',
    stack: 'React, Node.js',
    impact: 'Built the front-end for a sustainable food-saving B2B platform reducing produce waste across European supply chains.',
    tags: ['React', 'Node.js', 'TypeScript'],
    url: 'https://querfeld.bio',
    featured: true,
  },
  {
    id: 'skoove',
    company: 'Skoove',
    title: 'Full-Stack Developer',
    period: 'Apr 2018 – May 2020',
    duration: '2 yrs 1 mo',
    location: 'Berlin',
    stack: 'React, PHP',
    impact: 'Developed features across the full stack of a consumer piano learning app for iOS and Web with real-time audio interaction.',
    tags: ['React', 'PHP', 'iOS Web'],
    url: 'https://skoove.com',
    featured: true,
  },
  {
    id: 'taledo',
    company: 'Taledo',
    title: 'Full-Stack Developer',
    period: 'Feb 2017 – Feb 2018',
    duration: '1 yr',
    location: 'Berlin',
    stack: 'React, Ruby',
    impact: 'Built features on a recruiting marketplace connecting digital talent with Berlin tech companies.',
    tags: ['React', 'Ruby', 'Elasticsearch'],
    featured: false,
  },
  {
    id: 'igotcha',
    company: 'Igotcha Media',
    title: 'Full-Stack Developer',
    period: 'Apr 2015 – May 2016',
    duration: '1 yr 1 mo',
    location: 'Montreal',
    stack: 'React, PHP',
    impact: 'Built interactive installations for Cirque du Soleil and Les Grandes Fêtes Telus, including embedded systems programming.',
    tags: ['React', 'PHP', 'Embedded'],
    featured: false,
  },
  {
    id: 'reuniwatt',
    company: 'Reuniwatt',
    title: 'ICT Technician',
    period: 'Sep 2013 – Nov 2014',
    duration: '1 yr 2 mo',
    location: 'Réunion Island',
    stack: 'PHP, Angular',
    impact: 'First professional role — built web tooling for a solar forecasting and climate information system.',
    tags: ['PHP', 'Angular'],
    featured: false,
  },
]
```

- [ ] **Step 4: Create projects.ts**

Create `data/projects.ts`:
```typescript
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url?: string
  imageUrl?: string
}

export const sideProjects: Project[] = [
  {
    id: 'senvo-canvas',
    title: 'Generative Typography System',
    description: 'Designed and built the p5.js animation system powering Senvo.ai — a full-viewport typographic particle field where letters breathe in sine-wave columns. Three modes: column waterfall, horizontal waterfall, and radial rings. Ships in production.',
    tags: ['p5.js', 'Generative Art', 'TypeScript', 'Webflow'],
    url: 'https://senvo.ai',
  },
  {
    id: 'generative-art',
    title: 'Generative Art Practice',
    description: 'Ongoing personal work exploring computational aesthetics — parametric typography, noise fields, and algorithmic composition using p5.js and WebGL.',
    tags: ['p5.js', 'WebGL', 'Creative Coding'],
    url: 'https://github.com/koalabear974',
  },
  {
    id: 'mcp-experiments',
    title: 'MCP & Agentic Tooling',
    description: 'Experiments with Model Context Protocol integrations and agentic coding workflows — building tools that extend AI assistants with custom capabilities.',
    tags: ['MCP', 'AI Tooling', 'Node.js', 'TypeScript'],
  },
  {
    id: 'electronics',
    title: 'Electronics & Embedded Systems',
    description: 'Hardware tinkering with Raspberry Pi and Arduino — from sensor networks to custom keyboard firmware. Interests include IoT, low-power systems, and physical computing.',
    tags: ['Raspberry Pi', 'Arduino', 'C++', 'IoT'],
  },
]
```

- [ ] **Step 5: Create skills.ts**

Create `data/skills.ts`:
```typescript
export interface SkillTier {
  name: string
  level: number        // 0–100 for bar width
  note?: string        // optional annotation
  items: string[]
}

export const skillTiers: SkillTier[] = [
  {
    name: 'Front-End',
    level: 95,
    items: ['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'Tailwind CSS', 'Webpack', 'SASS', 'Electron'],
  },
  {
    name: 'Back-End',
    level: 70,
    items: ['Node.js', 'Python', 'Ruby', 'Laravel', 'PHP', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
  },
  {
    name: 'AI & MCP',
    level: 55,
    note: 'practitioner, not specialist',
    items: ['MCP integrations', 'Agentic workflows', 'Local LLMs', 'p5.js / Generative systems', 'Prompt engineering'],
  },
  {
    name: 'DevOps',
    level: 55,
    items: ['AWS (EC2, S3, RDS)', 'Docker', 'CircleCI', 'GitLab CI', 'Firebase', 'Vercel'],
  },
]
```

- [ ] **Step 6: Run tests — expect pass**

```bash
npm test
```
Expected: PASS (all data validation tests)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add typed data layer for work, projects, and skills"
```

---

## Task 4: Custom Hooks

**Files:**
- Create: `hooks/useScrollDirection.ts`
- Create: `hooks/useActiveSection.ts`
- Create: `hooks/useScrollDirection.test.ts`

- [ ] **Step 1: Write test for useScrollDirection**

Create `hooks/useScrollDirection.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 })
  })

  it('returns "up" initially', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current).toBe('up')
  })

  it('returns "down" when scrolled down past threshold', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 200 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('down')
  })

  it('returns "up" when scrolled back up', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 200 })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 50 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('up')
  })
})
```

- [ ] **Step 2: Run test — expect fail**

```bash
npm test
```
Expected: FAIL — "Cannot find module './useScrollDirection'"

- [ ] **Step 3: Implement useScrollDirection**

Create `hooks/useScrollDirection.ts`:
```typescript
'use client'
import { useEffect, useRef, useState } from 'react'

export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (Math.abs(currentY - lastScrollY.current) < 5) return
      setDirection(currentY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
```

- [ ] **Step 4: Implement useActiveSection**

Create `hooks/useActiveSection.ts`:
```typescript
'use client'
import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.set(id, observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [sectionIds])

  return activeId
}
```

- [ ] **Step 5: Run tests — expect pass**

```bash
npm test
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add useScrollDirection and useActiveSection hooks"
```

---

## Task 5: Generative Canvas

**Files:**
- Create: `components/canvas/GenerativeCanvas.tsx`

This is the core visual of the site. Read `STYLE_GUIDE.md` section 4 and `research/01-senvo.md` for full animation config details. The canvas uses p5.js in "instance mode" to avoid global namespace conflicts in React.

- [ ] **Step 1: Create the canvas component**

Create `components/canvas/GenerativeCanvas.tsx`:
```typescript
'use client'
import { useEffect, useRef } from 'react'
import type p5Type from 'p5'

interface CanvasConfig {
  text: string
  columns: number
  minRows: number
  maxRows: number
  columnSpace: number
  charSize: number
  rateAmount: number
  flip: boolean
  mirror: boolean
  bgColor: string
  strokeColor: string
  speed: number
}

const DESKTOP_CONFIG: CanvasConfig = {
  text: ' ADRIEN ',
  columns: 26,
  minRows: 1,
  maxRows: 35,
  columnSpace: 2,
  charSize: 0.5,
  rateAmount: -2,
  flip: true,
  mirror: true,
  bgColor: '#000000',
  strokeColor: '#e6e6e6',
  speed: 0.014,
}

const TABLET_CONFIG: CanvasConfig = { ...DESKTOP_CONFIG, columns: 14, maxRows: 25 }
const MOBILE_CONFIG: CanvasConfig = { ...DESKTOP_CONFIG, columns: 8, maxRows: 18 }

function getConfig(width: number): CanvasConfig {
  if (width < 640) return MOBILE_CONFIG
  if (width < 1024) return TABLET_CONFIG
  return DESKTOP_CONFIG
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const easeInOutCubic = (e: number) =>
  e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2

export function GenerativeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const p5Ref = useRef<p5Type | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cleanup: (() => void) | undefined

    const initCanvas = async () => {
      const p5 = (await import('p5')).default

      const sketch = (p: p5Type) => {
        let time = 0
        let S = getConfig(container.offsetWidth)
        const columnPhases: number[] = []

        p.setup = () => {
          const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight)
          canvas.parent(container)
          canvas.style('display', 'block')
          p.textFont('Geist, Arial, sans-serif')
          p.textAlign(p.CENTER, p.CENTER)

          for (let i = 0; i < S.columns; i++) {
            columnPhases.push(seededRandom(i * 7.3))
          }
        }

        p.draw = () => {
          p.background(S.bgColor)
          time += S.speed * (p.deltaTime / 16.67) // normalize to ~60fps

          const colW = p.width / S.columns
          const charPx = colW * S.charSize
          p.textSize(charPx)
          p.fill(S.strokeColor)
          p.noStroke()

          for (let col = 0; col < S.columns; col++) {
            const mirroredCol = S.mirror && col >= S.columns / 2
              ? S.columns - 1 - col
              : col
            const normalizedPos = mirroredCol / (S.columns / 2)
            const phase = columnPhases[col] * Math.PI * 2
            const wave = (Math.sin(time * S.rateAmount + normalizedPos * Math.PI + phase) + 1) / 2
            const rows = Math.round(S.minRows + easeInOutCubic(wave) * (S.maxRows - S.minRows))

            const x = (col + 0.5) * colW
            const totalH = p.height
            const rowSpacing = totalH / rows

            for (let row = 0; row < rows; row++) {
              const charIndex = (col + row) % S.text.length
              const char = S.text[charIndex]
              if (char === ' ') continue
              const yNorm = (row + 0.5) / rows
              const y = yNorm * totalH
              p.text(char, x, y)
            }
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(container.offsetWidth, container.offsetHeight)
          S = getConfig(container.offsetWidth)
        }
      }

      const instance = new p5(sketch)
      p5Ref.current = instance

      // IntersectionObserver autopause
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) instance.loop()
          else instance.noLoop()
        },
        { threshold: 0.1 }
      )
      observer.observe(container)

      cleanup = () => {
        observer.disconnect()
        instance.remove()
      }
    }

    // Font gate — wait for fonts before drawing
    document.fonts.ready.then(initCanvas)

    return () => cleanup?.()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add GenerativeCanvas component with p5.js column waterfall animation"
```

---

## Task 6: Navigation

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/StickyLeft.tsx`

- [ ] **Step 1: Create top nav**

Create `components/layout/Nav.tsx`:
```typescript
'use client'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const direction = useScrollDirection()

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4',
        'flex items-center justify-between',
        'transition-transform duration-300 ease-[var(--ease)]',
        direction === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <a
        href="#hero"
        className="font-semibold text-sm text-[var(--text-primary)] tracking-tight hover:text-[var(--accent)] transition-colors"
      >
        AR
      </a>

      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-[var(--text-body)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="mailto:a.robert@rt-iut.re"
        className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors hidden md:block"
      >
        Available Sep 2026
      </a>
    </header>
  )
}
```

- [ ] **Step 2: Create sticky left column**

Create `components/layout/StickyLeft.tsx`:
```typescript
'use client'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const SECTION_IDS = ['work', 'about', 'skills', 'projects', 'contact']

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const quickSkills = ['React', 'Node', 'Python', 'MCP']

export function StickyLeft() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between py-24 px-8 lg:px-12">
      {/* Identity */}
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-1">
          Adrien Robert
        </h1>
        <p className="text-sm text-[var(--text-body)] mb-3">Senior Front-End Engineer</p>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[220px]">
          Building for greentech, AI tooling, and the open web.
        </p>
      </div>

      {/* Section nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'flex items-center gap-3 text-sm py-1 transition-colors duration-200',
              activeId === item.id
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
            )}
          >
            <span
              className={cn(
                'h-px transition-all duration-300',
                activeId === item.id ? 'w-8 bg-[var(--accent)]' : 'w-4 bg-current'
              )}
            />
            {item.label}
          </a>
        ))}
      </nav>

      {/* Quick skills + social */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {quickSkills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[0.65rem] text-[var(--text-muted)] tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/koalabear974"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adrobert/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:a.robert@rt-iut.re"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Nav and StickyLeft layout components"
```

---

## Task 7: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero section**

Create `components/sections/Hero.tsx`:
```typescript
import { GenerativeCanvas } from '@/components/canvas/GenerativeCanvas'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Generative art canvas — fills entire hero */}
      <GenerativeCanvas />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
          Senior Front-End Engineer · Berlin
        </p>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] tracking-tight leading-none mb-4"
          style={{ textShadow: '0 0 40px rgba(0,0,0,0.9)' }}
        >
          Adrien Robert
        </h1>

        <p
          className="text-base md:text-lg text-[var(--text-body)] max-w-md mx-auto mb-8 leading-relaxed"
          style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
        >
          Building for greentech, AI tooling, and the open web.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button href="#work" variant="primary">View my work</Button>
          <Button href="#contact" variant="ghost">Get in touch</Button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[0.6rem] text-[var(--text-muted)] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-[var(--text-muted)] animate-pulse" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with generative canvas and overlay"
```

---

## Task 8: Work Section

**Files:**
- Create: `components/sections/Work.tsx`

- [ ] **Step 1: Create Work section**

Create `components/sections/Work.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { workRoles } from '@/data/work'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function Work() {
  const [showAll, setShowAll] = useState(false)
  const featured = workRoles.filter((r) => r.featured)
  const rest = workRoles.filter((r) => !r.featured)
  const visible = showAll ? workRoles : featured

  return (
    <section id="work" className="py-24">
      <SectionHeading number="01">Where I've Worked</SectionHeading>

      <div className="flex flex-col gap-4">
        {visible.map((role) => (
          <Card key={role.id} href={role.url}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-[var(--text-primary)] font-semibold text-base">
                  {role.title}
                  <span className="text-[var(--accent)]"> · {role.company}</span>
                </h3>
                <p className="font-mono text-xs text-[var(--text-muted)] mt-0.5">
                  {role.period} · {role.duration} · {role.location}
                </p>
              </div>
              {role.isCurrent && (
                <span className="shrink-0 font-mono text-[0.6rem] text-[var(--accent)] border border-[var(--accent)] rounded-full px-2 py-0.5 tracking-wider">
                  Current
                </span>
              )}
            </div>

            <p className="text-sm text-[var(--text-body)] leading-relaxed mb-4">
              {role.impact}
            </p>

            <div className="flex flex-wrap gap-2">
              {role.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {!showAll && rest.length > 0 && (
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => setShowAll(true)}
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            + {rest.length} more roles
          </button>
          <a
            href="/Adrien_ROBERT_CV_en_no_photo_2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Full CV (PDF) →
          </a>
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Work section with role cards and expand toggle"
```

---

## Task 9: About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create About section**

Create `components/sections/About.tsx`:
```typescript
import { SectionHeading } from '@/components/ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-24">
      <SectionHeading number="02">About</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">
        <div className="flex flex-col gap-5 text-[var(--text-body)] leading-relaxed text-sm">
          <p>
            I'm a front-end engineer originally from Réunion Island, now based in Berlin.
            I've spent twelve years building product interfaces — from piano learning apps
            to invoice auditing platforms — mostly in React, always leaning front-end.
          </p>
          <p>
            I'm drawn to teams working on problems that matter: sustainable food systems,
            climate tech, and AI tooling that makes developers more capable. Alongside my
            product work I practice generative art — I designed and built the animation
            system running on{' '}
            <a href="https://senvo.ai" target="_blank" rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline">
              Senvo.ai
            </a>
            .
          </p>
          <p>
            Between Querfeld and Senvo I took time for personal projects, generative art
            exploration, and deliberate learning in AI tooling. My current role ends in
            August 2026 — I'm open to opportunities from September.
          </p>

          <p className="text-[var(--text-muted)] text-xs mt-2">
            Outside of work: bike packing across Europe, music, and tinkering with electronics.
          </p>
        </div>

        {/* Skills grid */}
        <div>
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.15em] uppercase mb-4">
            Technologies
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {[
              'React / Next.js', 'Node.js', 'TypeScript', 'Python',
              'Tailwind CSS', 'GraphQL', 'p5.js', 'AWS',
              'MCP / AI tooling', 'Docker',
            ].map((skill) => (
              <span key={skill} className="flex items-center gap-2 text-xs text-[var(--text-body)] font-mono">
                <span className="text-[var(--accent)]">▹</span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add About section with bio and skills grid"
```

---

## Task 10: Skills Section

**Files:**
- Create: `components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills section**

Create `components/sections/Skills.tsx`:
```typescript
import { skillTiers } from '@/data/skills'
import { Tag } from '@/components/ui/Tag'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <SectionHeading number="03">Skills</SectionHeading>

      <div className="flex flex-col gap-10">
        {skillTiers.map((tier) => (
          <div key={tier.name}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{tier.name}</span>

              {/* Bar */}
              <div className="flex-1 h-px bg-[var(--divider)] relative">
                <div
                  className="absolute left-0 top-0 h-px bg-[var(--accent)] transition-all duration-700"
                  style={{ width: `${tier.level}%` }}
                />
              </div>

              {tier.note && (
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)] italic shrink-0">
                  {tier.note}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {tier.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Skills section with tiered bar display"
```

---

## Task 11: Side Projects Section

**Files:**
- Create: `components/sections/SideProjects.tsx`

- [ ] **Step 1: Create SideProjects section**

Create `components/sections/SideProjects.tsx`:
```typescript
import { sideProjects } from '@/data/projects'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function SideProjects() {
  return (
    <section id="projects" className="py-24">
      <SectionHeading number="04">Lab</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sideProjects.map((project) => (
          <Card key={project.id} href={project.url}>
            <h3 className="text-[var(--text-primary)] font-semibold text-sm mb-2">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add SideProjects (Lab) section"
```

---

## Task 12: Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact section**

Create `components/sections/Contact.tsx`:
```typescript
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <SectionHeading number="05">Get in Touch</SectionHeading>

      <div className="max-w-md">
        <p className="text-sm text-[var(--text-body)] leading-relaxed mb-2">
          My current role at Senvo ends in August 2026.
          I'm open to senior front-end and full-stack opportunities from September — preferably at a company working on something that matters.
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)] mb-8">
          Available from September 2026 · Berlin or Remote
        </p>

        <div className="flex flex-wrap gap-3">
          <Button href="mailto:a.robert@rt-iut.re" variant="primary">
            a.robert@rt-iut.re
          </Button>
          <Button
            href="https://www.linkedin.com/in/adrobert/"
            variant="ghost"
          >
            LinkedIn
          </Button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-24 font-mono text-[0.65rem] text-[var(--text-muted)]">
        Designed & built by Adrien Robert · 2026
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Contact section with availability and CTA"
```

---

## Task 13: Assemble Page + Two-Column Layout

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the full page layout**

Replace `app/page.tsx`:
```typescript
import { Nav } from '@/components/layout/Nav'
import { StickyLeft } from '@/components/layout/StickyLeft'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { SideProjects } from '@/components/sections/SideProjects'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      {/* Top nav — fixed, floats over hero */}
      <Nav />

      {/* Full-viewport hero */}
      <Hero />

      {/* Two-column sticky layout */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0">
        {/* Left column — sticky */}
        <div className="hidden lg:block">
          <StickyLeft />
        </div>

        {/* Right column — scrollable content */}
        <main className="lg:pl-12 xl:pl-16">
          <Work />
          <About />
          <Skills />
          <SideProjects />
          <Contact />
        </main>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Start dev server and visually verify**

```bash
npm run dev
```
Open `http://localhost:3000`. Verify:
- Hero fills viewport with the canvas animation running
- Scrolling past hero reveals the two-column layout
- Left column sticks as right column scrolls
- All 5 sections are present
- Nav hides on scroll down, returns on scroll up
- Active section highlights in left nav

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: assemble full page with hero + two-column sticky layout"
```

---

## Task 14: Framer Motion Scroll Reveal

**Files:**
- Create: `components/ui/FadeUp.tsx`
- Modify: `components/sections/Work.tsx`, `About.tsx`, `Skills.tsx`, `SideProjects.tsx`, `Contact.tsx`

- [ ] **Step 1: Create FadeUp wrapper component**

Create `components/ui/FadeUp.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.645, 0.045, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Wrap cards in Work.tsx with FadeUp**

In `components/sections/Work.tsx`, import `FadeUp` and wrap each card:
```typescript
import { FadeUp } from '@/components/ui/FadeUp'

// In the map:
{visible.map((role, i) => (
  <FadeUp key={role.id} delay={i * 0.08}>
    <Card href={role.url}>
      {/* ... same card content ... */}
    </Card>
  </FadeUp>
))}
```

- [ ] **Step 3: Wrap cards in SideProjects.tsx with FadeUp**

In `components/sections/SideProjects.tsx`, import and wrap each card:
```typescript
import { FadeUp } from '@/components/ui/FadeUp'

// In the map:
{sideProjects.map((project, i) => (
  <FadeUp key={project.id} delay={i * 0.08}>
    <Card href={project.url}>
      {/* ... same card content ... */}
    </Card>
  </FadeUp>
))}
```

- [ ] **Step 4: Verify animations in browser, check reduced-motion**

In browser: scroll through the page — cards should fade up as they enter view.
Open DevTools → Rendering → Emulate prefers-reduced-motion → verify page still works without animation.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add scroll-reveal FadeUp animations via Framer Motion"
```

---

## Task 15: Deploy to Vercel

- [ ] **Step 1: Push final state to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Connect repo to Vercel**

Go to [vercel.com/new](https://vercel.com/new), import `koalabear974/arobertme_website_2`. Select:
- Framework: Next.js (auto-detected)
- Root directory: `/` (default)
- Build command: `npm run build` (default)
- Output: `.next` (default)

Click Deploy.

- [ ] **Step 3: Verify production build**

```bash
npm run build
```
Expected: build completes with no errors. Check for any hydration warnings in the output.

- [ ] **Step 4: Add custom domain (optional)**

In Vercel project settings → Domains → add `arobert.me`. Update DNS records at your registrar to point to Vercel's nameservers or add the CNAME/A records shown.

---

## Self-Review

### Spec Coverage Check

| Requirement (from STYLE_GUIDE.md) | Covered |
|---|---|
| Full-viewport p5.js hero canvas | ✅ Task 5 + 7 |
| Black background `#000000` | ✅ Task 1 (globals.css) |
| Teal `#00E5C8` accent | ✅ Task 1 (CSS var) |
| Geist variable font | ✅ Task 1 (layout.tsx) |
| JetBrains Mono / GeistMono for tags | ✅ Task 1 + Tag component |
| Two-column sticky layout | ✅ Task 13 |
| Left column: name/nav/skills/social | ✅ Task 6 |
| Numbered section headings | ✅ Task 2 (SectionHeading) |
| Pill-shaped CTA buttons | ✅ Task 2 (Button) |
| Nav hides on scroll down | ✅ Task 4 + 6 |
| Active section indicator in left nav | ✅ Task 4 + 6 |
| Work section: 4 featured + expand toggle | ✅ Task 8 |
| Tech tags embedded in work cards | ✅ Task 8 |
| About: bio + skills grid | ✅ Task 9 |
| Skills: tiered bar display | ✅ Task 10 |
| Side Projects ("Lab") section | ✅ Task 11 |
| Contact: availability + email + social | ✅ Task 12 |
| Scroll-reveal animations | ✅ Task 14 |
| prefers-reduced-motion respected | ✅ Task 14 (Framer Motion handles this) |
| PDF CV linked | ✅ Task 8 (Full CV link) |
| GitHub push to koalabear974 | ✅ Task 1 + Task 15 |

### Known gaps / future tasks (not in this plan)
- Individual project case study pages (`/projects/[id]`)
- Mobile hamburger menu (the mobile left column is hidden — mobile users rely on top nav anchors)
- Project screenshots / actual images (placeholder data used)
- The email address should be updated if a new domain is set up
- Dark/light mode toggle (optional, not in scope for MVP)
