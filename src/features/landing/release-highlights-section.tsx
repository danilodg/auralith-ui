import { ArrowUpRight } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { Card, GlassPanel, SectionLabel } from '../../lib'

interface ReleaseHighlightsSectionProps {
  highlights: ReadonlyArray<{
    id: string
    title: string
    description: string
  }>
  onNavigateToHash: (hash: string) => void
}

export function ReleaseHighlightsSection({ highlights, onNavigateToHash }: ReleaseHighlightsSectionProps) {
  const { strings, language } = useLocale()

  return (
    <section className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
      <GlassPanel className="p-3">
        <SectionLabel>{strings.landing.releaseEyebrow}</SectionLabel>
        <h2 className="mt-2 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.35rem,3.4vw,2.1rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[color:var(--text-main)]">
          {strings.landing.releaseTitle}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{strings.landing.releaseDescription}</p>
      </GlassPanel>

      <div className="grid gap-2 sm:grid-cols-2">
        {highlights.map((item) => (
          <Card key={item.id} className="p-3" variant="subtle">
            <h3 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.02rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[color:var(--text-soft)]">{item.description}</p>
            <button
              type="button"
              onClick={() => onNavigateToHash(item.id === 'components' ? '#components' : `#components/${item.id}`)}
              className="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent-line)] transition hover:brightness-110"
            >
              {language === 'pt' ? 'Ver componente' : 'View component'}
              <ArrowUpRight size={13} />
            </button>
          </Card>
        ))}
      </div>
    </section>
  )
}
