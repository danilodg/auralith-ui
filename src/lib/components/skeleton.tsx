import type { HTMLAttributes } from 'react'

import { cn } from '../utils/cn'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean
}

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-[color:var(--card-border)] bg-[linear-gradient(110deg,rgba(255,255,255,0.03),rgba(255,255,255,0.06),rgba(255,255,255,0.03))] bg-[length:200%_100%]',
        shimmer ? 'animate-[skeleton-shimmer_1.4s_linear_infinite]' : '',
        className,
      )}
      {...props}
    />
  )
}
