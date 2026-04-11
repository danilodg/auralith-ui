# Auralith UI - Architecture Context (Context7)

Este documento registra as referencias principais usadas para orientar decisoes tecnicas da biblioteca `auralith-ui`.

## Context7 Sources

- React: `/reactjs/react.dev`
- Vite: `/vitejs/vite/v8.0.7`
- Tailwind CSS: `/tailwindlabs/tailwindcss.com`

## Projeto Atual (resumo)

- Pacote: `auralith-ui`
- Versao atual no `package.json`: `0.1.2`
- Stack principal: React + TypeScript + Vite + Tailwind CSS v4
- Distribuicao da lib: ESM + CJS + types em `dist/`

## Decisoes Tecnicas

### 1) React como peer dependency

- `react` e `react-dom` devem continuar em `peerDependencies` para evitar bundle duplicado de React no app consumidor.
- Suporte minimo atual: `>=18`.

### 2) Vite em modo biblioteca

- Usar `vite build --mode lib` para gerar artefatos da biblioteca.
- Manter saidas ESM/CJS alinhadas com `package.json`:
  - `main`: `./dist/index.cjs`
  - `module`: `./dist/index.js`
  - `types`: `./dist/types/lib/index.d.ts`
- Manter `exports` com entrada principal e `./styles.css`.

### 3) Tailwind v4 com plugin oficial

- Integracao via `@tailwindcss/vite`.
- Estilos base via `@import "tailwindcss"`.
- Biblioteca publica deve expor CSS compilado e manter `sideEffects` para arquivos CSS.

## Checklist de publicacao npm

1. Validar qualidade:
   - `npm run lint`
   - `npm run build:lib`
   - `npm run pack:check`
2. Subir versao:
   - `npm version patch` (ou `minor`/`major`)
3. Publicar:
   - `npm publish --access public`
4. Publicar git tag:
   - `git push origin main --tags`
5. Confirmar no registro:
   - `npm view auralith-ui version`

## Notas rapidas

- Nunca reutilizar numero de versao ja publicado no npm.
- Sempre revisar conteudo do pacote antes de publicar (`npm pack --dry-run`).
- Se usar autenticacao com 2FA, publicar com OTP ou token granular corretamente configurado.
