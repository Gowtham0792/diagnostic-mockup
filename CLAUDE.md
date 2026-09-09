# CLAUDE.md

## What this is

A **visual-only mockup** of a vehicle diagnostic application. There is no
backend and there will not be one in this repo — the goal is to render and
iterate on the UI/UX. Do not add servers, APIs, databases, auth, or real
network/OBD communication. Simulated behavior (timers, random walks over mock
data) is fine and lives in the components or `src/data/mock.ts`.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v3 (`darkMode: 'class'`, theme toggled on `<html>`)
- lucide-react for icons, Recharts for charts
- No router — `src/App.tsx` holds a small `nav` array and swaps pages by state

## Layout

```
src/
  App.tsx            sidebar + header shell, page switching
  components/ui.tsx   Card, SectionTitle, Badge, Stat, cn() helper
  data/mock.ts        ALL mock data — vehicle, ECUs, DTCs, PIDs, trend, guided test
  pages/              one file per screen (Dashboard, Faults, LiveData, GuidedTest, Report)
```

## Conventions

- Colors come from CSS variables in `src/index.css` exposed as Tailwind tokens:
  `bg-panel`, `text-ink`, `text-muted`, `border-line`, `bg-brand`. Use these,
  not hard-coded hex, so light/dark both work.
- Keep new screens as a single file in `src/pages/` and register them in the
  `nav` array in `App.tsx`.
- Put any new mock data in `src/data/mock.ts` with a typed interface.
- `npm run build` must pass (`tsc -b` is part of it) before committing.

## Commands

- `npm run dev` — dev server
- `npm run build` — typecheck + production build
- `npm run lint` — oxlint
