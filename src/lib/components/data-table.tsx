import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

type RowRecord = Record<string, ReactNode>

export interface DataTableColumn<T extends RowRecord = RowRecord> {
  align?: 'center' | 'left' | 'right'
  className?: string
  header: ReactNode
  key: keyof T & string
  render?: (row: T, rowIndex: number) => ReactNode
}

export interface DataTableProps<T extends RowRecord = RowRecord> extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<T>[]
  data: T[]
  empty?: ReactNode
  rowKey?: (row: T, rowIndex: number) => string
}

function getAlignClass(align: DataTableColumn['align']) {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

export function DataTable<T extends RowRecord>({ className, columns, data, empty, rowKey, ...props }: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-hidden rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)]', className)} {...props}>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)]">
              {columns.map((column) => (
                <th
                  className={cn('px-3 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--text-muted)]', getAlignClass(column.align), column.className)}
                  key={column.key}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className="px-3 py-8 text-center text-[0.84rem] text-[color:var(--text-muted)]" colSpan={Math.max(columns.length, 1)}>
                  {empty ?? 'No records found.'}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr className="border-b border-[color:var(--card-border)]/70 last:border-b-0" key={rowKey ? rowKey(row, rowIndex) : `${rowIndex}`}>
                  {columns.map((column) => (
                    <td
                      className={cn('px-3 py-2.5 text-[0.84rem] leading-6 text-[color:var(--text-soft)]', getAlignClass(column.align), column.className)}
                      key={column.key}
                    >
                      {column.render ? column.render(row, rowIndex) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
