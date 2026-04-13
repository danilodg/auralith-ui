import { ComponentDocCard } from '../features/docs/component-doc-card'
import { getDocCategoryDescription, getDocCategoryLabel, getDocCategoryTitle, sortComponentDocsByCategory, sortDocCategories } from '../features/docs/docs-categories'
import { ComponentDetailView } from '../features/docs/component-detail-view'
import { DocDetailView } from '../features/docs/doc-detail-view'
import { DocsHero } from '../features/docs/docs-hero'
import { DocsOverview } from '../features/docs/docs-overview'
import { GlassPanel, Tag } from '../lib'
import { useLocale } from '../locale-context'
import type { ComponentDoc, DocPage } from '../types/docs'

type PageView = 'landing' | 'docs' | 'components'

interface DocsPageProps {
  docs: ComponentDoc[]
  docPage: DocPage | null
  docPages: DocPage[]
  onBackHome: () => void
  page: PageView
  selectedComponentGroup: string | null
  selectedDoc: ComponentDoc | null
}

const inputDocIds = new Set(['input', 'form-field', 'checkbox', 'checkbox-group', 'radio-group', 'combobox', 'select', 'textarea', 'switch', 'input-date', 'input-time', 'input-number'])

export function DocsPage({ docs, docPage, docPages, onBackHome, page, selectedComponentGroup, selectedDoc }: DocsPageProps) {
  const { language, strings } = useLocale()
  const isPt = language === 'pt'
  const filteredDocs = selectedComponentGroup
    ? selectedComponentGroup === 'inputs'
      ? docs.filter((item) => inputDocIds.has(item.id))
      : docs.filter((item) => item.category === selectedComponentGroup)
    : docs

  const orderedDocs = sortComponentDocsByCategory(filteredDocs)
  const categories = sortDocCategories(Array.from(new Set(orderedDocs.map((item) => item.category)))).map((category) => getDocCategoryLabel(category, isPt))

  const docsByCategory = sortDocCategories(Array.from(new Set(orderedDocs.map((item) => item.category)))).map((category) => ({
    category,
    items: orderedDocs.filter((item) => item.category === category),
  }))

  if (page === 'docs') {
    if (docPage) {
      return <DocDetailView docPage={docPage} />
    }

    return (
      <div className="mx-auto flex min-h-full w-full max-w-[1000px] flex-1 flex-col gap-6 overflow-x-hidden">
        <GlassPanel className="relative overflow-hidden border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-5 text-center shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:p-10 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(111,224,255,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 max-w-4xl mx-auto rounded-[100%] bg-[color:var(--accent-line)] opacity-[0.03] blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
            <Tag className="absolute top-[20px] left-1/2 -translate-x-1/2 mb-0 whitespace-nowrap border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)] sm:static sm:left-auto sm:top-auto sm:translate-x-0 sm:mb-6">
              {strings.docs.heroEyebrow}
            </Tag>
            <h1 className="max-w-3xl font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.75rem,7vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm">
              {isPt ? 'Fundamentos e Guias' : 'Foundations & Guides'}
            </h1>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[color:var(--text-soft)] sm:text-[1.1rem]">
              {isPt ? 'Guia completo de instalacao e os fundamentos base para aplicar os patterns no seu projeto.' : 'Complete installation guide and baseline foundations for applying patterns in your project.'}
            </p>

            <div className="mt-8 flex w-full flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
              <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">{isPt ? 'Setup' : 'Setup'}</Tag>
              <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">{isPt ? 'Guias' : 'Guides'}</Tag>
              <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">{docPages.length} {isPt ? 'Secoes' : 'Sections'}</Tag>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-6">
          {docPages.map((entry) => (
            <DocDetailView docPage={entry} key={entry.id} />
          ))}
        </div>
      </div>
    )
  }

  if (selectedDoc) {
    return <ComponentDetailView doc={selectedDoc} />
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1000px] flex-1 flex-col gap-6 overflow-x-hidden">
      <section className="flex flex-col gap-8 w-full">
        <DocsHero categories={categories} onBackHome={onBackHome} totalComponents={filteredDocs.length} />
        <DocsOverview />
      </section>

      <section className="grid gap-8">
        {docsByCategory.map((categoryGroup) => (
          <div className="grid gap-4" key={categoryGroup.category}>
            <GlassPanel className="border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-3">
                <Tag className="border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)]">
                  {getDocCategoryLabel(categoryGroup.category, isPt)}
                </Tag>
                <Tag className="border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] text-[color:var(--text-muted)]">
                  {categoryGroup.items.length} {isPt ? 'componentes' : 'components'}
                </Tag>
              </div>
              <h2 className="mt-3 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.2rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">
                {getDocCategoryTitle(categoryGroup.category, isPt)}
              </h2>
              <p className="mt-2 text-[0.9rem] leading-6 text-[color:var(--text-soft)]">
                {getDocCategoryDescription(categoryGroup.category, isPt)}
              </p>
            </GlassPanel>

            <div className="grid gap-6">
              {categoryGroup.items.map((doc) => (
                <ComponentDocCard doc={doc} key={doc.id} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
