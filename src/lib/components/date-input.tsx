/* eslint-disable react-refresh/only-export-components */

import { useEffect, useMemo, useRef, useState } from 'react'
import type { HTMLAttributes, LabelHTMLAttributes } from 'react'
import { createPortal } from 'react-dom'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '../utils/cn'

type DateInputMode = 'single' | 'range'

type DateRangeValue = {
  end: string
  start: string
}

type DateInputValue = string | DateRangeValue

export interface DateInputProps {
  className?: string
  defaultValue?: DateInputValue
  disabled?: boolean
  hint?: string
  id?: string
  label?: string
  mode?: DateInputMode
  onValueChange?: (value: DateInputValue) => void
  value?: DateInputValue
}

const RANGE_EMPTY: DateRangeValue = { start: '', end: '' }

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDateKey(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null

  const parsed = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  if (Number.isNaN(parsed.getTime())) return null

  return toDateKey(parsed) === value ? parsed : null
}

function addDays(date: Date, days: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

function addMonths(date: Date, months: number) {
  const copy = new Date(date)
  copy.setMonth(copy.getMonth() + months)
  return copy
}

function isBeforeDateKey(a: string, b: string) {
  return a < b
}

function normalizeRange(value: DateInputValue | undefined): DateRangeValue {
  if (!value || typeof value === 'string') return RANGE_EMPTY

  return {
    start: value.start ?? '',
    end: value.end ?? '',
  }
}

function getMonthDays(baseMonth: Date) {
  const monthStart = new Date(baseMonth.getFullYear(), baseMonth.getMonth(), 1)
  const firstDayIndex = (monthStart.getDay() + 6) % 7
  const gridStart = addDays(monthStart, -firstDayIndex)

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(gridStart, index)
    return {
      date,
      dateKey: toDateKey(date),
      inCurrentMonth: date.getMonth() === baseMonth.getMonth(),
    }
  })
}

function formatDateLabel(value: string, locale: string) {
  const parsed = parseDateKey(value)
  if (!parsed) return value

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed)
}

function DateInputBase({
  className,
  defaultValue,
  disabled = false,
  hint,
  id,
  label,
  mode = 'single',
  onValueChange,
  value,
}: DateInputProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? 'date-input'
  const containerRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const isControlled = value !== undefined
  const isPt = typeof document !== 'undefined' ? document.documentElement.lang.toLowerCase().startsWith('pt') : false
  const locale = isPt ? 'pt-BR' : 'en-US'

  const [open, setOpen] = useState(false)
  const [panelPosition, setPanelPosition] = useState<{ left: number; top: number; width: number } | null>(null)
  const [internalSingleValue, setInternalSingleValue] = useState(typeof defaultValue === 'string' ? defaultValue : '')
  const [internalRangeValue, setInternalRangeValue] = useState<DateRangeValue>(normalizeRange(defaultValue))
  const [viewMonth, setViewMonth] = useState(() => {
    if (typeof defaultValue === 'string') {
      return parseDateKey(defaultValue) ?? new Date()
    }
    if (defaultValue && typeof defaultValue !== 'string' && defaultValue.start) {
      return parseDateKey(defaultValue.start) ?? new Date()
    }
    return new Date()
  })

  const currentSingleValue = mode === 'single'
    ? (isControlled ? (typeof value === 'string' ? value : '') : internalSingleValue)
    : ''

  const currentRangeValue = mode === 'range'
    ? (isControlled ? normalizeRange(value) : internalRangeValue)
    : RANGE_EMPTY

  function updatePanelPosition() {
    const trigger = containerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const viewportPadding = 8
    const preferredWidth = mode === 'range' ? 576 : 288
    const width = Math.min(preferredWidth, Math.max(280, window.innerWidth - viewportPadding * 2))
    const maxLeft = window.innerWidth - width - viewportPadding
    const left = Math.max(viewportPadding, Math.min(rect.left, maxLeft))

    setPanelPosition({
      left,
      top: rect.bottom + 6,
      width,
    })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (containerRef.current?.contains(target) || panelRef.current?.contains(target)) return
      setOpen(false)
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    updatePanelPosition()

    function handleLayoutUpdate() {
      updatePanelPosition()
    }

    window.addEventListener('resize', handleLayoutUpdate)
    window.addEventListener('scroll', handleLayoutUpdate, true)

    return () => {
      window.removeEventListener('resize', handleLayoutUpdate)
      window.removeEventListener('scroll', handleLayoutUpdate, true)
    }
  }, [mode, open])

  const singlePresets = useMemo(
    () => {
      const base = new Date()
      return [
        { label: isPt ? 'Hoje' : 'Today', value: toDateKey(base) },
        { label: isPt ? 'Amanha' : 'Tomorrow', value: toDateKey(addDays(base, 1)) },
        { label: isPt ? 'Depois de amanha' : 'Day after tomorrow', value: toDateKey(addDays(base, 2)) },
        { label: isPt ? 'Ontem' : 'Yesterday', value: toDateKey(addDays(base, -1)) },
        { label: isPt ? 'Anteontem' : 'Day before yesterday', value: toDateKey(addDays(base, -2)) },
      ]
    },
    [isPt],
  )

  const rangePresets = useMemo(
    () => {
      const base = new Date()
      const todayKey = toDateKey(base)
      return [
        { label: isPt ? 'Hoje' : 'Today', value: { start: todayKey, end: todayKey } },
        {
          label: isPt ? 'Ontem ate hoje' : 'Yesterday to today',
          value: { start: toDateKey(addDays(base, -1)), end: todayKey },
        },
        {
          label: isPt ? 'Proximos 7 dias' : 'Next 7 days',
          value: { start: todayKey, end: toDateKey(addDays(base, 6)) },
        },
        {
          label: isPt ? 'Ultimos 7 dias' : 'Last 7 days',
          value: { start: toDateKey(addDays(base, -6)), end: todayKey },
        },
      ]
    },
    [isPt],
  )

  function applySingle(nextValue: string) {
    if (!isControlled) {
      setInternalSingleValue(nextValue)
    }
    onValueChange?.(nextValue)
    setOpen(false)
  }

  function applyRange(nextValue: DateRangeValue) {
    if (!isControlled) {
      setInternalRangeValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  function handleDatePick(dateKey: string) {
    if (mode === 'single') {
      applySingle(dateKey)
      return
    }

    const { start, end } = currentRangeValue
    if (!start || (start && end)) {
      applyRange({ start: dateKey, end: '' })
      return
    }

    if (isBeforeDateKey(dateKey, start)) {
      applyRange({ start: dateKey, end: start })
      setOpen(false)
      return
    }

    applyRange({ start, end: dateKey })
    setOpen(false)
  }

  function renderCalendar(monthDate: Date) {
    const days = getMonthDays(monthDate)
    const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(monthDate)
    const weekdayLabels = isPt ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
      <div className="w-[272px] max-w-full rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] p-2">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--text-soft)]">{monthLabel}</p>
        <div className="mb-1 grid grid-cols-7 gap-1">
          {weekdayLabels.map((weekday) => (
            <span className="text-center text-[0.64rem] uppercase tracking-[0.08em] text-[color:var(--text-muted)]" key={weekday}>
              {weekday}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(({ date, dateKey, inCurrentMonth }) => {
            const isSingleSelected = mode === 'single' && dateKey === currentSingleValue
            const isRangeStart = mode === 'range' && dateKey === currentRangeValue.start
            const isRangeEnd = mode === 'range' && dateKey === currentRangeValue.end
            const isRangeMiddle = mode === 'range'
              && currentRangeValue.start
              && currentRangeValue.end
              && dateKey > currentRangeValue.start
              && dateKey < currentRangeValue.end

            return (
              <button
                className={cn(
                  'h-7 rounded-[8px] text-[0.74rem] transition',
                  inCurrentMonth ? 'text-[color:var(--text-main)]' : 'text-[color:var(--text-muted)] opacity-65',
                  isRangeMiddle ? 'bg-[rgba(111,224,255,0.1)]' : 'hover:bg-[rgba(255,255,255,0.04)]',
                  isSingleSelected || isRangeStart || isRangeEnd
                    ? 'bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white shadow-[0_0_16px_var(--accent-shadow)]'
                    : '',
                )}
                key={dateKey}
                onClick={() => handleDatePick(dateKey)}
                type="button"
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const triggerLabel = mode === 'single'
    ? (currentSingleValue ? formatDateLabel(currentSingleValue, locale) : (isPt ? 'Selecionar data' : 'Select date'))
    : (currentRangeValue.start && currentRangeValue.end
      ? `${formatDateLabel(currentRangeValue.start, locale)} - ${formatDateLabel(currentRangeValue.end, locale)}`
      : (isPt ? 'Selecionar periodo' : 'Select range'))

  return (
    <label className="grid gap-2" htmlFor={fieldId}>
      {label ? <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span> : null}
      <div className="relative" ref={containerRef}>
        <button
          aria-controls={`${fieldId}-calendar`}
          aria-expanded={open}
          className={cn(
            'w-full rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 pr-9 text-left text-[0.88rem] text-[color:var(--text-main)] outline-none transition focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
            disabled ? 'cursor-not-allowed opacity-60' : '',
            className,
          )}
          disabled={disabled}
          id={fieldId}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {triggerLabel}
        </button>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
          <CalendarDays size={14} />
        </span>

        {open && panelPosition
          ? createPortal(
              <div
                className="fixed z-[220] overflow-hidden rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(9,16,43,0.97)] p-2 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px]"
                id={`${fieldId}-calendar`}
                ref={panelRef}
                style={{
                  left: `${panelPosition.left}px`,
                  top: `${panelPosition.top}px`,
                  width: `${panelPosition.width}px`,
                }}
              >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                {mode === 'single' ? (isPt ? 'Data unica' : 'Single date') : (isPt ? 'Periodo' : 'Date range')}
              </p>
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-[color:var(--text-soft)] transition hover:bg-[rgba(255,255,255,0.04)]"
                  onClick={() => setViewMonth((current) => addMonths(current, -1))}
                  type="button"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-[color:var(--text-soft)] transition hover:bg-[rgba(255,255,255,0.04)]"
                  onClick={() => setViewMonth((current) => addMonths(current, 1))}
                  type="button"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="mb-2 flex flex-wrap gap-1.5">
              {(mode === 'single' ? singlePresets : rangePresets).map((preset) => (
                <button
                  className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.03)] px-2 py-1 text-[0.68rem] uppercase tracking-[0.08em] text-[color:var(--text-soft)] transition hover:bg-[rgba(111,224,255,0.12)]"
                  key={preset.label}
                  onClick={() => {
                    if (mode === 'single') {
                      applySingle((preset as { label: string; value: string }).value)
                    }
                    else {
                      const range = (preset as { label: string; value: DateRangeValue }).value
                      applyRange(range)
                    }
                  }}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className={cn('grid gap-2', mode === 'range' ? 'md:grid-cols-2' : '')}>
              {renderCalendar(viewMonth)}
              {mode === 'range' ? renderCalendar(addMonths(viewMonth, 1)) : null}
            </div>
              </div>,
              document.body,
            )
          : null}
      </div>
      {hint ? <span className="text-sm text-[color:var(--text-muted)]">{hint}</span> : null}
    </label>
  )
}

function DateInputRoot({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('grid gap-2', className)} {...props}>
      {children}
    </label>
  )
}

function DateInputLabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function DateInputHint({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)]', className)} {...props}>
      {children}
    </span>
  )
}

type DateInputComponent = typeof DateInputBase & {
  Root: typeof DateInputRoot
  Label: typeof DateInputLabel
  Hint: typeof DateInputHint
}

export const DateInput = Object.assign(DateInputBase, {
  Root: DateInputRoot,
  Label: DateInputLabel,
  Hint: DateInputHint,
}) as DateInputComponent
