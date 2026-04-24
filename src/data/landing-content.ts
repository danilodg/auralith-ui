import { Blocks, Layers3, SwatchBook } from 'lucide-react'

import type { Language } from '../i18n'

export function createLandingContent(language: Language) {
  const isPt = language === 'pt'

  return {
    metrics: [
      { value: '49', label: isPt ? 'componentes documentados' : 'documented components' },
      { value: '7', label: isPt ? 'categorias de interface' : 'interface categories' },
      { value: 'v0.1.8', label: isPt ? 'release ativa' : 'active release' },
    ] as const,
    releaseHighlights: [
      {
        id: 'alert-dialog',
        title: isPt ? 'AlertDialog novo' : 'New AlertDialog',
        description: isPt
          ? 'Confirmacoes criticas com acao de risco e hierarquia clara de decisao.'
          : 'Critical confirmations with risk action and clear decision hierarchy.',
      },
      {
        id: 'separator',
        title: isPt ? 'Separator para ritmo visual' : 'Separator for visual rhythm',
        description: isPt
          ? 'Divisor em degradê para separar blocos sem pesar no layout.'
          : 'Gradient divider to split blocks without heavy visual weight.',
      },
      {
        id: 'modal',
        title: isPt ? 'Overlays com leitura melhor' : 'Overlays with better readability',
        description: isPt
          ? 'Modal, Sheet, Dropdown e Context com fundo fixo e contraste consistente.'
          : 'Modal, Sheet, Dropdown, and Context menus with fixed background and consistent contrast.',
      },
      {
        id: 'components',
        title: isPt ? 'Docs mais objetivas' : 'Sharper docs flow',
        description: isPt
          ? 'Documentacao reorganizada para acelerar descoberta e implementacao.'
          : 'Reorganized docs to speed up discovery and implementation.',
      },
    ] as const,
    compositionSection: {
      eyebrow: isPt ? 'Composicao orientada a produto' : 'Product-oriented composition',
      title: isPt
        ? 'Combine blocos pequenos para montar fluxos complexos com consistencia'
        : 'Combine small blocks to build complex flows with consistency',
      description: isPt
        ? 'A composicao reduz retrabalho: cada parte tem papel claro, contrato tipado e estilo previsivel.'
        : 'Composition cuts rework: each part has a clear role, typed contract, and predictable styling.',
      examples: [
        {
          title: 'FormField + Input + FormMessage',
          useCase: isPt ? 'Cadastro e formulários com validação clara' : 'Signup and forms with clear validation',
          stack: ['React', 'TypeScript', 'Tokens'],
        },
        {
          title: 'AlertDialog + Button + Modal',
          useCase: isPt ? 'Ações críticas com confirmação segura' : 'Critical actions with safe confirmation',
          stack: ['React', 'Tailwind v4', 'Overlay patterns'],
        },
        {
          title: 'Card + SectionHeader + Separator + Tag',
          useCase: isPt ? 'Blocos editoriais para dashboard e landing' : 'Editorial blocks for dashboards and landing pages',
          stack: ['Design tokens', 'Composable API', 'Consistent spacing'],
        },
      ],
    } as const,
    technicalSection: {
      eyebrow: isPt ? 'Base técnica que acelera produto' : 'Technical foundation that accelerates product',
      title: isPt
        ? 'Tecnologias escolhidas pelo impacto em consistência e manutenção'
        : 'Technologies selected for consistency and maintainability impact',
      description: isPt
        ? 'Não é apenas stack: cada decisão reduz retrabalho entre squads e deixa o design system mais previsível.'
        : 'Not just stack: each decision reduces cross-team rework and keeps the design system predictable.',
      technologies: [
        {
          name: 'React 19',
          reason: isPt ? 'Composição declarativa e API madura para interfaces complexas.' : 'Declarative composition and mature API for complex interfaces.',
          impact: isPt ? 'Fluxos previsíveis e fácil reaproveitamento.' : 'Predictable flows and easy reuse.',
        },
        {
          name: 'TypeScript',
          reason: isPt ? 'Contratos explícitos entre componentes compostos.' : 'Explicit contracts across composed components.',
          impact: isPt ? 'Menos regressões em evolução de API.' : 'Fewer regressions while evolving APIs.',
        },
        {
          name: 'Tailwind v4 + tokens',
          reason: isPt ? 'Sistema visual centralizado em variáveis e utilitários.' : 'Visual system centralized with variables and utilities.',
          impact: isPt ? 'Consistência visual com menor custo de manutenção.' : 'Visual consistency with lower maintenance cost.',
        },
        {
          name: 'Vite 8',
          reason: isPt ? 'Build rápido e feedback curto no ciclo de UI.' : 'Fast builds and short UI feedback loop.',
          impact: isPt ? 'Mais iteração por sprint.' : 'More iteration per sprint.',
        },
      ],
      scopeEyebrow: isPt ? 'Escopo por categoria' : 'Scope by category',
      scopeDescription: isPt
        ? 'Cobertura distribuída por formulário, overlay, feedback, navegação e dados.'
        : 'Coverage distributed across form, overlay, feedback, navigation, and data.',
      categories: [
        'Form',
        'Overlay',
        'Feedback',
        'Navigation',
        'Data',
        'Typography',
        'Surface',
      ],
      dependencyLabel: isPt ? 'dependências core da UI' : 'core UI dependencies',
      dependencyCount: '5',
      openAllLabel: isPt ? 'Ver todos os componentes' : 'Browse all components',
    } as const,
    pillars: [
      {
        icon: SwatchBook,
        title: isPt ? 'Tokens consistentes' : 'Consistent tokens',
        description: isPt
          ? 'Cor, tipografia, blur, sombra e radius partem da mesma assinatura visual.'
          : 'Color, typography, blur, shadow and radius all come from the same visual signature.',
      },
      {
        icon: Blocks,
        title: isPt ? 'Primitives reutilizaveis' : 'Reusable primitives',
        description: isPt
          ? 'Botoes, surfaces, fields e labels preparados para varios contextos.'
          : 'Buttons, surfaces, fields and labels prepared for multiple contexts.',
      },
      {
        icon: Layers3,
        title: isPt ? 'Patterns prontos' : 'Ready patterns',
        description: isPt
          ? 'Project cards, blocos editoriais e estruturas de docs aceleram a composicao.'
          : 'Project cards, editorial blocks, and docs-ready structures speed up composition.',
      },
    ] as const,
    recommendedSetup: {
      eyebrow: isPt ? 'Recomendado' : 'Recommended',
      title: isPt ? 'Setup rapido para projetos SaaS' : 'Fast setup for SaaS projects',
      description: isPt
        ? 'Gere um projeto pronto para producao com React 19, Vite, Tailwind v4 e Auralith UI integrada desde o primeiro commit.'
        : 'Generate a production-ready project with React 19, Vite, Tailwind v4, and Auralith UI integrated from the first commit.',
      badges: ['auralith-stack'],
      featureCards: [
        {
          title: isPt ? 'Templates Premium' : 'Premium templates',
          description: isPt ? 'Landing e Dashboard integrados.' : 'Integrated Landing and Dashboard.',
        },
        {
          title: 'Zero Config',
          description: isPt ? 'Tokens, tema e base prontos.' : 'Tokens, theme, and base ready.',
        },
      ],
      commandLabels: {
        landing: isPt ? 'Criar landing' : 'Create landing',
        dashboard: isPt ? 'Criar dashboard' : 'Create dashboard',
      },
      commands: {
        landing: 'npx create-auralith-app my-app --template landing',
        dashboard: 'npx create-auralith-app my-app --template dashboard',
      },
      repositoryLabel: isPt ? 'Repositorio:' : 'Repository:',
      repositoryUrl: 'https://github.com/danilodg/auralith-stack',
      repositoryText: 'github.com/danilodg/auralith-stack',
    } as const,
  }
}
