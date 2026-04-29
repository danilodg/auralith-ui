import * as React from 'react'

import type { ToastProps } from './toast'

export interface ToastContextValue {
  toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void
}

export const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = React.useContext(ToastContext)

  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return ctx.toast
}
