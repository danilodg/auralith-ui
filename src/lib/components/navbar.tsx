import * as React from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

import { cn } from '../utils/cn'

export interface NavbarNavItem {
  id: string
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  items?: NavbarNavItem[]
}

export interface NavbarAction {
  id: string
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface NavbarProps {
  brandTitle: string
  brandSubtitle?: string
  brandHref?: string
  brandIconSrc?: string
  navItems?: NavbarNavItem[]
  actions?: NavbarAction[]
  mobileMenuLabel?: string
  className?: string
}

function NavbarBase({
  actions,
  brandHref = '#',
  brandIconSrc,
  brandSubtitle,
  brandTitle,
  className,
  mobileMenuLabel = 'Menu',
  navItems = [],
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  const handleNavClick = (item: NavbarNavItem) => {
    if (item.onClick) {
      item.onClick()
    }
    setActiveDropdown(null)
  }

  const handleActionClick = (action: NavbarAction) => {
    if (action.onClick) {
      action.onClick()
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-[var(--card-border)] bg-[var(--surface-base)]/80 backdrop-blur-xl',
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4">
        <a
          href={brandHref}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          {brandIconSrc ? (
            <img src={brandIconSrc} alt="" className="h-7 w-7 rounded-md object-cover" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-line)] text-[var(--text-inverse)] text-sm font-bold">
              {brandTitle.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-main)] leading-none">
              {brandTitle}
            </span>
            {brandSubtitle && (
              <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">
                {brandSubtitle}
              </span>
            )}
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const hasChildren = item.items && item.items.length > 0
            const isActive = activeDropdown === item.id

            return (
              <div key={item.id} className="relative">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isActive ? null : item.id)}
                    className={cn(
                      'flex items-center gap-1 rounded-[6px] px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-[var(--surface-raised)] text-[var(--text-main)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--surface-raised)]',
                    )}
                  >
                    {item.icon}
                    {item.label}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform', isActive && 'rotate-180')}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-main)] hover:bg-[var(--surface-raised)]"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                )}

                {hasChildren && isActive && (
                  <div className="absolute left-0 top-full mt-1 min-w-[180px] rounded-[8px] border border-[var(--card-border)] bg-[var(--surface-base)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                    {item.items!.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={subItem.href}
                        onClick={() => handleNavClick(subItem)}
                        className="flex items-center gap-2 rounded-[6px] px-2.5 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-raised)] hover:text-[var(--text-main)]"
                      >
                        {subItem.icon}
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {actions?.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleActionClick(action)}
              className={cn(
                'rounded-[6px] px-3 py-1.5 text-sm font-medium transition-all',
                action.variant === 'primary' &&
                  'bg-[var(--accent-line)] text-[var(--text-inverse)] hover:shadow-[0_0_12px_rgba(111,224,255,0.3)]',
                action.variant === 'secondary' &&
                  'border border-[var(--card-border)] bg-[var(--surface-base)] text-[var(--text-main)] hover:bg-[var(--surface-raised)]',
                action.variant === 'ghost' &&
                  'text-[var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-main)]',
                !action.variant &&
                  'text-[var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-main)]',
              )}
            >
              {action.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-[6px] p-2 text-[var(--text-muted)] hover:bg-[var(--surface-raised)] md:hidden"
          aria-label={mobileMenuLabel}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--card-border)] bg-[var(--surface-base)] p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  handleNavClick(item)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center gap-2 rounded-[6px] px-3 py-2 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-raised)] hover:text-[var(--text-main)]"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
          {actions && actions.length > 0 && (
            <div className="mt-4 flex flex-col gap-2 border-t border-[var(--card-border)] pt-4">
              {actions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    handleActionClick(action)
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    'w-full rounded-[6px] px-3 py-2 text-sm font-medium transition-all',
                    action.variant === 'primary'
                      ? 'bg-[var(--accent-line)] text-[var(--text-inverse)]'
                      : 'border border-[var(--card-border)] bg-[var(--surface-base)] text-[var(--text-main)]',
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

type NavbarComponent = typeof NavbarBase

export const Navbar = NavbarBase
