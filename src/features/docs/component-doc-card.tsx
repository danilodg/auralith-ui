import { Card, GlassPanel, Tag } from '../../lib'
import { useLocale } from '../../locale-context'
import type { ComponentDoc } from '../../types/docs'

function getCategoryLabel(category: string, isPt: boolean) {
  if (!isPt) return category

  return {
    primitive: 'primitivo',
    surface: 'superficie',
    typography: 'tipografia',
    feedback: 'feedback',
    form: 'formulario',
    pattern: 'pattern',
    navigation: 'navegacao',
    overlay: 'overlay',
  }[category] ?? category
}

interface ComponentDocCardProps {
  doc: ComponentDoc
}

export function ComponentDocCard({ doc }: ComponentDocCardProps) {
  const { language, strings } = useLocale()
  const isPt = language === 'pt'

  return (
    <GlassPanel className="p-2 sm:p-2 lg:p-2">
      <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Tag>{getCategoryLabel(doc.category, isPt)}</Tag>
            <Tag>{doc.name}</Tag>
            <Tag>{doc.urlText}</Tag>
          </div>
          <h3 className="mt-4 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.7rem] font-bold tracking-[-0.04em] text-[color:var(--text-main)]">{doc.name}</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">{doc.description}</p>
          <div className="mt-5 rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.55)] p-2">
            <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{strings.docs.sourceLabel}</p>
            <p className="mt-2 break-all font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--accent-soft)]">{doc.source}</p>
          </div>
          <div className="mt-4 rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.75)] p-2">
            <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{strings.docs.snippetLabel}</p>
            <pre className="mt-2 overflow-x-auto font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--text-soft)]">
              <code>{doc.snippet}</code>
            </pre>
          </div>
        </div>

        <Card className="p-2 sm:p-2 lg:p-2" variant="elevated">
          <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{strings.docs.livePreviewLabel}</p>
          <div className="mt-4 overflow-hidden">{doc.preview}</div>
        </Card>
      </div>
    </GlassPanel>
  )
}
