/* eslint-disable react-refresh/only-export-components */

import { Children, isValidElement, useMemo } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'

import { cn } from '../utils/cn'

export interface StepperItemProps {
  description?: string
  label: string
  value: string
}

export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children?: ReactNode
  currentStep: string
  onStepChange?: (value: string) => void
}

function StepperItem(_props: StepperItemProps) {
  return null
}

function parseItems(children: ReactNode) {
  const items: StepperItemProps[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== StepperItem) return
    items.push(child.props as StepperItemProps)
  })

  return items
}

function StepperBase({ children, className, currentStep, onStepChange, ...props }: StepperProps) {
  const items = useMemo(() => parseItems(children), [children])
  const activeIndex = Math.max(items.findIndex((item) => item.value === currentStep), 0)

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      <ol className="grid gap-2 sm:grid-cols-3 sm:gap-3">
        {items.map((item, index) => {
          const isCompleted = index < activeIndex
          const isActive = index === activeIndex

          return (
            <li key={item.value}>
              <button
                className={cn(
                  'w-full rounded-[8px] border px-3 py-2 text-left transition',
                  isActive ? 'border-[rgba(111,224,255,0.38)] bg-[rgba(111,224,255,0.1)]' : '',
                  isCompleted ? 'border-[rgba(121,242,192,0.35)] bg-[rgba(121,242,192,0.07)]' : '',
                  !isCompleted && !isActive ? 'border-[color:var(--card-border)] bg-[color:var(--surface-soft)]' : '',
                )}
                onClick={() => onStepChange?.(item.value)}
                type="button"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex h-5 w-5 items-center justify-center rounded-full border text-[0.68rem] font-semibold',
                      isActive ? 'border-[rgba(111,224,255,0.5)] text-[color:var(--accent-soft)]' : '',
                      isCompleted ? 'border-[rgba(121,242,192,0.6)] text-[#79f2c0]' : '',
                      !isCompleted && !isActive ? 'border-[color:var(--card-border)] text-[color:var(--text-muted)]' : '',
                    )}
                  >
                    {isCompleted ? <Check size={12} /> : index + 1}
                  </span>
                  <span className={cn('text-[0.82rem] font-medium', isActive ? 'text-[color:var(--text-main)]' : 'text-[color:var(--text-soft)]')}>
                    {item.label}
                  </span>
                </span>
                {item.description ? <span className="mt-1.5 block pl-7 text-[0.74rem] leading-5 text-[color:var(--text-muted)]">{item.description}</span> : null}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

type StepperComponent = typeof StepperBase & {
  Item: typeof StepperItem
}

export const Stepper = Object.assign(StepperBase, {
  Item: StepperItem,
}) as StepperComponent
