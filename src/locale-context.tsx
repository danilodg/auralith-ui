/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import type { Language, LocaleStrings } from './i18n'

type LocaleContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  strings: LocaleStrings
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children, value }: { children: ReactNode; value: LocaleContextValue }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider')
  }
  return context
}
