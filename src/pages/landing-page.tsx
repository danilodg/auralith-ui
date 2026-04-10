import { createLandingContent } from '../data/landing-content'
import { AuthShowcase } from '../features/landing/auth-showcase'
import { CtaSection } from '../features/landing/cta-section'
import { HeroSection } from '../features/landing/hero-section'
import { PillarsSection } from '../features/landing/pillars-section'
import { PrimitivesShowcase } from '../features/landing/primitives-showcase'
import { StackSection } from '../features/landing/stack-section'
import { useLocale } from '../locale-context'

interface LandingPageProps {
  onOpenDocs: () => void
}

export function LandingPage({ onOpenDocs }: LandingPageProps) {
  const { language } = useLocale()
  const content = createLandingContent(language)

  return (
    <div className="flex min-h-full flex-1 flex-col gap-10 pb-24 w-full">
      <HeroSection metrics={content.metrics} onOpenDocs={onOpenDocs} />
      <StackSection componentNames={content.componentNames} stackItems={content.stackItems} />
      <PillarsSection pillars={content.pillars} />
      <PrimitivesShowcase />
      <AuthShowcase />
      <CtaSection onOpenDocs={onOpenDocs} />
    </div>
  )
}
