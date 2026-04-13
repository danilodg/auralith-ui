/* eslint-disable react-refresh/only-export-components */

import type { HTMLAttributes, ReactNode } from 'react'
import { Inbox } from 'lucide-react'

import { cn } from '../utils/cn'

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  action?: ReactNode
  description?: ReactNode
  heading: ReactNode
  icon?: ReactNode
}

function EmptyStateRoot({ action, className, description, heading, icon, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'grid justify-items-center gap-3 rounded-[8px] border border-dashed border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] px-4 py-7 text-center sm:px-6 sm:py-9',
        className,
      )}
      {...props}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] text-[color:var(--text-muted)]">
        {icon ?? <Inbox size={18} />}
      </span>
      <div className="grid gap-1">
        <h4 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">{heading}</h4>
        {description ? <p className="text-[0.84rem] leading-6 text-[color:var(--text-soft)]">{description}</p> : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  )
}

function EmptyStateTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn('font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </h4>
  )
}

function EmptyStateDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-[0.84rem] leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

export const EmptyState = {
  Root: EmptyStateRoot,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
}
