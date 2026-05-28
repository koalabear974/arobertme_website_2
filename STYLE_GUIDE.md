# Style Guide — Adrien Robert Personal Site
*Synthesised from research across 8 reference sites + 3 IA analyses. 2026-05-28.*

---

## 1. Design Concept

**"Technical distinctiveness with conventional legibility."**

The site does two things simultaneously: it makes an immediate visual statement that proves generative art / creative-technical range, and it communicates professional credentials clearly enough for a hiring manager to form a confident opinion in under 60 seconds.

The generative hero IS the differentiator. It is not decoration — it is evidence.  
Every design decision below should serve one of two goals:
1. Let the canvas breathe and impress
2. Make the credential content effortless to scan

---

## 2. Color Palette

### Strategy
One chromatic accent on a pure black base. Senvo's lime (`#D6F306`) is their brand — do not copy it. Choose an accent that signals both technology and ecology, distinctly Adrien's own.

**Recommended palette:**

| Role | Hex | Notes |
|------|-----|-------|
| Background (all) | `#000000` | Same as Senvo — non-negotiable, the canvas requires it |
| Canvas letters | `#E6E6E6` | Off-white, same as Senvo config — reads as white against black at small sizes |
| Primary text | `#FFFFFF` | Headlines, nav |
| Body text | `#A0A8B8` | Readable on black, not harsh |
| Subtle text / metadata | `#666666` | Dates, tags, secondary labels |
| Accent — Electric Teal | `#00E5C8` | CTAs, active states, hover highlights, canvas keyword — eco-adjacent, technical, distinct from Senvo's lime |
| Accent tint | `rgba(0,229,200,0.1)` | Button hover fill, subtle backgrounds |
| Surface / card bg | `#111111` | Cards, panels — slight lift from pure black |
| Divider | `#222222` | Thin HR lines |

**Rationale for `#00E5C8`:**
- Distinct from Senvo's acid lime and Brittany's teal `#64ffda` (similar family but differentiated)
- High contrast on black (WCAG AA+)
- Reads as: digital, biological, water, sustainability — matches Adrien's dual identity
- Adjust shade if needed — the key is: one accent, used consistently

**Per-section color variants (optional, like Senvo):**
Each section or project card can carry a secondary accent. Keep black background constant, vary only the accent. Suggested:
- Hero / main: `#00E5C8` (teal)
- Sustainability / Querfeld projects: `#7AE05C` (natural green)  
- AI / MCP projects: `#5C7AFF` (electric blue)
- Generative art projects: `#FF5C8A` (warm pink)

---

## 3. Typography

### Primary Display Font
**Geist** (Vercel's open-source variable font) or **Plus Jakarta Sans Variable**

- Geist is geometric, modern, slightly rounded — shares Mnkyklaus's clean technical feel
- Full variable weight axis (100–900)
- Free and open-source
- Can be used in p5.js canvas (load as @font-face, same technique as Senvo's Mnkyklaus)

Alternative if more character is desired: **Cabinet Grotesk Variable** or **Satoshi Variable** — both share the rounded-grotesque aesthetic of Senvo's Mnkyklaus.

**Do not use Inter alone** — it is generic in developer portfolios.

### Monospace Font (tech tags, metadata, dates)
**JetBrains Mono** or **IBM Plex Mono**
- Used for: tech tags, date ranges, section counter numbers, footer
- Creates the "developer" signal that Brittany Chiang's SF Mono creates

### Font Scale

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| Name (hero) | `clamp(3rem, 8vw, 7rem)` | 800 | Oversized, confident |
| Section headings | `clamp(1.5rem, 3vw, 2.5rem)` | 600 | Numbered with CSS counter |
| Job titles | `1.25rem` (20px) | 600 | |
| Body text | `1rem` (16px) | 400 | line-height 1.6 |
| Tech tags / metadata | `0.75rem` (12px) | 400 | monospace, letter-spacing +0.05em |
| Section counter prefix | `0.875rem` (14px) | 400 | monospace, accent color |

### Type Rules
- **Negative tracking on large headings:** `letter-spacing: -0.04em` on display sizes (matches Senvo's feel)
- **Tight line-height on hero:** `line-height: 1.0` on the name, `1.2` on tagline
- **All section titles numbered:** CSS counter, `01. Work`, `02. About` — in monospace accent color
- **Anti-aliasing everywhere:** `-webkit-font-smoothing: antialiased` globally

---

## 4. The Generative Art System

**Adrien built this system for Senvo. He owns this aesthetic. Use it.**

### Recommended hero animation config

Adapt the **column waterfall mode** from the Senvo codebase. Key parameters for the personal site:

```json
{
  "bgColor": "#000000",
  "text": " ADRIEN ",
  "columns": 26,
  "minRows": 1,
  "maxRows": 35,
  "columnSpace": 2,
  "charSize": 0.5,
  "rateAmount": -2,
  "flip": true,
  "mirror": true,
  "fillText": true,
  "strokeColor": "#E6E6E6",
  "speed": 0.014
}
```

Or use a skill/value word: `" BERLIN "`, `" REACT "`, `" HUMAN "`, `" BUILD "`.
The word choice is a design decision — it sets the thematic identity of the hero.

### Per-section variants
Following Senvo's pattern, each major section can carry a different animation mode:

| Section | Mode | Keyword | Accent |
|---------|------|---------|--------|
| Hero | Column waterfall | ADRIEN / chosen keyword | Teal `#00E5C8` |
| Side Projects | Radial rings | `• • •` dots | Natural green |
| Contact | Horizontal waterfall | CONTACT | Teal |

### Implementation notes (from Senvo source analysis)
- Use **p5.js v2.1.1**
- Font gate: `document.fonts.ready` before canvas draws
- IntersectionObserver autopause (performance)
- Seeded randomness for deterministic phase offsets
- Pre-render glyphs to offscreen canvases at setup, `drawImage` per frame
- Frame-rate independent: `time += speed * deltaTime * 0.06`
- Easing functions to copy directly:
  ```js
  const easeInOutSine = e => -(Math.cos(Math.PI * e) - 1) / 2;
  const easeInOutCubic = e => e < 0.5 ? 4*e*e*e : 1 - Math.pow(-2*e+2,3)/2;
  ```
- Responsive configs: separate objects for desktop / tablet / mobile (reduce columns on smaller screens)

### The rule
The canvas is full-viewport in the hero. It bleeds to all four edges. Nav and text float above it. **There is no box or container around the canvas.**  
Below the hero fold, the canvas does not persist — conventional content takes over. (Senvo's structural pattern: art buys permission, copy delivers.)

---

## 5. Layout Architecture

### Recommended structure: Hybrid Senvo + Brittany Chiang

```
┌─────────────────────────────────────────────────────┐
│  HERO (full-viewport)                               │
│  [Generative canvas — full bleed]                   │
│  [Transparent nav floating above]                   │
│  [Name · Title · Tagline · 2 CTAs floating over]    │
└─────────────────────────────────────────────────────┘
┌──────────────────┬──────────────────────────────────┐
│  LEFT COL        │  RIGHT COL (scrolls)             │
│  (sticky 40%)    │                                  │
│                  │  01. WORK                        │
│  Adrien Robert   │  02. ABOUT                       │
│  Sr. FE Eng.     │  03. SKILLS                      │
│  [tagline]       │  04. SIDE PROJECTS               │
│                  │  05. CONTACT                     │
│  ·About          │                                  │
│  ·Work           │                                  │
│  ·Projects       │                                  │
│                  │                                  │
│  React · MCP     │                                  │
│  Node · Python   │                                  │
│                  │                                  │
│  [GH][LI][✉]    │                                  │
└──────────────────┴──────────────────────────────────┘
```

### Left column (sticky, `position: sticky; top: 0; height: 100vh`)
1. Name — `Adrien Robert` (H1)
2. Title — `Senior Front-End Engineer`
3. Tagline — one line, differentiator-forward (see §8)
4. Section nav — vertical list: Work / About / Projects / Contact
5. Quick skills — small text, low weight: `React · Node · Python · MCP · DevOps`
6. Social links — GitHub, LinkedIn, Email

### Right column (scrollable, 60% width)
Sections in this order: Work → About → Skills → Side Projects → Contact

### Container
- Max-width: `1100px` centered
- Padding: `0 24px` mobile, `0 60px` tablet, `0 100px` desktop left column / `0 0 0 60px` right column
- No background on the body below the hero — pure `#000000`

---

## 6. Section Specifications

### Hero
- Full viewport height (`100vh`)
- Canvas fills 100% width and height, `position: absolute`, `z-index: 0`
- Content overlay: `position: relative`, `z-index: 1`, flexbox centered
- Nav: `position: fixed`, `top: 0`, `background: transparent`, `z-index: 10`
- Name text gets a shadow glow for contrast over the canvas: `box-shadow: 0 0 20px 20px rgba(0,0,0,0.7)` on the text block
- Two CTAs: primary pill (accent filled) + secondary ghost pill

### 01 — Work
- **4 role cards** (most relevant: Senvo, Querfeld, Skoove, Igotcha or Taledo)
- Older/shorter roles in a collapsible "Full timeline" toggle or PDF link
- Per card:
  ```
  [Company name]  [Role title · Duration]
  [One-sentence impact statement]
  [Tech tag pills — 3-4 max]
  [→ link if applicable]
  ```
- Card background: `#111111`, no border, subtle shadow
- Card hover: `translateY(-4px)`, border becomes accent-colored `1px solid`

### 02 — About
- 3 short paragraphs (~150 words total), first-person
- Paragraph 1: Who you are + Réunion Island origin (human anchor)
- Paragraph 2: What you care about (sustainability, AI tooling, generative systems)
- Paragraph 3: One sentence addressing the 2023-2024 gap + current availability signal
- Skills grid after the bio: 2-column list, monospace, accent triangle bullets (▹)
- NO dedicated "hobbies" section — one line at the end of About: "Outside of work: bike packing across Europe, music, and tinkering with electronics."

### 03 — Skills
- Visual tier hierarchy, not a flat list:
  ```
  FRONT-END ████████████████  (dominant)
    React · Next.js · Vue · Angular · TypeScript · Tailwind · Webpack
  
  BACK-END  ████████████░░░░
    Node.js · Python · Ruby · Laravel · PHP · PostgreSQL · GraphQL
  
  AI & MCP  ████████░░░░░░░░  (emerging practice)
    Agentic coding · MCP integrations · Local LLM · p5.js · Generative systems
  
  DEVOPS    ████████░░░░░░░░
    AWS · CircleCI · GitLab CI · Docker · Firebase
  ```
- Do not use star ratings (★★★☆☆) — use bar widths instead
- Add a small annotation under AI & MCP: *"practitioner, not specialist"*

### 04 — Side Projects
- 3-4 cards, same visual format as Work cards
- Required items:
  1. The Senvo generative art system ("I designed and built this animation system in production") — with screenshot/video
  2. An original generative art piece/series from personal practice — with visual output
  3. One MCP / agentic coding experiment — with GitHub link or short write-up
  4. (Optional) One hardware/electronics project — photo + 1 line
- **Call it "Side Projects" or "Lab" — never "Hobbies"**
- Same card treatment as Work — signals equal craft seriousness

### 05 — Contact
- Very short section (2 sentences max of prose)
- Availability status: *"Available from September 2026"* (update dynamically)
- Email address — large, directly clickable (no form)
- LinkedIn + GitHub icon links
- No contact form

---

## 7. UI Components

### Navigation (sticky top + sticky left sidebar)
```css
/* Top nav */
.nav {
  position: fixed; top: 0; width: 100%;
  background: transparent;
  z-index: 10;
  padding: 1.25rem 1.5rem;
  pointer-events: none; /* container */
}
.nav a { pointer-events: all; }

/* Active nav link */
.nav-link.active { color: var(--accent); }
```

### Buttons

**Primary CTA:**
```css
.btn-primary {
  background: #00E5C8;
  color: #000000;
  border-radius: 9999px;        /* pill */
  padding: 0.875rem 1.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid transparent;
  transition: background 0.3s, transform 0.2s;
}
.btn-primary:hover {
  background: #00C8AD;
  transform: translateY(-2px);
}
```

**Secondary / ghost:**
```css
.btn-ghost {
  background: transparent;
  color: #00E5C8;
  border: 1px solid #00E5C8;
  border-radius: 9999px;
  padding: 0.875rem 1.75rem;
}
.btn-ghost:hover {
  background: rgba(0,229,200,0.1);
  transform: translateY(-2px);
}
```

### Tech Tag Pills
```css
.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #00E5C8;
  border: 1px solid rgba(0,229,200,0.3);
  border-radius: 4px;
  padding: 2px 8px;
  letter-spacing: 0.04em;
}
```

### Work / Project Cards
```css
.card {
  background: #111111;
  border: 1px solid #222222;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.25s var(--ease), border-color 0.25s;
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(0,229,200,0.5);
}
```

### Section Headings (numbered)
```css
/* CSS counter for section numbers */
body { counter-reset: section; }
.section-heading::before {
  counter-increment: section;
  content: "0" counter(section) ".";
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  color: #00E5C8;
  display: block;
  margin-bottom: 0.25rem;
}
```

### Global Easing & Timing
```css
:root {
  --ease: cubic-bezier(0.645, 0.045, 0.355, 1);  /* Brittany's easing */
  --transition: all 0.25s var(--ease);
}
```

---

## 8. Content Strategy

### Tagline (choose one)
> "Building for greentech, AI tooling, and the open web."

> "Senior front-end engineer — 12 years, Berlin, sustainability projects, generative systems."

> "I build product interfaces at the intersection of front-end craft and AI tooling."

The tagline must encode: senior level + front-end identity + one differentiator (sustainability OR AI). Don't try to fit both in one line.

### About Section Copy Skeleton
```
Paragraph 1 (origin / human anchor):
"I'm a front-end engineer originally from Réunion Island, now based in Berlin.
I've spent twelve years building product interfaces — from piano learning apps
to invoice auditing platforms — mostly in React, always leaning front-end."

Paragraph 2 (values / differentiators):
"I'm drawn to teams working on problems that matter: sustainable food systems,
climate tech, and AI tooling that makes developers more capable. Alongside my 
product work I practice generative art and build with p5.js — I designed the
animation system running on Senvo.ai."

Paragraph 3 (gap + availability):
"Between Querfeld and Senvo I took time for personal projects, generative art
exploration, and deliberate learning in AI tooling. My current role at Senvo
ends in August 2026 — I'm open to opportunities from September."
```

### What to Omit from the Site (belongs on PDF CV only)
- Education (3 entries)
- Phone number
- Star ratings (★★★★☆)
- Hobbies as a section
- Age / birth year
- The older roles (Taledo, Places by Ansamb, Reuniwatt) as homepage entries — include in full PDF CV

---

## 9. Interactions & Animation

### Scroll behavior
- Elements in the right column fade up on scroll into viewport: `opacity: 0 → 1`, `translateY: 20px → 0`, `duration: 0.5s var(--ease)`
- Stagger items within a section: each item delayed by `+0.1s`
- `prefers-reduced-motion: reduce` — disable all animations, no fade-up

### Nav hide/show on scroll
```
Scrolling down → nav slides up: translateY(-70px)
Scrolling up → nav returns: translateY(0)
Both: transition 0.3s var(--ease)
```

### Image hover (project screenshots)
```
Default: grayscale(70%) brightness(0.8)
Hover: grayscale(0) brightness(1)
Transition: 0.3s var(--ease)
```

### Section active state in sidebar nav
```
Active section → left bar indicator transitions: transform: translateY(N * --tab-height)
Transition: 0.25s var(--ease) 0.1s delay
```

### Word-by-word hero title animation (optional)
If the name loads with a word-by-word reveal (Artone pattern):
```
Each word: opacity 0 → 1, translateY 20px → 0
Stagger: 0.1s per word
Ease: var(--ease)
Total duration for "Adrien Robert": ~0.4s
```

---

## 10. Inspiration Precedents — Quick Reference

| Site | What to take |
|------|-------------|
| **Senvo.ai** | Full-viewport p5.js canvas; per-section accent color; transparent sticky nav; pill buttons; breathing animation speed; the column waterfall code itself |
| **Brittany Chiang** | Sticky two-column layout; numbered section headings; tabbed experience section; skills embedded in About; `0.25s cubic-bezier(0.645,0.045,0.355,1)` easing; image grayscale→color hover |
| **A Means to an End** | "The site IS the work" principle; colored dot taxonomy; flat nav confidence; INVERT toggle concept |
| **KakaoBank Careers** | Pill filter tabs; editorial restraint; typographic-only sidebar; superscript metadata |
| **Dribbble concept** | Oversized name as visual anchor; "one signature device" principle; panel-within-viewport composition |
| **Artone Studio** | Word-by-word H1 animation; stats credibility bar; late-placement bio (work earns the intro); dual pill-button CTA pairing |
| **Dossier** | Stats counter row; dark hero → light body arc; split two-tone section headings |
| **Cargo** | 9/3 image/text ratio on project pages; metadata header pattern; HR-only structure |

---

## 11. Things NOT to Copy

| Pattern | Why to avoid |
|---------|-------------|
| Senvo's `#D6F306` lime | Their brand color — use your own |
| Brittany's exact navy (`#0a192f`) palette | Widely cloned, immediately recognisable as "the Brittany template" |
| Dossier's 10-section freelancer funnel | Optimised for client conversion, not hiring managers |
| Star rating bars (★★★★☆) | Meaningless on a personal site — use contextual evidence instead |
| Cargo's no-hero, no-bio approach | Too opaque for a job-seeker audience |
| A Means to an End's complete bio omission | Their audience knows them — yours doesn't |
| Vertical pill navigation from Dribbble | Too recognisable as that specific reference; find your own device |

---

## 12. Tech Stack Recommendation

Given the Next.js / Vercel ecosystem and the need for the p5.js canvas:

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js App Router | Native on Vercel, good for static + dynamic |
| Styling | Tailwind CSS | Rapid iteration; pairs well with custom CSS variables |
| Animation | p5.js (canvas) + Framer Motion (UI) | Canvas = generative art; Framer = scroll reveal, hover effects |
| Font loading | `next/font` with variable font | Zero layout shift; supports Geist natively |
| Deployment | Vercel | Native, fast, preview URLs for iteration |
| CMS (optional) | None — MDX files | Projects/writing as MDX keeps it simple and version-controlled |

---

*Research files in `/research/`. Screenshots in `/screenshots/`. Profile data in `PROFILE.md`.*
