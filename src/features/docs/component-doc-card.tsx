import { CodeBlock, GlassPanel, Tag } from '../../lib'
import { useLocale } from '../../locale-context'
import type { ComponentDoc } from '../../types/docs'
import { getDocCategoryLabel } from './docs-categories'

interface ComponentDocCardProps {
  doc: ComponentDoc
}

export function ComponentDocCard({ doc }: ComponentDocCardProps) {
  const { language, strings } = useLocale()
  const isPt = language === 'pt'
  const sectionLabelClass = 'font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]'

  return (
    <GlassPanel className="group relative flex w-full flex-col overflow-hidden p-0 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      {/* Mini-Hero Showcase Area */}
      <div className="relative z-10 flex min-h-[200px] w-full items-center justify-center overflow-hidden border-b border-[color:var(--card-border)] p-4 sm:min-h-[300px] sm:px-6 sm:py-12">
        <div className="relative z-10 flex w-full min-w-0 justify-center">
          {doc.preview}
        </div>
      </div>

      {/* Info & Snippet Area */}
      <div className="relative z-10 grid w-full min-w-0 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: Info */}
        <div className="flex min-w-0 flex-col justify-center border-r-0 border-[color:var(--card-border)] p-4 sm:p-8 lg:border-r">
          <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
            <Tag>{getDocCategoryLabel(doc.category, isPt)}</Tag>
            <Tag className="bg-[rgba(255,255,255,0.03)] text-[color:var(--text-muted)] border-0">
              {doc.urlText}
            </Tag>
          </div>
          <h3 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.55rem] font-bold tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm sm:text-[2rem]">
            {doc.name}
          </h3>
          <p className="mt-3 text-[0.92rem] leading-6 text-[color:var(--text-soft)] sm:mt-4 sm:text-[1.05rem] sm:leading-7">
            {doc.description}
          </p>
        </div>

        {/* Right: Technical */}
        <div className="flex min-w-0 flex-col border-t border-[color:var(--card-border)] lg:border-t-0">
           <div className="p-4 sm:p-6">
              <p className={sectionLabelClass}>{strings.docs.snippetLabel}</p>
              <div className="mt-4 w-full">
                 <CodeBlock snippets={[{ code: doc.snippet, language: 'tsx' }]} />
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:mt-6">
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
