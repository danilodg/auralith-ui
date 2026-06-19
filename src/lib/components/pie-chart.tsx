import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'

import { ChartLegend } from './chart-legend'
import { ChartTooltip } from './chart-tooltip'
import { cn } from '../utils/cn'

export interface PieChartDatum {
  color?: string
  key: string
  label: string
  value: number
}

export interface PieChartProps extends HTMLAttributes<HTMLDivElement> {
  data: PieChartDatum[]
  height?: number
  showLegend?: boolean
  valueFormatter?: (value: number) => string
}

const FALLBACK_COLORS = ['#6fe0ff', '#7f95ff', '#8b66ff', '#f3b855', '#7df4c0']

function slicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = {
    x: cx + r * Math.cos(startAngle),
    y: cy + r * Math.sin(startAngle),
  }
  const end = {
    x: cx + r * Math.cos(endAngle),
    y: cy + r * Math.sin(endAngle),
  }
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

export function PieChart({ className, data, height = 280, showLegend = true, valueFormatter, ...props }: PieChartProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const total = Math.max(data.reduce((sum, item) => sum + Math.max(item.value, 0), 0), 1)
  const radius = 40
  const center = { x: 50, y: 50 }

  const segments = useMemo(() => {
    let start = -Math.PI / 2
    return data.map((item, index) => {
      const value = Math.max(item.value, 0)
      const angle = (value / total) * Math.PI * 2
      const end = start + angle
      const result = {
        color: item.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
        end,
        item,
        start,
      }
      start = end
      return result
    })
  }, [data, total])

  const hovered = hoveredKey ? data.find((item) => item.key === hoveredKey) : null

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      <div className="relative flex justify-center">
        <svg className="w-full max-w-[320px]" preserveAspectRatio="xMidYMid meet" role="img" style={{ height }} viewBox="0 0 100 100">
          {segments.map(({ color, end, item, start }) => (
            <path
              d={slicePath(center.x, center.y, radius, start, end)}
              fill={color}
              key={item.key}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
              opacity={hoveredKey === item.key ? 1 : hoveredKey ? 0.55 : 0.95}
            />
          ))}
        </svg>

        {hovered ? (
          <ChartTooltip
            className="absolute right-0 top-2"
            heading={hovered.label}
            rows={[
              {
                color: hovered.color,
                label: 'Value',
                value: valueFormatter ? valueFormatter(hovered.value) : hovered.value.toLocaleString(),
              },
              {
                color: hovered.color,
                label: 'Share',
                value: `${Math.round((hovered.value / total) * 100)}%`,
              },
            ]}
          />
        ) : null}
      </div>

      {showLegend ? (
        <ChartLegend
          activeKeys={hoveredKey ? [hoveredKey] : data.map((item) => item.key)}
          items={data.map((item, index) => ({
            color: item.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
            key: item.key,
            label: item.label,
          }))}
          onToggleKey={(key) => setHoveredKey((current) => (current === key ? null : key))}
        />
      ) : null}
    </div>
  )
}
