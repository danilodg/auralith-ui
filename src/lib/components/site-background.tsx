import type { CSSProperties } from 'react'

import { cn } from '../utils/cn'

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

const diffuseOpacity: Record<SiteBackgroundIntensity, number> = {
  soft: 0.7,
  medium: 1,
  strong: 1.2,
}

const gridOpacity: Record<SiteBackgroundIntensity, number> = {
  soft: 0.4,
  medium: 0.6,
  strong: 0.8,
}

const gridPatternStyle: Record<SiteBackgroundGridStyle, CSSProperties> = {
  orthogonal: {
    backgroundImage:
      'linear-gradient(var(--site-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--site-grid-line) 1px, transparent 1px)',
    backgroundPosition: 'center',
    backgroundSize: '78px 78px',
  },
  diagonal: {
    backgroundImage:
      'repeating-linear-gradient(45deg, var(--site-grid-line) 0px, var(--site-grid-line) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(-45deg, var(--site-grid-line) 0px, var(--site-grid-line) 1px, transparent 1px, transparent 28px)',
    backgroundPosition: 'center',
    backgroundSize: '84px 84px',
  },
}

export function SiteBackground({ settings }: SiteBackgroundProps) {
  return (
    <>
      {settings.showDiffuse ? (
        <div
          className={cn('pointer-events-none fixed inset-0 transition-opacity duration-500')}
          style={{
            backgroundImage:
              'radial-gradient(circle at top left, var(--site-glow-top-left), transparent 30%), radial-gradient(circle at 80% 12%, var(--site-glow-top-right), transparent 24%), radial-gradient(circle at 50% 100%, var(--site-glow-bottom), transparent 30%)',
            opacity: diffuseOpacity[settings.intensity],
          }}
        />
      ) : null}

      {settings.showGrid ? (
        <div
          className={cn('pointer-events-none fixed inset-0 transition-opacity duration-500')}
          style={{
            ...gridPatternStyle[settings.gridStyle],
            opacity: gridOpacity[settings.intensity],
          }}
        />
      ) : null}
    </>
  )
}
