import { GlassPanel, Tag } from '../../lib'
import { SectionHeader } from '../../lib/components/section-header'
import { useLocale } from '../../locale-context'
import type { DocPage } from '../../types/docs'

interface DocDetailViewProps {
  docPage: DocPage
}

export function DocDetailView({ docPage }: DocDetailViewProps) {
  const { strings } = useLocale()

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6">
      <GlassPanel className="min-h-[220px] p-2 sm:p-2 lg:min-h-[280px] lg:p-2">
        <div className="flex flex-wrap gap-3">
          <Tag>docs</Tag>
          <Tag>{docPage.title}</Tag>
          <Tag>{docPage.urlText}</Tag>
        </div>

        <SectionHeader className="mt-6" eyebrow={strings.docs.docPageEyebrow} heading={docPage.title} description={docPage.description} />
      </GlassPanel>

      {docPage.content}
    </div>
  )
}
