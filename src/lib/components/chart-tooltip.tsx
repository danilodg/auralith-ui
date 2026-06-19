import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

export interface ChartTooltipRow {
  color?: string
  label: ReactNode
  value: ReactNode
}

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode
  rows: ChartTooltipRow[]
}

export function ChartTooltip({ className, heading, rows, ...props }: ChartTooltipProps) {
  return (
    <div
      className={cn(
        'pointer-events-none min-w-[160px] rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-menu)] p-2 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-[12px]',
        className,
      )}
      {...props}
    >
      {heading ? <p className="mb-1.5 text-xs font-medium text-[color:var(--text-main)]">{heading}</p> : null}
      <div className="grid gap-1">
        {rows.map((row, index) => (
          <div className="flex items-center justify-between gap-4 text-xs" key={`${index}-${String(row.label)}`}>
            <span className="inline-flex items-center gap-1.5 text-[color:var(--text-soft)]">
              {row.color ? <span className="h-2 w-2 rounded-full" style={{ background: row.color }} /> : null}
              {row.label}
            </span>
            <span className="font-medium tabular-nums text-[color:var(--text-main)]">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
