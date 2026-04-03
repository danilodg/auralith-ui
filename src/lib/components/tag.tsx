import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] px-2 py-1 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.65rem] uppercase tracking-[0.14em] text-[color:var(--text-soft)]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
