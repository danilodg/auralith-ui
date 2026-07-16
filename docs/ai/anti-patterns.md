# Auralith UI Anti-patterns

Avoid these patterns when building with Auralith UI.

## Recreating Existing Components

Do not create custom versions of:

- Button
- Card
- Input
- Textarea
- Modal
- AlertDialog
- DropdownMenu
- Tooltip
- Popover
- Toast
- Navbar
- SideRail
- DataTable

Use the component from `auralith-ui` and compose with Tailwind classes.

## CSS Files for Local Component Styling

Avoid creating `component.css` for normal component layout.

Prefer:

```tsx
<Card className="grid gap-4 p-4 md:grid-cols-2" />
```

Instead of:

```tsx
import './component.css'
```

Keep global CSS limited to:

- Auralith style import
- Tailwind import
- global tokens
- global resets
- browser scrollbar behavior

## Interactive Tooltips

Do not place buttons, links, forms, or menus inside `Tooltip`.

Use `Popover` for interactive floating content.

## Destructive Actions Without Confirmation

Do not run destructive actions directly from `Button` or `DropdownMenu.Item` without a confirmation step.

Use `AlertDialog`.

## Hardcoded Colors

Avoid hardcoded colors such as `#fff`, `black`, `rgb(...)`, or arbitrary brand values when theme tokens exist.

Prefer:

```tsx
className="text-[color:var(--text-main)] bg-[color:var(--surface-panel-3)] border-[color:var(--card-border)]"
```

## Broad Global Selectors

Avoid global selectors like:

```css
button { ... }
input { ... }
* { color: ... }
```

These can break Auralith UI components.

## Native Inputs for Standard Forms

Avoid native `input`, `textarea`, and `select` when Auralith UI has a component for the same purpose.

Use `Input`, `Textarea`, `Select`, `Combobox`, `DateInput`, `TimeInput`, and `NumberInput`.

## Inconsistent Theme Handling

Do not invent a separate theme mechanism.

Use `data-theme="light"` and `data-theme="dark"` on the root document element.
