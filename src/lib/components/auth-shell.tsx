import type { ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'

import { Card } from './card'
import { GlassPanel } from './glass-panel'
import { SectionLabel } from './section-label'

type AuthStat = {
  value: string
  label: string
}

interface AuthShellProps {
  eyebrow: string
  title: string
  description: string
  highlights: string[]
  stats: AuthStat[]
  children: ReactNode
}

export function AuthShell({ children, description, eyebrow, highlights, stats, title }: AuthShellProps) {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="border-b border-[color:var(--panel-border)] p-3 sm:p-3 lg:border-b-0 lg:border-r lg:p-3">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h3 className="mt-3 max-w-lg font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.35rem,3.75vw,2.4rem)] font-bold leading-[0.98] tracking-[-0.03em] text-[color:var(--text-main)]">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--text-muted)] sm:text-[0.95rem]">
            {description}
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--accent-soft)]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <Card key={item.label} className="p-3" variant="subtle">
                <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.45rem] font-bold tracking-[-0.04em] text-[color:var(--text-main)] sm:text-2xl">
                  {item.value}
                </p>
                <p className="mt-1.5 text-sm leading-5 text-[color:var(--text-muted)]">{item.label}</p>
              </Card>
            ))}
          </div>

          <Card className="mt-3 p-3" variant="default">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-[color:var(--accent-soft)]">Security pulse</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--text-soft)]">
                  Shell pronto para login, recovery, onboarding ou fluxo de acesso premium.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-center p-3 sm:p-3 lg:p-3 xl:p-3">
          <Card className="w-full max-w-xl p-3 sm:p-3" variant="elevated">
            {children}
          </Card>
        </div>
      </div>
    </GlassPanel>
  )
}
