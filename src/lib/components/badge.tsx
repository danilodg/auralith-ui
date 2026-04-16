import * as React from 'react'

import { cn } from '../utils/cn'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'neutral'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  className?: string
}

function BadgeBase({ children, className, dot = false, size = 'md', variant = 'default' }: BadgeProps) {
  const sizeStyles = {
    sm: 'px-1.5 py-0.5 text-[0.65rem]',
    md: 'px-2 py-0.5 text-[0.7rem]',
    lg: 'px-2.5 py-1 text-[0.75rem]',
  }

  const variantStyles = {
    default: 'bg-[var(--accent-line)]/15 text-[var(--accent-line)] border-[var(--card-border)]',
    primary: 'bg-[var(--accent-line)]/20 text-[var(--accent-line)] border-[var(--card-border)]',
    success: 'bg-[var(--status-success)]/15 text-[var(--status-success)] border-[var(--card-border)]',
    warning: 'bg-[var(--status-warning)]/15 text-[var(--status-warning)] border-[var(--card-border)]',
    error: 'bg-[var(--status-error)]/15 text-[var(--status-error)] border-[var(--card-border)]',
    neutral: 'bg-[var(--surface-raised)] text-[color:var(--text-muted)] border-[var(--card-border)]',
  }

  const dotStyles = {
    default: 'bg-[var(--accent-line)]',
    primary: 'bg-[var(--accent-line)]',
    success: 'bg-[var(--status-success)]',
    warning: 'bg-[var(--status-warning)]',
    error: 'bg-[var(--status-error)]',
    neutral: 'bg-[var(--text-muted)]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[variant])} />}
      {children}
    </span>
  )
}

function BadgeRoot({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border border-[var(--card-border)] font-medium', className)} {...props}>
      {children}
    </span>
  )
}

function BadgeDot({ className, variant = 'default' }: { variant?: BadgeVariant; className?: string }) {
  const dotStyles = {
    default: 'bg-[var(--accent-line)]',
    primary: 'bg-[var(--accent-line)]',
    success: 'bg-[var(--status-success)]',
    warning: 'bg-[var(--status-warning)]',
    error: 'bg-[var(--status-error)]',
    neutral: 'bg-[var(--text-muted)]',
  }

  return <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[variant], className)} />
}

type BadgeComponent = typeof BadgeBase & {
  Root: typeof BadgeRoot
  Dot: typeof BadgeDot
}

export const Badge = Object.assign(BadgeBase, {
  Root: BadgeRoot,
  Dot: BadgeDot,
}) as BadgeComponent
