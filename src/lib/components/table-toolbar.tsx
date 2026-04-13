import type { HTMLAttributes, ReactNode } from 'react'
import { Search } from 'lucide-react'

import { cn } from '../utils/cn'

export interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  filtersSlot?: ReactNode
  onSearchValueChange?: (value: string) => void
  primaryAction?: ReactNode
  searchPlaceholder?: string
  searchValue?: string
}

export function TableToolbar({
  className,
  filtersSlot,
  onSearchValueChange,
  primaryAction,
  searchPlaceholder = 'Search records...',
  searchValue = '',
  ...props
}: TableToolbarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2.5 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-2.5', className)} {...props}>
      <label className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]" size={14} />
        <input
          className="w-full rounded-[8px] border border-[color:var(--input-border)] bg-[var(--input-bg)] py-1.5 pl-8 pr-2.5 text-[0.82rem] text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15"
          onChange={(event) => onSearchValueChange?.(event.target.value)}
          placeholder={searchPlaceholder}
          value={searchValue}
        />
      </label>
      {filtersSlot ? <div className="inline-flex items-center gap-2">{filtersSlot}</div> : null}
      {primaryAction ? <div className="ml-auto inline-flex items-center">{primaryAction}</div> : null}
    </div>
  )
}
