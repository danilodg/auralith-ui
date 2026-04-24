import { Box, LayoutTemplate, Rocket } from 'lucide-react'

import { Card, CodeBlock, GlassPanel, SectionLabel, Tag } from '../../lib'

interface RecommendedStackSectionProps {
  setup: {
    eyebrow: string
    title: string
    description: string
    badges: ReadonlyArray<string>
    featureCards: ReadonlyArray<{
      title: string
      description: string
    }>
    commandLabels: {
      landing: string
      dashboard: string
    }
    commands: {
      landing: string
      dashboard: string
    }
    repositoryLabel: string
    repositoryUrl: string
    repositoryText: string
  }
}

export function RecommendedStackSection({ setup }: RecommendedStackSectionProps) {
  return (
    <section>
      <GlassPanel className="border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-3 sm:p-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="border-[color:var(--card-border)] bg-[color:var(--surface-panel-2)] px-2.5 py-1 text-[0.72rem] text-[color:var(--accent-line)] sm:text-[0.78rem]">
              {setup.eyebrow}
            </Tag>
            {setup.badges.map((badge) => (
              <Tag className="border-[color:var(--card-border)] bg-[color:var(--surface-panel-2)] px-2.5 py-1 text-[0.72rem] sm:text-[0.78rem]" key={badge}>
                {badge}
              </Tag>
            ))}
          </div>

          <h2 className="mt-3 flex items-center gap-2 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.35rem,3.2vw,1.95rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[color:var(--text-main)]">
            <Rocket className="text-[color:var(--accent-line)]" size={18} />
            {setup.title}
          </h2>
          <p className="mt-2 max-w-4xl text-[0.94rem] leading-6 text-[color:var(--text-soft)] sm:text-[0.98rem]">{setup.description}</p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {setup.featureCards.map((item, index) => (
              <Card className="flex items-start gap-2.5 border-[color:var(--card-border)] bg-[color:var(--surface-panel-2)] p-2.5" key={item.title} variant="subtle">
                {index === 0 ? <LayoutTemplate className="mt-0.5 text-[color:var(--accent-line)]" size={16} /> : <Box className="mt-0.5 text-[color:var(--accent-line)]" size={16} />}
                <div>
                  <p className="text-[0.86rem] font-medium text-[color:var(--text-main)]">{item.title}</p>
                  <p className="mt-1 text-[0.78rem] text-[color:var(--text-muted)]">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-3 grid gap-2 lg:grid-cols-2">
            <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] p-2">
              <SectionLabel>{setup.commandLabels.landing}</SectionLabel>
              <CodeBlock
                className="mt-2 w-full"
                showLanguageTabs={false}
                snippets={[{ code: setup.commands.landing, language: 'bash', label: 'Bash' }]}
              />
            </div>
            <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] p-2">
              <SectionLabel>{setup.commandLabels.dashboard}</SectionLabel>
              <CodeBlock
                className="mt-2 w-full"
                showLanguageTabs={false}
                snippets={[{ code: setup.commands.dashboard, language: 'bash', label: 'Bash' }]}
              />
            </div>
          </div>

          <p className="mt-3 text-[0.84rem] text-[color:var(--text-muted)]">
            {setup.repositoryLabel}{' '}
            <a
              className="text-[color:var(--accent-line)] underline decoration-[rgba(111,224,255,0.35)] underline-offset-3"
              href={setup.repositoryUrl}
              rel="noreferrer"
              target="_blank"
            >
              {setup.repositoryText}
            </a>
          </p>
        </div>
      </GlassPanel>
    </section>
  )
}
