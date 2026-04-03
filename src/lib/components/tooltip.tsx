/* eslint-disable react-refresh/only-export-components */

import { cloneElement, createContext, isValidElement, useContext, useMemo, useState } from 'react'
import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

import { cn } from '../utils/cn'

type TooltipContextValue = {
  open: boolean
  setOpen: (nextOpen: boolean) => void
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
  const value = useMemo(() => ({ open, setOpen }), [open])

  return <TooltipContext.Provider value={value}><span className="relative inline-flex">{children}</span></TooltipContext.Provider>
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
  const { open } = useTooltipContext()

  return (
    <span
      className={cn(
        'pointer-events-none absolute left-1/2 top-[calc(100%+0.75rem)] z-40 w-max max-w-[220px] -translate-x-1/2 rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(9,16,43,0.96)] px-3 py-2 text-xs leading-5 text-[color:var(--text-soft)] shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px] transition',
        open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        className,
      )}
      role="tooltip"
      {...props}
    >
      {children}
    </span>
  )
}

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
}
