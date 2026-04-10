import * as React from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
}

const AccordionContext = React.createContext<{
  openValues: string[]
  toggleAccordion: (value: string) => void
} | null>(null)

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = 'single', collapsible = true, defaultValue, children, ...props }, ref) => {
    const [openValues, setOpenValues] = React.useState<string[]>(() => {
      if (defaultValue) return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      return []
    })

    const toggleAccordion = React.useCallback(
      (value: string) => {
        setOpenValues((prev) => {
          const isOpen = prev.includes(value)
          if (isOpen) {
            return type === 'single' && !collapsible ? prev : prev.filter((v) => v !== value)
          } else {
            return type === 'single' ? [value] : [...prev, value]
          }
        })
      },
      [type, collapsible]
    )

    return (
      <AccordionContext.Provider value={{ openValues, toggleAccordion }}>
        <div ref={ref} className={`flex flex-col border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.15)] rounded-xl backdrop-blur-md shadow-sm overflow-hidden divide-y divide-[color:var(--card-border)] ${className || ''}`} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  title: React.ReactNode
  subtitle?: React.ReactNode
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, title, subtitle, children, ...props }, ref) => {
    const ctx = React.useContext(AccordionContext)
    if (!ctx) throw new Error('AccordionItem must be used within Accordion')

    const isOpen = ctx.openValues.includes(value)

    return (
      <div ref={ref} className={`group ${className || ''}`} {...props}>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => ctx.toggleAccordion(value)}
          className={`flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-[rgba(255,255,255,0.02)] active:bg-[rgba(255,255,255,0.03)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--accent-line)] ${isOpen ? 'bg-[rgba(255,255,255,0.015)]' : ''}`}
        >
          <div className="flex flex-col gap-1">
            <span className="font-medium text-[0.95rem] text-[color:var(--text-main)] transition-colors group-hover:text-[color:var(--accent-line)]">
              {title}
            </span>
            {subtitle && (
              <span className="text-[0.85rem] text-[color:var(--text-muted)] line-clamp-1">{subtitle}</span>
            )}
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[color:var(--text-muted)] transition-transform duration-300 ease-out ${isOpen ? 'rotate-180 text-[color:var(--accent-line)]' : ''}`}
          />
        </button>

        <div
            className={`grid overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <div className="p-5 pt-0 text-[0.95rem] leading-7 text-[color:var(--text-soft)]">
                    {children}
                </div>
            </div>
        </div>
      </div>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'
