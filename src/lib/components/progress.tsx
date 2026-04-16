import * as React from 'react'

import { cn } from '../utils/cn'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error'
export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressShape = 'linear' | 'circular'

export interface ProgressProps {
  value?: number
  max?: number
  variant?: ProgressVariant
  size?: ProgressSize
  shape?: ProgressShape
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
  indeterminate?: boolean
  className?: string
}

function ProgressBase({
  className,
  formatValue,
  label,
  max = 100,
  shape = 'linear',
  showValue = false,
  size = 'md',
  value = 0,
  variant = 'default',
  indeterminate = false,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const displayValue = formatValue ? formatValue(value) : `${Math.round(percentage)}%`

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const circularSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const variantColors = {
    default: 'bg-[var(--accent-line)]',
    success: 'bg-[var(--status-success)]',
    warning: 'bg-[var(--status-warning)]',
    error: 'bg-[var(--status-error)]',
  }

  const trackColor = 'bg-[var(--surface-raised)]'

  if (shape === 'circular') {
    const circumference = 2 * Math.PI * 18
    const offset = circumference - (percentage / 100) * circumference

    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className={cn('relative', circularSizeStyles[size])}>
          <svg className="h-full w-full -rotate-90" viewBox="0 0 40 40">
            <circle
              className={cn('fill-none', trackColor)}
              cx="20"
              cy="20"
              r="18"
              strokeWidth="3"
            />
            {indeterminate ? (
              <circle
                className={cn('fill-none', variantColors[variant])}
                cx="20"
                cy="20"
                r="18"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ animation: 'spin 1.5s linear infinite' }}
              />
            ) : (
              <circle
                className={cn('fill-none', variantColors[variant])}
                cx="20"
                cy="20"
                r="18"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 300ms ease' }}
              />
            )}
          </svg>
        </div>
        {label && (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span>
            {showValue && (
              <span className="text-xs text-[color:var(--text-muted)]">{displayValue}</span>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('grid gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-[color:var(--text-muted)] tabular-nums">{displayValue}</span>
          )}
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-[var(--surface-raised)]', sizeStyles[size])}>
        {indeterminate ? (
          <div
            className={cn('h-full animate-pulse rounded-full', variantColors[variant])}
            style={{ width: '30%' }}
          />
        ) : (
          <div
            className={cn('h-full rounded-full transition-all duration-300', variantColors[variant])}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  )
}

function ProgressRoot({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('grid gap-2', className)} {...props}>
      {children}
    </div>
  )
}

function ProgressLabel({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function ProgressValue({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)] tabular-nums', className)} {...props}>
      {children}
    </span>
  )
}

function ProgressTrack({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-[var(--surface-raised)]', className)} {...props}>
      {children}
    </div>
  )
}

function ProgressBar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('h-full rounded-full transition-all duration-300 bg-[var(--accent-line)]', className)}
      {...props}
    />
  )
}

type ProgressComponent = typeof ProgressBase & {
  Root: typeof ProgressRoot
  Label: typeof ProgressLabel
  Value: typeof ProgressValue
  Track: typeof ProgressTrack
  Bar: typeof ProgressBar
}

export const Progress = Object.assign(ProgressBase, {
  Root: ProgressRoot,
  Label: ProgressLabel,
  Value: ProgressValue,
  Track: ProgressTrack,
  Bar: ProgressBar,
}) as ProgressComponent
