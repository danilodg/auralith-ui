import { createLandingContent } from '../data/landing-content'
import { CompositionSection } from '../features/landing/composition-section'
import { CtaSection } from '../features/landing/cta-section'
import { HeroSection } from '../features/landing/hero-section'
import { PillarsSection } from '../features/landing/pillars-section'
import { PrimitivesShowcase } from '../features/landing/primitives-showcase'
import { ReleaseHighlightsSection } from '../features/landing/release-highlights-section'
import { StackSection } from '../features/landing/stack-section'
import { useLocale } from '../locale-context'

interface LandingPageProps {
  onOpenComponents: () => void
  onNavigateToHash: (hash: string) => void
  onOpenDocs: () => void
}

export function LandingPage({ onNavigateToHash, onOpenComponents, onOpenDocs }: LandingPageProps) {
  const { language } = useLocale()
  const content = createLandingContent(language)

  return (
    <div className="flex min-h-full flex-1 flex-col gap-10 pb-24 w-full">
      <HeroSection metrics={content.metrics} onOpenComponents={onOpenComponents} onOpenDocs={onOpenDocs} />
      <ReleaseHighlightsSection highlights={content.releaseHighlights} onNavigateToHash={onNavigateToHash} />
      <CompositionSection section={content.compositionSection} />
      <PillarsSection pillars={content.pillars} />
      <StackSection technicalSection={content.technicalSection} onOpenComponents={onOpenComponents} />
      <PrimitivesShowcase />
      <CtaSection onOpenDocs={onOpenDocs} />
    </div>
  )
}
