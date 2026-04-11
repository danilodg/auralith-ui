import * as React from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  freezeContainerSize?: boolean
}

const AccordionContext = React.createContext<{
  openValues: string[]
  toggleAccordion: (value: string) => void
} | null>(null)

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = 'single', collapsible = true, defaultValue, freezeContainerSize = false, children, style, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null)
    const [lockedHeight, setLockedHeight] = React.useState<number | null>(null)

    const [openValues, setOpenValues] = React.useState<string[]>(() => {
      if (defaultValue) return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      return []
    })

    React.useLayoutEffect(() => {
      if (!freezeContainerSize || lockedHeight !== null || !innerRef.current) {
        return
      }

      const node = innerRef.current
      const itemElements = Array.from(node.querySelectorAll<HTMLElement>('[data-accordion-item]'))
      const bodyElements = Array.from(node.querySelectorAll<HTMLElement>('[data-accordion-body]'))

      if (!itemElements.length) {
        setLockedHeight(node.getBoundingClientRect().height)
        return
      }

      const collapsedHeight = itemElements.reduce((total, item) => total + item.getBoundingClientRect().height, 0)
      const contentHeights = bodyElements.map((body) => body.scrollHeight)
      const reserveHeight = type === 'multiple'
        ? contentHeights.reduce((total, value) => total + value, 0)
        : Math.max(0, ...contentHeights)

      setLockedHeight(Math.ceil(collapsedHeight + reserveHeight))
    }, [freezeContainerSize, lockedHeight, type])

    const setRefs = React.useCallback((node: HTMLDivElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') {
        ref(node)
        return
      }

      if (ref) {
        ref.current = node
      }
    }, [ref])

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
        <div
          ref={setRefs}
          className={`flex flex-col border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.15)] rounded-xl backdrop-blur-md shadow-sm overflow-hidden divide-y divide-[color:var(--card-border)] ${className || ''}`}
          style={freezeContainerSize && lockedHeight !== null ? { ...style, height: `${lockedHeight}px` } : style}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  value: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, title, subtitle, actions, children, ...props }, ref) => {
    const ctx = React.useContext(AccordionContext)
    if (!ctx) throw new Error('AccordionItem must be used within Accordion')

    const isOpen = ctx.openValues.includes(value)
    const toggleItem = () => ctx.toggleAccordion(value)

    return (
      <div ref={ref} className={`group ${className || ''}`} data-accordion-item {...props}>
        <div className={`flex items-center gap-2 p-2 pr-3 transition-colors ${isOpen ? 'bg-[rgba(255,255,255,0.015)]' : 'hover:bg-[rgba(255,255,255,0.02)] active:bg-[rgba(255,255,255,0.03)]'}`}>
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={toggleItem}
            className="flex min-w-0 flex-1 items-center rounded-[8px] p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--accent-line)]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[0.95rem] text-[color:var(--text-main)] transition-colors group-hover:text-[color:var(--accent-line)]">
                {title}
              </span>
              {subtitle ? (
                <span className="text-[0.85rem] text-[color:var(--text-muted)] line-clamp-1">{subtitle}</span>
              ) : null}
            </div>
          </button>

          {actions ? (
            <div className="flex shrink-0 items-center self-center gap-1.5" onClick={(event) => event.stopPropagation()}>
              {actions}
            </div>
          ) : null}

          <button
            type="button"
            aria-label={isOpen ? 'Collapse item' : 'Expand item'}
            aria-expanded={isOpen}
            onClick={toggleItem}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] text-[color:var(--text-muted)] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-[color:var(--text-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--accent-line)]"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180 text-[color:var(--accent-line)]' : ''}`}
            />
          </button>
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="p-5 pt-0 text-[0.95rem] leading-7 text-[color:var(--text-soft)]" data-accordion-body>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'
