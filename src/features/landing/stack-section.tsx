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
    <div className="grid gap-3">
      <GlassPanel className="p-3 sm:p-3">
        <SectionLabel>{strings.landing.currentStack}</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-3">
          {stackItems.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">
          {strings.landing.stackDescription}
        </p>
      </GlassPanel>

      <GlassPanel className="p-3 sm:p-3">
        <div className="flex items-center justify-between gap-3">
          <SectionLabel>{strings.landing.libraryScope}</SectionLabel>
          <span className="rounded-[999px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-soft)]">
            {componentNames.length} items
          </span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {componentNames.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-3">
              <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-soft)]">{name}</span>
              <CheckCircle2 className="text-[color:var(--accent-line)]" size={15} />
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}
