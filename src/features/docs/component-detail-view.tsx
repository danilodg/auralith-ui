import { GlassPanel, Tag } from '../../lib'
import { ModalDetailView } from './modal-detail-view'
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

interface ComponentDetailViewProps {
  doc: ComponentDoc
}

export function ComponentDetailView({ doc }: ComponentDetailViewProps) {
  const { language, strings } = useLocale()
  const isPt = language === 'pt'

  if (doc.id === 'modal') {
    return <ModalDetailView doc={doc} />
  }

  const sectionTitleClassName = 'font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]'
  const examples = doc.examples?.filter((example, index) => index !== 0 || example.code.trim() !== doc.snippet.trim()) ?? []

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

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.55)] p-2 sm:p-2">
              <p className={sectionTitleClassName}>{strings.docs.livePreviewLabel}</p>
              <div className="mt-5">{doc.preview}</div>
            </div>

            <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.75)] p-2 sm:p-2">
              <p className={sectionTitleClassName}>{strings.docs.basicUsageLabel}</p>
              <pre className="mt-3 overflow-x-auto font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--text-soft)]">
                <code>{doc.snippet}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.55)] p-2 sm:p-2">
              <p className={sectionTitleClassName}>{strings.docs.importLabel}</p>
              <pre className="mt-3 overflow-x-auto font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--accent-soft)]">
                <code>{doc.importCode}</code>
              </pre>
            </div>

            {doc.anatomy?.length ? (
              <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.55)] p-2 sm:p-2">
                <p className={sectionTitleClassName}>{isPt ? 'Anatomia' : 'Anatomy'}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {doc.anatomy.map((part) => (
                    <Tag key={part}>{part}</Tag>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.55)] p-2 sm:p-2">
              <p className={sectionTitleClassName}>{strings.docs.sourceLabel}</p>
              <p className="mt-3 break-all font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--accent-soft)]">{doc.source}</p>
            </div>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-2 sm:p-2">
        {examples.length ? (
          <section>
            <p className={sectionTitleClassName}>{isPt ? 'Exemplos' : 'Examples'}</p>
            <div className="mt-5 space-y-5">
              {examples.map((example, index) => (
                <div className={index === 0 ? '' : 'border-t border-[color:var(--card-border)] pt-5'} key={example.title}>
                  <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-lg font-semibold text-[color:var(--text-main)]">{example.title}</p>
                  <pre className="mt-3 overflow-x-auto rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(5,10,24,0.55)] p-2 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6 text-[color:var(--text-soft)]">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {doc.parts?.length ? (
          <section className={examples.length ? 'mt-8 border-t border-[color:var(--card-border)] pt-8' : ''}>
            <p className={sectionTitleClassName}>{isPt ? 'Partes' : 'Parts'}</p>
            <div className="mt-5 grid gap-x-8 gap-y-5 lg:grid-cols-2">
              {doc.parts.map((part) => (
                <div key={part.name}>
                  <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-lg font-semibold text-[color:var(--text-main)]">{part.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{part.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {doc.notes?.length ? (
          <section className={(examples.length || doc.parts?.length) ? 'mt-8 border-t border-[color:var(--card-border)] pt-8' : ''}>
            <p className={sectionTitleClassName}>{isPt ? 'Notas' : 'Notes'}</p>
            <div className="mt-4 space-y-3">
              {doc.notes.map((note) => (
                <p className="text-sm leading-6 text-[color:var(--text-soft)]" key={note}>
                  {note}
                </p>
              ))}
            </div>
          </section>
        ) : null}
      </GlassPanel>
    </div>
  )
}
