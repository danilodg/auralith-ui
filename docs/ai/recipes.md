# Auralith UI Recipes

Reusable implementation recipes for AI agents and developers.

## Login Card

Use `Card`, `Input`, and `Button`.

```tsx
import { Button, Card, Input } from 'auralith-ui'

export function LoginCard() {
  return (
    <Card className="grid w-full max-w-md gap-4 p-4">
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--text-main)]">Entrar</h1>
        <p className="mt-1 text-sm text-[color:var(--text-muted)]">Acesse sua conta.</p>
      </div>
      <Input label="Email" type="email" placeholder="voce@email.com" />
      <Input label="Senha" type="password" placeholder="Sua senha" />
      <Button type="submit">Entrar</Button>
    </Card>
  )
}
```

## Settings Menu

Use `DropdownMenu`. Do not create a custom absolute-position menu.

```tsx
import { Button, DropdownMenu } from 'auralith-ui'

export function SettingsMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary">Configuracoes</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Editar</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicar</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="text-red-400 hover:bg-red-500/10">Excluir</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
```

## Interactive Floating Profile

Use `Popover`, not `Tooltip`, because the content contains buttons.

```tsx
import { Avatar, Button, Popover } from 'auralith-ui'

export function ProfilePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 rounded-[8px] p-2 hover:bg-[color:var(--surface-hover)]">
          <Avatar fallback="DG" />
          <span>Danilo Gomes</span>
        </button>
      </Popover.Trigger>
      <Popover.Content className="grid min-w-[260px] gap-3">
        <div className="flex items-center gap-3">
          <Avatar fallback="DG" size="lg" />
          <div>
            <p className="font-semibold text-[color:var(--text-main)]">Danilo Gomes</p>
            <p className="text-sm text-[color:var(--text-muted)]">Online agora</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="min-w-0 flex-1">Seguir</Button>
          <Button className="min-w-0 flex-1" variant="secondary">Convidar</Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
```

## Destructive Confirmation

Use `AlertDialog`, not `Modal`.

```tsx
import { AlertDialog, Button } from 'auralith-ui'

export function DeleteAction() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="secondary">Excluir</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Excluir item?</AlertDialog.Title>
          <AlertDialog.Description>Essa acao nao pode ser desfeita.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action>Excluir</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
```

## Dashboard Table

Use `DataTable`, `TableToolbar`, `SearchInput`, and `Pagination`.

```tsx
import { Card, DataTable, Pagination, SearchInput, TableToolbar } from 'auralith-ui'

export function UsersTable() {
  return (
    <Card className="grid gap-4 p-4">
      <TableToolbar>
        <SearchInput placeholder="Buscar usuarios" />
      </TableToolbar>
      <DataTable columns={[]} data={[]} />
      <Pagination page={1} totalPages={10} onPageChange={() => {}} />
    </Card>
  )
}
```

## Empty List

Use `EmptyState`, not a plain centered paragraph.

```tsx
import { Button, EmptyState } from 'auralith-ui'

export function NoResults() {
  return (
    <EmptyState
      title="Nenhum resultado"
      description="Tente ajustar os filtros ou criar um novo item."
      action={<Button>Criar item</Button>}
    />
  )
}
```
