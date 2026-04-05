import { ComponentDocCard } from '../features/docs/component-doc-card'
import { ComponentDetailView } from '../features/docs/component-detail-view'
import { DocDetailView } from '../features/docs/doc-detail-view'
import { DocsHero } from '../features/docs/docs-hero'
import { DocsOverview } from '../features/docs/docs-overview'
import { GlassPanel, Tag } from '../lib'
import { SectionHeader } from '../lib/components/section-header'
import { useLocale } from '../locale-context'
import type { ComponentDoc, DocPage } from '../types/docs'

type PageView = 'landing' | 'docs' | 'components'

interface DocsPageProps {
  docs: ComponentDoc[]
  docPage: DocPage | null
  docPages: DocPage[]
  onBackHome: () => void
  page: PageView
  selectedComponentGroup: 'inputs' | null
  selectedDoc: ComponentDoc | null
}

const inputDocIds = new Set(['input', 'checkbox', 'select', 'textarea', 'input-date', 'input-time', 'input-number'])

export function DocsPage({ docs, docPage, docPages, onBackHome, page, selectedComponentGroup, selectedDoc }: DocsPageProps) {
  const { language, strings } = useLocale()
  const isPt = language === 'pt'
  const filteredDocs = selectedComponentGroup === 'inputs'
    ? docs.filter((item) => inputDocIds.has(item.id))
    : docs

  const categories = Array.from(new Set(filteredDocs.map((item) => item.category)))

  if (page === 'docs') {
    if (docPage) {
      return <DocDetailView docPage={docPage} />
    }

    return (
      <div className="mx-auto flex min-h-full w-full max-w-[1000px] flex-1 flex-col gap-6">
        <GlassPanel className="p-2 sm:p-2 lg:p-2">
          <div className="flex flex-wrap gap-3">
            <Tag>docs</Tag>
            <Tag>{isPt ? 'documentacao da biblioteca' : 'library documentation'}</Tag>
            <Tag>{docPages.length} {isPt ? 'secoes' : 'sections'}</Tag>
          </div>
          <SectionHeader
            className="mt-6"
            eyebrow={strings.docs.heroEyebrow}
            heading={isPt ? 'Documentacao da biblioteca' : 'Library documentation'}
            description={isPt ? 'Guia completo com seções de instalacao e uso para aplicar os componentes no projeto.' : 'Complete guide with installation and usage sections to apply the components in your project.'}
          />
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
    <div className="mx-auto flex min-h-full w-full max-w-[1000px] flex-1 flex-col gap-6">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <DocsHero categories={categories} onBackHome={onBackHome} totalComponents={filteredDocs.length} />
        <DocsOverview />
      </section>

      <section className="grid gap-6">
        {filteredDocs.map((doc) => (
          <ComponentDocCard doc={doc} key={doc.id} />
        ))}
      </section>
    </div>
  )
}
