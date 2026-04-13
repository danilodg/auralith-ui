/* eslint-disable react-refresh/only-export-components */

import type { HTMLAttributes } from 'react'
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'

import { cn } from '../utils/cn'

export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

const variantStyles: Record<AlertVariant, string> = {
  default: 'border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] text-[color:var(--text-soft)]',
  info: 'border-[rgba(111,224,255,0.35)] bg-[rgba(111,224,255,0.07)] text-[color:var(--text-soft)]',
  success: 'border-[rgba(121,242,192,0.35)] bg-[rgba(121,242,192,0.07)] text-[color:var(--text-soft)]',
  warning: 'border-[rgba(255,197,92,0.35)] bg-[rgba(255,197,92,0.08)] text-[color:var(--text-soft)]',
  error: 'border-[rgba(255,143,143,0.35)] bg-[rgba(255,143,143,0.08)] text-[color:var(--text-soft)]',
}

function getVariantIcon(variant: AlertVariant) {
  if (variant === 'info') return <Info className="text-[color:var(--accent-soft)]" size={16} />
  if (variant === 'success') return <CheckCircle2 className="text-[#79f2c0]" size={16} />
  if (variant === 'warning') return <TriangleAlert className="text-[#ffc55c]" size={16} />
  if (variant === 'error') return <AlertCircle className="text-[#ff8f8f]" size={16} />
  return <Info className="text-[color:var(--text-muted)]" size={16} />
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  hideIcon?: boolean
  variant?: AlertVariant
}

function AlertRoot({ children, className, hideIcon = false, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      className={cn(
        'grid gap-1 rounded-[8px] border px-3 py-2.5 sm:grid-cols-[auto_1fr] sm:gap-x-2.5 sm:gap-y-1 sm:px-4 sm:py-3',
        variantStyles[variant],
        className,
      )}
      role={variant === 'error' ? 'alert' : 'status'}
      {...props}
    >
      {!hideIcon ? <span className="sm:pt-0.5">{getVariantIcon(variant)}</span> : null}
      <div className="grid gap-1">{children}</div>
    </div>
  )
}

function AlertTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn('text-[0.86rem] font-semibold tracking-[-0.01em] text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </h4>
  )
}

function AlertDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-[0.8rem] leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

export const Alert = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
}
