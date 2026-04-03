/* eslint-disable react-refresh/only-export-components */

import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function GlassPanelBase({ children, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-[color:var(--panel-border)] bg-[var(--panel-bg)] shadow-[var(--panel-shadow)] backdrop-blur-[22px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function GlassPanelRoot(props: GlassPanelProps) {
  return <GlassPanelBase {...props} />
}

function GlassPanelHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-5', className)} {...props}>
      {children}
    </div>
  )
}

function GlassPanelTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-2xl font-semibold tracking-[-0.03em] text-[color:var(--text-main)]',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

function GlassPanelDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-3 text-sm leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

type GlassPanelComponent = typeof GlassPanelBase & {
  Root: typeof GlassPanelRoot
  Header: typeof GlassPanelHeader
  Title: typeof GlassPanelTitle
  Description: typeof GlassPanelDescription
}

export const GlassPanel = Object.assign(GlassPanelBase, {
  Root: GlassPanelRoot,
  Header: GlassPanelHeader,
  Title: GlassPanelTitle,
  Description: GlassPanelDescription,
}) as GlassPanelComponent
