# Portfolio — Somtochukwu Okafor

Personal developer portfolio, generated from a full evidence-based analysis of my own codebase. Every project, skill, and statistic on the site traces back to real source files.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Recharts · Lucide

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build (19 static routes)
npm run lint
```

## Structure

```
src/
  app/           routes: /, /projects, /projects/[slug], /skills, /dashboard, /about, /contact
  components/    nav, footer, ui primitives, project card, charts
  data/          profile, projects, skills, stats  <- all content lives here
  lib/           utils
```

To edit content, change the files in `src/data/` — no component changes needed.

## Design notes

- Dark theme by default, driven by CSS custom properties in `globals.css`
- Responsive from 375px up; mobile nav collapses to a menu
- Accessibility: semantic landmarks, `aria-current` on active nav, labelled icon links, `prefers-reduced-motion` support
- All routes statically generated

## Deploying

```bash
npx vercel --prod
```

## Honesty policy

Projects are labelled with a maturity badge (Production / Functional / Advanced prototype / Coursework). Where I contributed to a shared or third-party codebase, the project page says so explicitly. Work that was instructor-provided, AI-generated, downloaded, or otherwise not mine was excluded — see `../PORTFOLIO-REPORT.md` for the full list and reasoning.
