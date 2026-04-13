/* eslint-disable react-refresh/only-export-components */

import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

export type FormMessageTone = 'error' | 'info' | 'success'

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  hint?: ReactNode
  htmlFor?: string
  label?: ReactNode
  message?: ReactNode
  messageTone?: FormMessageTone
  required?: boolean
}

function FormFieldLabel({ children, className, required, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      <span>{children}</span>
      {required ? <span className="ml-1 text-[color:var(--accent-soft)]">*</span> : null}
    </label>
  )
}

export function FormHint({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-[0.78rem] leading-5 text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </p>
  )
}

export function FormMessage({ children, className, tone = 'error', ...props }: HTMLAttributes<HTMLParagraphElement> & { tone?: FormMessageTone }) {
  return (
    <p
      className={cn(
        'text-[0.78rem] leading-5',
        tone === 'error' ? 'text-[#ff8f8f]' : '',
        tone === 'success' ? 'text-[#79f2c0]' : '',
        tone === 'info' ? 'text-[color:var(--accent-soft)]' : '',
        className,
      )}
      role={tone === 'error' ? 'alert' : undefined}
      {...props}
    >
      {children}
    </p>
  )
}

function FormFieldBase({ children, className, hint, htmlFor, label, message, messageTone = 'error', required, ...props }: FormFieldProps) {
  return (
    <div className={cn('grid gap-2', className)} {...props}>
      {label ? <FormFieldLabel htmlFor={htmlFor} required={required}>{label}</FormFieldLabel> : null}
      {children}
      {hint ? <FormHint>{hint}</FormHint> : null}
      {message ? <FormMessage tone={messageTone}>{message}</FormMessage> : null}
    </div>
  )
}

type FormFieldComponent = typeof FormFieldBase & {
  Hint: typeof FormHint
  Label: typeof FormFieldLabel
  Message: typeof FormMessage
}

export const FormField = Object.assign(FormFieldBase, {
  Label: FormFieldLabel,
  Hint: FormHint,
  Message: FormMessage,
}) as FormFieldComponent
