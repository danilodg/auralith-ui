import * as React from 'react'
import { Children, isValidElement, useMemo } from 'react'
import type { ReactNode } from 'react'

import { cn } from '../utils/cn'

export interface ToggleGroupProps {
  label?: string
  hint?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export interface ToggleGroupItemProps {
  value: string
  label: string
  disabled?: boolean
  description?: string
}

function ToggleGroupItem(_props: ToggleGroupItemProps) {
  // Declarative item component - rendered via parent
  return null
}

function parseItems(children: ReactNode) {
  const items: ToggleGroupItemProps[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== ToggleGroupItem) return
    items.push(child.props as ToggleGroupItemProps)
  })

  return items
}

function ToggleGroupBase({
  children,
  className,
  defaultValue,
  hint,
  label,
  onValueChange,
  orientation = 'horizontal',
  value: controlledValue,
}: ToggleGroupProps) {
  const items = useMemo(() => parseItems(children), [children])
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className={cn('grid gap-2', className)}>
      {label && (
        <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span>
      )}
      <div
        className={cn(
          'inline-flex rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-1',
          orientation === 'vertical' && 'flex-col',
        )}
      >
        {items.map((item) => {
          const isActive = currentValue === item.value

          return (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              onClick={() => handleValueChange(item.value)}
              className={cn(
                'flex-1 whitespace-nowrap rounded-[6px] px-3 py-1.5 text-[0.84rem] font-medium transition-all duration-200',
                isActive
                  ? 'bg-[var(--accent-line)] text-[var(--text-inverse)] shadow-[0_0_12px_rgba(111,224,255,0.3)]'
                  : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-main)] hover:bg-[var(--surface-raised)]',
                item.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {hint && (
        <span className="text-sm text-[color:var(--text-muted)]">{hint}</span>
      )}
    </div>
  )
}

type ToggleGroupComponent = typeof ToggleGroupBase & {
  Item: typeof ToggleGroupItem
}

export const ToggleGroup = Object.assign(ToggleGroupBase, {
  Item: ToggleGroupItem,
}) as ToggleGroupComponent
