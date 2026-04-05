import { BookOpen, TerminalSquare } from 'lucide-react'

import { Card, CodeBlock, GlassPanel, SectionLabel, Tag } from '../lib'
import { SectionHeader } from '../lib/components/section-header'
import type { Language } from '../i18n'
import type { DocPage } from '../types/docs'

export function createDocsPages(language: Language): DocPage[] {
  const isPt = language === 'pt'

  return [
    {
      id: 'installation',
      title: isPt ? 'Instalacao' : 'Installation',
      description: isPt ? 'Como instalar a biblioteca e preparar o ambiente no seu projeto.' : 'How to install the library and prepare the environment in your project.',
      href: '#docs/installation',
      urlText: 'docs/installation',
      icon: <TerminalSquare size={16} strokeWidth={1.8} />,
      content: (
        <div className="flex flex-col gap-6">
          <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <GlassPanel className="p-2 sm:p-2 lg:p-2">
              <div className="flex flex-wrap gap-3">
                <Tag>docs</Tag>
                <Tag>{isPt ? 'Instalacao' : 'Installation'}</Tag>
                <Tag>docs/installation</Tag>
              </div>

              <SectionHeader
                className="mt-6"
                eyebrow={isPt ? 'Pagina de documentacao' : 'Documentation page'}
                heading={isPt ? 'Instalacao' : 'Installation'}
                description={isPt ? 'Como instalar a biblioteca e preparar o ambiente no seu projeto.' : 'How to install the library and prepare the environment in your project.'}
              />

              <div className="mt-6 space-y-4">
                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                    {isPt ? 'Instalar pacote' : 'Install package'}
                  </p>
                  <CodeBlock
                    className="mt-2"
                    showLanguageTabs={false}
                    snippets={[{ code: 'npm install auralith-ui', language: 'bash', label: 'Bash' }]}
                  />
                </div>

                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                    {isPt ? 'Incluir estilos' : 'Include styles'}
                  </p>
                  <CodeBlock
                    className="mt-2"
                    showLanguageTabs={false}
                    snippets={[{ code: "@import 'auralith-ui/styles.css';", language: 'css', label: 'CSS' }]}
                  />
                </div>
              </div>
            </GlassPanel>

            <Card className="p-2 sm:p-2 lg:p-2" variant="elevated">
              <SectionLabel>{isPt ? 'Checklist de setup' : 'Setup checklist'}</SectionLabel>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Tag>react 19+</Tag>
                <Tag>typescript</Tag>
                <Tag>tailwind v4</Tag>
              </div>
              <div className="mt-6 grid gap-3">
                {[0, 1, 2].map((index) => {
                  const content = isPt
                    ? [
                        ['1. Instale a biblioteca', 'Adicione o pacote no projeto onde os componentes serao usados.'],
                        ['2. Importe os estilos', 'Garanta que os tokens visuais e estilos base carreguem no app.'],
                        ['3. Use os componentes', 'Importe `Button`, `Input`, `Card` e os outros blocos conforme necessario.'],
                      ][index]
                    : [
                        ['1. Install the library', 'Add the package to the project where the components will be used.'],
                        ['2. Import the styles', 'Make sure the visual tokens and base styles are loaded in the app.'],
                        ['3. Use the components', 'Import `Button`, `Input`, `Card` and the other building blocks as needed.'],
                      ][index]

                  return (
                    <Card className="p-2" key={content[0]} variant="subtle">
                      <p className="font-medium text-[color:var(--text-main)]">{content[0]}</p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{content[1]}</p>
                    </Card>
                  )
                })}
              </div>
            </Card>
          </section>
        </div>
      ),
    },
    {
      id: 'usage',
      title: isPt ? 'Uso' : 'Usage',
      description: isPt ? 'Como importar, combinar e escalar os componentes no seu projeto.' : 'How to import, combine and scale the components in your project.',
      href: '#docs/usage',
      urlText: 'docs/usage',
      icon: <BookOpen size={16} strokeWidth={1.8} />,
      content: (
        <div className="flex flex-col gap-6">
          <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <GlassPanel className="p-2 sm:p-2 lg:p-2">
              <div className="flex flex-wrap gap-3">
                <Tag>docs</Tag>
                <Tag>{isPt ? 'Uso' : 'Usage'}</Tag>
                <Tag>docs/usage</Tag>
              </div>

              <SectionHeader
                className="mt-6"
                eyebrow={isPt ? 'Pagina de documentacao' : 'Documentation page'}
                heading={isPt ? 'Uso' : 'Usage'}
                description={isPt ? 'Como importar, combinar e escalar os componentes no seu projeto.' : 'How to import, combine and scale the components in your project.'}
              />

              <div className="mt-6 space-y-4">
                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{isPt ? 'Exemplo de import' : 'Example import'}</p>
                  <CodeBlock
                    className="mt-2"
                    showLanguageTabs={false}
                    snippets={[{ code: "import { Button, Card, Input } from 'auralith-ui'", language: 'ts', label: 'TS' }]}
                  />
                </div>

                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{isPt ? 'Compor patterns' : 'Compose patterns'}</p>
                  <CodeBlock
                    className="mt-2"
                    showLanguageTabs={false}
                    snippets={[{ code: `<Card>
  <Input label="Email" />
  <Button>Continue</Button>
</Card>`, language: 'tsx', label: 'TSX' }]}
                  />
                </div>
              </div>
            </GlassPanel>

            <Card className="p-2 sm:p-2 lg:p-2" variant="elevated">
              <SectionLabel>{isPt ? 'Diretrizes' : 'Guidelines'}</SectionLabel>
              <div className="mt-6 grid gap-3">
                {(isPt
                  ? [
                      ['Use primitives primeiro', 'Comece por `Button`, `Input`, `Tag` e `Card` antes de subir para patterns.'],
                      ['Escalone com patterns', 'Use `Modal`, `DropdownMenu` e `Tooltip` para acelerar interacoes e overlays.'],
                      ['Mantenha consistencia visual', 'Preserve os tokens de cor, sombra e tipografia da biblioteca.'],
                    ]
                  : [
                      ['Use primitives first', 'Start with `Button`, `Input`, `Tag` and `Card` before moving up to patterns.'],
                      ['Scale with patterns', 'Use `Modal`, `DropdownMenu` and `Tooltip` to accelerate interactions and overlays.'],
                      ['Keep visual consistency', 'Preserve the color, shadow and typography tokens from the library.'],
                    ]).map((item) => (
                  <Card className="p-2" key={item[0]} variant="subtle">
                    <p className="font-medium text-[color:var(--text-main)]">{item[0]}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{item[1]}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </section>
        </div>
      ),
    },
  ]
}
