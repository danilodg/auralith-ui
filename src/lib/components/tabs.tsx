import * as React from 'react'

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value: controlledValue, onValueChange, children, ...props }, ref) => {
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
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
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
    return (
      <div
        ref={ref}
        className={`inline-flex h-11 items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.25)] p-1 text-sm text-[color:var(--text-muted)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] backdrop-blur-sm ${className || ''}`}
        {...props}
      >
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
        aria-selected={isActive}
        onClick={() => ctx.onValueChange(value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-[7px] px-4 py-1.5 font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-line)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page-bg)] disabled:pointer-events-none disabled:opacity-50
        ${isActive ? 'bg-[color:var(--surface-panel-2)] text-[color:var(--text-main)] shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] translate-y-0' : 'hover:bg-[rgba(255,255,255,0.02)] hover:text-[color:var(--text-soft)] active:scale-95'
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
        className={`mt-4 ring-offset-[color:var(--page-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 animate-in fade-in zoom-in-95 duration-200 ease-out ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'
