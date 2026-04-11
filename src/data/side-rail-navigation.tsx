import { BookOpen, Home, Layers, ListFilter } from 'lucide-react'

import type { Language } from '../i18n'
import { localeStrings } from '../i18n'
import type { ComponentDoc, DocPage } from '../types/docs'
import type { SideRailItem } from '../types/navigation'

type PageView = 'landing' | 'docs' | 'components'

export function createSideRailItems(
  language: Language,
  page: PageView,
  docPageId: string | null,
  componentId: string | null,
  docPages: DocPage[],
  docs: ComponentDoc[],
  navigate: (href: string) => void,
): SideRailItem[] {
  const strings = localeStrings[language]
  const isPt = language === 'pt'
  const inputDocIds = new Set(['input', 'checkbox', 'select', 'textarea', 'switch', 'input-date', 'input-time', 'input-number'])
  const inputDocs = docs.filter((doc) => inputDocIds.has(doc.id))
  const otherDocs = docs.filter((doc) => !inputDocIds.has(doc.id))

  const componentItems = [
    {
      id: 'components-inputs',
      title: isPt ? 'Inputs' : 'Inputs',
      description: isPt ? 'Email, checkbox, select, textarea, switch, data, hora e numero.' : 'Email, checkbox, select, textarea, switch, date, time and number.',
      icon: <ListFilter className="h-4 w-4" strokeWidth={1.8} />,
      href: '#components/inputs',
      urlText: 'components/inputs',
      isActive: componentId === 'inputs' || (componentId ? inputDocIds.has(componentId) : false),
      onClick: () => navigate('#components/inputs'),
      items: inputDocs.map((doc) => ({
        id: doc.id,
        title: doc.name,
        description: doc.description,
        icon: doc.icon,
        href: `#components/${doc.id}`,
        urlText: `components/${doc.id}`,
        isActive: componentId === doc.id,
        onClick: () => navigate(`#components/${doc.id}`),
      })),
    },
    ...otherDocs.map((doc) => ({
      id: doc.id,
      title: doc.name,
      description: doc.description,
      icon: doc.icon,
      href: `#components/${doc.id}`,
      urlText: `components/${doc.id}`,
      isActive: componentId === doc.id,
      onClick: () => navigate(`#components/${doc.id}`),
    })),
  ]

  return [
    {
      id: 'landing',
      title: strings.nav.landing.title,
      description: strings.nav.landing.description,
      href: '#landing',
      urlText: 'landing',
      icon: <Home className="h-5 w-5" strokeWidth={1.8} />,
      isActive: page === 'landing',
      onClick: () => navigate('#landing'),
    },
    {
      id: 'docs',
      title: strings.nav.docs.title,
      description: strings.nav.docs.description,
      href: '#docs',
      urlText: 'docs',
      icon: <BookOpen className="h-5 w-5" strokeWidth={1.8} />,
      isActive: page === 'docs',
      onClick: () => navigate('#docs'),
      items: docPages.map((docPage) => ({
        id: docPage.id,
        title: docPage.title,
        description: docPage.description,
        icon: docPage.icon,
        href: docPage.href,
        urlText: docPage.urlText,
        isActive: docPageId === docPage.id,
        onClick: () => navigate(docPage.href),
      })),
    },
    {
      id: 'components',
      title: strings.nav.components.title,
      description: strings.nav.components.description,
      href: '#components',
      urlText: 'components',
      icon: <Layers className="h-5 w-5" strokeWidth={1.8} />,
      isActive: page === 'components',
      onClick: () => navigate('#components'),
      items: componentItems,
    },
  ]
}
