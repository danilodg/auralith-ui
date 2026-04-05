# Auralith UI

React component library focused on premium, glass-inspired interfaces with reusable primitives and patterns.

## Install

```bash
npm install auralith-ui
```

Import styles once in your app entrypoint:

```ts
import 'auralith-ui/styles.css'
```

## Quick usage

```tsx
import { Button, Card, Input } from 'auralith-ui'

export function Example() {
  return (
    <Card className="p-4">
      <Input label="Email" placeholder="you@email.com" />
      <Button className="mt-3">Continue</Button>
    </Card>
  )
}
```

## Included components

- `Button`, `Tag`, `SectionLabel`
- `Input`, `Textarea`, `Checkbox`, `Select`, date/time/number inputs
- `Card`, `GlassPanel`, `Modal`, `Tooltip`, `DropdownMenu`
- `SideRail`, `AuthShell`, `CodeBlock`

## Local development

```bash
npm install
npm run dev
```

## Validation and build

```bash
npm run lint
npm run build
npm run build:lib
npm run pack:check
```

## Publish

```bash
npm run build:lib
npm publish
```

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS v4

## License

MIT
