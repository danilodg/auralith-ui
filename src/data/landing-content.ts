import { Blocks, Layers3, SwatchBook } from 'lucide-react'

import type { Language } from '../i18n'

export function createLandingContent(language: Language) {
  const isPt = language === 'pt'

  return {
    metrics: [
      { value: '10', label: isPt ? 'componentes iniciais' : 'initial components' },
      { value: '3', label: isPt ? 'camadas do sistema' : 'system layers' },
      { value: '2', label: isPt ? 'telas de showcase' : 'showcase screens' },
    ] as const,
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
          ? 'Auth shell, project cards e blocos editoriais aceleram a composicao.'
          : 'Auth shell, project cards and editorial blocks speed up composition.',
      },
    ] as const,
    componentNames: ['Button', 'GlassPanel', 'SectionLabel', 'Tag', 'Input', 'Textarea', 'Card', 'Modal', 'DropdownMenu', 'Tooltip'] as const,
    stackItems: ['react 19', 'typescript', 'vite 8', 'tailwind v4', 'lucide react'] as const,
  }
}
