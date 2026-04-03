import type { Language } from '../../i18n'
import { useLocale } from '../../locale-context'

export function LanguageSelect() {
  const { language, setLanguage, strings } = useLocale()

  return (
    <div className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-[color:var(--nav-border)] bg-[var(--nav-bg)] px-1.5 text-[color:var(--text-main)] shadow-[0_18px_46px_rgba(0,0,0,0.16)]">
      <span className="pl-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
        {strings.languageLabel}
      </span>

      <div className="relative grid grid-cols-2 items-center rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.03)] p-2">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 top-1 w-[calc(50%-0.125rem)] rounded-[8px] bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] shadow-[0_0_18px_var(--accent-shadow)] transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${language === 'pt' ? '0%' : '100%'})` }}
        />
        {(['pt', 'en'] as const).map((option) => {
          const active = language === option

          return (
            <button
              aria-pressed={active}
              className={[
                'relative z-10 inline-flex h-8 min-w-11 items-center justify-center rounded-[8px] px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition',
                active ? 'text-white' : 'text-[color:var(--text-soft)] hover:text-[color:var(--text-main)]',
              ].join(' ')}
              key={option}
              onClick={() => setLanguage(option as Language)}
              type="button"
            >
              {strings.languageOptions[option]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
