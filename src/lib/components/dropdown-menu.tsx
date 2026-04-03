/* eslint-disable react-refresh/only-export-components */

import { cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '../utils/cn'

type DropdownMenuContextValue = {
  open: boolean
  setOpen: (nextOpen: boolean) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext)

  if (!context) {
    throw new Error('DropdownMenu components must be used inside DropdownMenu.Root')
  }

  return context
}

function DropdownMenuRoot({ children, defaultOpen = false }: { children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    return () => window.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const value = useMemo(() => ({ open, setOpen }), [open])

  return (
    <DropdownMenuContext.Provider value={value}>
      <div className="relative inline-flex" ref={containerRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
}

function DropdownMenuTrigger({ asChild = false, children, className, onClick, ...props }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenuContext()

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (!event.defaultPrevented) {
      setOpen(!open)
    }
  }

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ onClick?: (event: React.MouseEvent<HTMLElement>) => void }>

    return cloneElement(child, {
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(!open)
        }
      },
    })
  }

  return (
    <button
      aria-expanded={open}
      className={cn(
        'inline-flex min-w-[140px] items-center justify-between gap-2 rounded-[8px] border border-[color:var(--button-secondary-border)] bg-[var(--button-secondary-bg)] px-3 py-2 text-[0.78rem] font-medium text-[color:var(--button-secondary-text)] transition hover:-translate-y-0.5',
        className,
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children}
      <ChevronDown className={cn('transition', open ? 'rotate-180' : '')} size={16} />
    </button>
  )
}

function DropdownMenuContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { open } = useDropdownMenuContext()

  if (!open) return null

  return (
    <div
      className={cn(
        'absolute left-0 top-[calc(100%+0.75rem)] z-[120] min-w-[260px] rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-menu)] p-2 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  description?: ReactNode
}

function DropdownMenuItem({ children, className, description, onClick, ...props }: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext()

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (!event.defaultPrevented) {
      setOpen(false)
    }
  }

  return (
    <button
      className={cn('flex w-full flex-col rounded-[8px] px-4 py-3 text-left transition hover:bg-[color:var(--surface-hover)]', className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <span className="text-sm font-medium text-[color:var(--text-main)]">{children}</span>
      {description ? <span className="mt-1 text-sm leading-6 text-[color:var(--text-soft)]">{description}</span> : null}
    </button>
  )
}

function DropdownMenuSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('my-1 h-px bg-[color:var(--card-border)]', className)} {...props} />
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
}
