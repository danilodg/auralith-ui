import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'

import { ChartTooltip } from './chart-tooltip'
import { cn } from '../utils/cn'

export interface HeatmapChartDatum {
  x: string
  y: string
  value: number
}

export interface HeatmapChartProps extends HTMLAttributes<HTMLDivElement> {
  data: HeatmapChartDatum[]
  height?: number
  valueFormatter?: (value: number) => string
}

function colorFor(value: number, min: number, max: number) {
  const ratio = (value - min) / (max - min || 1)
  const alpha = 0.08 + ratio * 0.82
  return `color-mix(in srgb, var(--accent-line) ${(alpha * 100).toFixed(1)}%, rgba(15, 25, 48, 0.35))`
}

export function HeatmapChart({ className, data, height = 280, valueFormatter, ...props }: HeatmapChartProps) {
  const [hovered, setHovered] = useState<HeatmapChartDatum | null>(null)

  const xValues = useMemo(() => [...new Set(data.map((item) => item.x))], [data])
  const yValues = useMemo(() => [...new Set(data.map((item) => item.y))], [data])
  const max = Math.max(...data.map((item) => item.value), 1)
  const min = Math.min(...data.map((item) => item.value), 0)

  const width = 100
  const padding = { bottom: 12, left: 6, right: 2, top: 2 }
  const innerWidth = width - padding.left - padding.right
  const innerHeight = 100 - padding.top - padding.bottom
  const cellWidth = innerWidth / Math.max(xValues.length, 1)
  const cellHeight = innerHeight / Math.max(yValues.length, 1)

  return (
    <div className={cn('relative', className)} {...props}>
      <svg className="w-full" preserveAspectRatio="none" role="img" style={{ height }} viewBox={`0 0 ${width} 100`}>
        {data.map((item) => {
          const xIndex = xValues.indexOf(item.x)
          const yIndex = yValues.indexOf(item.y)
          const x = padding.left + xIndex * cellWidth
          const y = padding.top + yIndex * cellHeight

          return (
            <rect
              fill={colorFor(item.value, min, max)}
              key={`${item.x}-${item.y}`}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              rx={0.8}
              stroke="color-mix(in srgb, var(--card-border) 45%, transparent)"
              strokeWidth={0.28}
              width={Math.max(cellWidth - 0.45, 0.8)}
              x={x}
              y={y}
              height={Math.max(cellHeight - 0.45, 0.8)}
            />
          )
        })}
      </svg>

      {hovered ? (
        <ChartTooltip
          className="absolute right-0 top-2"
          heading={`${hovered.x} / ${hovered.y}`}
          rows={[
            {
              color: 'var(--accent-line)',
              label: 'Value',
              value: valueFormatter ? valueFormatter(hovered.value) : hovered.value.toLocaleString(),
            },
          ]}
        />
      ) : null}
    </div>
  )
}
