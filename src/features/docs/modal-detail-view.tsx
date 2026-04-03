import { CodeBlock, GlassPanel, Tag } from '../../lib'
import { SectionHeader } from '../../lib/components/section-header'
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

export function ModalDetailView({ doc }: { doc: ComponentDoc }) {
  const { language, strings } = useLocale()
  const isPt = language === 'pt'
  const examples = doc.examples?.filter((example, index) => index !== 0 || example.code.trim() !== doc.snippet.trim()) ?? []
  const sectionLabelClass = 'font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]'

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6">
      <GlassPanel className="p-2 sm:p-2 lg:p-2">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <div className="flex flex-wrap gap-3">
              <Tag>{getCategoryLabel(doc.category, isPt)}</Tag>
              <Tag>{doc.name}</Tag>
              <Tag>{doc.urlText}</Tag>
            </div>

            <SectionHeader
              className="mt-6"
              eyebrow={strings.docs.componentPageEyebrow}
              heading={strings.docs.componentPageHeading(doc.name)}
              description={doc.description}
            />
          </div>

          <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] px-4 py-3">
            <p className={sectionLabelClass}>{strings.docs.importLabel}</p>
            <p className="mt-2 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs text-[color:var(--accent-soft)]">{doc.importCode}</p>
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <GlassPanel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-[color:var(--card-border)] px-6 py-4 sm:px-7">
              <p className={sectionLabelClass}>{strings.docs.livePreviewLabel}</p>
              <div className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                {isPt ? 'ativo' : 'live'}
              </div>
            </div>
            <div className="min-h-[280px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(111,224,255,0.08)_0%,transparent_70%),repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(255,255,255,0.02)_24px,rgba(255,255,255,0.02)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.02)_24px,rgba(255,255,255,0.02)_25px)] px-6 py-8 sm:px-7 sm:py-10">
              <div className="flex min-h-[200px] items-center justify-center">{doc.preview}</div>
            </div>
          </GlassPanel>

          <GlassPanel className="overflow-hidden">
            <div className="border-b border-[color:var(--card-border)] px-6 py-4 sm:px-7">
              <p className={sectionLabelClass}>{strings.docs.basicUsageLabel}</p>
            </div>
            <div className="px-6 py-5 sm:px-7">
              <CodeBlock snippets={[{ code: doc.snippet, language: 'tsx' }]} />
            </div>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          {doc.anatomy?.length ? (
            <GlassPanel className="overflow-hidden">
              <div className="border-b border-[color:var(--card-border)] px-5 py-4">
                <p className={sectionLabelClass}>{isPt ? 'Anatomia' : 'Anatomy'}</p>
              </div>
              <div className="px-4 py-4">
                <div className="space-y-2">
                  {doc.anatomy.map((part, index) => (
                    <div
                      className="flex items-center gap-3 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] px-3 py-2.5 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs text-[color:var(--text-soft)]"
                      key={part}
                      style={{ paddingLeft: `${12 + Math.min(index, 4) * 10}px` }}
                    >
                      <span className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-[color:var(--accent-end)]' : index <= 2 ? 'bg-[color:var(--accent-line)]' : 'bg-[color:var(--text-muted)]'}`} />
                      <span className={index === 0 ? 'text-[color:var(--accent-soft)]' : ''}>{part}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          ) : null}

          <GlassPanel className="overflow-hidden">
            <div className="border-b border-[color:var(--card-border)] px-5 py-4">
              <p className={sectionLabelClass}>{strings.docs.sourceLabel}</p>
            </div>
            <div className="px-5 py-4">
              <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] px-3 py-3 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--accent-soft)]">
                {doc.source}
              </div>
            </div>
          </GlassPanel>

          {doc.notes?.length ? (
            <GlassPanel className="overflow-hidden">
              <div className="border-b border-[color:var(--card-border)] px-5 py-4">
                <p className={sectionLabelClass}>{isPt ? 'Notas' : 'Notes'}</p>
              </div>
              <div className="flex flex-col gap-3 px-5 py-4">
                {doc.notes.map((note) => (
                  <p className="text-sm leading-6 text-[color:var(--text-soft)]" key={note}>
                    {note}
                  </p>
                ))}
              </div>
            </GlassPanel>
          ) : null}

        </div>
      </div>

      {examples.length ? (
        <GlassPanel className="overflow-hidden">
          <div className="border-b border-[color:var(--card-border)] px-6 py-4 sm:px-7">
            <p className={sectionLabelClass}>{isPt ? 'Exemplos' : 'Examples'}</p>
          </div>
          <div className="grid gap-6 px-6 py-5 sm:px-7 lg:grid-cols-2">
            {examples.map((example) => (
              <div key={example.title}>
                <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-lg font-semibold text-[color:var(--text-main)]">{example.title}</p>
                <CodeBlock className="mt-3" snippets={[{ code: example.code, language: 'tsx' }]} />
              </div>
            ))}
          </div>
        </GlassPanel>
      ) : null}

      {doc.api?.length ? (
        <GlassPanel className="overflow-hidden">
          <div className="border-b border-[color:var(--card-border)] px-6 py-4 sm:px-7">
            <p className={sectionLabelClass}>API</p>
          </div>
          <div className="grid gap-4 px-6 py-5 sm:px-7 lg:grid-cols-2">
            {doc.api.map((item) => (
              <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] p-2" key={item.name}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs text-[color:var(--accent-soft)]">{item.name}</p>
                  <Tag className="px-2.5 py-1 text-[0.62rem]">{item.type}</Tag>
                </div>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">{item.description}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      ) : null}

      {doc.parts?.length ? (
        <GlassPanel className="overflow-hidden">
          <div className="border-b border-[color:var(--card-border)] px-6 py-4 sm:px-7">
            <p className={sectionLabelClass}>{isPt ? 'Partes' : 'Parts'}</p>
          </div>
          <div className="grid gap-4 px-6 py-5 sm:px-7 lg:grid-cols-2">
            {doc.parts.map((part) => (
              <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] p-2" key={part.name}>
                <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs text-[color:var(--accent-soft)]">{part.name}</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">{part.description}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      ) : null}
    </div>
  )
}
