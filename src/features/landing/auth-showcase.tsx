import { Mail, ShieldCheck } from 'lucide-react'

import { useLocale } from '../../locale-context'
import { AuthShell, Button, Input, SectionLabel } from '../../lib'

export function AuthShowcase() {
  const { strings } = useLocale()

  return (
    <section>
      <AuthShell
        eyebrow={strings.landing.authEyebrow}
        title={strings.landing.authTitle}
        description={strings.landing.authDescription}
        highlights={strings.landing.authHighlights}
        stats={strings.landing.authStats}
      >
        <SectionLabel>{strings.landing.authPreview}</SectionLabel>
        <h3 className="mt-4 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.85rem] font-bold tracking-[-0.04em] text-[color:var(--text-main)]">{strings.landing.accessWorkspace}</h3>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">{strings.landing.authPreviewDescription}</p>
        <div className="mt-6 space-y-4">
          <Input label={strings.landing.workEmail} type="email" placeholder="name@company.com" icon={<Mail size={18} />} />
          <Input label={strings.landing.password} type="password" placeholder={strings.landing.passwordPlaceholder} icon={<ShieldCheck size={18} />} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button className="w-full sm:w-auto">{strings.landing.continue}</Button>
          <Button className="w-full sm:w-auto" variant="secondary">{strings.landing.recoveryFlow}</Button>
        </div>
      </AuthShell>
    </section>
  )
}
