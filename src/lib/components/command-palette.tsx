import * as React from 'react'
import { createPortal } from 'react-dom'
import { Search, X, Command, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react'

import { cn } from '../utils/cn'

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string
  onSelect?: () => void
  category?: string
}

export interface CommandPaletteProps {
  items: CommandPaletteItem[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
}

function CommandPaletteBase({
  items,
  open: controlledOpen,
  onOpenChange,
  placeholder = 'Search...',
  emptyMessage = 'No results found.',
  className,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const filteredItems = React.useMemo(() => {
    if (!query) return items
    const lowerQuery = query.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery),
    )
  }, [items, query])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!isControlled) {
          setInternalOpen(true)
        } else {
          onOpenChange?.(true)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isControlled, controlledOpen, internalOpen, onOpenChange])

  React.useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false)
    } else {
      onOpenChange?.(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((i) => (i < filteredItems.length - 1 ? i + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((i) => (i > 0 ? i - 1 : filteredItems.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].onSelect?.()
          handleClose()
        }
        break
      case 'Escape':
        e.preventDefault()
        handleClose()
        break
    }
  }

  React.useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      selectedElement?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const trigger = (
    <button
      type="button"
      onClick={() => {
        if (!isControlled) {
          setInternalOpen(true)
        } else {
          onOpenChange?.(true)
        }
      }}
      className={cn(
        'flex items-center gap-2 rounded-[8px] border border-[var(--card-border)] bg-[var(--surface-base)] px-3 py-2 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--text-muted)]/50',
        className,
      )}
    >
      <Search className="h-4 w-4" />
      <span className="flex-1 text-left">{placeholder}</span>
      <kbd className="hidden rounded bg-[var(--surface-raised)] px-1.5 py-0.5 text-[0.65rem] font-mono sm:inline-flex">
        <Command className="h-3 w-3" />K
      </kbd>
    </button>
  )

  const modal = isOpen && (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-[15vh]"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-[560px] rounded-[12px] border border-[var(--card-border)] bg-[var(--surface-base)] shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 border-b border-[var(--card-border)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-[var(--text-main)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <button
            type="button"
            onClick={handleClose}
            className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--surface-raised)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={listRef} className="max-h-[300px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">
              {emptyMessage}
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  item.onSelect?.()
                  handleClose()
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2 text-left transition-colors',
                  index === selectedIndex
                    ? 'bg-[var(--accent-line)]/15 text-[var(--text-main)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-raised)]',
                )}
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  <div className="flex flex-col">
                    <span className="text-sm">{item.label}</span>
                    {item.description && (
                      <span className="text-[0.75rem] text-[var(--text-muted)]">
                        {item.description}
                      </span>
                    )}
                  </div>
                </span>
                {item.shortcut && (
                  <kbd className="rounded bg-[var(--surface-raised)] px-1.5 py-0.5 text-[0.65rem] font-mono">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--card-border)] px-4 py-2 text-[0.7rem] text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              <ArrowDown className="h-3 w-3" />
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" />
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="rounded bg-[var(--surface-raised)] px-1.5 py-0.5 font-mono">Esc</kbd>
            to close
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {trigger}
      {typeof document !== 'undefined' && createPortal(modal, document.body)}
    </>
  )
}

type CommandPaletteComponent = typeof CommandPaletteBase

export const CommandPalette = CommandPaletteBase
