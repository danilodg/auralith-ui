import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'

import { ChartLegend } from './chart-legend'
import { ChartTooltip } from './chart-tooltip'
import { cn } from '../utils/cn'

export interface StackedBarChartSeries {
  color?: string
  key: string
  label: string
}

export interface StackedBarChartProps extends HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string
  data: Record<string, number | string | null | undefined>[]
  height?: number
  maxValue?: number
  series: StackedBarChartSeries[]
  showAxes?: boolean
  showLegend?: boolean
  valueFormatter?: (value: number) => string
  xKey: string
  xLabel?: string
  xTickFormatter?: (value: string, index: number) => string
  yLabel?: string
  yTickFormatter?: (value: number) => string
  yTicks?: number
}

const FALLBACK_COLORS = ['#6fe0ff', '#7f95ff', '#8b66ff', '#f3b855', '#7df4c0']

function toNumeric(value: unknown) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : 0
}

export function StackedBarChart({
  ariaLabel = 'stacked bar chart',
  className,
  data,
  height = 280,
  maxValue,
  series,
  showAxes = true,
  showLegend = true,
  valueFormatter,
  xKey,
  xLabel,
  xTickFormatter,
  yLabel,
  yTickFormatter,
  yTicks = 4,
  ...props
}: StackedBarChartProps) {
  const [activeKeys, setActiveKeys] = useState<string[]>(series.map((item) => item.key))
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const activeSeries = useMemo(() => series.filter((item) => activeKeys.includes(item.key)), [activeKeys, series])
  const chartSeries = activeSeries.length > 0 ? activeSeries : series

  const autoMax = useMemo(() => {
    return Math.max(
      ...data.map((row) => chartSeries.reduce((total, item) => total + toNumeric(row[item.key]), 0)),
      1,
    )
  }, [chartSeries, data])

  const domainMax = Math.max(maxValue ?? autoMax, 1)
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
  const groupWidth = innerWidth / Math.max(data.length, 1)
  const barWidth = Math.max(groupWidth * 0.62, 1)

  function toggleKey(key: string) {
    setActiveKeys((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]))
  }

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      <div className="relative">
        <svg aria-label={ariaLabel} className="w-full" preserveAspectRatio="none" role="img" style={{ height }} viewBox={`0 0 ${width} 100`}>
          {Array.from({ length: Math.max(yTicks, 1) + 1 }).map((_, idx) => {
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
          })}

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
            const value = domainMax - ratio * domainMax
            const y = padding.top + innerHeight * ratio
            const label = yTickFormatter ? yTickFormatter(value) : Math.round(value).toString()
            return (
              <text fill="var(--text-muted)" fontSize={tickFontSize} key={`y-${idx}`} textAnchor="end" x={padding.left - 1.2} y={y + 1.15}>
                {label}
              </text>
            )
          })}

          {data.map((row, rowIndex) => {
            const x = padding.left + rowIndex * groupWidth + (groupWidth - barWidth) / 2
            const label = String(row[xKey] ?? '')
            let accumulated = 0

            return (
              <g key={`row-${rowIndex}`}>
                {chartSeries.map((serie, seriesIndex) => {
                  const value = toNumeric(row[serie.key])
                  const segmentHeight = (value / domainMax) * innerHeight
                  const y = padding.top + innerHeight - accumulated - segmentHeight
                  const color = serie.color ?? FALLBACK_COLORS[seriesIndex % FALLBACK_COLORS.length]
                  accumulated += segmentHeight

                  return (
                    <rect
                      fill={color}
                      key={`${rowIndex}-${serie.key}`}
                      onMouseEnter={() => setHoveredRow(rowIndex)}
                      onMouseLeave={() => setHoveredRow(null)}
                      opacity={hoveredRow === rowIndex ? 1 : 0.9}
                      rx={0.9}
                      width={barWidth}
                      x={x}
                      y={y}
                      height={Math.max(segmentHeight, 0.8)}
                    />
                  )
                })}

                <text fill="var(--text-muted)" fontSize={tickFontSize} textAnchor="middle" x={x + barWidth / 2} y={padding.top + innerHeight + 5.2}>
                  {xTickFormatter ? xTickFormatter(label, rowIndex) : label}
                </text>
              </g>
            )
          })}

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

        {hoveredRow !== null ? (
          <ChartTooltip
            className="absolute -translate-x-1/2"
            heading={String(data[hoveredRow]?.[xKey] ?? '')}
            rows={chartSeries.map((item, index) => ({
              color: item.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
              label: item.label,
              value: valueFormatter
                ? valueFormatter(toNumeric(data[hoveredRow]?.[item.key]))
                : toNumeric(data[hoveredRow]?.[item.key]).toLocaleString(),
            }))}
            style={{
              left: `${((hoveredRow + 0.5) / Math.max(data.length, 1)) * 100}%`,
              top: '10px',
            }}
          />
        ) : null}
      </div>

      {showLegend ? (
        <ChartLegend
          activeKeys={activeKeys}
          items={series.map((item, index) => ({
            color: item.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
            key: item.key,
            label: item.label,
          }))}
          onToggleKey={toggleKey}
        />
      ) : null}
    </div>
  )
}
