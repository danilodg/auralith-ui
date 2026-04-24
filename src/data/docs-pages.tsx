import { BookOpen, Layers, TerminalSquare } from 'lucide-react'

import { Card, CodeBlock, GlassPanel, SectionLabel, Tag } from '../lib'
import { SectionHeader } from '../lib/components/section-header'
import { RecommendedStackSection } from '../features/landing/recommended-stack-section'
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
          <RecommendedStackSection
            setup={{
              eyebrow: isPt ? 'Recomendado' : 'Recommended',
              title: isPt ? 'Setup rapido para projetos SaaS' : 'Fast setup for SaaS projects',
              description: isPt
                ? 'Gere um projeto pronto para producao com React 19, Vite, Tailwind v4 e Auralith UI integrada desde o primeiro commit.'
                : 'Generate a production-ready project with React 19, Vite, Tailwind v4, and Auralith UI integrated from the first commit.',
              badges: ['auralith-stack'],
              featureCards: [
                {
                  title: isPt ? 'Templates Premium' : 'Premium templates',
                  description: isPt ? 'Landing e Dashboard integrados.' : 'Integrated Landing and Dashboard.',
                },
                {
                  title: 'Zero Config',
                  description: isPt ? 'Tokens, tema e base prontos.' : 'Tokens, theme, and base ready.',
                },
              ],
              commandLabels: {
                landing: isPt ? 'Criar landing' : 'Create landing',
                dashboard: isPt ? 'Criar dashboard' : 'Create dashboard',
              },
              commands: {
                landing: 'npx create-auralith-app my-app --template landing',
                dashboard: 'npx create-auralith-app my-app --template dashboard',
              },
              repositoryLabel: isPt ? 'Repositorio:' : 'Repository:',
              repositoryUrl: 'https://github.com/danilodg/auralith-stack',
              repositoryText: 'github.com/danilodg/auralith-stack',
            }}
          />

          <section className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
            <GlassPanel className="min-w-0 flex flex-col justify-center border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-5 shadow-sm sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">docs</Tag>
                <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">{isPt ? 'Instalacao' : 'Installation'}</Tag>
                <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">docs/installation</Tag>
              </div>

              <SectionHeader
                className="mt-8"
                eyebrow={isPt ? 'Pagina de documentacao' : 'Documentation page'}
                heading={isPt ? 'Instalacao' : 'Installation'}
                description={isPt ? 'Como instalar a biblioteca e preparar o ambiente no seu projeto.' : 'How to install the library and prepare the environment in your project.'}
              />

              <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                    {isPt ? 'Instalar pacote' : 'Install package'}
                  </p>
                  <CodeBlock
                    className="mt-2 w-full"
                    showLanguageTabs={false}
                    snippets={[{ code: 'npm install auralith-ui', language: 'bash', label: 'Bash' }]}
                  />
                </div>

                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                    {isPt ? 'Incluir estilos' : 'Include styles'}
                  </p>
                  <CodeBlock
                    className="mt-2 w-full"
                    showLanguageTabs={false}
                    snippets={[{ code: "@import 'auralith-ui/styles.css';", language: 'css', label: 'CSS' }]}
                  />
                </div>
              </div>
            </GlassPanel>

             <Card className="group relative min-w-0 overflow-hidden border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-5 sm:p-8 lg:p-10" variant="elevated">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--accent-line)] opacity-[0.02] blur-[50px] group-hover:opacity-[0.04] transition-opacity duration-700" />
              <div className="relative z-10">
                <SectionLabel>{isPt ? 'Checklist de setup' : 'Setup checklist'}</SectionLabel>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Tag className="border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] px-2.5 py-1 text-[0.72rem] text-[color:var(--accent-line)] sm:text-[0.8rem]">react 19+</Tag>
                  <Tag className="border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] px-2.5 py-1 text-[0.72rem] text-[color:var(--accent-line)] sm:text-[0.8rem]">typescript</Tag>
                  <Tag className="border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] px-2.5 py-1 text-[0.72rem] text-[color:var(--accent-line)] sm:text-[0.8rem]">tailwind v4</Tag>
                </div>
                <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                  {(isPt
                    ? [
                        ['1. Instale a biblioteca', 'Adicione o pacote no projeto onde os componentes serao usados.'],
                        ['2. Importe os estilos', 'Garanta que os tokens visuais e estilos base carreguem no app.'],
                        ['3. Use os componentes', 'Importe `Button`, `Input`, `Card` e os outros blocos conforme necessario.'],
                        ['4. Para setup completo, use auralith-stack', 'Scaffold com CLI e templates landing/dashboard quando quiser iniciar um projeto novo do zero.'],
                        ['5. Suba o app localmente', 'Rode `npm run dev` para validar layout, tema e comportamento antes de publicar.'],
                      ]
                    : [
                        ['1. Install the library', 'Add the package to the project where the components will be used.'],
                        ['2. Import the styles', 'Make sure the visual tokens and base styles are loaded in the app.'],
                        ['3. Use the components', 'Import `Button`, `Input`, `Card` and the other building blocks as needed.'],
                        ['4. For full setup, use auralith-stack', 'Scaffold with CLI and landing/dashboard templates when you want a new project from scratch.'],
                        ['5. Run the app locally', 'Use `npm run dev` to validate layout, theme, and behavior before publishing.'],
                      ]).map((item) => (
                    <Card className="bg-[rgba(255,255,255,0.015)] p-3 transition-colors hover:border-[rgba(111,224,255,0.2)] sm:p-4" key={item[0]} variant="subtle">
                      <p className="font-medium text-[color:var(--text-main)]">{item[0]}</p>
                      <p className="mt-2 text-[0.9rem] leading-6 text-[color:var(--text-soft)] sm:text-[0.95rem]">{item[1]}</p>
                    </Card>
                  ))}
                </div>
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
          <section className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
            <GlassPanel className="min-w-0 flex flex-col justify-center border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-5 shadow-sm sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">docs</Tag>
                <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">{isPt ? 'Uso' : 'Usage'}</Tag>
                <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">docs/usage</Tag>
              </div>

              <SectionHeader
                className="mt-8"
                eyebrow={isPt ? 'Pagina de documentacao' : 'Documentation page'}
                heading={isPt ? 'Uso' : 'Usage'}
                description={isPt ? 'Como importar, combinar e escalar os componentes no seu projeto.' : 'How to import, combine and scale the components in your project.'}
              />

              <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{isPt ? 'Exemplo de import' : 'Example import'}</p>
                    <CodeBlock
                      className="mt-2 w-full"
                      showLanguageTabs={false}
                      snippets={[{ code: "import { Button, Card, Input } from 'auralith-ui'", language: 'ts', label: 'TS' }]}
                    />
                </div>

                <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-2">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{isPt ? 'Compor patterns' : 'Compose patterns'}</p>
                    <CodeBlock
                      className="mt-2 w-full"
                      showLanguageTabs={false}
                      snippets={[{ code: `<Card>
  <Input label="Email" />
  <Button>Continue</Button>
</Card>`, language: 'tsx', label: 'TSX' }]}
                    />
                </div>
              </div>
            </GlassPanel>

            <Card className="group relative min-w-0 overflow-hidden border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-5 sm:p-8 lg:p-10" variant="elevated">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--accent-line)] opacity-[0.02] blur-[50px] group-hover:opacity-[0.04] transition-opacity duration-700" />
              <div className="relative z-10">
                <SectionLabel>{isPt ? 'Diretrizes' : 'Guidelines'}</SectionLabel>
                <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                {(isPt
                  ? [
                      ['Navegue por categorias', 'Explore os componentes por blocos como Formularios, Overlays, Feedback e Dados.'],
                      ['Nao confunda selecao de campos', '`Checkbox` e booleano unico; `CheckboxGroup` e multiplo; `RadioGroup` e exclusivo.'],
                      ['Nao confunda overlays', '`DropdownMenu` e lista de acoes; `Popover` e painel contextual de conteudo rico.'],
                      ['Use primitives primeiro', 'Comece por `Button`, `Input`, `Tag` e `Card` antes de subir para patterns.'],
                      ['Escalone com patterns', 'Use `Modal`, `DropdownMenu` e `Tooltip` para acelerar interacoes e overlays.'],
                      ['Mantenha consistencia visual', 'Preserve os tokens de cor, sombra e tipografia da biblioteca.'],
                    ]
                  : [
                      ['Navigate by categories', 'Browse components by blocks like Forms, Overlays, Feedback, and Data.'],
                      ['Do not mix field selection patterns', '`Checkbox` is single boolean; `CheckboxGroup` is multi-select; `RadioGroup` is exclusive.'],
                      ['Do not mix overlay semantics', '`DropdownMenu` is an action list; `Popover` is a rich contextual panel.'],
                      ['Use primitives first', 'Start with `Button`, `Input`, `Tag` and `Card` before moving up to patterns.'],
                      ['Scale with patterns', 'Use `Modal`, `DropdownMenu` and `Tooltip` to accelerate interactions and overlays.'],
                      ['Keep visual consistency', 'Preserve the color, shadow and typography tokens from the library.'],
                    ]).map((item) => (
                  <Card className="bg-[rgba(255,255,255,0.015)] p-3 transition-colors hover:border-[rgba(111,224,255,0.2)] sm:p-4" key={item[0]} variant="subtle">
                    <p className="font-medium text-[color:var(--text-main)]">{item[0]}</p>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[color:var(--text-soft)] sm:text-[0.95rem]">{item[1]}</p>
                  </Card>
                ))}
              </div>
              </div>
            </Card>
          </section>
        </div>
      ),
    },
    {
      id: 'roadmap',
      title: isPt ? 'Roadmap de Componentes' : 'Component Roadmap',
      description: isPt ? 'Planejamento por etapas para evoluir a biblioteca sempre com implementacao + documentacao.' : 'Step-by-step plan to evolve the library with implementation + documentation every cycle.',
      href: '#docs/roadmap',
      urlText: 'docs/roadmap',
      icon: <Layers size={16} strokeWidth={1.8} />,
      content: (
        <div className="flex flex-col gap-6">
          <GlassPanel className="min-w-0 border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">docs</Tag>
              <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">roadmap</Tag>
              <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">docs/roadmap</Tag>
            </div>

            <SectionHeader
              className="mt-8"
              eyebrow={isPt ? 'Planejamento vivo' : 'Living plan'}
              heading={isPt ? 'Evolucao por etapas' : 'Stage-based evolution'}
              description={isPt ? 'Cada etapa adiciona novos componentes e atualiza a documentacao no mesmo ciclo de entrega.' : 'Each stage adds new components and updates documentation in the same delivery cycle.'}
            />
          </GlassPanel>

          <section className="grid gap-4">
            {(isPt
              ? [
                  ['Etapa 1: Form Foundation', 'FormField, RadioGroup e CheckboxGroup com docs e exemplos reais.'],
                  ['Etapa 2: Overlays e Mobile UX', 'Popover, Sheet e Combobox para fluxos de filtro e selecao.'],
                  ['Etapa 3: Feedback e Estados', 'Alert, Skeleton e EmptyState para estados de tela completos.'],
                  ['Etapa 4: Navegacao e Produtividade', 'Breadcrumb, Pagination e Stepper para fluxos maiores.'],
                  ['Etapa 5: Data UI', 'DataTable leve com toolbar, filtros e paginação.'],
                  ['Etapa 6: Release + Adocao', 'Publicacao npm, changelog e aplicacao nos projetos consumidores.'],
                ]
              : [
                  ['Stage 1: Form Foundation', 'FormField, RadioGroup, and CheckboxGroup with docs and real examples.'],
                  ['Stage 2: Overlays and Mobile UX', 'Popover, Sheet, and Combobox for filter and selection flows.'],
                  ['Stage 3: Feedback and States', 'Alert, Skeleton, and EmptyState for complete screen states.'],
                  ['Stage 4: Navigation and Productivity', 'Breadcrumb, Pagination, and Stepper for larger flows.'],
                  ['Stage 5: Data UI', 'Lightweight DataTable with toolbar, filters, and pagination.'],
                  ['Stage 6: Release and Adoption', 'npm publish, changelog, and rollout in consumer projects.'],
                ]).map((item) => (
              <Card className="border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-4 sm:p-5" key={item[0]} variant="subtle">
                <p className="font-medium text-[color:var(--text-main)]">{item[0]}</p>
                <p className="mt-2 text-[0.9rem] leading-6 text-[color:var(--text-soft)] sm:text-[0.95rem]">{item[1]}</p>
              </Card>
            ))}
          </section>
        </div>
      ),
    },
  ]
}
