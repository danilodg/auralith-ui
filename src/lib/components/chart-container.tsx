import type { HTMLAttributes, ReactNode } from 'react'

import { Card } from './card'
import { SectionLabel } from './section-label'
import { cn } from '../utils/cn'

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  actions?: ReactNode
  description?: ReactNode
  empty?: ReactNode
  error?: ReactNode
  heading?: ReactNode
  loading?: boolean
  minHeight?: number
}

export function ChartContainer({
  actions,
  children,
  className,
  description,
  empty,
  error,
  heading,
  loading = false,
  minHeight = 240,
  ...props
}: ChartContainerProps) {
  const hasData = Boolean(children)

  return (
    <Card className={cn('grid gap-3 p-4', className)} variant="subtle" {...props}>
      {heading || description || actions ? (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="grid gap-1">
            {heading ? <SectionLabel>{heading}</SectionLabel> : null}
            {description ? <p className="text-sm text-[color:var(--text-soft)]">{description}</p> : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      ) : null}

      <div className="relative" style={{ minHeight }}>
        {loading ? (
          <div className="grid h-full min-h-[inherit] place-items-center rounded-[8px] border border-dashed border-[color:var(--card-border)] bg-[color:var(--surface-base)] text-sm text-[color:var(--text-muted)]">
            Loading chart...
          </div>
        ) : error ? (
          <div className="grid h-full min-h-[inherit] place-items-center rounded-[8px] border border-[rgba(255,123,123,0.4)] bg-[rgba(255,123,123,0.08)] text-sm text-[color:#ffb8b8]">
            {error}
          </div>
        ) : !hasData ? (
          <div className="grid h-full min-h-[inherit] place-items-center rounded-[8px] border border-dashed border-[color:var(--card-border)] bg-[color:var(--surface-base)] text-sm text-[color:var(--text-muted)]">
            {empty ?? 'No data available.'}
          </div>
        ) : (
          children
        )}
      </div>
    </Card>
  )
}
