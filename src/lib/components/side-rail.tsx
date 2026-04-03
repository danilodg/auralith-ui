import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, Pin, PinOff, Sparkles } from 'lucide-react'

import type { SideRailChildItem, SideRailItem } from '../../types/navigation'
import { cn } from '../utils/cn'

const SIDE_RAIL_PINNED_STORAGE_KEY = 'auralith-ui:side-rail:pinned'

function getInitialPinnedState() {
  if (typeof window === 'undefined') return false

  try {
    return window.localStorage.getItem(SIDE_RAIL_PINNED_STORAGE_KEY) === '1'
  }
  catch {
    return false
  }
}

interface SideRailProps {
  brandTitle: string
  brandSubtitle: string
  brandHref?: string
  items: SideRailItem[]
  bottomSlot?: ReactNode
  onPinnedChange?: (isPinned: boolean) => void
  onLayoutOffsetChange?: (offset: number) => void
}

function getTooltipText(item: SideRailItem) {
  return [item.title, item.description, item.urlText].filter(Boolean).join('\n')
}

function childIsActive(item: SideRailChildItem): boolean {
  if (item.isActive) return true
  if (!item.items?.length) return false
  return item.items.some((child) => childIsActive(child))
}

function ChildLink({ expanded, item, level = 0 }: { expanded: boolean; item: SideRailChildItem; level?: number }) {
  const hasChildren = Boolean(item.items?.length)
  const isActive = childIsActive(item)
  const [open, setOpen] = useState(() => hasChildren && isActive)
  const Component = item.href && !hasChildren ? 'a' : 'button'

  useEffect(() => {
    if (hasChildren && isActive) {
      setOpen(true)
    }
  }, [hasChildren, isActive])

  function handleClick() {
    if (hasChildren) {
      setOpen((current) => !current)
      return
    }

    item.onClick?.()
  }

  return (
    <div>
      <Component
        {...(item.href && !hasChildren ? { href: item.href } : { type: 'button' as const })}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group flex h-10 min-w-0 items-center rounded-[8px] text-sm transition',
          expanded
            ? cn(
                'mx-1 w-[calc(100%-8px)] gap-3 py-2.5 pr-2',
                level === 0 ? 'pl-2' : '',
                level === 1 ? 'pl-5' : '',
                level >= 2 ? 'pl-8' : '',
              )
            : 'mx-auto w-11 justify-center gap-0 px-0 py-2',
          isActive
            ? 'text-[color:var(--accent-line)]'
            : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-hover)] hover:text-[color:var(--text-main)]',
        )}
        onClick={handleClick}
        title={[item.title, item.description, item.urlText].filter(Boolean).join('\n')}
      >
        {item.icon ? (
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] transition',
              isActive
                ? 'bg-[linear-gradient(135deg,rgba(111,224,255,0.18),rgba(104,126,255,0.2)_55%,rgba(139,102,255,0.22))] text-[color:var(--accent-line)]'
                : 'bg-[color:var(--surface-hover)] group-hover:bg-[color:var(--surface-hover-strong)]',
            )}
          >
            {item.icon}
          </span>
        ) : (
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)]',
              isActive ? 'text-[color:var(--accent-line)]' : 'text-[color:var(--text-muted)]',
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
          </span>
        )}
        <span
          className={cn(
            'min-w-0 flex-1 whitespace-nowrap overflow-hidden text-left text-[13px] font-medium transition-[max-width,opacity] duration-200',
            expanded ? 'max-w-full opacity-100' : 'max-w-0 opacity-0',
          )}
        >
          {item.title}
        </span>
        {hasChildren && expanded ? <ChevronDown className={cn('ml-auto shrink-0 transition-transform duration-200', open ? 'rotate-90' : '')} size={14} /> : null}
      </Component>

      {hasChildren ? (
        <div className={cn('overflow-hidden transition-[max-height] duration-300 ease-out', expanded && open ? 'max-h-[1200px]' : 'max-h-0')}>
          <div className="pb-1 pt-1">
            {item.items?.map((child) => <ChildLink expanded={expanded} item={child} key={child.id} level={level + 1} />)}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function DesktopNavItem({
  expanded,
  item,
  onClick,
  open,
}: {
  expanded: boolean
  item: SideRailItem
  onClick: () => void
  open: boolean
}) {
  const hasChildren = Boolean(item.items?.length)
  const Component = item.href && !hasChildren ? 'a' : 'button'
  const isActive = item.isActive || item.items?.some((child) => childIsActive(child))

  return (
    <div className="nav-item">
      <Component
        {...(item.href && !hasChildren ? { href: item.href, onClick } : { onClick, type: 'button' as const })}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group relative flex h-11 items-center rounded-[8px] text-left transition',
          expanded ? 'w-full gap-3 px-3' : 'mx-auto w-11 justify-center px-0',
          isActive
            ? 'bg-[linear-gradient(135deg,rgba(111,224,255,0.18),rgba(104,126,255,0.18)_55%,rgba(139,102,255,0.2))] text-[color:var(--accent-line)] shadow-[0_0_0_1px_rgba(111,224,255,0.1)]'
            : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-hover)] hover:text-[color:var(--text-main)]',
        )}
        title={expanded ? undefined : getTooltipText(item)}
      >
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] transition',
            isActive
              ? 'bg-[rgba(111,224,255,0.16)] text-[color:var(--accent-line)]'
              : 'group-hover:bg-[color:var(--surface-hover-strong)]',
          )}
        >
          {item.icon}
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 whitespace-nowrap overflow-hidden text-[13.5px] font-medium transition-[max-width,opacity] duration-200',
            expanded ? 'max-w-full opacity-100' : 'max-w-0 opacity-0',
          )}
        >
          {item.title}
        </span>
        {item.items?.length && expanded ? (
          <ChevronDown className={cn('shrink-0 text-[color:var(--text-muted)] transition-all duration-300', open ? 'rotate-90' : '')} size={14} />
        ) : null}
      </Component>

      <div className={cn('overflow-hidden transition-[max-height] duration-300 ease-out', expanded && open ? 'max-h-[1200px]' : 'max-h-0')}>
        <div className="pb-1 pt-1">
          {item.items?.map((child) => (
            <ChildLink expanded={expanded} item={child} key={child.id} level={1} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SideRail({
  bottomSlot,
  brandHref = '#',
  brandSubtitle,
  brandTitle,
  items,
  onPinnedChange,
  onLayoutOffsetChange,
}: SideRailProps) {
  const [pinned, setPinned] = useState(getInitialPinnedState)
  const [expanded, setExpanded] = useState(() => getInitialPinnedState())
  const [openGroupIds, setOpenGroupIds] = useState<string[]>([])
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 })
  const mobileNavRef = useRef<HTMLElement | null>(null)
  const mobileItemRefs = useRef<Record<string, HTMLElement | null>>({})

  const activeItem = items.find((item) => item.isActive || item.items?.some((child) => childIsActive(child))) ?? null
  const activeChildGroupId = items.find((item) => item.items?.some((child) => childIsActive(child)))?.id ?? null

  useEffect(() => {
    if (!activeChildGroupId) return

    setOpenGroupIds((current) => (current.includes(activeChildGroupId) ? current : [...current, activeChildGroupId]))
  }, [activeChildGroupId])

  useEffect(() => {
    onPinnedChange?.(pinned)
    onLayoutOffsetChange?.(pinned ? (expanded ? 280 : 64) : 0)
  }, [expanded, onLayoutOffsetChange, onPinnedChange, pinned])

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDE_RAIL_PINNED_STORAGE_KEY, pinned ? '1' : '0')
    }
    catch {
      // Ignore localStorage write failures (private mode, denied storage, etc)
    }
  }, [pinned])

  useLayoutEffect(() => {
    let frameId: number | null = null
    let timeoutId: number | null = null

    const updateMobileIndicator = () => {
      const nav = mobileNavRef.current
      const currentItem = activeItem ? mobileItemRefs.current[activeItem.id] : null

      if (!nav || !currentItem) {
        setMobileIndicatorStyle((current) => (current.opacity === 0 ? current : { ...current, opacity: 0 }))
        return
      }

      setMobileIndicatorStyle({
        left: currentItem.offsetLeft,
        width: currentItem.offsetWidth,
        opacity: 1,
      })
    }

    const requestIndicatorUpdate = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateMobileIndicator()
      })
    }

    requestIndicatorUpdate()
    timeoutId = window.setTimeout(requestIndicatorUpdate, 180)
    window.addEventListener('resize', requestIndicatorUpdate)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
      window.removeEventListener('resize', requestIndicatorUpdate)
    }
  }, [activeItem, items])

  function toggleDesktopSidebar() {
    setExpanded((current) => !current)
  }

  function togglePinnedSidebar() {
    if (!expanded) {
      setExpanded(true)
      setPinned(true)
      return
    }

    setPinned((current) => !current)
  }

  function handleDesktopItemClick(item: SideRailItem) {
    if (item.items?.length) {
      setExpanded(true)
      setOpenGroupIds((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]))
      return
    }

    item.onClick?.()
  }

  function handleMobileItemClick(item: SideRailItem) {
    if (item.items?.length) {
      setOpenGroupIds((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]))
      return
    }

    item.onClick?.()
  }

  return (
    <>
      <aside className="hidden lg:block">
        <div
          className={cn(
            'z-30 [view-transition-name:none]',
            pinned ? 'fixed left-0 top-0 h-screen' : 'fixed left-3 top-4 h-[calc(100vh-2rem)]',
          )}
        >
          <div
            className={cn(
              'flex h-full flex-col overflow-hidden border border-[color:var(--nav-border,var(--panel-border))] bg-[var(--nav-bg,var(--panel-bg))] transition-[width,border-radius] duration-200 ease-out',
              expanded ? 'w-[280px]' : 'w-16',
              pinned
                ? 'rounded-none border-y-0 border-l-0 shadow-none'
                : 'rounded-[8px] shadow-[0_24px_60px_rgba(0,0,0,0.22)]',
            )}
          >
            <div className="flex h-[60px] items-center gap-3 border-b border-[color:var(--card-border)] px-[14px]">
              <button
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[linear-gradient(145deg,var(--accent-start),color-mix(in_srgb,var(--accent-mid)_55%,transparent))] text-white shadow-[0_0_20px_var(--accent-shadow)] transition hover:shadow-[0_0_24px_var(--accent-shadow)]"
                onClick={toggleDesktopSidebar}
                title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
                type="button"
              >
                <Sparkles size={16} strokeWidth={2.1} />
              </button>

              <a className="min-w-0 overflow-hidden" href={brandHref}>
                <span
                  className={cn(
                    'block whitespace-nowrap font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-sm font-medium tracking-[0.04em] text-[color:var(--accent-line)] transition-[transform,opacity] duration-200',
                    expanded ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                  )}
                >
                  {brandTitle}
                </span>
              </a>

              {expanded ? (
                <button
                  className={cn(
                    'ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border transition',
                    pinned
                      ? 'border-[color:var(--accent-line)] bg-[rgba(111,224,255,0.12)] text-[color:var(--accent-line)]'
                      : 'border-[color:var(--card-border)] bg-[color:var(--surface-hover)] text-[color:var(--text-muted)] hover:text-[color:var(--text-main)]',
                  )}
                  onClick={togglePinnedSidebar}
                  title={pinned ? 'Desafixar menu lateral' : 'Fixar menu lateral'}
                  type="button"
                >
                  {pinned ? <PinOff size={15} /> : <Pin size={15} />}
                </button>
              ) : null}
            </div>

            <div className="auralith-scrollbar flex-1 overflow-y-auto overflow-x-hidden py-2">
              <div
                className={cn(
                  'h-8 px-[22px] pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--text-muted)] transition-opacity duration-300',
                  expanded ? 'opacity-100' : 'opacity-0',
                )}
              >
                Navigation
              </div>

              <nav aria-label="Side rail navigation" className={cn('space-y-1', expanded ? '' : 'px-1.5')}>
                {items.map((item) => (
                  <DesktopNavItem
                    expanded={expanded}
                    item={item}
                    key={item.id}
                    onClick={() => handleDesktopItemClick(item)}
                    open={openGroupIds.includes(item.id)}
                  />
                ))}
              </nav>
            </div>

            {bottomSlot ? <div className="border-t border-[color:var(--card-border)] p-2">{bottomSlot}</div> : null}
          </div>
        </div>
      </aside>

      <header className="lg:hidden">
        <div className="mb-6 flex items-center justify-between gap-3 rounded-[8px] border border-[color:var(--nav-border,var(--panel-border))] bg-[var(--nav-bg,var(--panel-bg))] px-4 py-3 shadow-[0_18px_46px_rgba(0,0,0,0.16)] [view-transition-name:none]">
          <a className="inline-flex min-w-0 flex-1 items-center gap-3 text-[color:var(--text-main)] no-underline" href={brandHref}>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[linear-gradient(145deg,var(--accent-start),color-mix(in_srgb,var(--accent-mid)_55%,transparent))] text-white shadow-[0_0_22px_var(--accent-shadow)]">
              <Sparkles size={18} strokeWidth={2.1} />
            </span>
            <span className="min-w-0 pr-1">
              <strong className="block text-sm font-semibold">{brandTitle}</strong>
              <span className="block truncate text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">{brandSubtitle}</span>
            </span>
          </a>
        </div>

        <nav ref={mobileNavRef} className="fixed inset-x-3 bottom-3 z-30 flex flex-wrap gap-2 overflow-hidden rounded-[8px] border border-[color:var(--nav-border,var(--panel-border))] bg-[var(--nav-bg,var(--panel-bg))] p-2 shadow-[0_18px_46px_rgba(0,0,0,0.18)] max-[420px]:gap-1.5 max-[420px]:p-2 [view-transition-name:none]" aria-label="Side rail navigation mobile">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-0 top-2 rounded-[8px] bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] shadow-[0_0_22px_var(--accent-shadow)] transition-[transform,width,opacity] duration-300 ease-out max-[420px]:bottom-1.5 max-[420px]:top-1.5"
            style={{
              opacity: mobileIndicatorStyle.opacity,
              width: `${mobileIndicatorStyle.width}px`,
              transform: `translateX(${mobileIndicatorStyle.left}px)`,
            }}
          />

          {items.map((item) => {
            const hasChildren = Boolean(item.items?.length)
            const isHighlighted = item.isActive || item.items?.some((child) => childIsActive(child)) || openGroupIds.includes(item.id)

            return item.href && !hasChildren ? (
              <a
                key={item.id}
                ref={(node) => {
                  mobileItemRefs.current[item.id] = node
                }}
                aria-current={isHighlighted ? 'page' : undefined}
                className={cn(
                  'relative z-10 flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[8px] px-2 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-[flex-grow,color,transform] duration-300 ease-out max-[420px]:px-1.5 max-[420px]:py-2 max-[420px]:text-[0.62rem] max-[420px]:tracking-[0.1em]',
                  isHighlighted ? 'max-[420px]:flex-[1.2] text-white' : 'max-[420px]:flex-[0.9] text-[color:var(--text-soft)]',
                )}
                href={item.href}
                onClick={() => handleMobileItemClick(item)}
                title={getTooltipText(item)}
              >
                <span>{item.icon}</span>
                <span className="max-w-full truncate">{item.title}</span>
              </a>
            ) : (
              <button
                key={item.id}
                ref={(node) => {
                  mobileItemRefs.current[item.id] = node
                }}
                aria-current={isHighlighted ? 'page' : undefined}
                className={cn(
                  'relative z-10 flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[8px] px-2 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-[flex-grow,color,transform] duration-300 ease-out max-[420px]:px-1.5 max-[420px]:py-2 max-[420px]:text-[0.62rem] max-[420px]:tracking-[0.1em]',
                  isHighlighted ? 'max-[420px]:flex-[1.2] text-white' : 'max-[420px]:flex-[0.9] text-[color:var(--text-soft)]',
                )}
                onClick={() => handleMobileItemClick(item)}
                title={getTooltipText(item)}
                type="button"
              >
                <span>{item.icon}</span>
                <span className="max-w-full truncate">{item.title}</span>
              </button>
            )
          })}

          {openGroupIds.length ? (
            <div className="basis-full px-1 pt-2">
              {items
                .filter((item) => openGroupIds.includes(item.id) && item.items?.length)
                .map((item) => (
                  <div key={item.id} className="space-y-2">
                    <p className="px-2 pb-2 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                      {item.title}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {item.items?.map((child) => <ChildLink expanded item={child} key={child.id} level={1} />)}
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </nav>
      </header>
    </>
  )
}
