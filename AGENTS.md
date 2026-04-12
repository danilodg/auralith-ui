# AGENTS

## Repo shape
- Single-package React + TypeScript + Vite repo.
- Two outputs from one codebase:
  - Showcase/docs app (`src/main.tsx`, `src/App.tsx`) -> `dist-showcase/`
  - Published library entry (`src/lib/index.ts`) -> `dist/`

## Source of truth for package output
- Public exports are defined in `src/lib/index.ts`.
- Published CSS is `./styles.css` -> `dist/auralith-ui.css`.
- `dist/` and `dist-showcase/` are generated artifacts; do not hand-edit.

## Current npm release
- Latest published package: `auralith-ui@0.1.2`.
- Quick check: `npm view auralith-ui version`.

## Commands
- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build` (showcase: `tsc -b && vite build` to `dist-showcase/`)
- `npm run build:lib` (library bundle + declaration emit)
- `npm run pack:check`

## GitHub Pages critical path rules
- Vite base is dynamic via `VITE_BASE_PATH` (`vite.config.ts`).
- Pages workflow sets this automatically (`.github/workflows/deploy-pages.yml`).
- Any app asset URL used by showcase must be base-aware:
  - TSX: `${import.meta.env.BASE_URL}file.ext`
  - `index.html`: `%BASE_URL%file.ext`
- Avoid root-absolute paths (`/file.ext`) in showcase UI.

## SiteBackground gotcha
- `SiteBackground` (`src/features/shared/site-background.tsx`) uses inline `style` for gradients/grid.
- Do not revert to Tailwind arbitrary utility strings for these dynamic patterns; production builds can drop/alter them.

## Type declaration scope gotcha
- `tsconfig.lib.json` currently includes `src/lib/**/*` plus `src/types/navigation.ts`.
- Exported types outside these globs will be missing from published declarations until include paths are updated.

## Lint reality (current)
- `npm run lint` currently reports existing errors/warnings in some lib components (`select`, `side-rail`, `toast`, `date-input`).
- If your task is unrelated, avoid broad refactors just to clear pre-existing lint debt.

## Practical verification order
- Library changes: `npm run build:lib` -> `npm run pack:check`.
- Showcase changes: `VITE_BASE_PATH=/auralith-ui/ npm run build` (to mirror Pages behavior).

## Documentation policy (Context7 first)
- For library/framework documentation, query Context7 first.
- If Context7 is missing or outdated for the topic, then use official web docs.
- After relying on non-Context7 docs, note a Context7 coverage gap for future update.
