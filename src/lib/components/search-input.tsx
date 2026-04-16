import * as React from 'react'
import { Search, X } from 'lucide-react'

import { cn } from '../utils/cn'

export interface SearchInputProps {
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSearch?: (value: string) => void
  debounceMs?: number
  disabled?: boolean
  hint?: string
  className?: string
}

function SearchInputBase({
  className,
  defaultValue,
  debounceMs = 300,
  disabled,
  hint,
  label,
  onSearch,
  onValueChange,
  placeholder,
  value: controlledValue,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const [debouncedValue, setDebouncedValue] = React.useState(defaultValue ?? '')
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (debounceMs === 0) {
      setDebouncedValue(currentValue)
      onSearch?.(currentValue)
    } else {
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(currentValue)
        onSearch?.(currentValue)
      }, debounceMs)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentValue, debounceMs, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('')
      setDebouncedValue('')
    }
    onValueChange?.('')
    onSearch?.('')
  }

  const inputId = label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('grid gap-2', className)}>
      {label ? (
        <label className="text-sm font-medium text-[color:var(--text-main)]" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-muted)]"
          strokeWidth={2}
        />
        <input
          id={inputId}
          type="search"
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          className={cn(
            'w-full rounded-[8px] border border-[color:color-mix(in_srgb,var(--input-border)_65%,transparent)] bg-[var(--input-bg)] py-1.5 pr-8 pl-9 text-[0.88rem] text-[color:var(--text-main)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-line)]/45 focus:ring-1 focus:ring-cyan-300/15',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        />
        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[color:var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[color:var(--text-main)]"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {hint && <span className="text-sm text-[color:var(--text-muted)]">{hint}</span>}
    </div>
  )
}

type SearchInputComponent = typeof SearchInputBase

export const SearchInput = SearchInputBase
