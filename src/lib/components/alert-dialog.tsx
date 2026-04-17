/* eslint-disable react-refresh/only-export-components */

import { cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useState } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

import { cn } from '../utils/cn'

type AlertDialogContextValue = {
  open: boolean
  setOpen: (nextOpen: boolean) => void
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null)

function useAlertDialogContext() {
  const context = useContext(AlertDialogContext)

  if (!context) {
    throw new Error('AlertDialog components must be used inside AlertDialog.Root')
  }

  return context
}

interface AlertDialogRootProps {
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function AlertDialogRoot({ children, defaultOpen = false, open, onOpenChange }: AlertDialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : uncontrolledOpen

  const contextValue = useMemo<AlertDialogContextValue>(() => ({
    open: currentOpen,
    setOpen: (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
  }), [currentOpen, isControlled, onOpenChange])

  return <AlertDialogContext.Provider value={contextValue}>{children}</AlertDialogContext.Provider>
}

interface AlertDialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
}

function AlertDialogTrigger({ asChild = false, children, onClick, ...props }: AlertDialogTriggerProps) {
  const { setOpen } = useAlertDialogContext()

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

interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function AlertDialogContent({ children, className, ...props }: AlertDialogContentProps) {
  const { open, setOpen } = useAlertDialogContext()

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

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      <button
        aria-label="Close alert dialog"
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
        type="button"
      />

      <div
        className={cn(
          'relative z-10 w-full max-w-xl rounded-[8px] border border-[color:var(--panel-border)] bg-[color:var(--surface-menu)] p-3 shadow-[var(--panel-shadow)]',
          className,
        )}
        role="alertdialog"
        aria-modal="true"
        {...props}
      >
        <button
          className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-[8px] border border-[color:var(--panel-border)] bg-[color:var(--surface-soft)] text-[color:var(--text-soft)] transition hover:text-[color:var(--text-main)]"
          onClick={() => setOpen(false)}
          type="button"
        >
          <X size={14} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

function AlertDialogHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pr-10', className)} {...props}>
      {children}
    </div>
  )
}

function AlertDialogTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.35rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

function AlertDialogDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-2 text-sm leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

function AlertDialogFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-2 flex flex-wrap justify-end gap-2', className)} {...props}>
      {children}
    </div>
  )
}

interface AlertDialogCancelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: ReactNode
}

function AlertDialogCancel({ asChild = false, children, onClick, className, ...props }: AlertDialogCancelProps) {
  const { setOpen } = useAlertDialogContext()

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
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm font-medium text-[color:var(--text-main)] transition hover:border-[color:var(--accent-line)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface AlertDialogActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'default' | 'danger'
}

function AlertDialogAction({ children, onClick, className, tone = 'default', ...props }: AlertDialogActionProps) {
  const { setOpen } = useAlertDialogContext()

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (!event.defaultPrevented) {
      setOpen(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center rounded-[8px] border px-3 py-2 text-sm font-medium text-white transition',
        tone === 'danger'
          ? 'border-[rgba(255,143,143,0.5)] bg-[linear-gradient(135deg,rgba(255,126,126,0.88),rgba(215,56,82,0.86))] hover:brightness-110'
          : 'border-[color:var(--accent-line)] bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid),var(--accent-end))] hover:brightness-110',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
}
