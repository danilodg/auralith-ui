/* eslint-disable react-refresh/only-export-components */

import type { InputHTMLAttributes } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes } from 'react'
import { Check } from 'lucide-react'

import { cn } from '../utils/cn'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  framed?: boolean
  hint?: string
  label?: string
}

type CheckboxControlProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

function CheckboxControl({ className, ...props }: CheckboxControlProps) {
  return (
    <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
      <input
        className={cn(
          'peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded-[6px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] outline-none transition focus:ring-1 focus:ring-cyan-300/20 checked:border-[color:var(--accent-line)] checked:bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))]',
          className,
        )}
        type="checkbox"
        {...props}
      />
      <Check className="pointer-events-none opacity-0 transition peer-checked:opacity-100" size={12} strokeWidth={2.4} />
    </span>
  )
}

function CheckboxBase({ className, framed = true, hint, id, label, ...props }: CheckboxProps) {
  const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className={cn('grid gap-1.5', className)} htmlFor={checkboxId}>
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-[8px]',
          framed ? 'border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] px-2 py-1.5' : 'px-0 py-0',
        )}
      >
        <CheckboxControl id={checkboxId} {...props} />
        {label ? <span className="text-[0.84rem] leading-5 text-[color:var(--text-main)]">{label}</span> : null}
      </span>
      {hint ? <span className={cn('text-[0.76rem] leading-5 text-[color:var(--text-muted)]', framed ? 'pl-2' : 'pl-0')}>{hint}</span> : null}
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

function CheckboxField({ className, ...props }: CheckboxControlProps) {
  return <CheckboxControl className={className} {...props} />
}

function CheckboxLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-[0.84rem] leading-5 text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function CheckboxHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-[0.76rem] leading-5 text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

function CheckboxItem(props: CheckboxProps) {
  return <CheckboxBase {...props} />
}

type CheckboxComponent = typeof CheckboxBase & {
  Field: typeof CheckboxField
  Hint: typeof CheckboxHint
  Item: typeof CheckboxItem
  Label: typeof CheckboxLabel
  Root: typeof CheckboxRoot
}

export const Checkbox = Object.assign(CheckboxBase, {
  Root: CheckboxRoot,
  Field: CheckboxField,
  Label: CheckboxLabel,
  Hint: CheckboxHint,
  Item: CheckboxItem,
}) as CheckboxComponent
