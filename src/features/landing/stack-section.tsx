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
    <div className="grid gap-6">
      <GlassPanel className="p-2 sm:p-2">
        <SectionLabel>{strings.landing.currentStack}</SectionLabel>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {stackItems.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-[color:var(--text-soft)]">
          {strings.landing.stackDescription}
        </p>
      </GlassPanel>

      <GlassPanel className="p-2 sm:p-2">
        <SectionLabel>{strings.landing.libraryScope}</SectionLabel>
        <div className="mt-5 grid gap-3">
          {componentNames.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] px-4 py-3">
              <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.75rem] uppercase tracking-[0.16em] text-[color:var(--text-soft)]">{name}</span>
              <CheckCircle2 className="text-[color:var(--accent-line)]" size={16} />
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}
