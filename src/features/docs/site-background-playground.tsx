import { GlassPanel, Switch, Tag } from '../../lib'
import { useLocale } from '../../locale-context'
import { useSiteBackground } from '../../site-background-context'
import type { SiteBackgroundGridStyle, SiteBackgroundIntensity } from '../shared/site-background'

const intensities: SiteBackgroundIntensity[] = ['soft', 'medium', 'strong']
const gridStyles: SiteBackgroundGridStyle[] = ['orthogonal', 'diagonal']

export function SiteBackgroundPlayground() {
  const { language } = useLocale()
  const { settings, updateSettings } = useSiteBackground()
  const isPt = language === 'pt'

  return (
    <GlassPanel className="p-5">
      <div className="flex flex-wrap items-center gap-3">
        <Tag>{isPt ? 'Background do site' : 'Site background'}</Tag>
        <p className="text-[0.86rem] text-[color:var(--text-soft)]">
          {isPt ? 'Altere aqui e veja o fundo inteiro atualizar em tempo real.' : 'Adjust here and the entire site background updates in real time.'}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Switch
          checked={settings.showDiffuse}
          label={isPt ? 'Aura difusa' : 'Diffuse aura'}
          onCheckedChange={(checked) => updateSettings({ showDiffuse: checked })}
        />
        <Switch
          checked={settings.showGrid}
          label={isPt ? 'Grade de linhas' : 'Grid lines'}
          onCheckedChange={(checked) => updateSettings({ showGrid: checked })}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
          {isPt ? 'Intensidade' : 'Intensity'}
        </p>
        {intensities.map((level) => (
          <button
            className={[
              'rounded-[8px] border px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] transition-colors',
              settings.intensity === level
                ? 'border-[color:var(--accent-line)] bg-[rgba(111,224,255,0.1)] text-[color:var(--accent-line)]'
                : 'border-[color:var(--card-border)] text-[color:var(--text-soft)] hover:text-[color:var(--text-main)]',
            ].join(' ')}
            key={level}
            onClick={() => updateSettings({ intensity: level })}
            type="button"
          >
            {level}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
          {isPt ? 'Grade' : 'Grid'}
        </p>
        {gridStyles.map((style) => (
          <button
            className={[
              'rounded-[8px] border px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] transition-colors',
              settings.gridStyle === style
                ? 'border-[color:var(--accent-line)] bg-[rgba(111,224,255,0.1)] text-[color:var(--accent-line)]'
                : 'border-[color:var(--card-border)] text-[color:var(--text-soft)] hover:text-[color:var(--text-main)]',
            ].join(' ')}
            key={style}
            onClick={() => updateSettings({ gridStyle: style })}
            type="button"
          >
            {style}
          </button>
        ))}
      </div>

    </GlassPanel>
  )
}
