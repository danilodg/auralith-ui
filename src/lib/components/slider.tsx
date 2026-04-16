import * as React from 'react'

import { cn } from '../utils/cn'

export interface SliderProps {
  label?: string
  description?: string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  disabled?: boolean
  showValue?: boolean
  formatValue?: (value: number) => string
  className?: string
}

function SliderBase({
  className,
  description,
  disabled,
  label,
  max = 100,
  min = 0,
  onValueChange,
  showValue = true,
  formatValue,
  step = 1,
  value: controlledValue,
  defaultValue,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? min)
  const [isDragging, setIsDragging] = React.useState(false)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue
  const trackRef = React.useRef<HTMLDivElement>(null)

  const handleValueChange = (newValue: number) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const percentage = ((currentValue - min) / (max - min)) * 100
  const displayValue = formatValue ? formatValue(currentValue) : currentValue.toString()

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return null

    const rect = trackRef.current.getBoundingClientRect()
    const newPercentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    let newValue = min + newPercentage * (max - min)
    newValue = Math.round(newValue / step) * step
    newValue = Math.max(min, Math.min(max, newValue))

    return newValue
  }

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    const newValue = calculateValue(e.clientX)
    if (newValue !== null) {
      handleValueChange(newValue)
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    e.preventDefault()
    setIsDragging(true)

    const newValue = calculateValue(e.clientX)
    if (newValue !== null) {
      handleValueChange(newValue)
    }
  }

  React.useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = calculateValue(e.clientX)
      if (newValue !== null) {
        handleValueChange(newValue)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let newValue = currentValue

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, currentValue + step)
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, currentValue - step)
        break
      case 'Home':
        newValue = min
        break
      case 'End':
        newValue = max
        break
      default:
        return
    }

    e.preventDefault()
    handleValueChange(newValue)
  }

  return (
    <div className={cn('grid gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-[color:var(--text-muted)] tabular-nums">{displayValue}</span>
          )}
        </div>
      )}
      <div className="relative h-6 w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          onKeyDown={handleKeyDown}
          className="pointer-events-none absolute h-full w-full appearance-none opacity-0"
          aria-label={label}
        />
        <div
          ref={trackRef}
          className={cn(
            'absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 cursor-pointer rounded-full bg-[var(--surface-raised)]',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          onClick={handleTrackClick}
          onMouseDown={handleMouseDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          tabIndex={disabled ? undefined : 0}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[var(--accent-line)]"
            style={{ width: `${percentage}%` }}
          />
          <div
            className={cn(
              'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[var(--accent-line)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]',
              isDragging ? 'scale-110' : 'hover:scale-105',
            )}
            style={{ left: `calc(${percentage}% - 8px)` }}
          />
        </div>
      </div>
      {description && (
        <span className="text-sm text-[color:var(--text-muted)]">{description}</span>
      )}
    </div>
  )
}

function SliderRoot({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('grid gap-2', className)} {...props}>
      {children}
    </div>
  )
}

function SliderLabel({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm font-medium text-[color:var(--text-main)]', className)} {...props}>
      {children}
    </span>
  )
}

function SliderValue({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-sm text-[color:var(--text-muted)] tabular-nums', className)} {...props}>
      {children}
    </span>
  )
}

function SliderTrack({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('relative h-2 w-full rounded-full bg-[var(--surface-raised)]', className)} {...props}>
      {children}
    </div>
  )
}

function SliderThumb({
  value,
  min,
  max,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { value: number; min: number; max: number }) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      className={cn(
        'pointer-events-none absolute h-4 w-4 -translate-y-1/2 appearance-none rounded-full border-2 border-[var(--accent-line)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]',
        '[-webkit-appearance:none] [-moz-appearance:none]',
        className,
      )}
      style={{ left: `calc(${percentage}% - 8px)` }}
      {...props}
    />
  )
}

type SliderComponent = typeof SliderBase & {
  Root: typeof SliderRoot
  Label: typeof SliderLabel
  Value: typeof SliderValue
  Track: typeof SliderTrack
  Thumb: typeof SliderThumb
}

export const Slider = Object.assign(SliderBase, {
  Root: SliderRoot,
  Label: SliderLabel,
  Value: SliderValue,
  Track: SliderTrack,
  Thumb: SliderThumb,
}) as SliderComponent
