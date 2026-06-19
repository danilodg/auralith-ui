import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'

import { ChartLegend } from './chart-legend'
import { ChartTooltip } from './chart-tooltip'
import { cn } from '../utils/cn'

export interface LineChartSeries {
  color?: string
  key: string
  label: string
}

export interface LineChartProps extends HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string
  data: Record<string, number | string | null | undefined>[]
  emphasisKey?: string
  height?: number
  maxValue?: number
  minValue?: number
  series: LineChartSeries[]
  showAxes?: boolean
  showEndLabels?: boolean
  showGrid?: boolean
  showLegend?: boolean
  valueFormatter?: (value: number) => string
  xKey: string
  xLabel?: string
  xTickCount?: number
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

function buildTickIndices(length: number, requestedCount: number) {
  if (length <= 0) return []
  if (length === 1) return [0]
  if (length <= 8) return Array.from({ length }, (_, index) => index)

  const count = Math.max(2, Math.min(requestedCount, length))
  const step = (length - 1) / (count - 1)
  const values = new Set<number>()
  for (let i = 0; i < count; i += 1) values.add(Math.round(i * step))
  values.add(0)
  values.add(length - 1)
  return Array.from(values).sort((a, b) => a - b)
}

function formatDelta(delta: number) {
  if (delta === 0) return '0'
  return `${delta > 0 ? '+' : ''}${delta}`
}

export function LineChart({
  ariaLabel = 'line chart',
  className,
  data,
  emphasisKey,
  height = 280,
  maxValue,
  minValue = 0,
  series,
  showAxes = false,
  showEndLabels = true,
  showGrid = true,
  showLegend = true,
  valueFormatter,
  xKey,
  xLabel,
  xTickCount = 6,
  xTickFormatter,
  yLabel,
  yTickFormatter,
  yTicks = 3,
  ...props
}: LineChartProps) {
  const [activeKeys, setActiveKeys] = useState<string[]>(series.map((item) => item.key))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const activeSeries = useMemo(() => series.filter((item) => activeKeys.includes(item.key)), [activeKeys, series])
  const chartSeries = activeSeries.length > 0 ? activeSeries : series
  const primaryKey = emphasisKey ?? chartSeries[0]?.key

  const autoMax = useMemo(() => {
    const values = data.flatMap((row) => chartSeries.map((item) => toNumeric(row[item.key])))
    return Math.max(...values, 1)
  }, [chartSeries, data])

  const autoMin = useMemo(() => {
    const values = data.flatMap((row) => chartSeries.map((item) => toNumeric(row[item.key])))
    return Math.min(...values, minValue)
  }, [chartSeries, data, minValue])

  const domainMin = minValue === 0 ? Math.min(0, autoMin) : minValue
  const domainMax = Math.max(maxValue ?? autoMax, domainMin + 1)
  const domainRange = domainMax - domainMin

  const width = 120
  const padding = {
    bottom: xLabel ? 24 : 18,
    left: yLabel ? 18 : 14,
    right: 10,
    top: 8,
  }

  const tickFontSize = 3.3
  const innerWidth = width - padding.left - padding.right
  const innerHeight = 100 - padding.top - padding.bottom
  const step = data.length > 1 ? innerWidth / (data.length - 1) : 0
  const xTicks = buildTickIndices(data.length, xTickCount)

  const getX = (index: number) => padding.left + index * step
  const getY = (value: number) => {
    const normalized = (value - domainMin) / domainRange
    return padding.top + innerHeight - normalized * innerHeight
  }

  function toggleKey(key: string) {
    setActiveKeys((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]))
  }

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      <div className="relative" onMouseLeave={() => setHoveredIndex(null)}>
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
          <rect
            fill="color-mix(in srgb, var(--surface-panel-1) 72%, transparent)"
            height={innerHeight}
            rx={1.2}
            width={innerWidth}
            x={padding.left}
            y={padding.top}
          />

          {showGrid
            ? Array.from({ length: Math.max(yTicks, 1) + 1 }).map((_, idx) => {
                const y = padding.top + innerHeight * (idx / Math.max(yTicks, 1))
                return (
                  <line
                    key={idx}
                    stroke="color-mix(in srgb, var(--card-border) 20%, transparent)"
                    strokeWidth="0.32"
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
              <line stroke="color-mix(in srgb, var(--card-border) 34%, transparent)" strokeWidth="0.36" x1={padding.left} x2={padding.left} y1={padding.top} y2={padding.top + innerHeight} />
              <line
                stroke="color-mix(in srgb, var(--card-border) 34%, transparent)"
                strokeWidth="0.36"
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
              <text fill="var(--text-muted)" fontSize={tickFontSize} key={`y-${idx}`} textAnchor="end" x={padding.left - 1.4} y={y + 0.95}>
                {label}
              </text>
            )
          })}

          {xTicks.map((index) => {
            const raw = String(data[index]?.[xKey] ?? '')
            const label = xTickFormatter ? xTickFormatter(raw, index) : raw
            return (
              <text fill="var(--text-muted)" fontSize={tickFontSize} key={`x-${index}`} textAnchor="middle" x={getX(index)} y={padding.top + innerHeight + 4.5}>
                {label}
              </text>
            )
          })}

          {chartSeries.map((item, seriesIndex) => {
            const isPrimary = item.key === primaryKey
            const color = item.color ?? FALLBACK_COLORS[seriesIndex % FALLBACK_COLORS.length]
            const path = data
              .map((row, index) => {
                const x = getX(index)
                const y = getY(toNumeric(row[item.key]))
                return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
              })
              .join(' ')

            const lastValue = toNumeric(data[data.length - 1]?.[item.key])

            return (
              <g key={item.key}>
                <path
                  d={path}
                  fill="none"
                  opacity={isPrimary ? 1 : 0.75}
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={isPrimary ? 2.1 : 1.55}
                />
                {showEndLabels && isPrimary ? (
                  <text
                    fill={color}
                    fontSize="3.2"
                    fontWeight="700"
                    textAnchor="end"
                    x={width - padding.right - 0.4}
                    y={getY(lastValue) - 1}
                  >
                    {valueFormatter ? valueFormatter(lastValue) : Math.round(lastValue).toString()}
                  </text>
                ) : null}
              </g>
            )
          })}

          {hoveredIndex !== null ? (
            <line
              stroke="color-mix(in srgb, var(--accent-line) 52%, transparent)"
              strokeWidth="0.46"
              x1={getX(hoveredIndex)}
              x2={getX(hoveredIndex)}
              y1={padding.top}
              y2={padding.top + innerHeight}
            />
          ) : null}

          {hoveredIndex !== null
            ? chartSeries.map((item, seriesIndex) => {
                const color = item.color ?? FALLBACK_COLORS[seriesIndex % FALLBACK_COLORS.length]
                const value = toNumeric(data[hoveredIndex]?.[item.key])
                return (
                  <circle
                    cx={getX(hoveredIndex)}
                    cy={getY(value)}
                    fill={color}
                    key={`hover-${item.key}`}
                    r={1.45}
                    stroke="var(--bg-base)"
                    strokeWidth={0.75}
                  />
                )
              })
            : null}
        </svg>

        {xLabel || yLabel ? (
          <div className="pointer-events-none absolute inset-0">
            {xLabel ? (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] font-medium text-[color:var(--text-muted)]">
                {xLabel}
              </div>
            ) : null}
            {yLabel ? (
              <div className="absolute left-0 top-0 text-[11px] font-medium text-[color:var(--text-muted)]">
                {yLabel}
              </div>
            ) : null}
          </div>
        ) : null}

        {hoveredIndex !== null ? (
          <ChartTooltip
            className="absolute -translate-x-1/2"
            heading={String(data[hoveredIndex]?.[xKey] ?? '')}
            rows={chartSeries.map((item, index) => {
              const value = toNumeric(data[hoveredIndex]?.[item.key])
              const previous = hoveredIndex > 0 ? toNumeric(data[hoveredIndex - 1]?.[item.key]) : value
              const delta = value - previous
              return {
                color: item.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
                label: `${item.label} (${formatDelta(Math.round(delta))})`,
                value: valueFormatter ? valueFormatter(value) : value.toLocaleString(),
              }
            })}
            style={{
              left: `${((hoveredIndex + 0.5) / Math.max(data.length, 1)) * 100}%`,
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
