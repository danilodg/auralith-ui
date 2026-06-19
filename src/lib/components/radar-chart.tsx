import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'

import { ChartLegend } from './chart-legend'
import { ChartTooltip } from './chart-tooltip'
import { cn } from '../utils/cn'

export interface RadarChartSeries {
  color?: string
  key: string
  label: string
  values: Record<string, number>
}

export interface RadarAxis {
  key: string
  label: string
  max?: number
}

export interface RadarChartProps extends HTMLAttributes<HTMLDivElement> {
  axisLabelFontSize?: number
  axes: RadarAxis[]
  height?: number
  levels?: number
  maxValue?: number | 'auto'
  minValue?: number
  series: RadarChartSeries[]
  showAxisLabels?: boolean
  showLegend?: boolean
  valueFormatter?: (value: number) => string
}

const FALLBACK_COLORS = ['#6fe0ff', '#7f95ff', '#8b66ff', '#f3b855']

function toNumeric(value: unknown) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : 0
}

export function RadarChart({
  axisLabelFontSize = 5.2,
  axes,
  className,
  height = 300,
  levels = 4,
  maxValue = 'auto',
  minValue = 0,
  series,
  showAxisLabels = true,
  showLegend = true,
  valueFormatter,
  ...props
}: RadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const radius = 38
  const center = { x: 50, y: 50 }

  const points = useMemo(
    () =>
      axes.map((axis, index) => {
        const angle = (Math.PI * 2 * index) / Math.max(axes.length, 1) - Math.PI / 2
        return { angle, axis }
      }),
    [axes],
  )

  const axisMaxMap = useMemo(() => {
    return new Map(
      axes.map((axis) => {
        if (axis.max !== undefined) return [axis.key, Math.max(axis.max, 1)]
        const autoAxisMax = Math.max(...series.map((item) => toNumeric(item.values[axis.key])), 1)
        if (maxValue === 'auto') return [axis.key, autoAxisMax]
        return [axis.key, Math.max(maxValue, 1)]
      }),
    )
  }, [axes, maxValue, series])

  function pointXY(angle: number, scale: number) {
    return {
      x: center.x + radius * scale * Math.cos(angle),
      y: center.y + radius * scale * Math.sin(angle),
    }
  }

  function getAxisScale(axisKey: string, rawValue: number) {
    const maxForAxis = axisMaxMap.get(axisKey) ?? 1
    const clamped = Math.min(Math.max(rawValue - minValue, 0), maxForAxis)
    return clamped / maxForAxis
  }

  function getAxisValue(axisKey: string, serie: RadarChartSeries) {
    return toNumeric(serie.values[axisKey])
  }

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      <div className="relative">
        <svg className="w-full" preserveAspectRatio="xMidYMid meet" role="img" style={{ height }} viewBox="0 0 100 100">
          {Array.from({ length: Math.max(levels, 1) }).map((_, levelIndex) => {
            const level = (levelIndex + 1) / Math.max(levels, 1)
            const polygon = points
              .map((point) => {
                const xy = pointXY(point.angle, level)
                return `${xy.x},${xy.y}`
              })
              .join(' ')

            return <polygon fill="none" key={level} points={polygon} stroke="color-mix(in srgb, var(--card-border) 55%, transparent)" strokeWidth={0.4} />
          })}

          {points.map((point, index) => {
            const edge = pointXY(point.angle, 1)
            const labelPoint = pointXY(point.angle, 1.2)

            return (
              <g key={`axis-${index}`}>
                <line
                  stroke="color-mix(in srgb, var(--card-border) 50%, transparent)"
                  strokeWidth={0.35}
                  x1={center.x}
                  x2={edge.x}
                  y1={center.y}
                  y2={edge.y}
                />
                {showAxisLabels ? (
                  <text
                    fill="var(--text-soft)"
                    fontSize={axisLabelFontSize}
                    fontWeight="600"
                    textAnchor="middle"
                    x={labelPoint.x}
                    y={labelPoint.y}
                  >
                    {point.axis.label}
                  </text>
                ) : null}
              </g>
            )
          })}

          {series.map((serie, seriesIndex) => {
            const color = serie.color ?? FALLBACK_COLORS[seriesIndex % FALLBACK_COLORS.length]
            const polygon = points
              .map((point) => {
                const axisValue = getAxisValue(point.axis.key, serie)
                const xy = pointXY(point.angle, getAxisScale(point.axis.key, axisValue))
                return `${xy.x},${xy.y}`
              })
              .join(' ')

            return (
              <g key={serie.key}>
                <polygon fill={`color-mix(in srgb, ${color} 18%, transparent)`} points={polygon} stroke={color} strokeWidth={1.1} />
                {points.map((point, index) => {
                  const axisValue = getAxisValue(point.axis.key, serie)
                  const xy = pointXY(point.angle, getAxisScale(point.axis.key, axisValue))
                  return (
                    <circle
                      cx={xy.x}
                      cy={xy.y}
                      fill={color}
                      key={`${serie.key}-${index}`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      r={1.1}
                      stroke="var(--bg-base)"
                      strokeWidth={0.5}
                    />
                  )
                })}
              </g>
            )
          })}
        </svg>

        {hoveredIndex !== null ? (
          <ChartTooltip
            className="absolute right-0 top-2"
            heading={points[hoveredIndex]?.axis.label}
            rows={series.map((serie, index) => {
              const value = getAxisValue(points[hoveredIndex]?.axis.key ?? '', serie)
              return {
                color: serie.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
                label: serie.label,
                value: valueFormatter ? valueFormatter(value) : value.toLocaleString(),
              }
            })}
          />
        ) : null}
      </div>

      {showLegend ? (
        <ChartLegend
          items={series.map((serie, index) => ({
            color: serie.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
            key: serie.key,
            label: serie.label,
          }))}
        />
      ) : null}
    </div>
  )
}
