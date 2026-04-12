import { CodeBlock, GlassPanel, Tag } from '../../lib'
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
  const sectionLabelClass = 'font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]'

  return (
    <GlassPanel className="relative p-0 overflow-hidden flex flex-col group w-full shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      {/* Mini-Hero Showcase Area */}
      <div className="relative z-10 flex min-h-[300px] w-full items-center justify-center border-b border-[color:var(--card-border)] py-12 px-6">
        <div className="relative z-10 w-full flex justify-center">
          {doc.preview}
        </div>
      </div>

      {/* Info & Snippet Area */}
      <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] w-full min-w-0">
        {/* Left: Info */}
        <div className="p-6 sm:p-8 flex flex-col justify-center border-r-0 lg:border-r border-[color:var(--card-border)] min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Tag>{getCategoryLabel(doc.category, isPt)}</Tag>
            <Tag className="bg-[rgba(255,255,255,0.03)] text-[color:var(--text-muted)] border-0">
              {doc.urlText}
            </Tag>
          </div>
          <h3 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[2rem] font-bold tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm">
            {doc.name}
          </h3>
          <p className="mt-4 text-[1.05rem] leading-7 text-[color:var(--text-soft)]">
            {doc.description}
          </p>
        </div>

        {/* Right: Technical */}
        <div className="flex flex-col border-t lg:border-t-0 border-[color:var(--card-border)] min-w-0">
           <div className="p-6">
              <p className={sectionLabelClass}>{strings.docs.snippetLabel}</p>
              <div className="mt-4 w-full">
                 <CodeBlock snippets={[{ code: doc.snippet, language: 'tsx' }]} />
              </div>

              <div className="mt-6 flex flex-col gap-2">
                 <p className={sectionLabelClass}>{strings.docs.sourceLabel}</p>
                 <div className="rounded-[8px] border border-[color:var(--card-border)] px-3 py-2">
                   <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] overflow-x-auto whitespace-nowrap text-[color:var(--text-muted)] select-all w-full leading-5">
                     {doc.source}
                   </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </GlassPanel>
  )
}
