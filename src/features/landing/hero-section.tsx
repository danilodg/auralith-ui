import { ArrowRight, ChevronRight } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { Button, Card, GlassPanel, Tag } from '../../lib'

interface HeroSectionProps {
  metrics: ReadonlyArray<{ value: string; label: string }>
  onOpenDocs: () => void
}

export function HeroSection({ metrics, onOpenDocs }: HeroSectionProps) {
  const { strings } = useLocale()

  return (
    <GlassPanel className="relative p-0 overflow-hidden flex flex-col items-center justify-center w-full min-h-[380px] text-center border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(111,224,255,0.08)_0%,transparent_70%),repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(255,255,255,0.01)_24px,rgba(255,255,255,0.01)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.01)_24px,rgba(255,255,255,0.01)_25px)] pointer-events-none" />
      <div className="absolute inset-0 max-w-4xl mx-auto rounded-[100%] bg-[color:var(--accent-line)] opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="relative z-10 p-6 py-12 sm:py-16 max-w-5xl mx-auto flex flex-col items-center w-full">
        <Tag className="mb-6 border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)]">
          {strings.landing.heroEyebrow}
        </Tag>
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
            <div className="relative w-full max-w-[350px]">
              <img
                src="/auralith-neon-a.png"
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={onOpenDocs} className="px-5 py-2 text-[0.9rem] shadow-lg shadow-[rgba(111,224,255,0.2)]">
            {strings.landing.exploreDocs}
            <ArrowRight size={16} />
          </Button>
          <Button variant="secondary" className="px-5 py-2 text-[0.9rem] shadow-sm bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)] group">
            React 19 + Tailwind v4
            <ChevronRight size={14} className="text-[color:var(--text-muted)] group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {metrics.map((item) => (
            <Card key={item.label} className="p-4 border-[color:var(--card-border)] bg-[rgba(0,0,0,0.15)] backdrop-blur-md shadow-[inset_0_1px_3px_rgba(255,255,255,0.02)] text-center relative overflow-hidden group" variant="subtle">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(111,224,255,0.04)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />
              <div className="relative z-10">
                <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.8rem] font-bold tracking-[-0.05em] text-[color:var(--text-main)] drop-shadow-md">
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
