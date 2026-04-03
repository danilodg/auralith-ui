/* eslint-disable react-refresh/only-export-components */

import type { InputHTMLAttributes } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes } from 'react'
import { Clock3 } from 'lucide-react'
import { useState } from 'react'

import { cn } from '../utils/cn'

export interface TimeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
  defaultValue?: string
  hint?: string
  label?: string
  onValueChange?: (value: string) => void
  value?: string
}

function normalizeTime(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`
}

function TimeInputBase({ className, defaultValue = '', hint, id, label, onValueChange, placeholder = 'HH:MM', value, ...props }: TimeInputProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  function applyValue(raw: string) {
    const normalized = normalizeTime(raw)
    if (!isControlled) {
      setInternalValue(normalized)
    }
    onValueChange?.(normalized)
  }

  return (
    <label className="grid gap-2" htmlFor={fieldId}>
      {label ? <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span> : null}
      <span className="relative block">
        <input
          className={cn(
            'w-full rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 pr-9 text-[0.88rem] text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
            className,
          )}
          id={fieldId}
          inputMode="numeric"
          onChange={(event) => applyValue(event.currentTarget.value)}
          placeholder={placeholder}
          type="text"
          value={currentValue}
          {...props}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
          <Clock3 size={14} />
        </span>
      </span>
      {hint ? <span className="text-sm text-[color:var(--text-muted)]">{hint}</span> : null}
    </label>
  )
}

function TimeInputRoot({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('grid gap-2', className)} {...props}>
      {children}
    </label>
  )
}

function TimeInputLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function TimeInputHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

type TimeInputComponent = typeof TimeInputBase & {
  Root: typeof TimeInputRoot
  Label: typeof TimeInputLabel
  Hint: typeof TimeInputHint
}

export const TimeInput = Object.assign(TimeInputBase, {
  Root: TimeInputRoot,
  Label: TimeInputLabel,
  Hint: TimeInputHint,
}) as TimeInputComponent
