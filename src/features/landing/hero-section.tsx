import { ArrowRight } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { Button, Card, GlassPanel, SectionLabel } from '../../lib'

interface HeroSectionProps {
  metrics: ReadonlyArray<{ value: string; label: string }>
  onOpenDocs: () => void
}

export function HeroSection({ metrics, onOpenDocs }: HeroSectionProps) {
  const { strings } = useLocale()

  return (
    <GlassPanel className="p-2 sm:p-2 lg:p-2">
      <SectionLabel>{strings.landing.heroEyebrow}</SectionLabel>
      <h1 className="mt-5 max-w-3xl font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(2.7rem,7vw,5.6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
        {strings.landing.heroTitle}
      </h1>
      <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-[color:var(--text-soft)] sm:text-[1.06rem]">
        {strings.landing.heroDescription}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={onOpenDocs}>
          {strings.landing.exploreDocs}
          <ArrowRight size={16} />
        </Button>
        <Button variant="secondary">React 19 + Tailwind v4</Button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {metrics.map((item) => (
          <Card key={item.label} className="p-2" variant="subtle">
            <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[2rem] font-bold tracking-[-0.05em] text-[color:var(--text-main)]">{item.value}</p>
            <p className="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">{item.label}</p>
          </Card>
        ))}
      </div>
    </GlassPanel>
  )
}
