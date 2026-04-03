import type { LucideIcon } from 'lucide-react'

import { GlassPanel } from '../../lib'

interface PillarsSectionProps {
  pillars: ReadonlyArray<{
    icon: LucideIcon
    title: string
    description: string
  }>
}

export function PillarsSection({ pillars }: PillarsSectionProps) {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {pillars.map(({ description, icon: Icon, title }) => (
        <GlassPanel key={title} className="p-2 sm:p-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white shadow-[0_0_24px_var(--accent-shadow)]">
            <Icon size={20} />
          </div>
          <h2 className="mt-5 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.35rem] font-semibold tracking-[-0.03em]">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">{description}</p>
        </GlassPanel>
      ))}
    </section>
  )
}
