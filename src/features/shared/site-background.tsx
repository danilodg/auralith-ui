import { cn } from '../../lib/utils/cn'

export type SiteBackgroundIntensity = 'soft' | 'medium' | 'strong'
export type SiteBackgroundGridStyle = 'orthogonal' | 'diagonal'

export interface SiteBackgroundSettings {
  showDiffuse: boolean
  showGrid: boolean
  intensity: SiteBackgroundIntensity
  gridStyle: SiteBackgroundGridStyle
}

interface SiteBackgroundProps {
  settings: SiteBackgroundSettings
}

const diffuseOpacityClass: Record<SiteBackgroundIntensity, string> = {
  soft: 'opacity-70',
  medium: 'opacity-100',
  strong: 'opacity-[1.2]',
}

const gridOpacityClass: Record<SiteBackgroundIntensity, string> = {
  soft: 'opacity-40',
  medium: 'opacity-60',
  strong: 'opacity-80',
}

const gridPatternClass: Record<SiteBackgroundGridStyle, string> = {
  orthogonal: '[background-image:linear-gradient(var(--site-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--site-grid-line)_1px,transparent_1px)] [background-position:center] [background-size:78px_78px]',
  diagonal: '[background-image:repeating-linear-gradient(45deg,var(--site-grid-line)_0px,var(--site-grid-line)_1px,transparent_1px,transparent_28px),repeating-linear-gradient(-45deg,var(--site-grid-line)_0px,var(--site-grid-line)_1px,transparent_1px,transparent_28px)] [background-position:center] [background-size:84px_84px]',
}

export function SiteBackground({ settings }: SiteBackgroundProps) {
  return (
    <>
      {settings.showDiffuse ? (
        <div
          className={cn(
            'pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,var(--site-glow-top-left),transparent_30%),radial-gradient(circle_at_80%_12%,var(--site-glow-top-right),transparent_24%),radial-gradient(circle_at_50%_100%,var(--site-glow-bottom),transparent_30%)] transition-opacity duration-500',
            diffuseOpacityClass[settings.intensity],
          )}
        />
      ) : null}

      {settings.showGrid ? (
        <div
          className={cn(
            'pointer-events-none fixed inset-0 transition-opacity duration-500',
            gridPatternClass[settings.gridStyle],
            gridOpacityClass[settings.intensity],
          )}
        />
      ) : null}
    </>
  )
}
