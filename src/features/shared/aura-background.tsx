import * as React from 'react'

type AuraBackgroundIntensity = 'subtle' | 'medium' | 'strong'

interface AuraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: AuraBackgroundIntensity
  withGrid?: boolean
  hoverBoost?: boolean
}

const intensityClassName: Record<AuraBackgroundIntensity, string> = {
  subtle: 'opacity-[0.5]',
  medium: 'opacity-[0.75]',
  strong: 'opacity-100',
}

function joinClassNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function AuraBackground({ className, intensity = 'medium', withGrid = true, hoverBoost = false, ...props }: AuraBackgroundProps) {
  return (
    <div className={joinClassNames('absolute inset-0 overflow-hidden pointer-events-none', className)} {...props}>
      {withGrid ? (
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(255,255,255,0.01)_24px,rgba(255,255,255,0.01)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.01)_24px,rgba(255,255,255,0.01)_25px)]" />
      ) : null}

      <div
        className={joinClassNames(
          'absolute inset-0 bg-[radial-gradient(ellipse_78%_66%_at_14%_12%,rgba(45,216,255,0.2)_0%,transparent_56%),radial-gradient(ellipse_74%_68%_at_86%_18%,rgba(210,97,255,0.18)_0%,transparent_56%),radial-gradient(ellipse_66%_72%_at_52%_86%,rgba(87,130,255,0.16)_0%,transparent_62%)] blur-[2px]',
          intensityClassName[intensity],
          hoverBoost ? 'transition-opacity duration-700 group-hover:opacity-100' : '',
        )}
      />

      <div
        className={joinClassNames(
          'absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(111,224,255,0.08)_0%,transparent_58%)]',
          hoverBoost ? 'opacity-60 transition-opacity duration-700 group-hover:opacity-100' : 'opacity-70',
        )}
      />
    </div>
  )
}
