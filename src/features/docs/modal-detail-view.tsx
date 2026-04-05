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
      </GlassPanel>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <GlassPanel className="p-2 sm:p-2">
            <p className={sectionLabelClass}>{strings.docs.livePreviewLabel}</p>
            <div className="mt-5 min-h-[260px] rounded-[8px] border border-[color:var(--card-border)] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(111,224,255,0.08)_0%,transparent_70%),repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(255,255,255,0.02)_24px,rgba(255,255,255,0.02)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.02)_24px,rgba(255,255,255,0.02)_25px)] p-2">
              <div className="flex min-h-[220px] items-center justify-center">{doc.preview}</div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-2 sm:p-2">
            <p className={sectionLabelClass}>{strings.docs.basicUsageLabel}</p>
            <CodeBlock className="mt-3" snippets={[{ code: doc.snippet, language: 'tsx' }]} />
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-2 sm:p-2">
            <p className={sectionLabelClass}>{strings.docs.importLabel}</p>
            <CodeBlock className="mt-3" snippets={[{ code: doc.importCode, language: 'ts' }]} />
          </GlassPanel>

          {doc.anatomy?.length ? (
            <GlassPanel className="p-2 sm:p-2">
              <p className={sectionLabelClass}>{isPt ? 'Anatomia' : 'Anatomy'}</p>
              <div className="mt-4 space-y-2">
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
            </GlassPanel>
          ) : null}

          <GlassPanel className="p-2 sm:p-2">
            <p className={sectionLabelClass}>{strings.docs.sourceLabel}</p>
            <div className="mt-3 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] px-3 py-3 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--accent-soft)]">
              {doc.source}
            </div>
          </GlassPanel>

          {doc.notes?.length ? (
            <GlassPanel className="p-2 sm:p-2">
              <p className={sectionLabelClass}>{isPt ? 'Notas' : 'Notes'}</p>
              <div className="mt-4 flex flex-col gap-3">
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
        <GlassPanel className="p-2 sm:p-2">
          <p className={sectionLabelClass}>{isPt ? 'Exemplos' : 'Examples'}</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
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
        <GlassPanel className="p-2 sm:p-2">
          <p className={sectionLabelClass}>API</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
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
        <GlassPanel className="p-2 sm:p-2">
          <p className={sectionLabelClass}>{isPt ? 'Partes' : 'Parts'}</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
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
