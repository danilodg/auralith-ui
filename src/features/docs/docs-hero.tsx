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
    <GlassPanel className="relative p-8 sm:p-14 overflow-hidden flex flex-col items-center justify-center text-center border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(111,224,255,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 max-w-4xl mx-auto rounded-[100%] bg-[color:var(--accent-line)] opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        <Tag className="mb-6 border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)]">
          {strings.docs.heroEyebrow}
        </Tag>
        <h1 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm max-w-3xl">
          {strings.docs.heroTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-[1.05rem] leading-7 text-[color:var(--text-soft)] sm:text-[1.15rem]">
          {strings.docs.heroDescription}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3 w-full">
          {categories.map((category) => (
            <Tag key={category} className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] px-3 py-1.5 text-[0.8rem]">{category}</Tag>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={onBackHome} className="shadow-lg shadow-[rgba(111,224,255,0.2)] px-6">{strings.docs.backToLanding}</Button>
          <Button variant="secondary" className="shadow-sm bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)] px-6">{strings.docs.componentsAvailable(totalComponents)}</Button>
        </div>
      </div>
    </GlassPanel>
  )
}
