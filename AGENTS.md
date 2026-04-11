# AGENTS

## Repo shape
- Single-package project (not a monorepo): React + TypeScript + Vite.
- This repo serves two roles from one codebase:
  - Showcase app (dev/docs site) from `src/main.tsx` + `src/App.tsx`.
  - Published UI library from `src/lib/index.ts`.

## Source of truth for package output
- Library public exports are defined only in `src/lib/index.ts`.
- Library styles are loaded by that entrypoint via `import './styles.css'`.
- npm package output is `dist/` (see `package.json` `main/module/types/exports`).
- `dist/` is generated; do not hand-edit build artifacts.

## Current npm release
- Latest published version: `auralith-ui@0.1.2`.
- Quick check command: `npm view auralith-ui version`.

## Commands you should actually run
- Install deps: `npm install`
- Local dev (showcase): `npm run dev`
- Lint: `npm run lint`
- Build showcase: `npm run build` (runs `tsc -b` + Vite app build to `dist-showcase/`)
- Build publishable library: `npm run build:lib` (Vite lib mode + declaration emit)
- Validate npm publish contents: `npm run pack:check`

## TypeScript/build gotcha
- Declaration generation is controlled by `tsconfig.lib.json` and currently includes `src/lib/**/*` plus `src/types/navigation.ts`.
- If you add exported library types/files outside those globs, declarations will be missing from `dist/types` until `tsconfig.lib.json` is updated.

## Tooling specifics
- Tailwind CSS v4 is wired through `@tailwindcss/vite` and CSS `@import 'tailwindcss'` (no Tailwind config file in repo).
- ESLint uses flat config in `eslint.config.js` and targets `**/*.{ts,tsx}`.

## Practical verification order
- For library changes: `npm run lint` -> `npm run build:lib` -> `npm run pack:check`.
- For showcase/docs changes: `npm run lint` -> `npm run build`.
