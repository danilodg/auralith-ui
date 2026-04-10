import * as React from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'

export type ToastVariant = 'default' | 'success' | 'error' | 'info'
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ToastProps {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  position?: ToastPosition
  duration?: number
  onClose: (id: string) => void
}

type ToastItem = ToastProps & {
  createdAt: number
}

const TOAST_POSITIONS: ToastPosition[] = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']

const variantStyles: Record<ToastVariant, string> = {
  default: 'shadow-[0_0_20px_rgba(15,23,42,0.35)]',
  success: 'shadow-[0_0_20px_rgba(34,197,94,0.16)]',
  error: 'shadow-[0_0_20px_rgba(239,68,68,0.16)]',
  info: 'shadow-[0_0_20px_rgba(59,130,246,0.16)]',
}

const variantBorderColor: Record<ToastVariant, string> = {
  default: 'rgba(148, 163, 184, 0.52)',
  success: 'rgba(34, 197, 94, 0.65)',
  error: 'rgba(239, 68, 68, 0.68)',
  info: 'rgba(59, 130, 246, 0.68)',
}

const variantStackBorderColor: Record<ToastVariant, string> = {
  default: 'rgba(148, 163, 184, 0.4)',
  success: 'rgba(34, 197, 94, 0.5)',
  error: 'rgba(239, 68, 68, 0.5)',
  info: 'rgba(59, 130, 246, 0.5)',
}

const variantIcons = {
  default: null,
  success: <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={18} />,
  error: <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={18} />,
  info: <Info className="text-blue-400 mt-0.5 shrink-0" size={18} />,
}

const enterAnimationByPosition: Record<ToastPosition, string> = {
  'top-left': 'animate-in fade-in slide-in-from-top-6 zoom-in-95',
  'top-center': 'animate-in fade-in slide-in-from-top-6 zoom-in-95',
  'top-right': 'animate-in fade-in slide-in-from-top-6 zoom-in-95',
  'bottom-left': 'animate-in fade-in slide-in-from-bottom-6 zoom-in-95',
  'bottom-center': 'animate-in fade-in slide-in-from-bottom-6 zoom-in-95',
  'bottom-right': 'animate-in fade-in slide-in-from-bottom-6 zoom-in-95',
}

const exitAnimationByPosition: Record<ToastPosition, string> = {
  'top-left': 'animate-out fade-out slide-out-to-top-4 zoom-out-95',
  'top-center': 'animate-out fade-out slide-out-to-top-4 zoom-out-95',
  'top-right': 'animate-out fade-out slide-out-to-top-4 zoom-out-95',
  'bottom-left': 'animate-out fade-out slide-out-to-bottom-4 zoom-out-95',
  'bottom-center': 'animate-out fade-out slide-out-to-bottom-4 zoom-out-95',
  'bottom-right': 'animate-out fade-out slide-out-to-bottom-4 zoom-out-95',
}

const containerClassesByPosition: Record<ToastPosition, string> = {
  'top-left': 'top-0 left-0 sm:top-4 sm:left-4 items-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 sm:top-4 items-center',
  'top-right': 'top-0 right-0 sm:top-4 sm:right-4 items-end',
  'bottom-left': 'bottom-0 left-0 sm:bottom-4 sm:left-4 items-start',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 sm:bottom-4 items-center',
  'bottom-right': 'bottom-0 right-0 sm:bottom-4 sm:right-4 items-end',
}

function isTopPosition(position: ToastPosition) {
  return position.startsWith('top')
}

export function Toast({ id, title, description, variant = 'default', position = 'bottom-right', duration = 5000, onClose, paused = false, renderOnlyTimer = false, immediate = false, promotedFromStack = false }: ToastProps & { paused?: boolean; renderOnlyTimer?: boolean; immediate?: boolean; promotedFromStack?: boolean }) {
  const [isClosing, setIsClosing] = React.useState(false)
  const [promotionReady, setPromotionReady] = React.useState(!promotedFromStack)

  const handleClose = React.useCallback(() => {
    setIsClosing(true)
    setTimeout(() => onClose(id), 300) // matches animation duration
  }, [id, onClose])

  React.useEffect(() => {
    if (paused || isClosing) {
      return
    }

    if (duration > 0) {
      const timer = setTimeout(handleClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, handleClose, isClosing, paused])

  React.useEffect(() => {
    if (!promotedFromStack) {
      setPromotionReady(true)
      return
    }

    setPromotionReady(false)
    const frameId = window.requestAnimationFrame(() => {
      setPromotionReady(true)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [id, promotedFromStack])

  if (renderOnlyTimer) {
    return null
  }

  const icon = variantIcons[variant]

  return (
    <div
      className={`pointer-events-auto relative flex min-h-[60px] w-full max-w-sm items-start gap-4 overflow-hidden rounded-xl border bg-[rgba(7,12,26,0.94)] p-4 shadow-xl backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${variantStyles[variant]} ${
        isClosing ? exitAnimationByPosition[position] : immediate || promotedFromStack ? '' : enterAnimationByPosition[position]
      }`}
      style={{
        backgroundColor: 'var(--toast-bg-solid)',
        borderColor: variantBorderColor[variant],
        opacity: isClosing ? 0 : promotionReady ? 1 : 0.5,
        transform: isClosing
          ? `translateY(${isTopPosition(position) ? '-12px' : '12px'}) scale(0.96)`
          : promotionReady
            ? 'translateY(0px) scale(1)'
            : `translateY(${isTopPosition(position) ? '10px' : '-10px'}) scale(0.97)`,
      }}
      role="alert"
    >
      {icon && <div>{icon}</div>}
      <div className="flex-1 flex flex-col gap-1">
        <p className="font-semibold text-[0.95rem] text-[color:var(--text-main)] shadow-sm">{title}</p>
        {description && <p className="text-[0.88rem] leading-snug text-[color:var(--text-soft)] opacity-95">{description}</p>}
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

export function ToastProvider({ children, position = 'bottom-right' }: { children: React.ReactNode; position?: ToastPosition }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null)
  const [expandedByPosition, setExpandedByPosition] = React.useState<Record<ToastPosition, boolean>>({
    'top-left': false,
    'top-center': false,
    'top-right': false,
    'bottom-left': false,
    'bottom-center': false,
    'bottom-right': false,
  })
  const [promotedByPosition, setPromotedByPosition] = React.useState<Record<ToastPosition, string | null>>({
    'top-left': null,
    'top-center': null,
    'top-right': null,
    'bottom-left': null,
    'bottom-center': null,
    'bottom-right': null,
  })
  const previousFrontRef = React.useRef<Record<ToastPosition, string | null>>({
    'top-left': null,
    'top-center': null,
    'top-right': null,
    'bottom-left': null,
    'bottom-center': null,
    'bottom-right': null,
  })

  React.useEffect(() => {
    setPortalTarget(document.body)
  }, [])

  const addToast = React.useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
    setToasts((prev) => {
      const id = Math.random().toString(36).substring(2, 9)
      return [...prev, { ...props, createdAt: Date.now(), id, onClose: removeToast, position: props.position ?? position }]
    })
  }, [position])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toastsByPosition = React.useMemo(() => {
    return TOAST_POSITIONS.reduce<Record<ToastPosition, ToastItem[]>>((acc, currentPosition) => {
      acc[currentPosition] = toasts.filter((toast) => (toast.position ?? position) === currentPosition)
      return acc
    }, {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    })
  }, [position, toasts])

  React.useEffect(() => {
    const cleanupTimers: number[] = []

    for (const currentPosition of TOAST_POSITIONS) {
      const ordered = [...toastsByPosition[currentPosition]].sort((a, b) => a.createdAt - b.createdAt)
      const currentFrontId = ordered[0]?.id ?? null
      const previousFrontId = previousFrontRef.current[currentPosition]

      if (currentFrontId && previousFrontId && currentFrontId !== previousFrontId) {
        setPromotedByPosition((prev) => ({ ...prev, [currentPosition]: currentFrontId }))

        const timerId = window.setTimeout(() => {
          setPromotedByPosition((prev) => (prev[currentPosition] === currentFrontId ? { ...prev, [currentPosition]: null } : prev))
        }, 320)
        cleanupTimers.push(timerId)
      }

      previousFrontRef.current[currentPosition] = currentFrontId
    }

    return () => {
      cleanupTimers.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [toastsByPosition])

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {portalTarget
        ? createPortal(
            TOAST_POSITIONS.map((currentPosition) => {
              const list = toastsByPosition[currentPosition]
              if (!list.length) {
                return null
              }

              const isExpanded = expandedByPosition[currentPosition]
              const ordered = [...list].sort((a, b) => a.createdAt - b.createdAt)
              const visible = isExpanded ? ordered : ordered.slice(0, 1)
              const hidden = isExpanded ? [] : ordered.slice(1)
              const hiddenCount = hidden.length
              const stackPreviewCount = Math.min(hiddenCount, 3)
              const stackDirection = isTopPosition(currentPosition) ? 1 : -1
              const topToastVariant = visible[0]?.variant ?? 'default'

              return (
                <div
                  className={`pointer-events-none fixed z-[100] flex max-h-screen w-full p-4 sm:w-auto ${containerClassesByPosition[currentPosition]}`}
                  key={currentPosition}
                >
                  <div
                    className="pointer-events-auto flex max-w-sm flex-col gap-3"
                    onMouseEnter={() => setExpandedByPosition((prev) => ({ ...prev, [currentPosition]: true }))}
                    onMouseLeave={() => setExpandedByPosition((prev) => ({ ...prev, [currentPosition]: false }))}
                  >
                    {!isExpanded && visible[0] ? (
                      <div className="relative w-full max-w-sm">
                        {hidden.slice(0, stackPreviewCount).map((stackToast, index) => (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 flex min-h-[60px] w-full max-w-sm items-start gap-4 overflow-hidden rounded-xl border p-4 shadow-xl backdrop-blur-xl transition-all duration-300"
                            key={`stack-${stackToast.id}`}
                            style={{
                              backgroundColor: 'var(--toast-bg-stack)',
                              borderColor: variantStackBorderColor[stackToast.variant ?? topToastVariant],
                              opacity: 1,
                              transform: `translate3d(${(index + 1) * 3}px, ${stackDirection * (index + 1) * 10}px, 0) scale(${1 - (index + 1) * 0.03})`,
                              zIndex: 5 - index,
                            }}
                          >
                            {(stackToast.variant && variantIcons[stackToast.variant]) ? <div>{variantIcons[stackToast.variant]}</div> : null}
                            <div className="flex-1 flex flex-col gap-1">
                              <p className="font-semibold text-[0.95rem] text-[color:var(--text-main)] shadow-sm">{stackToast.title}</p>
                              {stackToast.description ? (
                                <p className="text-[0.88rem] leading-snug text-[color:var(--text-soft)] opacity-95 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                                  {stackToast.description}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ))}
                        <div className="relative z-20">
                          <Toast
                            {...visible[0]}
                            immediate={hiddenCount > 0}
                            paused={false}
                            promotedFromStack={promotedByPosition[currentPosition] === visible[0].id}
                          />
                        </div>
                      </div>
                    ) : null}

                    {isExpanded ? visible.map((toast) => (
                      <Toast key={toast.id} {...toast} paused={true} />
                    )) : null}

                    {!isExpanded ? hidden.map((toast) => (
                      <Toast key={`${toast.id}-timer`} {...toast} paused={false} renderOnlyTimer />
                    )) : null}
                  </div>
                </div>
              )
            }),
            portalTarget,
          )
        : null}
    </ToastContext.Provider>
  )
}
