import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { ChevronDown, Menu, Pin, PinOff, Sparkles, X } from 'lucide-react'

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
  brandIconSrc?: string
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

function findActiveChildId(items: SideRailChildItem[]): string | null {
  for (const item of items) {
    if (item.items?.length) {
      const nested = findActiveChildId(item.items)
      if (nested) return nested
    }

    if (item.isActive) {
      return item.id
    }
  }

  return null
}

function findActiveItemId(items: SideRailItem[]): string | null {
  for (const item of items) {
    if (item.items?.length) {
      const nested = findActiveChildId(item.items)
      if (nested) return nested
    }

    if (item.isActive) {
      return item.id
    }
  }

  return null
}

function splitBrandTitle(title: string) {
  const uiSuffixMatch = title.match(/^(.*?)(\s*UI)$/i)

  if (!uiSuffixMatch) {
    return { base: title, suffix: '' }
  }

  return {
    base: uiSuffixMatch[1],
    suffix: uiSuffixMatch[2],
  }
}

function ChildLink({
  expanded,
  item,
  level = 0,
  onItemClick,
  registerRef,
}: {
  expanded: boolean
  item: SideRailChildItem
  level?: number
  onItemClick?: (id: string) => void
  registerRef?: (id: string, node: HTMLElement | null) => void
}) {
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

    onItemClick?.(item.id)
    item.onClick?.()
  }

  function handleToggleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    setOpen((current) => !current)
  }

  return (
    <div>
      <div className="relative">
        <Component
          {...(item.href && !hasChildren ? { href: item.href } : { type: 'button' as const })}
          aria-current={isActive ? 'page' : undefined}
          ref={(node: HTMLAnchorElement | HTMLButtonElement | null) => registerRef?.(item.id, node)}
          className={cn(
            'group flex h-10 min-w-0 items-center rounded-[8px] text-sm transition',
            expanded
              ? cn(
                  'mx-1 w-[calc(100%-8px)] gap-3 py-2.5',
                  hasChildren ? 'pr-10' : 'pr-2',
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
        </Component>

        {hasChildren && expanded ? (
          <button
            aria-label={`Toggle ${item.title} submenu`}
            className="absolute right-[10px] top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[8px] text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-hover)] hover:text-[color:var(--text-main)]"
            onClick={handleToggleClick}
            type="button"
          >
            <ChevronDown className={cn('transition-transform duration-200', open ? 'rotate-90' : '')} size={14} />
          </button>
        ) : null}
      </div>

      {hasChildren ? (
        <div className={cn('overflow-hidden transition-[max-height] duration-300 ease-out', expanded && open ? 'max-h-[1200px]' : 'max-h-0')}>
          <div className="pb-1 pt-1">
            {item.items?.map((child) => (
              <ChildLink
                expanded={expanded}
                item={child}
                key={child.id}
                level={level + 1}
                onItemClick={onItemClick}
                registerRef={registerRef}
              />
            ))}
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
  onToggleGroup,
  open,
  onItemClick,
  registerRef,
}: {
  expanded: boolean
  item: SideRailItem
  onClick: () => void
  onToggleGroup?: () => void
  open: boolean
  onItemClick?: (id: string) => void
  registerRef?: (id: string, node: HTMLElement | null) => void
}) {
  const hasChildren = Boolean(item.items?.length)
  const Component = item.href ? 'a' : 'button'
  const isActive = item.isActive || item.items?.some((child) => childIsActive(child))

  function handleClick() {
    onItemClick?.(item.id)
    onClick()
  }

  function handleToggleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    onToggleGroup?.()
  }

  return (
    <div className="nav-item">
      <div className="relative">
        <Component
          {...(item.href ? { href: item.href, onClick: handleClick } : { onClick: handleClick, type: 'button' as const })}
          aria-current={isActive ? 'page' : undefined}
          ref={(node: HTMLAnchorElement | HTMLButtonElement | null) => registerRef?.(item.id, node)}
          className={cn(
            'group relative flex h-11 items-center rounded-[8px] text-left transition',
            expanded ? 'w-full gap-3 px-3' : 'mx-auto w-11 justify-center px-0',
            hasChildren && expanded ? 'pr-10' : '',
            isActive
              ? 'text-[color:var(--accent-line)]'
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
        </Component>

        {hasChildren && expanded ? (
          <button
            aria-label={`Toggle ${item.title} submenu`}
            className="absolute right-[10px] top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[8px] text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-hover)] hover:text-[color:var(--text-main)]"
            onClick={handleToggleClick}
            type="button"
          >
            <ChevronDown className={cn('transition-all duration-300', open ? 'rotate-90' : '')} size={14} />
          </button>
        ) : null}
      </div>

      <div className={cn('overflow-hidden transition-[max-height] duration-300 ease-out', expanded && open ? 'max-h-[1200px]' : 'max-h-0')}>
        <div className="pb-1 pt-1">
          {item.items?.map((child) => (
            <ChildLink
              expanded={expanded}
              item={child}
              key={child.id}
              level={1}
              onItemClick={onItemClick}
              registerRef={registerRef}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SideRail({
  bottomSlot,
  brandHref = '#',
  brandIconSrc,
  brandSubtitle,
  brandTitle,
  items,
  onPinnedChange,
  onLayoutOffsetChange,
}: SideRailProps) {
  const [pinned, setPinned] = useState(getInitialPinnedState)
  const [expanded, setExpanded] = useState(() => getInitialPinnedState())
  const [openGroupIds, setOpenGroupIds] = useState<string[]>([])
  const [focusedNavId, setFocusedNavId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileMenuRendered, setMobileMenuRendered] = useState(false)
  const [desktopIndicatorStyle, setDesktopIndicatorStyle] = useState<{ height: number; opacity: number; top: number }>({
    top: 0,
    height: 0,
    opacity: 0,
  })
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState<{ top: number; height: number; opacity: number }>({ top: 0, height: 0, opacity: 0 })
  const desktopNavRef = useRef<HTMLElement | null>(null)
  const desktopItemRefs = useRef<Record<string, HTMLElement | null>>({})
  const mobileNavRef = useRef<HTMLElement | null>(null)
  const mobileItemRefs = useRef<Record<string, HTMLElement | null>>({})

  const activeItem = items.find((item) => item.isActive || item.items?.some((child) => childIsActive(child))) ?? null
  const activeNavId = findActiveItemId(items)
  const activeChildGroupId = items.find((item) => item.items?.some((child) => childIsActive(child)))?.id ?? null
  const brandIcon = brandIconSrc
    ? <img alt="" className="h-full w-full object-cover" src={brandIconSrc} />
    : <Sparkles size={16} strokeWidth={2.1} />
  const brandTitleParts = splitBrandTitle(brandTitle)

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

  useEffect(() => {
    if (typeof document === 'undefined') return

    const body = document.body
    const html = document.documentElement
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = html.style.overflow
    const previousBodyTouchAction = body.style.touchAction

    if (mobileMenuOpen) {
      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
      body.style.touchAction = 'none'
    }

    return () => {
      body.style.overflow = previousBodyOverflow
      html.style.overflow = previousHtmlOverflow
      body.style.touchAction = previousBodyTouchAction
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (mobileMenuOpen || !mobileMenuRendered) return

    const timeoutId = window.setTimeout(() => {
      setMobileMenuRendered(false)
    }, 280)

    return () => window.clearTimeout(timeoutId)
  }, [mobileMenuOpen, mobileMenuRendered])

  useLayoutEffect(() => {
    let frameId: number | null = null
    let timeoutId: number | null = null

    const updateMobileIndicator = () => {
      const nav = mobileNavRef.current
      const targetId = focusedNavId ?? activeNavId ?? openGroupIds[openGroupIds.length - 1] ?? activeItem?.id ?? null
      const currentItem = targetId ? mobileItemRefs.current[targetId] : null

      if (!nav || !currentItem || !mobileMenuOpen) {
        setMobileIndicatorStyle((current) => (current.opacity === 0 ? current : { ...current, opacity: 0 }))
        return
      }

      setMobileIndicatorStyle({
        top: currentItem.offsetTop,
        height: currentItem.offsetHeight,
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
  }, [activeItem, activeNavId, focusedNavId, items, openGroupIds, mobileMenuOpen])

  useLayoutEffect(() => {
    let frameId: number | null = null
    let timeoutId: number | null = null

    const updateDesktopIndicator = () => {
      const nav = desktopNavRef.current
      const targetId = focusedNavId ?? activeNavId ?? openGroupIds[openGroupIds.length - 1] ?? activeItem?.id ?? null
      const currentItem = targetId ? desktopItemRefs.current[targetId] : null

      if (!expanded || !nav || !currentItem) {
        setDesktopIndicatorStyle((current) => (current.opacity === 0 ? current : { ...current, opacity: 0 }))
        return
      }

      setDesktopIndicatorStyle({
        top: currentItem.offsetTop,
        height: currentItem.offsetHeight,
        opacity: 1,
      })
    }

    const requestDesktopIndicatorUpdate = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateDesktopIndicator()
      })
    }

    requestDesktopIndicatorUpdate()
    timeoutId = window.setTimeout(requestDesktopIndicatorUpdate, 180)
    window.addEventListener('resize', requestDesktopIndicatorUpdate)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
      window.removeEventListener('resize', requestDesktopIndicatorUpdate)
    }
  }, [activeItem, activeNavId, expanded, focusedNavId, items, openGroupIds])

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
    setFocusedNavId(item.id)
    item.onClick?.()
  }

  function handleDesktopGroupToggle(item: SideRailItem) {
    if (!item.items?.length) return

    setExpanded(true)
    setOpenGroupIds((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]))
  }

  function handleMobileItemClick(item: SideRailItem) {
    setFocusedNavId(item.id)
    setMobileMenuOpen(false)
    item.onClick?.()
  }

  function handleMobileGroupToggle(item: SideRailItem) {
    if (!item.items?.length) return

    setOpenGroupIds((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]))
  }

  function openMobileMenu() {
    if (mobileMenuRendered) {
      setMobileMenuOpen(true)
      return
    }

    setMobileMenuRendered(true)
    window.requestAnimationFrame(() => {
      setMobileMenuOpen(true)
    })
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false)
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
            <div className="flex h-[68px] items-center gap-3 border-b border-[color:var(--card-border)] px-[14px]">
              <button
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border transition',
                  brandIconSrc
                    ? 'overflow-hidden border-[color:var(--card-border)] bg-transparent p-0'
                    : 'border-[color:var(--card-border)] bg-[linear-gradient(145deg,var(--accent-start),color-mix(in_srgb,var(--accent-mid)_55%,transparent))] text-white shadow-[0_0_20px_var(--accent-shadow)] hover:shadow-[0_0_24px_var(--accent-shadow)]',
                )}
                onClick={toggleDesktopSidebar}
                title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
                type="button"
              >
                {brandIcon}
              </button>

              <a className="min-w-0 flex-1 overflow-hidden" href={brandHref}>
                <span
                  className={cn(
                    'block whitespace-nowrap font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-sm font-bold tracking-[0.02em] text-[color:var(--text-main)] transition-[transform,opacity] duration-200',
                    expanded ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                  )}
                >
                  {brandTitleParts.base}
                  {brandTitleParts.suffix ? (
                    <span className="bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] bg-clip-text text-transparent">
                      {brandTitleParts.suffix}
                    </span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    'block truncate pt-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)] transition-[transform,opacity] duration-200',
                    expanded ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                  )}
                >
                  {brandSubtitle}
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

              <nav
                aria-label="Side rail navigation"
                className={cn('relative space-y-1', expanded ? '' : 'px-1.5')}
                ref={desktopNavRef}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2 right-2 z-0 rounded-[8px] border border-[color:var(--accent-line)]/25 bg-[color:var(--surface-hover)] shadow-[0_0_0_1px_rgba(111,224,255,0.08)] transition-[transform,height,opacity] duration-300 ease-out"
                  style={{
                    height: `${desktopIndicatorStyle.height}px`,
                    opacity: desktopIndicatorStyle.opacity,
                    transform: `translateY(${desktopIndicatorStyle.top}px)`,
                  }}
                />
                {items.map((item) => (
                  <DesktopNavItem
                    expanded={expanded}
                    item={item}
                    key={item.id}
                    onClick={() => handleDesktopItemClick(item)}
                    onToggleGroup={() => handleDesktopGroupToggle(item)}
                    onItemClick={setFocusedNavId}
                    open={openGroupIds.includes(item.id)}
                    registerRef={(id, node) => {
                      desktopItemRefs.current[id] = node
                    }}
                  />
                ))}
              </nav>
            </div>

            {bottomSlot ? <div className="border-t border-[color:var(--card-border)] p-2">{bottomSlot}</div> : null}
          </div>
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="flex h-[60px] items-center justify-between gap-3 border-b border-[color:var(--nav-border,var(--panel-border))] bg-[var(--nav-bg,var(--panel-bg))] px-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.16)] [view-transition-name:none]">
          <a className="inline-flex min-w-0 flex-1 items-center gap-3 text-[color:var(--text-main)] no-underline" href={brandHref}>
            <span
              className={cn(
                'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]',
                brandIconSrc
                  ? 'overflow-hidden border border-[color:var(--card-border)] bg-transparent p-0'
                  : 'bg-[linear-gradient(145deg,var(--accent-start),color-mix(in_srgb,var(--accent-mid)_55%,transparent))] text-white shadow-[0_0_22px_var(--accent-shadow)]',
              )}
            >
              {brandIconSrc ? <img alt="" className="h-full w-full object-cover" src={brandIconSrc} /> : <Sparkles size={16} strokeWidth={2.1} />}
            </span>
            <span className="min-w-0 pr-1">
              <strong className="block font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-sm font-bold tracking-[0.01em] text-[color:var(--text-main)]">
                {brandTitleParts.base}
                {brandTitleParts.suffix ? (
                  <span className="bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] bg-clip-text text-transparent">
                    {brandTitleParts.suffix}
                  </span>
                ) : null}
              </strong>
              <span className="block truncate text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">{brandSubtitle}</span>
            </span>
          </a>
          
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[color:var(--surface-hover)] text-[color:var(--text-main)] transition hover:bg-[color:var(--surface-hover-strong)]"
            onClick={openMobileMenu}
            title="Abrir menu"
            type="button"
          >
            <Menu size={18} />
          </button>
        </div>

        {mobileMenuRendered && (
          <div className="fixed inset-0 z-[100] flex [view-transition-name:none]">
            <div
              className={cn(
                'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
                mobileMenuOpen ? 'opacity-100' : 'opacity-0',
              )}
              onClick={closeMobileMenu}
            />

            <div
              className={cn(
                'relative flex w-[280px] max-w-[calc(100vw-3rem)] flex-col border-r border-[color:var(--nav-border,var(--panel-border))] bg-[var(--nav-bg,var(--panel-bg))] shadow-xl transition-transform duration-300 ease-out',
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
              )}
            >
              <div className="flex h-[60px] shrink-0 items-center gap-3 border-b border-[color:var(--card-border)] px-[14px]">
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]',
                    brandIconSrc
                      ? 'overflow-hidden border border-[color:var(--card-border)] bg-transparent p-0'
                      : 'bg-[linear-gradient(145deg,var(--accent-start),color-mix(in_srgb,var(--accent-mid)_55%,transparent))] text-white shadow-[0_0_20px_var(--accent-shadow)]',
                  )}
                >
                  {brandIcon}
                </span>
                <span className="min-w-0 overflow-hidden whitespace-nowrap font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-sm font-bold tracking-[0.02em] text-[color:var(--text-main)]">
                  {brandTitleParts.base}
                  {brandTitleParts.suffix ? (
                    <span className="bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] bg-clip-text text-transparent">
                      {brandTitleParts.suffix}
                    </span>
                  ) : null}
                </span>
                <button
                  className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-hover)] hover:text-[color:var(--text-main)]"
                  onClick={closeMobileMenu}
                  title="Fechar"
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="auralith-scrollbar flex-1 overflow-y-auto overflow-x-hidden py-2">
                <div className="h-8 px-[22px] pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--text-muted)]">
                  Navigation
                </div>

                <nav aria-label="Side rail navigation mobile" className="relative space-y-1" ref={mobileNavRef}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-2 right-2 z-0 rounded-[8px] border border-[color:var(--accent-line)]/25 bg-[color:var(--surface-hover)] shadow-[0_0_0_1px_rgba(111,224,255,0.08)] transition-[transform,height,opacity] duration-300 ease-out"
                    style={{
                      height: `${mobileIndicatorStyle.height}px`,
                      opacity: mobileIndicatorStyle.opacity,
                      transform: `translateY(${mobileIndicatorStyle.top}px)`,
                    }}
                  />
                  {items.map((item) => (
                    <DesktopNavItem
                      expanded={true}
                      item={item}
                      key={item.id}
                      onClick={() => handleMobileItemClick(item)}
                      onToggleGroup={() => handleMobileGroupToggle(item)}
                      onItemClick={(id) => {
                        setFocusedNavId(id)
                        closeMobileMenu()
                      }}
                      open={openGroupIds.includes(item.id)}
                      registerRef={(id, node) => {
                        mobileItemRefs.current[id] = node
                      }}
                    />
                  ))}
                </nav>
              </div>

              {bottomSlot ? <div className="border-t border-[color:var(--card-border)] p-2">{bottomSlot}</div> : null}
            </div>
          </div>
        )}
      </header>

      <div aria-hidden="true" className="h-[60px] lg:hidden" />
    </>
  )
}
