import { useEffect, useMemo, useState } from 'react'

import { createComponentDocs } from './data/component-docs'
import { createDocsPages } from './data/docs-pages'
import { createSideRailItems } from './data/side-rail-navigation'
import { LanguageSelect } from './features/shared/language-select'
import { buildLanguageUrl, getInitialLanguage, localeStrings } from './i18n'
import { GlassPanel, SideRail } from './lib'
import { LocaleProvider } from './locale-context'
import { DocsPage } from './pages/docs-page'
import { LandingPage } from './pages/landing-page'

type PageView = 'landing' | 'docs' | 'components'

type AppRoute = {
  page: PageView
  docPageId: string | null
  componentId: string | null
}

function getRouteFromHash(hash: string): AppRoute {
  const normalizedHash = hash.replace(/^#/, '')

  if (normalizedHash.startsWith('docs')) {
    const [, docPageId] = normalizedHash.split('/')

    return {
      page: 'docs',
      docPageId: docPageId ?? 'installation',
      componentId: null,
    }
  }

  if (normalizedHash.startsWith('components')) {
    const [, componentId] = normalizedHash.split('/')

    return {
      page: 'components',
      docPageId: null,
      componentId: componentId ?? 'button',
    }
  }

  return { page: 'landing', docPageId: null, componentId: null }
}

function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash(window.location.hash))
  const [language, setLanguage] = useState(getInitialLanguage)
  const [isSidebarPinned, setIsSidebarPinned] = useState(false)
  const [sidebarOffset, setSidebarOffset] = useState(0)

  const strings = localeStrings[language]
  const docsPages = useMemo(() => createDocsPages(language), [language])
  const componentDocs = useMemo(() => createComponentDocs(language), [language])

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash(window.location.hash))

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    const nextUrl = buildLanguageUrl(language)
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
      window.history.replaceState(null, '', nextUrl)
    }
  }, [language])

  function navigateToHash(nextHash: string) {
    const normalizedHash = nextHash.startsWith('#') ? nextHash : `#${nextHash}`

    if (window.location.hash !== normalizedHash) {
      window.history.replaceState(null, '', normalizedHash)
    }

    setRoute(getRouteFromHash(normalizedHash))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectedDocPage = route.docPageId
    ? docsPages.find((docPage) => docPage.id === route.docPageId) ?? null
    : null

  const selectedDoc = route.componentId
    ? componentDocs.find((doc) => doc.id === route.componentId) ?? null
    : null

  const sideRailItems = useMemo(
    () => createSideRailItems(language, route.page, route.docPageId, route.componentId, docsPages, componentDocs, navigateToHash),
    [componentDocs, docsPages, language, route.componentId, route.docPageId, route.page],
  )

  return (
    <LocaleProvider value={{ language, setLanguage, strings }}>
      <main className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[color:var(--text-main)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(111,224,255,0.22),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(104,126,255,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(139,102,255,0.18),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(126,231,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(126,231,255,0.08)_1px,transparent_1px)] [background-position:center] [background-size:78px_78px]" />

        <div className="fixed right-4 top-4 z-40">
          <LanguageSelect />
        </div>

        <SideRail
          brandHref="#landing"
          brandSubtitle="premium component library"
          brandTitle="Auralith UI"
          items={sideRailItems}
          onPinnedChange={setIsSidebarPinned}
          onLayoutOffsetChange={setSidebarOffset}
          bottomSlot={
            <GlassPanel className="p-2">
              <div className="flex items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] px-2 py-3 text-center shadow-[0_0_20px_var(--accent-shadow)]">
                <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">
                  {componentDocs.length} items
                </span>
              </div>
            </GlassPanel>
          }
        />

        <div className="relative min-h-screen w-full transition-[padding] duration-200" style={{ paddingLeft: isSidebarPinned ? `${sidebarOffset}px` : undefined }}>
          <div className="mx-auto w-full max-w-[1560px] p-2">
            <div className="flex min-h-[calc(100vh-2rem)] flex-col">
              {route.page === 'landing' ? (
                <LandingPage onOpenDocs={() => navigateToHash('#docs/installation')} />
              ) : (
                <DocsPage docs={componentDocs} docPage={selectedDocPage} onBackHome={() => navigateToHash('#landing')} selectedDoc={selectedDoc} />
              )}
            </div>
          </div>
        </div>
      </main>
    </LocaleProvider>
  )
}

export default App
