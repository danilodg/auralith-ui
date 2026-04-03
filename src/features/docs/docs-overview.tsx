import { Component, Library } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { Card, GlassPanel, SectionLabel } from '../../lib'

export function DocsOverview() {
  const { strings } = useLocale()

  return (
    <GlassPanel className="p-2 sm:p-2">
      <SectionLabel>{strings.docs.coverage}</SectionLabel>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Card className="p-2" variant="subtle">
          <Component className="text-[color:var(--accent-soft)]" size={18} />
          <p className="mt-4 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-xl font-semibold text-[color:var(--text-main)]">{strings.docs.overviewCards.primitives.title}</p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{strings.docs.overviewCards.primitives.description}</p>
        </Card>
        <Card className="p-2" variant="subtle">
          <Library className="text-[color:var(--accent-soft)]" size={18} />
          <p className="mt-4 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-xl font-semibold text-[color:var(--text-main)]">{strings.docs.overviewCards.source.title}</p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{strings.docs.overviewCards.source.description}</p>
        </Card>
      </div>
    </GlassPanel>
  )
}
