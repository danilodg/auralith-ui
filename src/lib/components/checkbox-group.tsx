/* eslint-disable react-refresh/only-export-components */

import { Check } from 'lucide-react'
import { Children, isValidElement, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { cn } from '../utils/cn'

export interface CheckboxGroupItemProps {
  description?: string
  disabled?: boolean
  label: string
  value: string
}

export interface CheckboxGroupProps {
  children?: ReactNode
  className?: string
  defaultValue?: string[]
  hint?: string
  label?: string
  onValueChange?: (value: string[]) => void
  value?: string[]
}

function CheckboxGroupItem(_props: CheckboxGroupItemProps) {
  return null
}

function parseItems(children: ReactNode) {
  const items: CheckboxGroupItemProps[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== CheckboxGroupItem) return
    items.push(child.props as CheckboxGroupItemProps)
  })

  return items
}

function CheckboxGroupBase({ children, className, defaultValue, hint, label, onValueChange, value }: CheckboxGroupProps) {
  const items = useMemo(() => parseItems(children), [children])
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? [])
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  function updateValue(nextValue: string[]) {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  function toggleItem(itemValue: string) {
    const exists = currentValue.includes(itemValue)
    updateValue(exists ? currentValue.filter((valueItem) => valueItem !== itemValue) : [...currentValue, itemValue])
  }

  return (
    <div className={cn('grid gap-2', className)}>
      {label ? <p className="text-sm font-medium text-[color:var(--text-main)]">{label}</p> : null}
      <div className="grid gap-2">
        {items.map((item) => {
          const checked = currentValue.includes(item.value)

          return (
            <label
              className={cn(
                'inline-flex items-start gap-2 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] px-2 py-1.5',
                item.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              )}
              key={item.value}
            >
              <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
                <input
                  checked={checked}
                  className="peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded-[6px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] outline-none transition focus:ring-1 focus:ring-cyan-300/20 checked:border-[color:var(--accent-line)] checked:bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))]"
                  disabled={item.disabled}
                  onChange={() => toggleItem(item.value)}
                  type="checkbox"
                  value={item.value}
                />
                <Check className="pointer-events-none opacity-0 transition peer-checked:opacity-100" size={12} strokeWidth={2.4} />
              </span>
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

type CheckboxGroupComponent = typeof CheckboxGroupBase & {
  Item: typeof CheckboxGroupItem
}

export const CheckboxGroup = Object.assign(CheckboxGroupBase, {
  Item: CheckboxGroupItem,
}) as CheckboxGroupComponent
