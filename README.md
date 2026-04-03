# Auralith UI

Biblioteca React para interfaces premium com a identidade visual Auralith.

## Instalar

```bash
npm install auralith-ui
```

## Uso basico

```tsx
import { Button, Card } from 'auralith-ui'

export function Example() {
  return (
    <Card>
      <Button>Launch flow</Button>
    </Card>
  )
}
```

Os estilos da biblioteca sao importados automaticamente pelo entrypoint principal. Se preferir importar manualmente, use:

```ts
import 'auralith-ui/styles.css'
```

## Stack inicial

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- Lucide React

## Direcao visual

- atmosfera tecnologica e premium
- superfices glass com blur e borda suave
- gradientes frios com glow controlado
- tipografia com `Space Grotesk`, `Outfit` e `IBM Plex Mono`
- componentes pensados para portfolio, auth flows, landing pages e produtos digitais

## Estrutura inicial

```text
src/
  App.tsx              # Showcase inicial da biblioteca
  index.css            # Tokens globais e base visual
  lib/
    components/
      button.tsx
      glass-panel.tsx
      section-label.tsx
      tag.tsx
    tokens/
      theme.ts
    utils/
      cn.ts
    index.ts
```

## Primeiros componentes

- `Button`
- `GlassPanel`
- `SectionLabel`
- `Tag`
- `Input`
- `Textarea`
- `Card`
- `SectionHeader`
- `ProjectCard`
- `AuthShell`
- `SideRail`

## Proximos passos naturais

1. extrair estados adicionais de formulario, como erro, sucesso e loading
2. criar variantes de `ProjectCard` com media, metricas e CTA configuravel
3. adicionar temas claro/escuro controlados por provider
4. decidir se a biblioteca vai publicar pacote npm ou funcionar primeiro como monorepo interno

## Publicando no npm

```bash
npm login
npm run build:lib
npm publish
```

Para revisar o conteudo do pacote antes de publicar:

```bash
npm run pack:check
```

## Rodando localmente

```bash
npm install
npm run dev
```
