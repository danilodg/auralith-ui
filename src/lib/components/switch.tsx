import * as React from 'react'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, disabled, checked, defaultChecked, onCheckedChange, onChange, label, description, ...props }, ref) => {
    
    // Support uncontrolled or controlled usage implicitly via native props
    // We are wrapping it visually
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label className={`group inline-flex items-start gap-4 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className || ''}`}>
        <div className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-colors duration-200 ease-in-out focus-within:ring-2 focus-within:ring-[color:var(--accent-line)] focus-within:ring-offset-2 focus-within:ring-offset-[color:var(--page-bg)]">
          <input
            type="checkbox"
            className="peer sr-only"
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            ref={ref}
            {...props}
          />
          {/* Track */}
          <div className="absolute inset-0 rounded-full border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.3)] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] transition-colors duration-300 peer-checked:bg-[color:var(--accent-line)] peer-checked:border-[color:var(--accent-line)] peer-checked:shadow-[0_0_12px_rgba(111,224,255,0.4)]" />
          
          {/* Thumb */}
          <div className="relative inline-block h-5 w-5 transform rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-x-0.5 peer-checked:translate-x-[1.35rem]" />
        </div>
        
        {(label || description) && (
          <div className="flex flex-col gap-1 -mt-0.5">
            {label && <span className="font-medium text-[0.95rem] tracking-[-0.01em] text-[color:var(--text-main)] group-hover:text-white transition-colors">{label}</span>}
            {description && <span className="text-[0.85rem] text-[color:var(--text-muted)] leading-relaxed">{description}</span>}
          </div>
        )}
      </label>
    )
  }
)
Switch.displayName = 'Switch'
