/* eslint-disable react-refresh/only-export-components */

import { cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { HTMLAttributes, MutableRefObject, ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '../utils/cn'

type TooltipContextValue = {
  open: boolean
  setOpen: (nextOpen: boolean) => void
  anchorRef: MutableRefObject<HTMLSpanElement | null>
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

function useTooltipContext() {
  const context = useContext(TooltipContext)

  if (!context) {
    throw new Error('Tooltip components must be used inside Tooltip.Root')
  }

  return context
}

function TooltipRoot({ children, defaultOpen = false }: { children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const anchorRef = useRef<HTMLSpanElement | null>(null)
  const value = useMemo(() => ({ open, setOpen, anchorRef }), [open])

  return <TooltipContext.Provider value={value}><span className="relative inline-flex" ref={anchorRef}>{children}</span></TooltipContext.Provider>
}

function TooltipTrigger({ asChild = false, children }: { asChild?: boolean; children: ReactNode }) {
  const { setOpen } = useTooltipContext()

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      onBlur?: (event: React.FocusEvent<HTMLElement>) => void
      onFocus?: (event: React.FocusEvent<HTMLElement>) => void
      onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void
      onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void
    }>

    return cloneElement(child, {
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        child.props.onBlur?.(event)
        setOpen(false)
      },
      onFocus: (event: React.FocusEvent<HTMLElement>) => {
        child.props.onFocus?.(event)
        setOpen(true)
      },
      onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onMouseEnter?.(event)
        setOpen(true)
      },
      onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onMouseLeave?.(event)
        setOpen(false)
      },
    })
  }

  return <span>{children}</span>
}

function TooltipContent({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  const { anchorRef, open } = useTooltipContext()
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null)

  useEffect(() => {
    if (!open) return

    function updatePosition() {
      const anchor = anchorRef.current
      if (!anchor) return

      const rect = anchor.getBoundingClientRect()
      setPosition({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 10,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [anchorRef, open])

  if (!position) return null

  return createPortal(
    <span
      className={cn(
        'pointer-events-none fixed z-[260] w-max max-w-[220px] -translate-x-1/2 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-menu)] px-3 py-2 text-xs leading-5 text-[color:var(--text-soft)] shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px] transition',
        open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        className,
      )}
      role="tooltip"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
      {...props}
    >
      {children}
    </span>,
    document.body,
  )
}

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
}
