/* eslint-disable react-refresh/only-export-components */

import type { InputHTMLAttributes } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes } from 'react'

import { cn } from '../utils/cn'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
}

function CheckboxBase({ className, hint, id, label, ...props }: CheckboxProps) {
  const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className="grid gap-1.5" htmlFor={checkboxId}>
      <span className="inline-flex items-start gap-2">
        <input
          className={cn(
            'mt-0.5 h-4 w-4 rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] accent-[color:var(--accent-line)] outline-none transition focus:ring-1 focus:ring-cyan-300/20',
            className,
          )}
          id={checkboxId}
          type="checkbox"
          {...props}
        />
        {label ? <span className="text-[0.85rem] text-[color:var(--text-main)]">{label}</span> : null}
      </span>
      {hint ? <span className="pl-6 text-[0.78rem] text-[color:var(--text-muted)]">{hint}</span> : null}
    </label>
  )
}

function CheckboxRoot({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('grid gap-1.5', className)} {...props}>
      {children}
    </label>
  )
}

function CheckboxField({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-4 w-4 rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] accent-[color:var(--accent-line)] outline-none transition focus:ring-1 focus:ring-cyan-300/20',
        className,
      )}
      type="checkbox"
      {...props}
    />
  )
}

function CheckboxLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-[0.85rem] text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function CheckboxHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-[0.78rem] text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

type CheckboxComponent = typeof CheckboxBase & {
  Root: typeof CheckboxRoot
  Field: typeof CheckboxField
  Label: typeof CheckboxLabel
  Hint: typeof CheckboxHint
}

export const Checkbox = Object.assign(CheckboxBase, {
  Root: CheckboxRoot,
  Field: CheckboxField,
  Label: CheckboxLabel,
  Hint: CheckboxHint,
}) as CheckboxComponent
