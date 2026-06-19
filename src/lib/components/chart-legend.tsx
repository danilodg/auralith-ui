import type { HTMLAttributes } from 'react'

import { cn } from '../utils/cn'

export interface ChartLegendItem {
  color: string
  key: string
  label: string
}

export interface ChartLegendProps extends HTMLAttributes<HTMLDivElement> {
  activeKeys?: string[]
  items: ChartLegendItem[]
  onToggleKey?: (key: string) => void
}

export function ChartLegend({ activeKeys, className, items, onToggleKey, ...props }: ChartLegendProps) {
  const activeSet = new Set(activeKeys ?? items.map((item) => item.key))

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} {...props}>
      {items.map((item) => {
        const isActive = activeSet.has(item.key)

        return (
          <button
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs transition',
              isActive
                ? 'border-[color:var(--card-border)] bg-[rgba(255,255,255,0.05)] text-[color:var(--text-main)]'
                : 'border-[color:var(--card-border)]/70 bg-transparent text-[color:var(--text-muted)]',
              onToggleKey ? 'cursor-pointer hover:border-[color:var(--accent-line)]/40 hover:text-[color:var(--text-main)]' : 'cursor-default',
            )}
            disabled={!onToggleKey}
            key={item.key}
            onClick={() => onToggleKey?.(item.key)}
            type="button"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
