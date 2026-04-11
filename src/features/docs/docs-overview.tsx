import { Component, Library } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { GlassPanel } from '../../lib'

export function DocsOverview() {
  const { strings } = useLocale()

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <GlassPanel className="p-8 relative overflow-hidden group border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] hover:border-[rgba(111,224,255,0.2)] transition-colors text-center sm:text-left flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(111,224,255,0.04)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
        <div className="relative z-10 flex flex-col h-full sm:items-start items-center">
          <Component className="text-[color:var(--accent-line)] drop-shadow-[0_0_8px_rgba(111,224,255,0.4)]" size={32} />
          <p className="mt-6 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.8rem] md:text-2xl font-bold tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm">{strings.docs.overviewCards.primitives.title}</p>
          <p className="mt-3 text-[1.05rem] md:text-[1.1rem] leading-7 text-[color:var(--text-soft)]">{strings.docs.overviewCards.primitives.description}</p>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 relative overflow-hidden group border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] hover:border-[rgba(111,224,255,0.2)] transition-colors text-center sm:text-left flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(111,224,255,0.04)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
        <div className="relative z-10 flex flex-col h-full sm:items-start items-center">
          <Library className="text-[color:var(--accent-line)] drop-shadow-[0_0_8px_rgba(111,224,255,0.4)]" size={32} />
          <p className="mt-6 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.8rem] md:text-2xl font-bold tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm">{strings.docs.overviewCards.source.title}</p>
          <p className="mt-3 text-[1.05rem] md:text-[1.1rem] leading-7 text-[color:var(--text-soft)]">{strings.docs.overviewCards.source.description}</p>
        </div>
      </GlassPanel>
    </div>
  )
}
