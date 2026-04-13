/* eslint-disable react-refresh/only-export-components */

import { cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, MutableRefObject, ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '../utils/cn'

type PopoverContextValue = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  open: boolean
  setOpen: (nextOpen: boolean) => void
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopoverContext() {
  const context = useContext(PopoverContext)

  if (!context) {
    throw new Error('Popover components must be used inside Popover.Root')
  }

  return context
}

interface PopoverRootProps {
  children: ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function PopoverRoot({ children, defaultOpen = false, onOpenChange, open }: PopoverRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : uncontrolledOpen

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        if (!isControlled) {
          setUncontrolledOpen(false)
        }
        onOpenChange?.(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (!isControlled) {
        setUncontrolledOpen(false)
      }
      onOpenChange?.(false)
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isControlled, onOpenChange])

  const value = useMemo<PopoverContextValue>(
    () => ({
      containerRef,
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

  return (
    <PopoverContext.Provider value={value}>
      <div className="relative inline-flex" ref={containerRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: ReactNode
}

function PopoverTrigger({ asChild = false, children, onClick, ...props }: PopoverTriggerProps) {
  const { open, setOpen } = usePopoverContext()

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
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'center' | 'end' | 'start'
  side?: 'bottom' | 'top'
}

function PopoverContent({ align = 'start', children, className, side = 'bottom', ...props }: PopoverContentProps) {
  const { containerRef, open } = usePopoverContext()
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null)

  useEffect(() => {
    if (!open) return

    function updatePosition() {
      const anchor = containerRef.current
      if (!anchor) return

      const rect = anchor.getBoundingClientRect()
      const panelWidth = Math.max(rect.width, 240)
      const viewportPadding = 8
      let left = rect.left

      if (align === 'center') {
        left = rect.left + rect.width / 2 - panelWidth / 2
      }

      if (align === 'end') {
        left = rect.right - panelWidth
      }

      left = Math.max(viewportPadding, Math.min(left, window.innerWidth - panelWidth - viewportPadding))
      const top = side === 'bottom' ? rect.bottom + 10 : rect.top - 10

      setPosition({
        left,
        top,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [align, containerRef, open, side])

  if (!open || !position) return null

  return createPortal(
    <div
      className={cn(
        'fixed z-[260] w-[min(92vw,320px)] rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-menu)] p-3 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px]',
        side === 'top' ? '-translate-y-full' : '',
        className,
      )}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
      {...props}
    >
      {children}
    </div>,
    document.body,
  )
}

function PopoverTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn('font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </h4>
  )
}

function PopoverDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-2 text-[0.84rem] leading-6 text-[color:var(--text-soft)]', className)} {...props}>
      {children}
    </p>
  )
}

interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: ReactNode
}

function PopoverClose({ asChild = false, children, onClick, ...props }: PopoverCloseProps) {
  const { setOpen } = usePopoverContext()

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

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
}
