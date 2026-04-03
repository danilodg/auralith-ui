/* eslint-disable react-refresh/only-export-components */

import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

type CardVariant = 'default' | 'subtle' | 'elevated'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: CardVariant
}

const variantClassName: Record<CardVariant, string> = {
  default: 'bg-[color:var(--card-bg)] shadow-[var(--card-shadow-default)]',
  subtle: 'bg-[var(--card-subtle-bg)]',
  elevated: 'bg-[color:var(--card-bg)] shadow-[var(--card-shadow-elevated)]',
}

function CardBase({ children, className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-[color:var(--card-border)] p-2 backdrop-blur-[18px]',
        variantClassName[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardRoot(props: CardProps) {
  return <CardBase {...props} />
}

function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-xl font-semibold tracking-[-0.03em] text-[color:var(--text-main)]',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

function CardDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-2 text-sm leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

function CardContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex flex-wrap gap-3', className)} {...props}>
      {children}
    </div>
  )
}

type CardComponent = typeof CardBase & {
  Root: typeof CardRoot
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Content: typeof CardContent
  Footer: typeof CardFooter
}

export const Card = Object.assign(CardBase, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
}) as CardComponent
