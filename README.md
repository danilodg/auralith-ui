# Auralith UI

Auralith UI is a React component library focused on premium, glass-inspired product interfaces. It provides reusable primitives, composed patterns, and a shared visual language so different apps keep the same look and behavior.

## Official links

- GitHub repository: [https://github.com/danilodg/auralith-ui](https://github.com/danilodg/auralith-ui)
- Live docs/showcase: [https://danilodg.github.io/auralith-ui/?lang=pt](https://danilodg.github.io/auralith-ui/?lang=pt)

## What this project is

This repository has two goals:

- ship a reusable frontend library (`auralith-ui` on npm)
- keep a live showcase/docs app to demonstrate components and patterns

If you only want to use the library in another app, install from npm and import from `auralith-ui`.
If you want to contribute or explore components visually, run this repo locally and use the showcase app.

## Why this library

- Keep visual consistency across projects with the same token base.
- Speed up implementation with production-ready form, overlay, and navigation components.
- Preserve a strong visual identity without rebuilding the same UI foundations each time.

## What you get in practice

- Consistent form controls with predictable states and sizing.
- Ready-to-use overlays and navigation patterns for app shells.
- Shared style tokens and CSS that keep visual rhythm across products.
- Typed React components that fit strict TypeScript projects.

## Installation

```bash
npm install auralith-ui
```

Import styles once in your app entrypoint (`main.tsx` or `App.tsx`):

```ts
import 'auralith-ui/styles.css'
```

## Quick usage

```tsx
import { Button, Card, Input, SectionLabel } from 'auralith-ui'

export function SignupCard() {
  return (
    <Card className="p-4">
      <SectionLabel>Get started</SectionLabel>
      <Input label="Email" placeholder="you@email.com" />
      <Button className="mt-3">Continue</Button>
    </Card>
  )
}
```

## Typical use cases

- Internal dashboards that need a cohesive visual system.
- SaaS frontends that want premium visuals without custom UI from scratch.
- Teams that want one source of truth for shared React UI components.

## Components included

### Primitives
- `Button`
- `Tag`
- `SectionHeader`
- `SectionLabel`
- `Separator`

### Forms
- `Input`
- `Textarea`
- `Checkbox`
- `Select`
- `DateInput`, `TimeInput`, `NumberInput`

### Surfaces and overlays
- `Card`
- `GlassPanel`
- `AlertDialog`
- `Modal`
- `Tooltip`
- `DropdownMenu`

### App patterns
- `SideRail`
- `AuthShell`
- `CodeBlock`

## Development commands

```bash
# install deps
npm install

# run showcase/docs app
npm run dev

# lint
npm run lint

# build showcase app
npm run build

# build publishable library bundle + types
npm run build:lib

# validate package contents before publish
npm run pack:check
```

## How this repo is organized

- Library entry exports: `src/lib/index.ts`
- Published styles entry: `src/lib/styles.css`
- Showcase/docs app: `src/main.tsx` + `src/App.tsx`
- Library output: `dist/`
- Showcase build output: `dist-showcase/`

## Publish flow

```bash
npm run lint
npm run build:lib
npm run pack:check
npm publish
```

## Project structure

```text
src/
  App.tsx                 # showcase/docs app
  main.tsx
  index.css
  lib/
    index.ts              # public library exports
    styles.css            # shared styles/tokens
    components/
    tokens/
    utils/
  features/
  pages/
  data/
```

## Contributing notes

- Add or update components under `src/lib/components/`.
- Export new public APIs from `src/lib/index.ts`.
- Validate package output with `npm run build:lib` and `npm run pack:check`.
- Use `npm run dev` to verify docs/showcase behavior before release.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS v4

## License

MIT
