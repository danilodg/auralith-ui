import { BookOpenText } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { Button, GlassPanel, SectionLabel } from '../../lib'

interface CtaSectionProps {
  onOpenDocs: () => void
}

export function CtaSection({ onOpenDocs }: CtaSectionProps) {
  const { strings } = useLocale()

  return (
    <section>
      <GlassPanel className="flex flex-col gap-3 p-3 sm:flex-row sm:items-end sm:justify-between sm:p-3">
        <div>
          <SectionLabel>{strings.landing.nextStep}</SectionLabel>
          <h2 className="mt-3 max-w-2xl font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.45rem,3.8vw,2.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {strings.landing.nextStepTitle}
          </h2>
        </div>
        <Button onClick={onOpenDocs}>
          {strings.landing.openDocumentation}
          <BookOpenText size={16} />
        </Button>
      </GlassPanel>
    </section>
  )
}
