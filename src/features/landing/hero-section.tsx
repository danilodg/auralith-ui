import { ArrowRight, BookText } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { Button, Card, GlassPanel, Tag } from '../../lib'

interface HeroSectionProps {
  metrics: ReadonlyArray<{ value: string; label: string }>
  onOpenComponents: () => void
  onOpenDocs: () => void
}

export function HeroSection({ metrics, onOpenComponents, onOpenDocs }: HeroSectionProps) {
  const { strings } = useLocale()

  return (
    <GlassPanel className="relative flex min-h-[360px] w-full flex-col items-center justify-center overflow-hidden border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-0 text-center shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(111,224,255,0.06)_0%,transparent_72%)] pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center p-3 py-10 sm:py-12">
        <Tag className="mb-4 whitespace-nowrap border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)]">
          {strings.landing.heroEyebrow}
        </Tag>
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-8">
            <div className="relative w-full max-w-[350px]">
              <img
                src={`${import.meta.env.BASE_URL}auralith-neon-a.png`}
                alt="Auralith UI logo"
                className="h-auto w-full object-cover"
                loading="eager"
              />
              <p className="absolute bottom-[5px] left-1/2 w-max max-w-[360px] -translate-x-1/2 whitespace-nowrap text-center font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[3.2rem] font-bold tracking-[-0.03em] text-[color:var(--text-main)]">
                Auralith <span className="bg-[linear-gradient(90deg,#22d6ff_0%,#4a86ff_45%,#d45cff_100%)] bg-clip-text text-transparent">UI</span>
              </p>
            </div>

            <div className="max-w-3xl text-center md:text-left">
              <h1 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm">
                {strings.landing.heroTitle}
              </h1>
              <p className="mt-4 text-[1.05rem] leading-7 text-[color:var(--text-soft)] sm:text-[1.1rem]">
                {strings.landing.heroDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button onClick={onOpenComponents} className="px-4 py-2 text-[0.9rem] shadow-lg shadow-[rgba(111,224,255,0.2)]">
            {strings.landing.viewComponents}
            <ArrowRight size={16} />
          </Button>
          <Button variant="secondary" onClick={onOpenDocs} className="px-4 py-2 text-[0.9rem]">
            {strings.landing.readFoundations}
            <BookText size={14} />
          </Button>
        </div>

        <div className="mt-8 grid w-full max-w-3xl gap-2 sm:grid-cols-3">
          {metrics.map((item) => (
            <Card key={item.label} className="relative overflow-hidden border-[color:var(--card-border)] bg-[rgba(0,0,0,0.12)] p-3 text-center" variant="subtle">
              <div className="relative z-10">
                <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.6rem] font-bold tracking-[-0.05em] text-[color:var(--text-main)]">
                  {item.value}
                </p>
                <p className="mt-1 font-[IBM_Plex_Mono,monospace] uppercase tracking-[0.12em] text-[0.65rem] text-[color:var(--accent-soft)]">
                  {item.label}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </GlassPanel>
  )
}
