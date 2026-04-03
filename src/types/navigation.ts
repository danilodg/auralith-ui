import type { ReactNode } from 'react'

export type SideRailChildItem = {
  id: string
  title: string
  description: string
  icon?: ReactNode
  href?: string
  urlText?: string
  onClick?: () => void
  isActive?: boolean
  items?: SideRailChildItem[]
}

export type SideRailItem = SideRailChildItem & {
  icon: ReactNode
  items?: SideRailChildItem[]
}
