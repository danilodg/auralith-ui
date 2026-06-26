import { Button, GlassPanel, Tag } from '../../lib'
import { useLocale } from '../../locale-context'

interface DocsHeroProps {
  categories: string[]
  onBackHome: () => void
  totalComponents: number
}

export function DocsHero({ categories, onBackHome, totalComponents }: DocsHeroProps) {
  const { strings } = useLocale()

  return (
    <GlassPanel className="relative overflow-hidden border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-4 text-center shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:p-8 lg:p-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(111,224,255,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 max-w-4xl mx-auto rounded-[100%] bg-[color:var(--accent-line)] opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        <Tag className="mb-5 whitespace-nowrap border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)] sm:mb-6">
          {strings.docs.heroEyebrow}
        </Tag>
        <h1 className="max-w-3xl font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.85rem,8vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm">
          {strings.docs.heroTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-[0.92rem] leading-6 text-[color:var(--text-soft)] sm:text-[1.15rem] sm:leading-7">
          {strings.docs.heroDescription}
        </p>

        <div className="mt-6 flex w-full gap-2 overflow-x-auto pb-1 sm:mt-10 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:pb-0">
          {categories.map((category) => (
            <Tag key={category} className="shrink-0 border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[0.72rem] sm:px-3 sm:py-1.5 sm:text-[0.8rem]">{category}</Tag>
          ))}
        </div>

        <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button onClick={onBackHome} className="w-full px-4 shadow-lg shadow-[rgba(111,224,255,0.2)] sm:w-auto sm:px-6">{strings.docs.backToLanding}</Button>
          <Button variant="secondary" className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] px-4 shadow-sm hover:bg-[rgba(255,255,255,0.04)] sm:w-auto sm:px-6">{strings.docs.componentsAvailable(totalComponents)}</Button>
        </div>
      </div>
    </GlassPanel>
  )
}
