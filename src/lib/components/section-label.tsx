import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em] text-[color:var(--accent-soft)] before:h-px before:w-6 before:bg-gradient-to-r before:from-[color:var(--accent-line)] before:to-transparent before:content-[""]',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}
