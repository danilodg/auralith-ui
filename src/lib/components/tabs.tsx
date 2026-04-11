import * as React from 'react'

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
}

export type TabsVariant = 'solid' | 'baseline'

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
  variant: TabsVariant
} | null>(null)

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value: controlledValue, onValueChange, variant = 'solid', children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || '')
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue)
        }

        onValueChange?.(newValue)
      },
      [isControlled, onValueChange]
    )

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, variant }}>
        <div ref={ref} className={`flex w-full flex-col ${className || ''}`} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = 'Tabs'

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(TabsContext)
    if (!ctx) throw new Error('TabsList must be used within Tabs')

    const localRef = React.useRef<HTMLDivElement | null>(null)
    const [indicatorStyle, setIndicatorStyle] = React.useState<{ width: number; left: number; opacity: number }>({
      left: 0,
      width: 0,
      opacity: 0,
    })

    React.useLayoutEffect(() => {
      if (!ctx) {
        return
      }

      const container = localRef.current
      if (!container) {
        return
      }

      const updateIndicator = () => {
        const activeTrigger = container.querySelector<HTMLButtonElement>(`[data-tabs-trigger-value="${ctx.value}"]`)
        if (!activeTrigger) {
          setIndicatorStyle((current) => (current.opacity === 0 ? current : { ...current, opacity: 0 }))
          return
        }

        setIndicatorStyle({
          left: activeTrigger.offsetLeft,
          width: activeTrigger.offsetWidth,
          opacity: 1,
        })
      }

      updateIndicator()
      const timeoutId = window.setTimeout(updateIndicator, 140)
      const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => updateIndicator()) : null

      resizeObserver?.observe(container)
      Array.from(container.querySelectorAll('[data-tabs-trigger-value]')).forEach((element) => {
        resizeObserver?.observe(element)
      })

      window.addEventListener('resize', updateIndicator)

      return () => {
        window.clearTimeout(timeoutId)
        window.removeEventListener('resize', updateIndicator)
        resizeObserver?.disconnect()
      }
    }, [ctx])

    return (
      <div
        ref={(node) => {
          localRef.current = node

          if (typeof ref === 'function') {
            ref(node)
            return
          }

          if (ref) {
            ref.current = node
          }
        }}
        className={`relative inline-flex items-center justify-center text-sm ${ctx.variant === 'solid'
          ? 'h-11 rounded-[10px] border border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.25)] p-1 text-[color:var(--text-muted)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] backdrop-blur-sm'
          : 'h-12 border-b border-[color:var(--card-border)] p-0.5 text-[color:var(--text-soft)]'
          } ${className || ''}`}
        {...props}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 rounded-full bg-[color:var(--accent-line)] transition-[transform,width,opacity] duration-300 ease-out ${ctx.variant === 'solid' ? 'bottom-0.5 h-0.5 shadow-[0_0_14px_var(--accent-shadow)]' : 'bottom-0 h-[2px] shadow-[0_0_10px_var(--accent-shadow)]'}`}
          style={{
            opacity: indicatorStyle.opacity,
            transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
            width: `${indicatorStyle.width}px`,
          }}
        />
        {children}
      </div>
    )
  }
)
TabsList.displayName = 'TabsList'

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = React.useContext(TabsContext)
    if (!ctx) throw new Error('TabsTrigger must be used within Tabs')

    const isActive = ctx.value === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        data-tabs-trigger-value={value}
        aria-selected={isActive}
        onClick={() => ctx.onValueChange(value)}
        className={`relative z-10 inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page-bg)] disabled:pointer-events-none disabled:opacity-50 ${ctx.variant === 'solid'
          ? `rounded-[7px] px-4 py-1.5 ${isActive ? 'text-[color:var(--accent-line)]' : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-soft)] active:scale-95'}`
          : `rounded-[6px] px-3.5 py-2 ${isActive ? 'text-[color:var(--text-main)]' : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-soft)]'}`
          } ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = React.useContext(TabsContext)
    if (!ctx) throw new Error('TabsContent must be used within Tabs')

    if (ctx.value !== value) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={`mt-4 ring-offset-[color:var(--page-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'
