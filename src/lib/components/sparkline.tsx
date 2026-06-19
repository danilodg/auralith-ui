import type { HTMLAttributes } from 'react'

import { cn } from '../utils/cn'

type SparklineDatum = number | { value: number }

export interface SparklineProps extends HTMLAttributes<HTMLDivElement> {
  color?: string
  data: SparklineDatum[]
  height?: number
  showArea?: boolean
  showDots?: boolean
  strokeWidth?: number
}

function getValues(data: SparklineDatum[]) {
  return data.map((item) => (typeof item === 'number' ? item : item.value))
}

export function Sparkline({ className, color = 'var(--accent-line)', data, height = 64, showArea = true, showDots = false, strokeWidth = 2, ...props }: SparklineProps) {
  const values = getValues(data)
  const points = Math.max(values.length, 2)
  const max = Math.max(...values, 0)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const width = 100
  const step = width / (points - 1)

  const linePath = values
    .map((value, index) => {
      const x = index * step
      const y = 100 - ((value - min) / range) * 100
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  const areaPath = `${linePath} L ${((values.length - 1) * step).toFixed(2)} 100 L 0 100 Z`

  return (
    <div className={cn('w-full', className)} {...props}>
      <svg aria-label="sparkline" className="w-full" preserveAspectRatio="none" role="img" style={{ height }} viewBox={`0 0 ${width} 100`}>
        {showArea ? (
          <path d={areaPath} fill={`color-mix(in srgb, ${color} 18%, transparent)`} />
        ) : null}
        <path d={linePath} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
        {showDots
          ? values.map((value, index) => {
              const x = index * step
              const y = 100 - ((value - min) / range) * 100
              return <circle cx={x} cy={y} fill={color} key={`${index}-${value}`} r={2} />
            })
          : null}
      </svg>
    </div>
  )
}
