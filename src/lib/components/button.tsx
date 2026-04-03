import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white shadow-[0_18px_36px_var(--accent-shadow)]',
  secondary:
    'border border-[color:var(--button-secondary-border)] bg-[var(--button-secondary-bg)] text-[color:var(--button-secondary-text)]',
}

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-w-[132px] items-center justify-center gap-1.5 rounded-[8px] px-3 py-2 text-[0.78rem] font-medium transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60',
        variantClassName[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
