/* eslint-disable react-refresh/only-export-components */

import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

import { cn } from '../utils/cn'

interface BreadcrumbRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

function BreadcrumbRoot({ children, className, ...props }: BreadcrumbRootProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('w-full', className)} {...props}>
      {children}
    </nav>
  )
}

function BreadcrumbList({ children, className, ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={cn('flex flex-wrap items-center gap-1.5 text-[0.78rem]', className)} {...props}>
      {children}
    </ol>
  )
}

function BreadcrumbItem({ children, className, ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn('inline-flex items-center gap-1.5 text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </li>
  )
}

function BreadcrumbSeparator({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('inline-flex items-center', className)} {...props}>
      <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-[color:var(--text-muted)]" />
    </span>
  )
}

function BreadcrumbLink({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn('rounded-[6px] px-1.5 py-0.5 text-[color:var(--text-soft)] transition hover:text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </a>
  )
}

function BreadcrumbCurrent({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-current="page" className={cn('rounded-[6px] px-1.5 py-0.5 text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
  Link: BreadcrumbLink,
  Current: BreadcrumbCurrent,
}
