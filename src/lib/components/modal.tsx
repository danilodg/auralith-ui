/* eslint-disable react-refresh/only-export-components */

import { cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useState } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

import { cn } from '../utils/cn'

type ModalContextValue = {
  open: boolean
  setOpen: (nextOpen: boolean) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('Modal components must be used inside Modal.Root')
  }

  return context
}

interface ModalRootProps {
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function ModalRoot({ children, defaultOpen = false, onOpenChange, open }: ModalRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : uncontrolledOpen

  const contextValue = useMemo<ModalContextValue>(
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

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
}

function ModalTrigger({ asChild = false, children, onClick, ...props }: ModalTriggerProps) {
  const { setOpen } = useModalContext()

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

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function ModalContent({ children, className, ...props }: ModalContentProps) {
  const { open, setOpen } = useModalContext()

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
        aria-label="Close modal"
        className="absolute inset-0 bg-[color:var(--overlay-backdrop)] backdrop-blur-sm"
        onClick={() => setOpen(false)}
        type="button"
      />

      <div
        className={cn(
          'relative z-10 w-full max-w-2xl rounded-[8px] border border-[color:var(--panel-border)] bg-[var(--panel-bg)] p-2 shadow-[var(--panel-shadow)] backdrop-blur-[22px] sm:p-2',
          className,
        )}
        {...props}
      >
        <button
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] text-[color:var(--text-soft)] transition hover:text-[color:var(--text-main)]"
          onClick={() => setOpen(false)}
          type="button"
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

function ModalHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pr-14', className)} {...props}>
      {children}
    </div>
  )
}

function ModalTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-2xl font-semibold tracking-[-0.03em] text-[color:var(--text-main)]',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

function ModalDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-3 text-sm leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

function ModalBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-6', className)} {...props}>
      {children}
    </div>
  )
}

function ModalFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-6 flex flex-wrap justify-end gap-3', className)} {...props}>
      {children}
    </div>
  )
}

interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
}

function ModalClose({ asChild = false, children, onClick, ...props }: ModalCloseProps) {
  const { setOpen } = useModalContext()

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

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
}
