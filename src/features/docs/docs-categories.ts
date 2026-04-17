export const DOC_CATEGORY_ORDER = ['primitive', 'surface', 'form', 'overlay', 'feedback', 'navigation', 'data', 'typography', 'pattern'] as const

const DOC_CATEGORY_META = {
  primitive: {
    en: { label: 'primitive', title: 'Primitives', description: 'Core interactive building blocks and low-level controls.' },
    pt: { label: 'primitivo', title: 'Primitivos', description: 'Blocos essenciais de interacao e controles de base.' },
  },
  surface: {
    en: { label: 'surface', title: 'Layout & Surfaces', description: 'Containers, layout shells, and structural presentation components.' },
    pt: { label: 'superficie', title: 'Layout e Superficies', description: 'Containers, shells de layout e componentes estruturais de apresentacao.' },
  },
  form: {
    en: { label: 'form', title: 'Forms', description: 'Input controls, field structures, and selection patterns.' },
    pt: { label: 'formulario', title: 'Formularios', description: 'Controles de entrada, estrutura de campos e padroes de selecao.' },
  },
  overlay: {
    en: { label: 'overlay', title: 'Overlays & Context', description: 'Contextual layers, dialogs, drawers, and anchored actions.' },
    pt: { label: 'overlay', title: 'Overlays e Contexto', description: 'Camadas contextuais, dialogs, drawers e acoes ancoradas.' },
  },
  feedback: {
    en: { label: 'feedback', title: 'Feedback', description: 'Status communication, loading placeholders, and empty states.' },
    pt: { label: 'feedback', title: 'Feedback', description: 'Comunicacao de estado, placeholders de carregamento e estados vazios.' },
  },
  navigation: {
    en: { label: 'navigation', title: 'Navigation & Flow', description: 'Wayfinding, hierarchy, and route-level flow controls.' },
    pt: { label: 'navegacao', title: 'Navegacao e Fluxo', description: 'Wayfinding, hierarquia e controles de fluxo em nivel de rota.' },
  },
  data: {
    en: { label: 'data', title: 'Data & Tables', description: 'Tabular visualization, search, and data browsing controls.' },
    pt: { label: 'dados', title: 'Dados e Tabelas', description: 'Visualizacao tabular, busca e controles para exploracao de dados.' },
  },
  typography: {
    en: { label: 'typography', title: 'Typography', description: 'Editorial labels and textual support elements.' },
    pt: { label: 'tipografia', title: 'Tipografia', description: 'Labels editoriais e elementos de suporte textual.' },
  },
  pattern: {
    en: { label: 'pattern', title: 'Patterns', description: 'Opinionated higher-level composition patterns.' },
    pt: { label: 'pattern', title: 'Padroes', description: 'Padroes composicionais de nivel mais alto.' },
  },
} as const

const DOC_COMPONENT_ORDER: Record<string, string[]> = {
  primitive: ['button'],
  surface: ['card', 'glass-panel', 'avatar', 'accordion', 'site-background'],
  form: ['form-field', 'input', 'checkbox', 'checkbox-group', 'radio-group', 'select', 'combobox', 'textarea', 'input-date', 'input-time', 'input-number', 'switch', 'toggle-group', 'slider', 'file-upload', 'search-input'],
  overlay: ['tooltip', 'dropdown-menu', 'popover', 'modal', 'alert-dialog', 'sheet', 'context-menu', 'command-palette'],
  feedback: ['alert', 'toast', 'skeleton', 'empty-state', 'progress', 'badge'],
  navigation: ['breadcrumb', 'tabs', 'pagination', 'stepper', 'side-rail', 'navbar'],
  data: ['table-toolbar', 'data-table'],
  typography: ['section-header', 'section-label', 'separator', 'tag', 'code-block'],
}

function getCategoryRank(category: string) {
  const index = DOC_CATEGORY_ORDER.indexOf(category as (typeof DOC_CATEGORY_ORDER)[number])
  return index === -1 ? DOC_CATEGORY_ORDER.length : index
}

export function sortDocCategories(categories: string[]) {
  return [...categories].sort((left, right) => getCategoryRank(left) - getCategoryRank(right) || left.localeCompare(right))
}

function getComponentRank(category: string, id?: string) {
  if (!id) return Number.MAX_SAFE_INTEGER
  const categoryOrder = DOC_COMPONENT_ORDER[category]
  if (!categoryOrder) return Number.MAX_SAFE_INTEGER
  const index = categoryOrder.indexOf(id)
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}

export function sortComponentDocsByCategory<T extends { category: string; name: string; id?: string }>(docs: T[]) {
  return [...docs].sort((left, right) => {
    const categoryDiff = getCategoryRank(left.category) - getCategoryRank(right.category)
    if (categoryDiff !== 0) return categoryDiff

    const componentDiff = getComponentRank(left.category, left.id) - getComponentRank(right.category, right.id)
    if (componentDiff !== 0) return componentDiff

    return left.name.localeCompare(right.name)
  })
}

export function getDocCategoryLabel(category: string, isPt: boolean) {
  const locale = isPt ? 'pt' : 'en'
  return DOC_CATEGORY_META[category as keyof typeof DOC_CATEGORY_META]?.[locale].label ?? category
}

export function getDocCategoryTitle(category: string, isPt: boolean) {
  const locale = isPt ? 'pt' : 'en'
  return DOC_CATEGORY_META[category as keyof typeof DOC_CATEGORY_META]?.[locale].title ?? category
}

export function getDocCategoryDescription(category: string, isPt: boolean) {
  const locale = isPt ? 'pt' : 'en'
  return DOC_CATEGORY_META[category as keyof typeof DOC_CATEGORY_META]?.[locale].description ?? ''
}
