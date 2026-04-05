import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'
import { SectionLabel } from './section-label'

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: ReactNode
  heading: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeader({
  align = 'left',
  className,
  description,
  eyebrow,
  heading,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn('max-w-[860px]', align === 'center' ? 'mx-auto text-center' : '', className)}
      {...props}
    >
      {eyebrow ? <SectionLabel className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</SectionLabel> : null}
      <h2 className="mt-4 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.3rem,4.1vw,2.06rem)] font-bold leading-[1.06] tracking-[-0.02em] text-[color:var(--text-main)]">
        {heading}
      </h2>
      {description ? (
        <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-soft)]">{description}</p>
      ) : null}
    </div>
  )
}
