import type { HTMLAttributes } from 'react'

import { cn } from '../utils/cn'

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  tone?: 'accent' | 'muted'
}

export function Separator({
  className,
  orientation = 'horizontal',
  tone = 'accent',
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === 'horizontal'
  const gradientClass = tone === 'accent'
    ? (isHorizontal
      ? 'bg-gradient-to-r from-[color:var(--accent-line)] to-transparent'
      : 'bg-gradient-to-b from-[color:var(--accent-line)] to-transparent')
    : (isHorizontal
      ? 'bg-gradient-to-r from-[color:var(--card-border)] to-transparent'
      : 'bg-gradient-to-b from-[color:var(--card-border)] to-transparent')

  return (
    <div
      aria-hidden="true"
      className={cn(
        'shrink-0',
        isHorizontal ? 'h-0.5 w-full' : 'h-full w-0.5',
        gradientClass,
        className,
      )}
      {...props}
    />
  )
}
