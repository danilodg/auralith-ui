import type { ReactNode } from 'react'

export type DocPage = {
  id: string
  title: string
  description: string
  href: string
  urlText: string
  icon?: ReactNode
  content: ReactNode
}

export type ComponentDoc = {
  id: string
  name: string
  category: string
  icon?: ReactNode
  description: string
  source: string
  snippet: string
  importCode: string
  href: string
  urlText: string
  preview: ReactNode
  anatomy?: ReadonlyArray<string>
  parts?: ReadonlyArray<{
    name: string
    description: string
  }>
  api?: ReadonlyArray<{
    name: string
    type: string
    description: string
  }>
  notes?: ReadonlyArray<string>
  examples?: ReadonlyArray<{
    title: string
    code: string
  }>
}
