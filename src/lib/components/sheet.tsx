/* eslint-disable react-refresh/only-export-components */

import { cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useState } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

import { cn } from '../utils/cn'

type SheetContextValue = {
  open: boolean
  setOpen: (nextOpen: boolean) => void
}

const SheetContext = createContext<SheetContextValue | null>(null)

function useSheetContext() {
  const context = useContext(SheetContext)

  if (!context) {
    throw new Error('Sheet components must be used inside Sheet.Root')
  }

  return context
}

interface SheetRootProps {
  children: ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function SheetRoot({ children, defaultOpen = false, onOpenChange, open }: SheetRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : uncontrolledOpen

  const contextValue = useMemo<SheetContextValue>(
    () => ({
      open: currentOpen,
      setOpen: (nextOpen) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen)
        }
        onOpenChange?.(nextOpen)
      },
    }),
    [currentOpen, isControlled, onOpenChange],
  )

  return <SheetContext.Provider value={contextValue}>{children}</SheetContext.Provider>
}

interface SheetTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: ReactNode
}

function SheetTrigger({ asChild = false, children, onClick, ...props }: SheetTriggerProps) {
  const { setOpen } = useSheetContext()

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (!event.defaultPrevented) {
      setOpen(true)
    }
  }

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ onClick?: (event: React.MouseEvent<HTMLElement>) => void }>

    return cloneElement(child, {
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(true)
        }
      },
    })
  }

  return (
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  side?: 'bottom' | 'left' | 'right'
}

function SheetContent({ children, className, side = 'right', ...props }: SheetContentProps) {
  const { open, setOpen } = useSheetContext()
  const [isMounted, setIsMounted] = useState(open)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (open) {
      setIsMounted(true)
      setIsClosing(false)
      return
    }

    if (!isMounted) return

    setIsClosing(true)
    const timeoutId = window.setTimeout(() => {
      setIsMounted(false)
      setIsClosing(false)
    }, 220)

    return () => window.clearTimeout(timeoutId)
  }, [open, isMounted])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, setOpen])

  if (!isMounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[280]">
      <button
        aria-label="Close sheet"
        className={cn(
          'absolute inset-0 bg-black/40',
          isClosing ? 'auralith-sheet-overlay-out' : 'auralith-sheet-overlay',
        )}
        onClick={() => setOpen(false)}
        type="button"
      />

      <div
        className={cn(
          'absolute z-10 border border-[color:var(--panel-border)] bg-[color:var(--surface-menu)] shadow-[var(--panel-shadow)]',
          side === 'right'
            ? `${isClosing ? 'auralith-sheet-exit-right' : 'auralith-sheet-enter-right'} right-0 top-0 h-full w-[min(92vw,420px)] border-l`
            : '',
          side === 'left'
            ? `${isClosing ? 'auralith-sheet-exit-left' : 'auralith-sheet-enter-left'} left-0 top-0 h-full w-[min(92vw,420px)] border-r`
            : '',
          side === 'bottom'
            ? `${isClosing ? 'auralith-sheet-exit-bottom' : 'auralith-sheet-enter-bottom'} bottom-0 left-0 w-full rounded-t-[16px] border-t p-0 max-h-[82vh]`
            : '',
          className,
        )}
        {...props}
      >
        <button
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] text-[color:var(--text-soft)] transition hover:text-[color:var(--text-main)]"
          onClick={() => setOpen(false)}
          type="button"
        >
          <X size={15} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

function SheetHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('border-b border-[color:var(--card-border)] p-5 pr-14', className)} {...props}>
      {children}
    </div>
  )
}

function SheetTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.1rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </h3>
  )
}

function SheetDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-2 text-[0.85rem] leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

function SheetBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('max-h-[calc(100vh-220px)] overflow-y-auto p-5', className)} {...props}>
      {children}
    </div>
  )
}

function SheetFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-wrap justify-end gap-3 border-t border-[color:var(--card-border)] p-5', className)} {...props}>
      {children}
    </div>
  )
}

interface SheetCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: ReactNode
}

function SheetClose({ asChild = false, children, onClick, ...props }: SheetCloseProps) {
  const { setOpen } = useSheetContext()

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (!event.defaultPrevented) {
      setOpen(false)
    }
  }

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ onClick?: (event: React.MouseEvent<HTMLElement>) => void }>

    return cloneElement(child, {
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(false)
        }
      },
    })
  }

  return (
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

export const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Body: SheetBody,
  Footer: SheetFooter,
  Close: SheetClose,
}
