import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

import { GlassPanel, SectionLabel, Tag } from '../../lib'

interface StackSectionProps {
  technicalSection: {
    eyebrow: string
    title: string
    description: string
    technologies: ReadonlyArray<{
      name: string
      reason: string
      impact: string
    }>
    scopeEyebrow: string
    scopeDescription: string
    categories: ReadonlyArray<string>
    dependencyLabel: string
    dependencyCount: string
    openAllLabel: string
  }
  onOpenComponents: () => void
}

export function StackSection({ technicalSection, onOpenComponents }: StackSectionProps) {
  return (
    <div className="grid w-full gap-3 lg:grid-cols-2">
      <GlassPanel className="flex flex-col justify-center border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-3 shadow-sm">
        <SectionLabel>{technicalSection.eyebrow}</SectionLabel>
        <h2 className="mt-2 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.25rem,3.2vw,1.8rem)] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
          {technicalSection.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">
          {technicalSection.description}
        </p>

        <div className="mt-3 grid gap-2">
          {technicalSection.technologies.map((item) => (
            <div key={item.name} className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)] p-3">
              <div className="flex items-center justify-between gap-2">
                <Tag className="border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)]">
                  {item.name}
                </Tag>
                <CheckCircle2 className="text-[color:var(--text-muted)] opacity-50" size={15} />
              </div>
              <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{item.reason}</p>
              <p className="mt-1 text-[0.74rem] uppercase tracking-[0.1em] text-[color:var(--accent-soft)]">{item.impact}</p>
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="group relative overflow-hidden border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-3">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--accent-line)] opacity-[0.02] blur-[50px] group-hover:opacity-[0.04] transition-opacity duration-700" />
        <div className="flex items-center justify-between gap-3 relative z-10">
          <SectionLabel>{technicalSection.scopeEyebrow}</SectionLabel>
          <span className="rounded-[999px] border border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-line)]">
            {technicalSection.dependencyCount} {technicalSection.dependencyLabel}
          </span>
        </div>
        <p className="relative z-10 mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{technicalSection.scopeDescription}</p>
        <div className="relative z-10 mt-3 grid gap-2 sm:grid-cols-2">
          {technicalSection.categories.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)] p-2 transition-colors hover:border-[rgba(111,224,255,0.2)]">
              <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-soft)]">{name}</span>
              <CheckCircle2 className="text-[color:var(--text-muted)] opacity-50" size={15} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpenComponents}
          className="relative z-10 mt-3 inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent-line)] transition hover:brightness-110"
        >
          {technicalSection.openAllLabel}
          <ArrowUpRight size={13} />
        </button>
      </GlassPanel>
    </div>
  )
}
