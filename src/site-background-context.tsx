/* eslint-disable react-refresh/only-export-components */

import * as React from 'react'

import type { SiteBackgroundSettings } from './features/shared/site-background'

interface SiteBackgroundContextValue {
  settings: SiteBackgroundSettings
  updateSettings: (patch: Partial<SiteBackgroundSettings>) => void
}

const SiteBackgroundContext = React.createContext<SiteBackgroundContextValue | null>(null)

export function SiteBackgroundProvider({ children, value }: { children: React.ReactNode; value: SiteBackgroundContextValue }) {
  return <SiteBackgroundContext.Provider value={value}>{children}</SiteBackgroundContext.Provider>
}

export function useSiteBackground() {
  const context = React.useContext(SiteBackgroundContext)

  if (!context) {
    throw new Error('useSiteBackground must be used within SiteBackgroundProvider')
  }

  return context
}
