import { useEffect, useMemo, useRef, useState } from 'react'
import { Languages, MoonStar, Settings2, Sun, User2 } from 'lucide-react'

import { createComponentDocs } from './data/component-docs'
import { createDocsPages } from './data/docs-pages'
import { createSideRailItems } from './data/side-rail-navigation'
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

type ThemeMode = 'dark' | 'light'

const THEME_STORAGE_KEY = 'auralith-ui:theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'

  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return savedTheme === 'light' ? 'light' : 'dark'
  }
  catch {
    return 'dark'
  }
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
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [isSidebarPinned, setIsSidebarPinned] = useState(false)
  const [sidebarOffset, setSidebarOffset] = useState(0)
  const accountMenuRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
    catch {
      // Ignore storage errors
    }
  }, [theme])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!accountMenuRef.current || accountMenuRef.current.contains(event.target as Node)) return
      setAccountMenuOpen(false)
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

        <SideRail
          brandHref="#landing"
          brandSubtitle="premium component library"
          brandTitle="Auralith UI"
          items={sideRailItems}
          onPinnedChange={setIsSidebarPinned}
          onLayoutOffsetChange={setSidebarOffset}
          bottomSlot={
            <GlassPanel className="p-2">
              <div className="relative" ref={accountMenuRef}>
                <div className="flex items-center gap-2 px-1 py-1">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white shadow-[0_0_16px_var(--accent-shadow)]">
                    <User2 size={14} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-[0.72rem] font-semibold tracking-[0.04em] text-[color:var(--text-main)]">
                      {language === 'pt' ? 'Conta' : 'Account'}
                    </strong>
                    <span className="block truncate font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.62rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                      auralith project
                    </span>
                  </span>

                  <button
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.03)] text-[color:var(--text-soft)] transition hover:bg-[rgba(255,255,255,0.05)] hover:text-[color:var(--text-main)]"
                    onClick={() => setAccountMenuOpen((current) => !current)}
                    title={language === 'pt' ? 'Configuracoes' : 'Settings'}
                    type="button"
                  >
                    <Settings2 size={14} />
                  </button>
                </div>

                {accountMenuOpen ? (
                  <div className="absolute bottom-[calc(100%+0.45rem)] right-0 z-[140] w-[220px] rounded-[8px] border border-[color:var(--card-border)] bg-[var(--nav-bg)] p-2 shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[18px]">
                    <p className="px-1 pb-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                      {language === 'pt' ? 'Preferencias' : 'Preferences'}
                    </p>

                    <div className="space-y-2">
                      <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] p-1">
                        <p className="px-1 pb-1 text-[0.64rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                          {language === 'pt' ? 'Tema' : 'Theme'}
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            className={[
                              'inline-flex items-center justify-center gap-1 rounded-[8px] px-2 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] transition',
                              theme === 'dark'
                                ? 'bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white'
                                : 'text-[color:var(--text-soft)] hover:bg-[rgba(255,255,255,0.04)]',
                            ].join(' ')}
                            onClick={() => setTheme('dark')}
                            type="button"
                          >
                            <MoonStar size={12} />
                            {language === 'pt' ? 'Escuro' : 'Dark'}
                          </button>
                          <button
                            className={[
                              'inline-flex items-center justify-center gap-1 rounded-[8px] px-2 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] transition',
                              theme === 'light'
                                ? 'bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white'
                                : 'text-[color:var(--text-soft)] hover:bg-[rgba(255,255,255,0.04)]',
                            ].join(' ')}
                            onClick={() => setTheme('light')}
                            type="button"
                          >
                            <Sun size={12} />
                            {language === 'pt' ? 'Claro' : 'Light'}
                          </button>
                        </div>
                      </div>

                      <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] p-1">
                        <p className="px-1 pb-1 text-[0.64rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                          {language === 'pt' ? 'Idioma' : 'Language'}
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            className={[
                              'inline-flex items-center justify-center gap-1 rounded-[8px] px-2 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] transition',
                              language === 'pt'
                                ? 'bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white'
                                : 'text-[color:var(--text-soft)] hover:bg-[rgba(255,255,255,0.04)]',
                            ].join(' ')}
                            onClick={() => setLanguage('pt')}
                            type="button"
                          >
                            <Languages size={12} />
                            PT
                          </button>
                          <button
                            className={[
                              'inline-flex items-center justify-center gap-1 rounded-[8px] px-2 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] transition',
                              language === 'en'
                                ? 'bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white'
                                : 'text-[color:var(--text-soft)] hover:bg-[rgba(255,255,255,0.04)]',
                            ].join(' ')}
                            onClick={() => setLanguage('en')}
                            type="button"
                          >
                            <Languages size={12} />
                            EN
                          </button>
                        </div>
                      </div>

                      <button
                        className="inline-flex w-full items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.03)] px-2 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[color:var(--text-soft)] transition hover:bg-[rgba(255,255,255,0.05)] hover:text-[color:var(--text-main)]"
                        onClick={() => {
                          navigateToHash('#components/auth-shell')
                          setAccountMenuOpen(false)
                        }}
                        type="button"
                      >
                        {language === 'pt' ? 'Abrir perfil' : 'Open profile'}
                      </button>
                    </div>
                  </div>
                ) : null}
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
