import { ComponentDocCard } from '../features/docs/component-doc-card'
import { ComponentDetailView } from '../features/docs/component-detail-view'
import { DocDetailView } from '../features/docs/doc-detail-view'
import { DocsHero } from '../features/docs/docs-hero'
import { DocsOverview } from '../features/docs/docs-overview'
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
  const filteredDocs = selectedComponentGroup === 'inputs'
    ? docs.filter((item) => inputDocIds.has(item.id))
    : docs

  const categories = Array.from(new Set(filteredDocs.map((item) => item.category)))

  if (page === 'docs') {
    if (docPage) {
      return <DocDetailView docPage={docPage} />
    }

    return (
      <div className="grid gap-6">
        {docPages.map((entry) => (
          <DocDetailView docPage={entry} key={entry.id} />
        ))}
      </div>
    )
  }

  if (selectedDoc) {
    return <ComponentDetailView doc={selectedDoc} />
  }

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6">
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
