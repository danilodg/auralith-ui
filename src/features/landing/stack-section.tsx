import { CheckCircle2 } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { GlassPanel, SectionLabel, Tag } from '../../lib'

interface StackSectionProps {
  componentNames: ReadonlyArray<string>
  stackItems: ReadonlyArray<string>
}

export function StackSection({ componentNames, stackItems }: StackSectionProps) {
  const { strings } = useLocale()

  return (
    <div className="grid gap-6 lg:grid-cols-2 w-full">
      <GlassPanel className="p-6 sm:p-8 border border-[color:var(--card-border)] shadow-sm bg-[color:var(--surface-base)] flex flex-col justify-center">
        <SectionLabel>{strings.landing.currentStack}</SectionLabel>
        <div className="mt-6 flex flex-wrap gap-3">
          {stackItems.map((item) => (
            <Tag key={item} className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] px-3 py-1.5 text-[0.8rem]">{item}</Tag>
          ))}
        </div>
        <p className="mt-6 text-[1.05rem] leading-7 text-[color:var(--text-soft)]">
          {strings.landing.stackDescription}
        </p>
      </GlassPanel>

      <GlassPanel className="p-6 sm:p-8 border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--accent-line)] opacity-[0.02] blur-[50px] group-hover:opacity-[0.04] transition-opacity duration-700" />
        <div className="flex items-center justify-between gap-3 relative z-10">
          <SectionLabel>{strings.landing.libraryScope}</SectionLabel>
          <span className="rounded-[999px] border border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-line)]">
            {componentNames.length} items
          </span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 relative z-10">
          {componentNames.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)] p-3 hover:border-[rgba(111,224,255,0.2)] transition-colors">
              <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-soft)]">{name}</span>
              <CheckCircle2 className="text-[color:var(--text-muted)] opacity-50" size={15} />
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}
