import { ComponentDocCard } from '../features/docs/component-doc-card'
import { ComponentDetailView } from '../features/docs/component-detail-view'
import { DocDetailView } from '../features/docs/doc-detail-view'
import { DocsHero } from '../features/docs/docs-hero'
import { DocsOverview } from '../features/docs/docs-overview'
import type { ComponentDoc, DocPage } from '../types/docs'

interface DocsPageProps {
  docs: ComponentDoc[]
  docPage: DocPage | null
  onBackHome: () => void
  selectedDoc: ComponentDoc | null
}

export function DocsPage({ docs, docPage, onBackHome, selectedDoc }: DocsPageProps) {
  const categories = Array.from(new Set(docs.map((item) => item.category)))

  if (docPage) {
    return <DocDetailView docPage={docPage} />
  }

  if (selectedDoc) {
    return <ComponentDetailView doc={selectedDoc} />
  }

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <DocsHero categories={categories} onBackHome={onBackHome} totalComponents={docs.length} />
        <DocsOverview />
      </section>

      <section className="grid gap-6">
        {docs.map((doc) => (
          <ComponentDocCard doc={doc} key={doc.id} />
        ))}
      </section>
    </div>
  )
}
