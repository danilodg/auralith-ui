import * as React from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'

export type ToastVariant = 'default' | 'success' | 'error' | 'info'

export interface ToastProps {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  onClose: (id: string) => void
}

const variantStyles: Record<ToastVariant, string> = {
  default: 'border-[color:var(--card-border)] bg-[rgba(0,0,0,0.5)]',
  success: 'border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.05)] shadow-[0_0_20px_rgba(34,197,94,0.1)]',
  error: 'border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.05)] shadow-[0_0_20px_rgba(239,68,68,0.1)]',
  info: 'border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.05)] shadow-[0_0_20px_rgba(59,130,246,0.1)]',
}

const variantIcons = {
  default: null,
  success: <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={18} />,
  error: <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={18} />,
  info: <Info className="text-blue-400 mt-0.5 shrink-0" size={18} />,
}

export function Toast({ id, title, description, variant = 'default', duration = 5000, onClose }: ToastProps) {
  const [isClosing, setIsClosing] = React.useState(false)

  const handleClose = React.useCallback(() => {
    setIsClosing(true)
    setTimeout(() => onClose(id), 300) // matches animation duration
  }, [id, onClose])

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, handleClose])

  const icon = variantIcons[variant]

  return (
    <div
      className={`relative flex w-full max-w-sm items-start gap-4 overflow-hidden rounded-xl border p-4 shadow-xl backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${variantStyles[variant]} ${
        isClosing ? 'animate-out fade-out slide-out-to-right-4 zoom-out-95' : 'animate-in fade-in slide-in-from-right-8 zoom-in-95'
      }`}
      role="alert"
    >
      {icon && <div>{icon}</div>}
      <div className="flex-1 flex flex-col gap-1">
        <p className="font-semibold text-[0.95rem] text-[color:var(--text-main)] shadow-sm">{title}</p>
        {description && <p className="text-[0.88rem] leading-snug text-[color:var(--text-soft)] opacity-90">{description}</p>}
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:bg-[rgba(255,255,255,0.1)] hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-line)]"
      >
        <X size={16} />
      </button>
    </div>
  )
}

// Toast Context & Provider
interface ToastContextValue {
  toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx.toast
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
    setToasts((prev) => {
      const id = Math.random().toString(36).substring(2, 9)
      return [...prev, { ...props, id, onClose: removeToast }]
    })
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-3 p-4 sm:bottom-4 sm:right-4 sm:w-auto sm:flex-col">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
