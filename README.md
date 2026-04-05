# Auralith UI

React component library for premium product interfaces, with an integrated visual system and responsive behavior tuned for small screens.

## What is included

- Reusable UI components for forms, layout, overlays, and navigation.
- Shared design tokens (color, blur, border, glow, typography).
- Built-in styles via the library entrypoint.
- Interactive local showcase for documentation and previews.

## Installation

```bash
npm install auralith-ui
```

## Quick usage

```tsx
import { Button, Card } from 'auralith-ui'
import 'auralith-ui/styles.css'

export function Example() {
  return (
    <Card>
      <Button>Launch flow</Button>
    </Card>
  )
}
```

Always import the stylesheet once in your app entrypoint (for example `main.tsx` or `App.tsx`):

```ts
import 'auralith-ui/styles.css'
```

## Core components

- `Button`
- `Tag`
- `Input`
- `Textarea`
- `Card`
- `GlassPanel`
- `Modal`
- `Tooltip`
- `DropdownMenu`
- `AuthShell`
- `SideRail`
- `SectionLabel`

## Tech stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- Lucide React

## Local development

```bash
npm install
npm run dev
```

## Build and validation

```bash
# Build showcase app
npm run build

# Build package for distribution
npm run build:lib

# Validate publish contents
npm run pack:check

# Lint
npm run lint
```

## Publish to npm

```bash
npm login
npm run build:lib
npm publish
```

## Project structure

```text
src/
  App.tsx
  index.css
  lib/
    components/
    tokens/
    utils/
    index.ts
  features/
  data/
  pages/
```

## Design direction

- Premium, technical look and feel.
- Glass-like surfaces with controlled glow.
- Clear visual hierarchy with compact spacing.
- Typography using `Space Grotesk`, `Outfit`, and `IBM Plex Mono`.

## License

MIT
