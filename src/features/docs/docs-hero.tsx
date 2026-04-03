import { Button, GlassPanel, Tag } from '../../lib'
import { SectionHeader } from '../../lib/components/section-header'
import { useLocale } from '../../locale-context'

interface DocsHeroProps {
  categories: string[]
  onBackHome: () => void
  totalComponents: number
}

export function DocsHero({ categories, onBackHome, totalComponents }: DocsHeroProps) {
  const { strings } = useLocale()

  return (
    <GlassPanel className="p-2 sm:p-2 lg:p-2">
      <SectionHeader
        eyebrow={strings.docs.heroEyebrow}
        heading={strings.docs.heroTitle}
        description={strings.docs.heroDescription}
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <Tag key={category}>{category}</Tag>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={onBackHome}>{strings.docs.backToLanding}</Button>
        <Button variant="secondary">{strings.docs.componentsAvailable(totalComponents)}</Button>
      </div>
    </GlassPanel>
  )
}
