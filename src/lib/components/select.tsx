/* eslint-disable react-refresh/only-export-components */

import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '../utils/cn'

export type SelectOption = {
  description?: string
  label: string
  value: string
}

type SelectControlProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  id?: string
  onValueChange?: (value: string) => void
  options?: ReadonlyArray<SelectOption>
  placeholder?: string
  value?: string
  children?: ReactNode
}

export interface SelectProps extends SelectControlProps {
  hint?: string
  label?: string
}

export interface SelectOptionProps {
  description?: string
  label: string
  value: string
}

function SelectOption(_props: SelectOptionProps) {
  return null
}

function getOptionsFromChildren(children: ReactNode): ReadonlyArray<SelectOption> {
  const entries: SelectOption[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== SelectOption) return

    const { description, label, value } = child.props as SelectOptionProps
    entries.push({ description, label, value })
  })

  return entries
}

function SelectControl({ children, className, defaultValue, disabled = false, id, onValueChange, options, placeholder = 'Select an option', value }: SelectControlProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const resolvedOptions = useMemo(() => (options?.length ? options : getOptionsFromChildren(children)), [children, options])

  const selectedOption = useMemo(() => resolvedOptions.find((option) => option.value === currentValue), [currentValue, resolvedOptions])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current || containerRef.current.contains(event.target as Node)) return
      setOpen(false)
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  function applyValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
    setOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-controls={id ? `${id}-content` : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          'w-full appearance-none rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 pr-9 text-left text-[0.88rem] text-[color:var(--text-main)] outline-none transition focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          className,
        )}
        disabled={disabled}
        id={id}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className={cn('block text-left', selectedOption ? 'text-[color:var(--text-main)]' : 'text-[color:var(--text-muted)]')}>
          {selectedOption?.label ?? placeholder}
        </span>
      </button>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
        <ChevronDown className={cn('transition-transform duration-200', open ? 'rotate-180' : '')} size={14} />
      </span>

      {open ? (
        <div
          className="absolute left-0 top-[calc(100%+0.4rem)] z-[120] w-full overflow-hidden rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(9,16,43,0.97)] p-2 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px]"
          id={id ? `${id}-content` : undefined}
          role="listbox"
        >
          <div className="max-h-56 space-y-1 overflow-y-auto">
            {resolvedOptions.map((option) => {
              const isSelected = option.value === currentValue

              return (
                <button
                  className={cn(
                    'flex w-full items-start justify-between gap-2 rounded-[8px] px-2 py-1.5 text-left transition',
                    isSelected
                      ? 'bg-[rgba(111,224,255,0.12)] text-[color:var(--accent-soft)]'
                      : 'text-[color:var(--text-soft)] hover:bg-[rgba(255,255,255,0.04)]',
                  )}
                  key={option.value}
                  onClick={() => applyValue(option.value)}
                  role="option"
                  type="button"
                >
                  <span>
                    <span className="block text-[0.84rem] font-medium">{option.label}</span>
                    {option.description ? <span className="mt-0.5 block text-[0.74rem] text-[color:var(--text-muted)]">{option.description}</span> : null}
                  </span>
                  <span className="pt-0.5">{isSelected ? <Check size={14} /> : null}</span>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function SelectBase({ children, className, defaultValue, disabled, hint, id, label, onValueChange, options, placeholder, value }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <SelectRoot htmlFor={selectId}>
      {label ? <SelectLabel>{label}</SelectLabel> : null}
      <SelectField
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        id={selectId}
        onValueChange={onValueChange}
        options={options}
        placeholder={placeholder}
        value={value}
      >
        {children}
      </SelectField>
      {hint ? <SelectHint>{hint}</SelectHint> : null}
    </SelectRoot>
  )
}

function SelectRoot({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('grid gap-2', className)} {...props}>
      {children}
    </label>
  )
}

function SelectLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function SelectField({ children, className, defaultValue, disabled, id, onValueChange, options, placeholder, value }: SelectControlProps) {
  return (
    <SelectControl
      children={children}
      className={className}
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      onValueChange={onValueChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  )
}

function SelectHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

type SelectComponent = typeof SelectBase & {
  Field: typeof SelectField
  Hint: typeof SelectHint
  Label: typeof SelectLabel
  Option: typeof SelectOption
  Root: typeof SelectRoot
}

export const Select = Object.assign(SelectBase, {
  Root: SelectRoot,
  Label: SelectLabel,
  Field: SelectField,
  Option: SelectOption,
  Hint: SelectHint,
}) as SelectComponent
