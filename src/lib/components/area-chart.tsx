import { useId, useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'

import { ChartTooltip } from './chart-tooltip'
import { cn } from '../utils/cn'

export interface AreaChartProps extends HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string
  color?: string
  data: Record<string, number | string | null | undefined>[]
  height?: number
  maxValue?: number
  minValue?: number
  showAxes?: boolean
  showGrid?: boolean
  valueFormatter?: (value: number) => string
  xKey: string
  xLabel?: string
  xTickCount?: number
  xTickFormatter?: (value: string, index: number) => string
  yKey: string
  yLabel?: string
  yTickFormatter?: (value: number) => string
  yTicks?: number
}

function toNumeric(value: unknown) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : 0
}

function buildTickIndices(length: number, requestedCount: number) {
  if (length <= 0) return []
  if (length === 1) return [0]
  const count = Math.max(2, Math.min(requestedCount, length))
  const step = (length - 1) / (count - 1)
  const values = new Set<number>()
  for (let i = 0; i < count; i += 1) values.add(Math.round(i * step))
  values.add(0)
  values.add(length - 1)
  return Array.from(values).sort((a, b) => a - b)
}

export function AreaChart({
  ariaLabel = 'area chart',
  className,
  color = '#7f95ff',
  data,
  height = 280,
  maxValue,
  minValue = 0,
  showAxes = true,
  showGrid = true,
  valueFormatter,
  xKey,
  xLabel,
  xTickCount = 6,
  xTickFormatter,
  yKey,
  yLabel,
  yTickFormatter,
  yTicks = 4,
  ...props
}: AreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const gradientId = useId().replace(/:/g, '')

  const autoMax = useMemo(() => Math.max(...data.map((row) => toNumeric(row[yKey])), 1), [data, yKey])
  const domainMax = Math.max(maxValue ?? autoMax, minValue + 1)
  const domainMin = minValue
  const domainRange = domainMax - domainMin

  const width = 100
  const padding = {
    bottom: xLabel ? 24 : 18,
    left: yLabel ? 16 : 12,
    right: 4,
    top: 6,
  }
  const tickFontSize = 4.1
  const innerWidth = width - padding.left - padding.right
  const innerHeight = 100 - padding.top - padding.bottom
  const step = data.length > 1 ? innerWidth / (data.length - 1) : 0
  const xTicks = buildTickIndices(data.length, xTickCount)

  const getX = (index: number) => padding.left + index * step
  const getY = (value: number) => {
    const normalized = (value - domainMin) / domainRange
    return padding.top + innerHeight - normalized * innerHeight
  }

  const path = data
    .map((row, index) => {
      const x = getX(index)
      const y = getY(toNumeric(row[yKey]))
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  const areaPath = `${path} L ${getX(Math.max(data.length - 1, 0)).toFixed(2)} ${(padding.top + innerHeight).toFixed(2)} L ${padding.left} ${(padding.top + innerHeight).toFixed(2)} Z`

  return (
    <div className={cn('relative', className)} onMouseLeave={() => setHoveredIndex(null)} {...props}>
      <svg
        aria-label={ariaLabel}
        className="w-full"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const px = ((event.clientX - rect.left) / rect.width) * width
          const index = Math.round((px - padding.left) / Math.max(step, 1))
          setHoveredIndex(Math.max(0, Math.min(index, data.length - 1)))
        }}
        preserveAspectRatio="none"
        role="img"
        style={{ height }}
        viewBox={`0 0 ${width} 100`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {showGrid
          ? Array.from({ length: Math.max(yTicks, 1) + 1 }).map((_, idx) => {
              const y = padding.top + innerHeight * (idx / Math.max(yTicks, 1))
              return (
                <line
                  key={idx}
                  stroke="color-mix(in srgb, var(--card-border) 45%, transparent)"
                  strokeDasharray="2 2"
                  strokeWidth="0.35"
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                />
              )
            })
          : null}

        {showAxes ? (
          <>
            <line stroke="color-mix(in srgb, var(--card-border) 62%, transparent)" strokeWidth="0.45" x1={padding.left} x2={padding.left} y1={padding.top} y2={padding.top + innerHeight} />
            <line
              stroke="color-mix(in srgb, var(--card-border) 62%, transparent)"
              strokeWidth="0.45"
              x1={padding.left}
              x2={width - padding.right}
              y1={padding.top + innerHeight}
              y2={padding.top + innerHeight}
            />
          </>
        ) : null}

        {Array.from({ length: Math.max(yTicks, 1) + 1 }).map((_, idx) => {
          const ratio = idx / Math.max(yTicks, 1)
          const value = domainMax - ratio * domainRange
          const y = padding.top + innerHeight * ratio
          const label = yTickFormatter ? yTickFormatter(value) : Math.round(value).toString()
          return (
            <text fill="var(--text-muted)" fontSize={tickFontSize} key={`y-${idx}`} textAnchor="end" x={padding.left - 1.2} y={y + 1.15}>
              {label}
            </text>
          )
        })}

        {xTicks.map((index) => {
          const raw = String(data[index]?.[xKey] ?? '')
          const label = xTickFormatter ? xTickFormatter(raw, index) : raw
          return (
            <text fill="var(--text-muted)" fontSize={tickFontSize} key={`x-${index}`} textAnchor="middle" x={getX(index)} y={padding.top + innerHeight + 5.2}>
              {label}
            </text>
          )
        })}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path d={path} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />

        {hoveredIndex !== null ? (
          <circle
            cx={getX(hoveredIndex)}
            cy={getY(toNumeric(data[hoveredIndex]?.[yKey]))}
            fill={color}
            r={1.9}
            stroke="var(--bg-base)"
            strokeWidth={0.8}
          />
        ) : null}

      </svg>

      {xLabel || yLabel ? (
        <div className="pointer-events-none absolute inset-0">
          {xLabel ? (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[12px] font-medium text-[color:var(--text-soft)]">
              {xLabel}
            </div>
          ) : null}
          {yLabel ? (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[12px] font-medium text-[color:var(--text-soft)]">
              {yLabel}
            </div>
          ) : null}
        </div>
      ) : null}

      {hoveredIndex !== null ? (
        <ChartTooltip
          className="absolute -translate-x-1/2"
          heading={String(data[hoveredIndex]?.[xKey] ?? '')}
          rows={[
            {
              color,
              label: yLabel ?? yKey,
              value: valueFormatter
                ? valueFormatter(toNumeric(data[hoveredIndex]?.[yKey]))
                : toNumeric(data[hoveredIndex]?.[yKey]).toLocaleString(),
            },
          ]}
          style={{
            left: `${((hoveredIndex + 0.5) / Math.max(data.length, 1)) * 100}%`,
            top: '10px',
          }}
        />
      ) : null}
    </div>
  )
}
