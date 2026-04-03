/* eslint-disable react-refresh/only-export-components */

import type { ReactNode, TextareaHTMLAttributes } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes } from 'react'

import { cn } from '../utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  footer?: ReactNode
}

function TextareaBase({ className, footer, hint, id, label, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className="grid gap-2" htmlFor={textareaId}>
      {label ? <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span> : null}
      <textarea
        id={textareaId}
        className={cn(
          'min-h-36 w-full rounded-[8px] border border-[color:var(--input-border)] bg-[var(--input-bg)] px-4 py-3.5 text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/60 focus:ring-2 focus:ring-cyan-300/20',
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-sm text-[color:var(--text-muted)]">{hint}</span> : null}
      {footer ? <span>{footer}</span> : null}
    </label>
  )
}

function TextareaRoot({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('grid gap-2', className)} {...props}>
      {children}
    </label>
  )
}

function TextareaLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function TextareaField({ className, ...props }: Omit<TextareaProps, 'footer' | 'hint' | 'label'>) {
  return (
    <textarea
      className={cn(
        'min-h-36 w-full rounded-[8px] border border-[color:var(--input-border)] bg-[var(--input-bg)] px-4 py-3.5 text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/60 focus:ring-2 focus:ring-cyan-300/20',
        className,
      )}
      {...props}
    />
  )
}

function TextareaHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

function TextareaFooter({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn(className)} {...props}>
      {children}
    </span>
  )
}

type TextareaComponent = typeof TextareaBase & {
  Root: typeof TextareaRoot
  Label: typeof TextareaLabel
  Field: typeof TextareaField
  Hint: typeof TextareaHint
  Footer: typeof TextareaFooter
}

export const Textarea = Object.assign(TextareaBase, {
  Root: TextareaRoot,
  Label: TextareaLabel,
  Field: TextareaField,
  Hint: TextareaHint,
  Footer: TextareaFooter,
}) as TextareaComponent
