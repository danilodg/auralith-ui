/* eslint-disable react-refresh/only-export-components */

import { Children, isValidElement, useId, useMemo, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

export interface RadioGroupItemProps {
  description?: string
  disabled?: boolean
  label: string
  value: string
}

export interface RadioGroupProps {
  children?: ReactNode
  className?: string
  defaultValue?: string
  hint?: string
  label?: string
  name?: string
  onValueChange?: (value: string) => void
  value?: string
}

function RadioGroupItem(_props: RadioGroupItemProps) {
  return null
}

type ParsedRadioItem = RadioGroupItemProps

function parseItems(children: ReactNode) {
  const items: ParsedRadioItem[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== RadioGroupItem) return
    items.push(child.props as RadioGroupItemProps)
  })

  return items
}

function RadioControl({ checked, className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { checked: boolean }) {
  return (
    <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
      <input
        checked={checked}
        className={cn(
          'absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded-full border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] outline-none transition focus:ring-1 focus:ring-cyan-300/20',
          className,
        )}
        type="radio"
        {...props}
      />
      <span
        className={cn(
          'pointer-events-none h-2 w-2 rounded-full bg-[color:var(--accent-line)] transition-opacity',
          checked ? 'opacity-100' : 'opacity-0',
        )}
      />
    </span>
  )
}

function RadioGroupBase({ children, className, defaultValue, hint, label, name, onValueChange, value }: RadioGroupProps) {
  const generatedName = useId()
  const groupName = name ?? `auralith-radio-${generatedName}`
  const items = useMemo(() => parseItems(children), [children])
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  function applyValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  return (
    <div className={cn('grid gap-2', className)}>
      {label ? <p className="text-sm font-medium text-[color:var(--text-main)]">{label}</p> : null}
      <div className="grid gap-2" role="radiogroup">
        {items.map((item) => {
          const isChecked = currentValue === item.value
          return (
            <label
              className={cn(
                'inline-flex items-start gap-2 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] px-2 py-1.5',
                item.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              )}
              key={item.value}
            >
              <RadioControl
                checked={isChecked}
                disabled={item.disabled}
                name={groupName}
                onChange={() => applyValue(item.value)}
                value={item.value}
              />
              <span className="grid gap-0.5">
                <span className="text-[0.84rem] leading-5 text-[color:var(--text-main)]">{item.label}</span>
                {item.description ? <span className="text-[0.76rem] leading-5 text-[color:var(--text-muted)]">{item.description}</span> : null}
              </span>
            </label>
          )
        })}
      </div>
      {hint ? <p className="text-[0.76rem] leading-5 text-[color:var(--text-muted)]">{hint}</p> : null}
    </div>
  )
}

type RadioGroupComponent = typeof RadioGroupBase & {
  Item: typeof RadioGroupItem
}

export const RadioGroup = Object.assign(RadioGroupBase, {
  Item: RadioGroupItem,
}) as RadioGroupComponent
