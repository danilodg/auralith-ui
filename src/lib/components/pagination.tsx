import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '../utils/cn'

export interface PaginationProps {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

function getPages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages: Array<number | 'ellipsis-left' | 'ellipsis-right'> = [1]

  if (currentPage > 3) {
    pages.push('ellipsis-left')
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  if (currentPage < totalPages - 2) {
    pages.push('ellipsis-right')
  }

  pages.push(totalPages)
  return pages
}

export function Pagination({ className, currentPage, onPageChange, totalPages }: PaginationProps) {
  const clampedCurrentPage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1))
  const pages = getPages(clampedCurrentPage, Math.max(totalPages, 1))

  return (
    <nav aria-label="Pagination" className={cn('inline-flex items-center gap-1.5', className)}>
      <button
        aria-label="Previous page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] text-[color:var(--text-soft)] transition hover:text-[color:var(--text-main)] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={clampedCurrentPage <= 1}
        onClick={() => onPageChange(clampedCurrentPage - 1)}
        type="button"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((page) => {
        if (typeof page !== 'number') {
          return (
            <span className="inline-flex h-8 w-8 items-center justify-center text-[color:var(--text-muted)]" key={page}>
              <MoreHorizontal size={14} />
            </span>
          )
        }

        const isActive = page === clampedCurrentPage

        return (
          <button
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] border px-2 text-[0.78rem] font-medium transition',
              isActive
                ? 'border-[rgba(111,224,255,0.38)] bg-[rgba(111,224,255,0.1)] text-[color:var(--accent-soft)]'
                : 'border-[color:var(--card-border)] bg-[color:var(--surface-soft)] text-[color:var(--text-soft)] hover:text-[color:var(--text-main)]',
            )}
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        )
      })}

      <button
        aria-label="Next page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-soft)] text-[color:var(--text-soft)] transition hover:text-[color:var(--text-main)] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={clampedCurrentPage >= totalPages}
        onClick={() => onPageChange(clampedCurrentPage + 1)}
        type="button"
      >
        <ChevronRight size={14} />
      </button>
    </nav>
  )
}
