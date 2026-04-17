export type Language = 'pt' | 'en'

export type LocaleStrings = {
  languageLabel: string
  languageOptions: Record<Language, string>
  nav: {
    landing: { title: string; description: string }
    docs: { title: string; description: string }
    components: { title: string; description: string }
  }
  landing: {
    heroEyebrow: string
    heroTitle: string
    heroDescription: string
    exploreDocs: string
    viewComponents: string
    readFoundations: string
    currentStack: string
    stackDescription: string
    libraryScope: string
    featuredPrimitives: string
    featuredPrimitivesTitle: string
    featuredPrimitivesDescription: string
    workEmail: string
    projectBrief: string
    workEmailHint: string
    projectBriefHint: string
    requestDesignSystem: string
    previewTokens: string
    patternShowcase: string
    projectCardTitle: string
    projectCardDescription: string
    projectCardHighlights: string[]
    openDocs: string
    whyLibrary: string
    whyLibraryTitle: string
    whyLibraryDescription: string
    releaseEyebrow: string
    releaseTitle: string
    releaseDescription: string
    nextStep: string
    nextStepTitle: string
    openDocumentation: string
  }
  docs: {
    heroEyebrow: string
    heroTitle: string
    heroDescription: string
    backToLanding: string
    componentsAvailable: (count: number) => string
    coverage: string
    overviewCards: {
      primitives: { title: string; description: string }
      source: { title: string; description: string }
    }
    docPageEyebrow: string
    componentPageEyebrow: string
    importLabel: string
    basicUsageLabel: string
    snippetLabel: string
    sourceLabel: string
    livePreviewLabel: string
    componentPageHeading: (name: string) => string
  }
}

export const localeStrings: Record<Language, LocaleStrings> = {
  pt: {
    languageLabel: 'Idioma',
    languageOptions: { pt: 'PT', en: 'EN' },
    nav: {
      landing: { title: 'Landing', description: 'Visao geral da biblioteca, showcases e proposta visual.' },
      docs: { title: 'Fundamentos', description: 'Instalacao, uso e fundamentos para aplicar a biblioteca no seu projeto.' },
      components: { title: 'Components', description: 'Catalogo completo dos componentes com preview, exemplos e codigo.' },
    },
    landing: {
      heroEyebrow: 'Design system em evolucao',
      heroTitle: 'Biblioteca React para interfaces de produto consistentes, escalaveis e prontas para entrega.',
      heroDescription:
        'Use componentes reais com tokens, variantes e docs vivas para acelerar squads sem perder identidade visual.',
      exploreDocs: 'Explorar docs',
      viewComponents: 'Ver componentes',
      readFoundations: 'Ler fundamentos',
      currentStack: 'Stack atual',
      stackDescription: 'Base enxuta para evoluir em repositorio proprio, publicar como pacote e reutilizar internamente com consistencia visual.',
      libraryScope: 'Escopo da biblioteca',
      featuredPrimitives: 'Primitives em destaque',
      featuredPrimitivesTitle: 'A base ja cobre CTA, surfaces, campos, overlays e feedbacks na mesma linguagem visual.',
      featuredPrimitivesDescription: 'Os componentes nascem da extracao dos seus projetos e viram base pronta para novas paginas, formularios e fluxos de produto.',
      workEmail: 'Work email',
      projectBrief: 'Resumo do projeto',
      workEmailHint: 'Campo inspirado no contact form da landing.',
      projectBriefHint: 'Pronto para forms de contato, proposta ou onboarding.',
      requestDesignSystem: 'Solicitar design system',
      previewTokens: 'Ver tokens',
      patternShowcase: 'Pattern showcase',
      projectCardTitle: 'Project card para landing pages e grids de portfolio',
      projectCardDescription: 'Resumo editorial, categoria destacada e highlights tecnicos reunidos num bloco reutilizavel para vitrines de produto e cases.',
      projectCardHighlights: ['portfolio', 'services', 'showcase'],
      openDocs: 'Abrir docs',
      whyLibrary: 'Por que a biblioteca',
      whyLibraryTitle: 'Menos retrabalho e mais consistencia entre produtos com a mesma assinatura.',
      whyLibraryDescription: 'Auralith UI conecta identidade visual e implementacao, evitando reescrever glass panels, campos e overlays em cada novo projeto.',
      releaseEyebrow: 'Release highlights',
      releaseTitle: 'Novidades da v0.1.8 para fluxos reais de produto',
      releaseDescription: 'Inclui novos componentes e refinos visuais para overlays, confirmacoes e legibilidade em contexto.',
      nextStep: 'Proximo passo',
      nextStepTitle: 'Acesse a docs para navegar pelos componentes com preview, codigo e referencia de uso.',
      openDocumentation: 'Abrir documentacao',
    },
    docs: {
      heroEyebrow: 'Documentacao',
      heroTitle: 'Uma tela dedicada para navegar pelos componentes atuais da biblioteca.',
      heroDescription: 'Cada bloco mostra categoria, caminho fonte, snippet simples e preview visual para facilitar a extracao e a reutilizacao nos proximos projetos.',
      backToLanding: 'Voltar para landing',
      componentsAvailable: (count) => `${count} componentes disponiveis`,
      coverage: 'Cobertura',
      overviewCards: {
        primitives: { title: 'Primitives + patterns', description: 'A doc mistura base atomica com composicoes mais prontas para produto.' },
        source: { title: 'Source first', description: 'Cada card aponta para o arquivo real da biblioteca para acelerar edicao e evolucao.' },
      },
      docPageEyebrow: 'Pagina de documentacao',
      componentPageEyebrow: 'Pagina do componente',
      importLabel: 'Import',
      basicUsageLabel: 'Uso basico',
      snippetLabel: 'Snippet',
      sourceLabel: 'Source',
      livePreviewLabel: 'Preview ao vivo',
      componentPageHeading: (name) => `${name} exemplos e uso`,
    },
  },
  en: {
    languageLabel: 'Language',
    languageOptions: { pt: 'PT', en: 'EN' },
    nav: {
      landing: { title: 'Landing', description: 'Library overview, showcases and visual direction.' },
      docs: { title: 'Foundations', description: 'Installation, usage and foundations to apply the library in your project.' },
      components: { title: 'Components', description: 'Full component catalog with preview, examples and code.' },
    },
    landing: {
      heroEyebrow: 'Design system in progress',
      heroTitle: 'A React library for consistent, scalable, product-ready interfaces.',
      heroDescription: 'Use real components with tokens, variants, and live docs to ship faster without losing visual identity.',
      exploreDocs: 'Explore docs',
      viewComponents: 'View components',
      readFoundations: 'Read foundations',
      currentStack: 'Current stack',
      stackDescription: 'A lean foundation to evolve in its own repository, publish as a package, and reuse internally with visual consistency.',
      libraryScope: 'Library scope',
      featuredPrimitives: 'Featured primitives',
      featuredPrimitivesTitle: 'The base already covers CTAs, surfaces, fields, overlays, and feedback with one visual language.',
      featuredPrimitivesDescription: 'These components are extracted from your real projects and become a ready base for new pages, forms, and product flows.',
      workEmail: 'Work email',
      projectBrief: 'Project brief',
      workEmailHint: 'Field inspired by the landing contact form.',
      projectBriefHint: 'Ready for contact forms, proposals or onboarding.',
      requestDesignSystem: 'Request design system',
      previewTokens: 'Preview tokens',
      patternShowcase: 'Pattern showcase',
      projectCardTitle: 'Project card for landing pages and portfolio grids',
      projectCardDescription: 'Editorial summary, highlighted category and technical highlights gathered in a reusable block for product showcases and case studies.',
      projectCardHighlights: ['portfolio', 'services', 'showcase'],
      openDocs: 'Open docs',
      whyLibrary: 'Why this library',
      whyLibraryTitle: 'Less rework and more consistency across products with the same signature.',
      whyLibraryDescription: 'Auralith UI bridges visual identity and implementation, avoiding rewrites of glass panels, fields, and overlays in every new project.',
      releaseEyebrow: 'Release highlights',
      releaseTitle: 'What is new in v0.1.8 for real product flows',
      releaseDescription: 'Includes new components and visual refinements for overlays, confirmations, and readability in context.',
      nextStep: 'Next step',
      nextStepTitle: 'Open docs to browse components with preview, code, and usage references.',
      openDocumentation: 'Open documentation',
    },
    docs: {
      heroEyebrow: 'Documentation',
      heroTitle: 'A dedicated screen to browse the current components in the library.',
      heroDescription: 'Each block shows category, source path, simple snippet and live preview to make extraction and reuse easier across upcoming projects.',
      backToLanding: 'Back to landing',
      componentsAvailable: (count) => `${count} components available`,
      coverage: 'Coverage',
      overviewCards: {
        primitives: { title: 'Primitives + patterns', description: 'The docs combine atomic building blocks with more product-ready compositions.' },
        source: { title: 'Source first', description: 'Each card points to the real library file so editing and evolution stay fast.' },
      },
      docPageEyebrow: 'Documentation page',
      componentPageEyebrow: 'Component page',
      importLabel: 'Import',
      basicUsageLabel: 'Basic usage',
      snippetLabel: 'Snippet',
      sourceLabel: 'Source',
      livePreviewLabel: 'Live preview',
      componentPageHeading: (name) => `${name} examples and usage`,
    },
  },
}

export function getLanguageFromUrl(url: URL): Language | null {
  const value = url.searchParams.get('lang')
  return value === 'pt' || value === 'en' ? value : null
}

export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'pt'
  }
  const languageFromUrl = getLanguageFromUrl(new URL(window.location.href))
  if (languageFromUrl) {
    return languageFromUrl
  }
  return window.navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function buildLanguageUrl(language: Language) {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', language)
  return `${url.pathname}${url.search}${url.hash}`
}
