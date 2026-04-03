/* eslint-disable react-refresh/only-export-components */

import type { InputHTMLAttributes } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '../utils/cn'

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
  defaultValue?: number
  hint?: string
  label?: string
  onValueChange?: (value: number) => void
  value?: number
}

function NumberInputBase({ className, defaultValue = 0, hint, id, label, max, min, onValueChange, step = 1, value, ...props }: NumberInputProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const numericMin = min !== undefined ? Number(min) : undefined
  const numericMax = max !== undefined ? Number(max) : undefined
  const numericStep = Number(step)

  function clamp(nextValue: number) {
    if (numericMin !== undefined && nextValue < numericMin) return numericMin
    if (numericMax !== undefined && nextValue > numericMax) return numericMax
    return nextValue
  }

  function applyValue(nextValue: number) {
    const clamped = clamp(nextValue)
    if (!isControlled) {
      setInternalValue(clamped)
    }
    onValueChange?.(clamped)
  }

  const canDecrease = useMemo(() => (numericMin === undefined ? true : currentValue > numericMin), [currentValue, numericMin])
  const canIncrease = useMemo(() => (numericMax === undefined ? true : currentValue < numericMax), [currentValue, numericMax])

  return (
    <label className="grid gap-2" htmlFor={fieldId}>
      {label ? <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span> : null}
      <div
        className={cn(
          'flex items-center rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)]',
          className,
        )}
      >
        <input
          className="w-full bg-transparent px-3 py-1.5 text-left text-[0.88rem] text-[color:var(--text-main)] outline-none"
          id={fieldId}
          inputMode="numeric"
          onChange={(event) => {
            const parsed = Number(event.currentTarget.value)
            if (Number.isNaN(parsed)) return
            applyValue(parsed)
          }}
          type="text"
          value={String(currentValue)}
          {...props}
        />
        <span className="mr-1 inline-flex items-center gap-1 rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] p-0.5">
          <button
            className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-[color:var(--text-soft)] transition hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-40"
            disabled={!canDecrease}
            onClick={() => applyValue(currentValue - numericStep)}
            type="button"
          >
            <Minus size={14} />
          </button>
          <button
            className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-[color:var(--text-soft)] transition hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-40"
            disabled={!canIncrease}
            onClick={() => applyValue(currentValue + numericStep)}
            type="button"
          >
            <Plus size={14} />
          </button>
        </span>
      </div>
      {hint ? <span className="text-sm text-[color:var(--text-muted)]">{hint}</span> : null}
    </label>
  )
}

function NumberInputRoot({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('grid gap-2', className)} {...props}>
      {children}
    </label>
  )
}

function NumberInputLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function NumberInputHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

type NumberInputComponent = typeof NumberInputBase & {
  Root: typeof NumberInputRoot
  Label: typeof NumberInputLabel
  Hint: typeof NumberInputHint
}

export const NumberInput = Object.assign(NumberInputBase, {
  Root: NumberInputRoot,
  Label: NumberInputLabel,
  Hint: NumberInputHint,
}) as NumberInputComponent
