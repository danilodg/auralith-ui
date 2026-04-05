/* eslint-disable react-refresh/only-export-components */

import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '../utils/cn'

export interface SelectOptionProps {
  description?: string
  label: string
  value: string
}

export interface SelectProps {
  children?: ReactNode
  className?: string
  defaultValue?: string
  disabled?: boolean
  hint?: string
  id?: string
  label?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  value?: string
}

type SelectOptionData = {
  description?: string
  label: string
  value: string
}

function SelectOption(_props: SelectOptionProps) {
  return null
}

function parseOptions(children: ReactNode) {
  const items: SelectOptionData[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== SelectOption) return

    const { description, label, value } = child.props as SelectOptionProps
    items.push({ description, label, value })
  })

  return items
}

function SelectBase({ children, className, defaultValue, disabled = false, hint, id, label, onValueChange, placeholder = 'Select an option', value }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const options = useMemo(() => parseOptions(children), [children])
  const [open, setOpen] = useState(false)
  const [panelPosition, setPanelPosition] = useState<{ left: number; top: number; width: number } | null>(null)
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const selectedOption = useMemo(() => options.find((option) => option.value === currentValue), [currentValue, options])

  function updatePanelPosition() {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const viewportPadding = 8
    const width = rect.width
    const maxLeft = window.innerWidth - width - viewportPadding
    const left = Math.max(viewportPadding, Math.min(rect.left, maxLeft))

    setPanelPosition({
      left,
      top: rect.bottom + 6,
      width,
    })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (containerRef.current?.contains(target) || panelRef.current?.contains(target)) return
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

  useEffect(() => {
    if (!open) {
      setPanelPosition(null)
      return
    }

    updatePanelPosition()

    function handleLayoutUpdate() {
      updatePanelPosition()
    }

    window.addEventListener('resize', handleLayoutUpdate)
    window.addEventListener('scroll', handleLayoutUpdate, true)

    return () => {
      window.removeEventListener('resize', handleLayoutUpdate)
      window.removeEventListener('scroll', handleLayoutUpdate, true)
    }
  }, [open])

  function applyValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
    setOpen(false)
  }

  return (
    <label className="grid gap-2" htmlFor={selectId}>
      {label ? <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span> : null}
      <div className="relative" ref={containerRef}>
        <button
          aria-controls={selectId ? `${selectId}-content` : undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            'w-full appearance-none rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 pr-9 text-left text-[0.88rem] text-[color:var(--text-main)] outline-none transition focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
            className,
          )}
          disabled={disabled}
          id={selectId}
          onClick={() => setOpen((current) => !current)}
          ref={triggerRef}
          type="button"
        >
          <span className={cn('block text-left', selectedOption ? 'text-[color:var(--text-main)]' : 'text-[color:var(--text-muted)]')}>
            {selectedOption?.label ?? placeholder}
          </span>
        </button>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
          <ChevronDown className={cn('transition-transform duration-200', open ? 'rotate-180' : '')} size={14} />
        </span>

        {open && panelPosition && typeof document !== 'undefined'
          ? createPortal(
              <div
                className="fixed z-[220] overflow-hidden rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-menu)] p-2 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px]"
                id={selectId ? `${selectId}-content` : undefined}
                ref={panelRef}
                role="listbox"
                style={{
                  left: `${panelPosition.left}px`,
                  top: `${panelPosition.top}px`,
                  width: `${panelPosition.width}px`,
                }}
              >
                <div className="max-h-56 space-y-1 overflow-y-auto">
                  {options.map((option) => {
                    const isSelected = option.value === currentValue

                    return (
                      <button
                        className={cn(
                          'flex w-full items-start justify-between gap-2 rounded-[8px] px-2 py-1.5 text-left transition',
                          isSelected
                            ? 'bg-[rgba(111,224,255,0.12)] text-[color:var(--accent-soft)]'
                            : 'text-[color:var(--text-soft)] hover:bg-[color:var(--surface-hover)]',
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
              </div>,
              document.body,
            )
          : null}
      </div>
      {hint ? <span className="text-sm text-[color:var(--text-muted)]">{hint}</span> : null}
    </label>
  )
}

type SelectComponent = typeof SelectBase & {
  Option: typeof SelectOption
}

export const Select = Object.assign(SelectBase, {
  Option: SelectOption,
}) as SelectComponent
