import { Mail } from 'lucide-react'

import { SectionHeader } from '../../lib/components/section-header'
import { useLocale } from '../../locale-context'
import { Button, Card, GlassPanel, Input, Textarea } from '../../lib'

export function PrimitivesShowcase() {
  const { strings } = useLocale()

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <GlassPanel className="p-2 sm:p-2">
        <SectionHeader
          eyebrow={strings.landing.featuredPrimitives}
          heading={strings.landing.featuredPrimitivesTitle}
          description={strings.landing.featuredPrimitivesDescription}
        />
        <div className="mt-8 grid gap-4">
          <Input label={strings.landing.workEmail} type="email" placeholder="name@company.com" icon={<Mail size={18} />} hint={strings.landing.workEmailHint} />
          <Textarea label={strings.landing.projectBrief} placeholder={strings.landing.projectBriefHint} hint={strings.landing.projectBriefHint} />
          <div className="flex flex-wrap gap-3">
            <Button>{strings.landing.requestDesignSystem}</Button>
            <Button variant="secondary">{strings.landing.previewTokens}</Button>
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-6">
        <Card className="p-2 sm:p-2" variant="subtle">
          <SectionHeader
            eyebrow={strings.landing.whyLibrary}
            heading={strings.landing.whyLibraryTitle}
            description={strings.landing.whyLibraryDescription}
          />
        </Card>
      </div>
    </section>
  )
}
