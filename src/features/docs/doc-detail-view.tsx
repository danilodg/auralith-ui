import type { DocPage } from '../../types/docs'

interface DocDetailViewProps {
  docPage: DocPage
}

export function DocDetailView({ docPage }: DocDetailViewProps) {
  return <div className="flex min-h-full flex-1 flex-col gap-6">{docPage.content}</div>
}
