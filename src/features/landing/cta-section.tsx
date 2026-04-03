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
      <GlassPanel className="flex flex-col gap-6 p-2 sm:flex-row sm:items-end sm:justify-between sm:p-2">
        <div>
          <SectionLabel>{strings.landing.nextStep}</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.9rem,5vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em]">
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
