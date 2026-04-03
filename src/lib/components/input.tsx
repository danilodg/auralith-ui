/* eslint-disable react-refresh/only-export-components */

import type { InputHTMLAttributes, ReactNode } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes } from 'react'

import { cn } from '../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  icon?: ReactNode
  endAdornment?: ReactNode
}

function InputBase({ className, endAdornment, hint, icon, id, label, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className="grid gap-2" htmlFor={inputId}>
      {label ? <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span> : null}
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 text-[0.88rem] text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
            icon ? 'pl-9 pr-3' : '',
            endAdornment ? 'pr-10' : '',
            className,
          )}
          {...props}
        />
        {endAdornment ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
            {endAdornment}
          </span>
        ) : null}
      </span>
      {hint ? <span className="text-sm text-[color:var(--text-muted)]">{hint}</span> : null}
    </label>
  )
}

function InputRoot({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('grid gap-2', className)} {...props}>
      {children}
    </label>
  )
}

function InputLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function InputField({ className, endAdornment, icon, ...props }: Omit<InputProps, 'hint' | 'label'>) {
  return (
    <span className="relative block">
      {icon ? <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">{icon}</span> : null}
      <input
        className={cn(
          'w-full rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 text-[0.88rem] text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
          icon ? 'pl-9 pr-3' : '',
          endAdornment ? 'pr-10' : '',
          className,
        )}
        {...props}
      />
      {endAdornment ? <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">{endAdornment}</span> : null}
    </span>
  )
}

function InputHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

type InputComponent = typeof InputBase & {
  Root: typeof InputRoot
  Label: typeof InputLabel
  Field: typeof InputField
  Hint: typeof InputHint
}

export const Input = Object.assign(InputBase, {
  Root: InputRoot,
  Label: InputLabel,
  Field: InputField,
  Hint: InputHint,
}) as InputComponent
