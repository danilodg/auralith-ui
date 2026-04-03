import { FileText, Home } from 'lucide-react'

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
      icon: <FileText className="h-5 w-5" strokeWidth={1.8} />,
      isActive: page === 'docs',
      onClick: () => navigate('#docs/installation'),
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
      icon: <FileText className="h-5 w-5" strokeWidth={1.8} />,
      isActive: page === 'components',
      onClick: () => navigate('#components/button'),
      items: docs.map((doc) => ({
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
  ]
}
