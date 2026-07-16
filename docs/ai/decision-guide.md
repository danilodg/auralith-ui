# Auralith UI Decision Guide

Use this guide when an AI agent or developer needs to decide which Auralith UI component to use.

## Core Rule

Prefer `auralith-ui` components before creating custom UI. Use Tailwind utilities for layout, spacing, responsive behavior, and local composition.

## Forms

Use `Input` for short single-line values.

Use `Textarea` for comments, descriptions, messages, and long text.

Use `SearchInput` for search and filtering. Do not use `Input` with a custom search icon if `SearchInput` fits.

Use `NumberInput`, `DateInput`, and `TimeInput` for typed numeric/date/time values.

Use `Select` for short fixed lists.

Use `Combobox` for large or searchable lists.

Use `Checkbox` for a single boolean form value.

Use `Switch` for an immediate setting toggle.

Use `RadioGroup` when exactly one option must be selected from a short list.

## Surfaces

Use `Card` for grouped content, form panels, dashboard cards, and settings sections.

Use `GlassPanel` when the panel should be visually prominent or premium.

Use `Separator` to separate related groups without adding a new surface.

Use `Badge` for status, categories, labels, or short counts.

Use `Tag` for selectable or decorative tags.

## Overlays

Use `Modal` for short blocking workflows, such as quick edit or small forms.

Use `AlertDialog` for destructive or irreversible actions.

Use `Sheet` for side-panel workflows, detail drawers, and mobile panels.

Use `DropdownMenu` for contextual actions such as settings, row menus, and avatar menus.

Use `ContextMenu` for right-click object actions.

Use `Tooltip` only for short, non-interactive hints. Do not place buttons, forms, or menus in a tooltip.

Use `Popover` for floating content that contains interaction, such as buttons, links, inputs, or rich previews.

## Feedback

Use `ToastProvider`, `Toast`, and `useToast` for non-blocking success/error feedback.

Use `EmptyState` when a list, table, or search has no content.

Use `Skeleton` for loading placeholders.

Use `Progress` for known progress values.

Use `Alert` for visible inline feedback in the page flow.

## Navigation

Use `Navbar` for top navigation in marketing pages or simple apps.

Use `SideRail` for dashboards and app shells with persistent navigation.

Use `Breadcrumb` for nested location context.

Use `Tabs` for related subviews inside the same page. Do not use tabs for unrelated app routes.

## Data

Use `DataTable` for structured tabular content.

Use `TableToolbar` with `SearchInput`, `Select`, and action buttons for table controls.

Use `Pagination` for paged table/list content.

## Common Decisions

### Tooltip vs Popover

Use `Tooltip` for text-only hints.

Use `Popover` if the content has buttons, links, inputs, or any interaction.

### Modal vs Sheet

Use `Modal` for focused, short tasks that block the page.

Use `Sheet` for secondary workflows that should keep page context visible.

### Modal vs AlertDialog

Use `AlertDialog` for destructive confirmation.

Use `Modal` for normal editing or content display.

### Select vs Combobox

Use `Select` for small known lists.

Use `Combobox` for long or searchable lists.

### Navbar vs SideRail

Use `Navbar` for landing pages and simple navigation.

Use `SideRail` for dashboard/app navigation.

## Styling Rules

Use Tailwind classes for layout:

```tsx
<Card className="grid gap-4 p-4 md:grid-cols-2">
  ...
</Card>
```

Use theme tokens for custom color needs:

```tsx
<div className="border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] text-[color:var(--text-main)]" />
```

Avoid component CSS files for local styling. Prefer className composition.

## Import Pattern

```tsx
import { Button, Card, Input, Modal } from 'auralith-ui'
```

Import styles once:

```ts
import 'auralith-ui/styles.css'
```
