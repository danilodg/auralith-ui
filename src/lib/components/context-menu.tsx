import * as React from 'react'
import { createPortal } from 'react-dom'
import { ChevronRight } from 'lucide-react'

import { cn } from '../utils/cn'

export interface ContextMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  onClick?: () => void
  disabled?: boolean
  items?: ContextMenuItem[]
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
  children: React.ReactNode
  className?: string
}

function ContextMenuBase({ items, children, className }: ContextMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPosition({ x: e.clientX, y: e.clientY })
    setIsOpen(true)
  }

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setActiveSubmenu(null)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setActiveSubmenu(null)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return
    if (item.items && item.items.length > 0) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id)
    } else if (item.onClick) {
      item.onClick()
      setIsOpen(false)
      setActiveSubmenu(null)
    }
  }

  const renderItems = (menuItems: ContextMenuItem[], submenuId?: string) => {
    return menuItems.map((item) => {
      const hasChildren = item.items && item.items.length > 0
      const isSubmenuOpen = submenuId && activeSubmenu === item.id

      return (
        <div key={item.id} className="relative">
          <button
            type="button"
            disabled={item.disabled}
            onClick={() => handleItemClick(item)}
            className={cn(
              'flex w-full items-center justify-between gap-2 rounded-[6px] px-2.5 py-1.5 text-sm transition-colors',
              item.disabled
                ? 'cursor-not-allowed opacity-50'
                : 'text-[var(--text-main)] hover:bg-[var(--surface-raised)]',
              isSubmenuOpen && 'bg-[var(--surface-raised)]',
            )}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
            {item.shortcut && (
              <span className="text-[0.7rem] text-[var(--text-muted)]">{item.shortcut}</span>
            )}
            {hasChildren && <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />}
          </button>
          {hasChildren && isSubmenuOpen && (
            <div className="absolute left-full top-0 ml-1 min-w-[160px] rounded-[8px] border border-[var(--card-border)] bg-[var(--surface-menu)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md">
              {item.items!.map((subItem) => (
                <button
                  key={subItem.id}
                  type="button"
                  disabled={subItem.disabled}
                  onClick={() => {
                    if (!subItem.disabled && subItem.onClick) {
                      subItem.onClick()
                      setIsOpen(false)
                      setActiveSubmenu(null)
                    }
                  }}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-[6px] px-2.5 py-1.5 text-sm transition-colors',
                    subItem.disabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'text-[var(--text-main)] hover:bg-[var(--surface-raised)]',
                  )}
                >
                  <span className="flex items-center gap-2">
                    {subItem.icon}
                    {subItem.label}
                  </span>
                  {subItem.shortcut && (
                    <span className="text-[0.7rem] text-[var(--text-muted)]">{subItem.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )
    })
  }

  const menu = isOpen && (
    <div
      ref={menuRef}
      className="fixed z-[100] min-w-[180px] rounded-[8px] border border-[var(--card-border)] bg-[var(--surface-menu)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md"
      style={{ left: position.x, top: position.y }}
      role="menu"
    >
      {renderItems(items)}
    </div>
  )

  return (
    <div className={className} onContextMenu={handleContextMenu}>
      {children}
      {typeof document !== 'undefined' && createPortal(menu, document.body)}
    </div>
  )
}

export const ContextMenu = ContextMenuBase
