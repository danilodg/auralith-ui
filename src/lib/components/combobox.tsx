/* eslint-disable react-refresh/only-export-components */

import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronsUpDown, Search } from 'lucide-react'

import { cn } from '../utils/cn'

export interface ComboboxItemProps {
  description?: string
  label: string
  value: string
}

export interface ComboboxProps {
  children?: ReactNode
  className?: string
  defaultValue?: string
  disabled?: boolean
  emptyLabel?: string
  hint?: string
  id?: string
  label?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  value?: string
}

type ComboboxItemData = {
  description?: string
  label: string
  value: string
}

function ComboboxItem(_props: ComboboxItemProps) {
  return null
}

function parseItems(children: ReactNode) {
  const items: ComboboxItemData[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== ComboboxItem) return

    const { description, label, value } = child.props as ComboboxItemProps
    items.push({ description, label, value })
  })

  return items
}

function ComboboxBase({
  children,
  className,
  defaultValue,
  disabled = false,
  emptyLabel = 'No results found',
  hint,
  id,
  label,
  onValueChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  value,
}: ComboboxProps) {
  const comboboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const items = useMemo(() => parseItems(children), [children])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [panelPosition, setPanelPosition] = useState<{ left: number; top: number; width: number } | null>(null)
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const selectedItem = useMemo(() => items.find((item) => item.value === currentValue), [currentValue, items])
  const filteredItems = useMemo(
    () => items.filter((item) => `${item.label} ${item.description ?? ''}`.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (containerRef.current?.contains(target) || panelRef.current?.contains(target)) return
      setOpen(false)
      setQuery('')
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      setQuery('')
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setPanelPosition(null)
      return
    }

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
        top: rect.bottom + 8,
        width,
      })
    }

    updatePanelPosition()
    window.addEventListener('resize', updatePanelPosition)
    window.addEventListener('scroll', updatePanelPosition, true)

    return () => {
      window.removeEventListener('resize', updatePanelPosition)
      window.removeEventListener('scroll', updatePanelPosition, true)
    }
  }, [open])

  function applyValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
    setOpen(false)
    setQuery('')
  }

  return (
    <label className="grid gap-2" htmlFor={comboboxId}>
      {label ? <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span> : null}
      <div className="relative" ref={containerRef}>
        <button
          aria-controls={comboboxId ? `${comboboxId}-content` : undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            'w-full rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 pr-9 text-left text-[0.88rem] text-[color:var(--text-main)] outline-none transition focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
            className,
          )}
          disabled={disabled}
          id={comboboxId}
          onClick={() => setOpen((current) => !current)}
          ref={triggerRef}
          type="button"
        >
          <span className={cn('block truncate text-left', selectedItem ? 'text-[color:var(--text-main)]' : 'text-[color:var(--text-muted)]')}>
            {selectedItem?.label ?? placeholder}
          </span>
        </button>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
          <ChevronsUpDown size={14} />
        </span>

        {open && panelPosition && typeof document !== 'undefined'
          ? createPortal(
              <div
                className="fixed z-[230] overflow-hidden rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-menu)] p-2 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px]"
                id={comboboxId ? `${comboboxId}-content` : undefined}
                ref={panelRef}
                role="listbox"
                style={{
                  left: `${panelPosition.left}px`,
                  top: `${panelPosition.top}px`,
                  width: `${panelPosition.width}px`,
                }}
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]" size={14} />
                  <input
                    autoFocus
                    className="w-full rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] py-1.5 pl-8 pr-2 text-[0.82rem] text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={searchPlaceholder}
                    value={query}
                  />
                </div>

                <div className="mt-2 max-h-56 space-y-1 overflow-y-auto">
                  {filteredItems.length === 0 ? (
                    <div className="rounded-[8px] border border-dashed border-[color:var(--card-border)] px-2 py-4 text-center text-[0.78rem] text-[color:var(--text-muted)]">
                      {emptyLabel}
                    </div>
                  ) : (
                    filteredItems.map((item) => {
                      const isSelected = item.value === currentValue

                      return (
                        <button
                          className={cn(
                            'flex w-full items-start justify-between gap-2 rounded-[8px] px-2 py-1.5 text-left transition',
                            isSelected
                              ? 'bg-[rgba(111,224,255,0.12)] text-[color:var(--accent-soft)]'
                              : 'text-[color:var(--text-soft)] hover:bg-[color:var(--surface-hover)]',
                          )}
                          key={item.value}
                          onClick={() => applyValue(item.value)}
                          role="option"
                          type="button"
                        >
                          <span>
                            <span className="block text-[0.84rem] font-medium">{item.label}</span>
                            {item.description ? <span className="mt-0.5 block text-[0.74rem] text-[color:var(--text-muted)]">{item.description}</span> : null}
                          </span>
                          <span className="pt-0.5">{isSelected ? <Check size={14} /> : null}</span>
                        </button>
                      )
                    })
                  )}
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

type ComboboxComponent = typeof ComboboxBase & {
  Item: typeof ComboboxItem
}

export const Combobox = Object.assign(ComboboxBase, {
  Item: ComboboxItem,
}) as ComboboxComponent
