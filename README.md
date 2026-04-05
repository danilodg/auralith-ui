# Auralith UI

Auralith UI is a React component library focused on premium, glass-inspired product interfaces. It provides reusable primitives, composed patterns, and a shared visual language so different apps keep the same look and behavior.

## Why this library

- Keep visual consistency across projects with the same token base.
- Speed up implementation with production-ready form, overlay, and navigation components.
- Preserve a strong visual identity without rebuilding the same UI foundations each time.

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

## Components included

### Primitives
- `Button`
- `Tag`
- `SectionLabel`

### Forms
- `Input`
- `Textarea`
- `Checkbox`
- `Select`
- `DateInput`, `TimeInput`, `NumberInput`

### Surfaces and overlays
- `Card`
- `GlassPanel`
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

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS v4

## License

MIT
