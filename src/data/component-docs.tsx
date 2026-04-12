import {
  BetweenHorizontalStart,
  CalendarDays,
  CaseSensitive,
  CheckSquare,
  Code2,
  ChevronDownSquare,
  Clock3,
  Hash,
  ListFilter,
  Mail,
  MessageSquareQuote,
  MousePointerClick,
  PanelsTopLeft,
  SquareStack,
  Tags,
  TextCursorInput,
  Waypoints,
  Users,
  ToggleLeft,
  Layers,
  Columns,
  Bell,
  Plus,
  Settings2
} from 'lucide-react'

import { Accordion, AccordionItem, Avatar, AvatarGroup, Button, Card, Checkbox, CodeBlock, DateInput, DropdownMenu, GlassPanel, Input, NumberInput, SectionLabel, Select, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Tag, Textarea, TimeInput, ToastProvider, Tooltip } from '../lib'
import { ModalPreview } from '../features/docs/modal-preview'
import { SiteBackgroundPlayground } from '../features/docs/site-background-playground'
import { ToastPreview } from '../features/docs/toast-preview'
import type { Language } from '../i18n'
import type { ComponentDoc } from '../types/docs'

function getStructuredMeta(id: string, isPt: boolean) {
  const map = {
    button: {
      anatomy: isPt ? ['Button'] : ['Button'],
      parts: [
        { name: isPt ? 'variant' : 'variant', description: isPt ? 'Define o estilo visual entre primario e secundario.' : 'Defines the visual style between primary and secondary.' },
        { name: isPt ? 'children' : 'children', description: isPt ? 'Conteudo visivel do botao.' : 'Visible button content.' },
      ],
      notes: isPt ? ['Use para acoes principais e secundarias.', 'A API simples continua sendo a forma recomendada aqui.'] : ['Use for primary and secondary actions.', 'The simple API remains the recommended approach here.'],
    },
    'glass-panel': {
      anatomy: ['GlassPanel.Root', 'GlassPanel.Header', 'GlassPanel.Title', 'GlassPanel.Description'],
      parts: [
        { name: 'GlassPanel.Root', description: isPt ? 'Container principal do painel.' : 'Main panel container.' },
        { name: 'GlassPanel.Header', description: isPt ? 'Agrupa titulo e descricao.' : 'Groups title and description.' },
        { name: 'GlassPanel.Title', description: isPt ? 'Titulo principal do painel.' : 'Primary panel title.' },
        { name: 'GlassPanel.Description', description: isPt ? 'Texto de apoio do painel.' : 'Supporting panel copy.' },
      ],
      notes: isPt ? ['Prefira a API composta para blocos editoriais e hero surfaces.'] : ['Prefer the compositional API for editorial blocks and hero surfaces.'],
    },
    'site-background': {
      anatomy: ['SiteBackground', 'SiteBackgroundPlayground'],
      parts: [
        { name: 'showDiffuse', description: isPt ? 'Liga/desliga os gradientes difusos de cor.' : 'Toggles diffuse color gradients.' },
        { name: 'showGrid', description: isPt ? 'Liga/desliga a grade de linhas da tela.' : 'Toggles the full-page grid lines.' },
        { name: 'intensity', description: isPt ? 'Controla a intensidade visual (`soft`, `medium`, `strong`).' : 'Controls visual strength (`soft`, `medium`, `strong`).' },
        { name: 'gridStyle', description: isPt ? 'Alterna a grade entre `orthogonal` e `diagonal`.' : 'Switches grid style between `orthogonal` and `diagonal`.' },
      ],
      notes: isPt
        ? ['Este componente e de showcase do site e afeta o fundo global em tempo real.', 'As cores base continuam vindo do CSS global (tokens do tema).']
        : ['This is a showcase-site component that affects the global background in real time.', 'Base colors still come from global CSS theme tokens.'],
    },
    'section-label': {
      anatomy: ['SectionLabel'],
      parts: [{ name: 'SectionLabel', description: isPt ? 'Eyebrow tecnico simples.' : 'Simple technical eyebrow.' }],
      notes: isPt ? ['Componente de uso direto, sem necessidade de subpartes.'] : ['Direct-use component, no subparts needed.'],
    },
    tag: {
      anatomy: ['Tag'],
      parts: [{ name: 'Tag', description: isPt ? 'Chip de rotulo curto.' : 'Short label chip.' }],
      notes: isPt ? ['Ideal para stacks, categorias e estados leves.'] : ['Ideal for stacks, categories and lightweight states.'],
    },
    'code-block': {
      anatomy: ['CodeBlock', 'CodeBlock.Root'],
      parts: [
        { name: 'snippets', description: isPt ? 'Lista de linguagens e codigos disponiveis no mesmo bloco.' : 'List of languages and code snippets available in the same block.' },
        { name: 'showToneToggle', description: isPt ? 'Mostra o toggle entre modo colorido e cor unica.' : 'Shows the toggle between colorful and single-color mode.' },
        { name: 'showLanguageTabs', description: isPt ? 'Exibe abas para alternar linguagem.' : 'Shows tabs to switch language.' },
      ],
      notes: isPt ? ['Use `showLanguageTabs={false}` quando houver apenas uma linguagem.'] : ['Use `showLanguageTabs={false}` when only one language is available.'],
    },
    input: {
      anatomy: ['Input.Root', 'Input.Label', 'Input.Field', 'Input.Hint'],
      parts: [
        { name: 'Input.Root', description: isPt ? 'Wrapper do campo.' : 'Field wrapper.' },
        { name: 'Input.Label', description: isPt ? 'Legenda principal do campo.' : 'Primary field label.' },
        { name: 'Input.Field', description: isPt ? 'Input com suporte a icon e adornment.' : 'Input element with icon and adornment support.' },
        { name: 'Input.Hint', description: isPt ? 'Texto de apoio abaixo do campo.' : 'Supporting copy below the field.' },
      ],
      notes: isPt ? ['Use a composicao quando precisar de mais controle de estrutura.'] : ['Use composition when you need more structure control.'],
    },
    'input-date': {
      anatomy: ['DateInput'],
      parts: [
        { name: 'DateInput', description: isPt ? 'Campo customizado para data em formato `YYYY-MM-DD`.' : 'Custom date field using `YYYY-MM-DD` format.' },
      ],
      notes: isPt ? ['Use para datas unicas e mantenha a validacao no submit.'] : ['Use for single dates and keep validation at submit time.'],
    },
    'input-time': {
      anatomy: ['TimeInput'],
      parts: [
        { name: 'TimeInput', description: isPt ? 'Campo customizado para hora em formato `HH:MM`.' : 'Custom time field using `HH:MM` format.' },
      ],
      notes: isPt ? ['Bom para agendas, horarios de atendimento e janelas de disponibilidade.'] : ['Good for schedules, support windows and availability slots.'],
    },
    'input-number': {
      anatomy: ['NumberInput'],
      parts: [
        { name: 'NumberInput', description: isPt ? 'Campo numerico customizado com controles de incremento e decremento.' : 'Custom numeric field with increment and decrement controls.' },
      ],
      notes: isPt ? ['Defina `min`, `max` e `step` para reduzir erros de digitacao.', 'O valor fica alinhado a esquerda e os controles +/- ficam no canto direito.'] : ['Set `min`, `max` and `step` to reduce typing errors.', 'The value is left-aligned and +/- controls stay on the right corner.'],
    },
    checkbox: {
      anatomy: ['Checkbox', 'Checkbox.Item', 'Checkbox.Root', 'Checkbox.Field', 'Checkbox.Label', 'Checkbox.Hint'],
      parts: [
        { name: 'Checkbox', description: isPt ? 'Forma mais simples para adicionar checkbox com label e hint.' : 'Simplest way to add a checkbox with label and hint.' },
        { name: 'Checkbox.Item', description: isPt ? 'Alias composicional para listas e grupos de selecao.' : 'Compositional alias for lists and selection groups.' },
        { name: 'framed', description: isPt ? 'Controla se o item renderiza com borda/fundo (`true`) ou visual limpo (`false`).' : 'Controls whether the item renders with bordered surface (`true`) or clean style (`false`).' },
        { name: 'Checkbox.Field', description: isPt ? 'Controle visual customizado com checkmark e estados de foco/checked.' : 'Custom visual control with checkmark and focus/checked states.' },
      ],
      notes: isPt ? ['Agrupe opcoes relacionadas em coluna para facilitar leitura no mobile.', 'Use `framed={false}` quando nao quiser bloco com borda.'] : ['Group related options in a column for better mobile readability.', 'Use `framed={false}` when you do not want a bordered container.'],
    },
    select: {
      anatomy: ['Select', 'Select.Option'],
      parts: [
        { name: 'Select', description: isPt ? 'Componente principal com props de `label`, `hint` e estado selecionado.' : 'Main component with `label`, `hint`, and selected-state props.' },
        { name: 'Select.Option', description: isPt ? 'Cada item do menu como subcomponente simples.' : 'Each menu item as a simple subcomponent.' },
      ],
      notes: isPt ? ['Prefira opcoes curtas e objetivas para evitar quebra visual.'] : ['Prefer short objective options to avoid visual wrapping.'],
    },
    textarea: {
      anatomy: ['Textarea.Root', 'Textarea.Label', 'Textarea.Field', 'Textarea.Hint', 'Textarea.Footer'],
      parts: [
        { name: 'Textarea.Root', description: isPt ? 'Wrapper do campo multilinha.' : 'Multiline field wrapper.' },
        { name: 'Textarea.Label', description: isPt ? 'Legenda do textarea.' : 'Textarea label.' },
        { name: 'Textarea.Field', description: isPt ? 'Area de texto principal.' : 'Primary textarea element.' },
        { name: 'Textarea.Hint', description: isPt ? 'Texto de ajuda.' : 'Help copy.' },
        { name: 'Textarea.Footer', description: isPt ? 'Area para contadores ou acoes.' : 'Area for counters or actions.' },
      ],
      notes: isPt ? ['Footer e opcional e ajuda em formularios mais ricos.'] : ['Footer is optional and helps with richer forms.'],
    },
    card: {
      anatomy: ['Card.Root', 'Card.Header', 'Card.Title', 'Card.Description', 'Card.Content', 'Card.Footer'],
      parts: [
        { name: 'Card.Root', description: isPt ? 'Container do card.' : 'Card container.' },
        { name: 'Card.Header', description: isPt ? 'Topo para titulo e descricao.' : 'Top area for title and description.' },
        { name: 'Card.Content', description: isPt ? 'Corpo principal do card.' : 'Main card body.' },
        { name: 'Card.Footer', description: isPt ? 'Rodape para acoes e metadados.' : 'Footer for actions and metadata.' },
      ],
      notes: isPt ? ['Use a API composta em blocos mais editoriais.', 'A API simples continua disponivel para casos rapidos.'] : ['Use the compositional API for more editorial layouts.', 'The simple API remains available for quick cases.'],
    },
    modal: {
      anatomy: ['Modal.Root', 'Modal.Trigger', 'Modal.Content', 'Modal.Header', 'Modal.Title', 'Modal.Description', 'Modal.Body', 'Modal.Footer', 'Modal.Close'],
      parts: [
        { name: 'Modal.Root', description: isPt ? 'Controla estado e contexto do dialog.' : 'Controls dialog state and context.' },
        { name: 'Modal.Trigger', description: isPt ? 'Elemento que abre o modal.' : 'Element that opens the modal.' },
        { name: 'Modal.Content', description: isPt ? 'Janela renderizada em portal.' : 'Portal-rendered dialog window.' },
        { name: 'Modal.Close', description: isPt ? 'Fecha o modal dentro da composicao.' : 'Closes the modal inside the composition.' },
      ],
      notes: isPt ? ['Use esse padrao para confirmacao, detalhes e fluxos focados.'] : ['Use this pattern for confirmation, details and focused flows.'],
    },
    'dropdown-menu': {
      anatomy: ['DropdownMenu.Root', 'DropdownMenu.Trigger', 'DropdownMenu.Content', 'DropdownMenu.Item', 'DropdownMenu.Separator'],
      parts: [
        { name: 'DropdownMenu.Root', description: isPt ? 'Controla o estado aberto/fechado.' : 'Controls the open/closed state.' },
        { name: 'DropdownMenu.Trigger', description: isPt ? 'Aciona a abertura do menu.' : 'Triggers the menu opening.' },
        { name: 'DropdownMenu.Item', description: isPt ? 'Acao individual da lista.' : 'Individual list action.' },
      ],
      notes: isPt ? ['Prefira esse componente para acoes curtas e contextuais.'] : ['Prefer this component for short and contextual actions.'],
    },
    tooltip: {
      anatomy: ['Tooltip.Root', 'Tooltip.Trigger', 'Tooltip.Content'],
      parts: [
        { name: 'Tooltip.Root', description: isPt ? 'Controla o estado do tooltip.' : 'Controls tooltip state.' },
        { name: 'Tooltip.Trigger', description: isPt ? 'Elemento alvo do hover/focus.' : 'Hover/focus target element.' },
        { name: 'Tooltip.Content', description: isPt ? 'Conteudo contextual exibido.' : 'Displayed contextual content.' },
      ],
      notes: isPt ? ['Use para ajuda curta e contexto adicional, nao para conteudo longo.'] : ['Use for short help and extra context, not for long content.'],
    },
    'side-rail': {
      anatomy: ['SideRail'],
      parts: [
        { name: 'items', description: isPt ? 'Estrutura principal de navegacao com suporte a niveis.' : 'Main navigation structure with nested levels.' },
        { name: 'bottomSlot', description: isPt ? 'Area opcional para conta, acoes e atalhos.' : 'Optional area for account, actions, and shortcuts.' },
        { name: 'onLayoutOffsetChange', description: isPt ? 'Callback para ajustar o padding do layout principal.' : 'Callback to adjust the main layout padding.' },
      ],
      notes: isPt ? ['Componente de layout raiz: prefira usar no app shell, nao dentro de cards locais.'] : ['Root layout component: prefer using it in the app shell, not inside local cards.'],
    },
    avatar: {
      anatomy: ['Avatar', 'AvatarGroup'],
      parts: [
        { name: 'Avatar', description: isPt ? 'Componente visual para representar perfil.' : 'Visual component to represent profile.' },
        { name: 'AvatarGroup', description: isPt ? 'Empilha multiplos avatares.' : 'Stacks multiple avatars.' },
      ],
      notes: isPt ? ['Inclui suporte nativo a fallback usando as primeiras letras do nome.'] : ['Includes native fallback support using first name letters.'],
    },
    switch: {
      anatomy: ['Switch'],
      parts: [{ name: 'Switch', description: isPt ? 'Interruptor animado de selecao.' : 'Animated selection switch.' }],
      notes: isPt ? ['Utilize para alternar preferencias e configuracoes imediatas.'] : ['Use to toggle preferences and immediate settings.'],
    },
    accordion: {
      anatomy: ['Accordion', 'AccordionItem'],
      parts: [
        { name: 'Accordion', description: isPt ? 'Container do grupo sanfona.' : 'Accordion group container.' },
        { name: 'AccordionItem', description: isPt ? 'Item individual com titulo e subtitulo.' : 'Individual item with title and subtitle.' },
        { name: 'AccordionItem.actions', description: isPt ? 'Slot opcional para botoes de acao ao lado da seta.' : 'Optional slot for action buttons next to the chevron.' },
      ],
      notes: isPt ? ['Suporta multipla expansao (type="multiple") ou unica (type="single").', 'Use `actions` para atalhos como adicionar item, abrir configuracoes ou menu contextual.', 'As acoes ficam alinhadas verticalmente ao lado da seta por padrao.'] : ['Supports multiple expansion (type="multiple") or single (type="single").', 'Use `actions` for shortcuts like add item, settings, or contextual menus.', 'Actions are vertically centered next to the chevron by default.'],
    },
    toast: {
      anatomy: ['ToastProvider', 'useToast', 'Toast'],
      parts: [
        { name: 'ToastProvider', description: isPt ? 'Obrigatorio no topo da aplicacao.' : 'Mandatory at the root of the app.' },
        { name: 'useToast', description: isPt ? 'Hook para disparar notificacoes.' : 'Hook to trigger notifications.' },
      ],
      notes: isPt
        ? ['As notificacoes suportam variantes (success, error, info).', 'Voce pode definir a posicao padrao no ToastProvider e sobrescrever por chamada no toast().']
        : ['Notifications support variants (success, error, info).', 'You can set a default position on ToastProvider and override it per toast() call.'],
    },
    tabs: {
      anatomy: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
      parts: [
        { name: 'Tabs', description: isPt ? 'Controla o estado da selecao de abas.' : 'Controls tab selection state.' },
        { name: 'TabsList', description: isPt ? 'Agrupa os botoes de gatilho.' : 'Groups trigger buttons.' },
      ],
      notes: isPt ? ['Transita perfeitamente as animacoes de entrada de conteudo.', 'Suporta variantes visuais com `variant="solid"` (padrao) e `variant="baseline"`.'] : ['Perfectly transitions content entry animations.', 'Supports visual variants with `variant="solid"` (default) and `variant="baseline"`.'],
    },
  } as const

  return map[id as keyof typeof map] ?? { anatomy: [], parts: [], notes: [] }
}

export function createComponentDocs(language: Language): ComponentDoc[] {
  const isPt = language === 'pt'

  return [
  {
    id: 'button',
    name: 'Button',
    category: 'primitive',
    icon: <MousePointerClick size={16} strokeWidth={1.8} />,
    description: isPt ? 'CTA principal e secundario com pill radius, gradiente e elevacao leve.' : 'Primary and secondary CTA with pill radius, gradient and soft elevation.',
    source: 'src/lib/components/button.tsx',
    importCode: "import { Button } from '@/lib'",
    snippet: isPt ? '<Button>Iniciar fluxo</Button>' : '<Button>Launch flow</Button>',
    href: '#components/button',
    urlText: 'components/button',
    preview: (
      <div className="flex flex-wrap gap-3">
        <Button>{isPt ? 'Iniciar fluxo' : 'Launch flow'}</Button>
        <Button variant="secondary">{isPt ? 'Secundario' : 'Secondary'}</Button>
        <Button disabled>{isPt ? 'Desabilitado' : 'Disabled'}</Button>
        <Button className="w-full sm:w-auto">{isPt ? 'CTA em largura total' : 'Full width CTA'}</Button>
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Botao primario' : 'Primary button',
        code: isPt ? '<Button>Iniciar fluxo</Button>' : '<Button>Launch flow</Button>',
      },
      {
        title: isPt ? 'Botao secundario' : 'Secondary button',
        code: isPt ? '<Button variant="secondary">Secundario</Button>' : '<Button variant="secondary">Secondary</Button>',
      },
      {
        title: isPt ? 'Botao desabilitado' : 'Disabled button',
        code: isPt ? '<Button disabled>Desabilitado</Button>' : '<Button disabled>Disabled</Button>',
      },
    ],
  },
  {
    id: 'glass-panel',
    name: 'GlassPanel',
    category: 'surface',
    icon: <PanelsTopLeft size={16} strokeWidth={1.8} />,
    description: isPt ? 'Painel base com glassmorphism e partes compostas para header, titulo e descricao.' : 'Base panel with glassmorphism and composable parts for header, title and description.',
    source: 'src/lib/components/glass-panel.tsx',
    importCode: "import { GlassPanel } from '@/lib'",
    snippet: isPt ? `<GlassPanel.Root className="p-2">
  <GlassPanel.Header>
    <GlassPanel.Title>Titulo</GlassPanel.Title>
    <GlassPanel.Description>Descricao</GlassPanel.Description>
  </GlassPanel.Header>
</GlassPanel.Root>` : `<GlassPanel.Root className="p-2">
  <GlassPanel.Header>
    <GlassPanel.Title>Title</GlassPanel.Title>
    <GlassPanel.Description>Description</GlassPanel.Description>
  </GlassPanel.Header>
</GlassPanel.Root>`,
    href: '#components/glass-panel',
    urlText: 'components/glass-panel',
    preview: (
      <div className="grid gap-4 w-full max-w-[800px] sm:grid-cols-2">
        <GlassPanel.Root className="p-2">
          <GlassPanel.Header>
            <SectionLabel>{isPt ? 'Preview Default' : 'Default Preview'}</SectionLabel>
            <GlassPanel.Title className="mt-4">{isPt ? 'Bloco premium' : 'Premium block'}</GlassPanel.Title>
            <GlassPanel.Description>
              {isPt ? 'Superficie principal para auth containers e hero cards.' : 'Primary surface for auth containers and hero cards.'}
            </GlassPanel.Description>
          </GlassPanel.Header>
        </GlassPanel.Root>
        <GlassPanel.Root className="p-2 opacity-50">
          <GlassPanel.Header>
            <SectionLabel>{isPt ? 'Estado Inativo' : 'Inactive State'}</SectionLabel>
            <GlassPanel.Title className="mt-4">{isPt ? 'Bloco secundario' : 'Secondary block'}</GlassPanel.Title>
            <GlassPanel.Description>
              {isPt ? 'Pode ser usado com opacidade reduzida para hierarquia.' : 'Can be used with reduced opacity for hierarchy.'}
            </GlassPanel.Description>
          </GlassPanel.Header>
        </GlassPanel.Root>
      </div>
    ),
  },
  {
    id: 'site-background',
    name: 'SiteBackground',
    category: 'surface',
    icon: <Layers size={16} strokeWidth={1.8} />,
    description: isPt ? 'Fundo global fixo com cores difusas e grade opcional para o showcase da aplicacao.' : 'Fixed global background with diffuse colors and optional grid for the showcase app.',
    source: 'src/features/shared/site-background.tsx',
    importCode: "import { SiteBackground } from '@/features/shared/site-background'",
    snippet: isPt ? `<SiteBackground settings={{
  showDiffuse: true,
  showGrid: true,
  intensity: 'medium',
  gridStyle: 'diagonal',
}} />` : `<SiteBackground settings={{
  showDiffuse: true,
  showGrid: true,
  intensity: 'medium',
  gridStyle: 'diagonal',
}} />`,
    href: '#components/site-background',
    urlText: 'components/site-background',
    preview: <SiteBackgroundPlayground />,
    examples: [
      {
        title: isPt ? 'Atualizar fundo global via contexto' : 'Update global background through context',
        code: isPt ? `const { updateSettings } = useSiteBackground()

updateSettings({
  showGrid: true,
  gridStyle: 'diagonal',
  intensity: 'strong',
})` : `const { updateSettings } = useSiteBackground()

updateSettings({
  showGrid: true,
  gridStyle: 'diagonal',
  intensity: 'strong',
})`,
      },
    ],
    api: [
      {
        name: 'showDiffuse',
        type: 'boolean',
        description: isPt ? 'Ativa ou desativa os gradientes difusos de fundo.' : 'Enables or disables diffuse background gradients.',
      },
      {
        name: 'showGrid',
        type: 'boolean',
        description: isPt ? 'Ativa ou desativa a grade de linhas fixa.' : 'Enables or disables the fixed grid lines.',
      },
      {
        name: 'intensity',
        type: "'soft' | 'medium' | 'strong'",
        description: isPt ? 'Define o peso visual da composicao do fundo.' : 'Defines the visual weight of the background composition.',
      },
      {
        name: 'gridStyle',
        type: "'orthogonal' | 'diagonal'",
        description: isPt ? 'Controla o estilo da grade fixa de linhas.' : 'Controls the style of the fixed line grid.',
      },
    ],
  },
  {
    id: 'section-label',
    name: 'SectionLabel',
    category: 'typography',
    icon: <CaseSensitive size={16} strokeWidth={1.8} />,
    description: isPt ? 'Eyebrow tecnico com linha decorativa e tracking alto.' : 'Technical eyebrow with decorative line and high tracking.',
    source: 'src/lib/components/section-label.tsx',
    importCode: "import { SectionLabel } from '@/lib'",
    snippet: isPt ? '<SectionLabel>Direcao do sistema</SectionLabel>' : '<SectionLabel>System direction</SectionLabel>',
    href: '#components/section-label',
    urlText: 'components/section-label',
    preview: <SectionLabel>{isPt ? 'Direcao do sistema' : 'System direction'}</SectionLabel>,
  },
  {
    id: 'tag',
    name: 'Tag',
    category: 'feedback',
    icon: <Tags size={16} strokeWidth={1.8} />,
    description: isPt ? 'Chip tecnico para stacks, categorias e highlights.' : 'Technical chip for stacks, categories and highlights.',
    source: 'src/lib/components/tag.tsx',
    importCode: "import { Tag } from '@/lib'",
    snippet: '<Tag>tailwind v4</Tag>',
    href: '#components/tag',
    urlText: 'components/tag',
    preview: (
      <div className="flex flex-wrap gap-3 max-w-[600px] justify-center">
        <Tag className="bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)] border-[rgba(111,224,255,0.2)]">tailwind v4</Tag>
        <Tag>react 19</Tag>
        <Tag className="bg-[rgba(255,100,100,0.05)] text-red-500 border-[rgba(255,100,100,0.2)]">{isPt ? 'Estado: Erro' : 'State: Error'}</Tag>
        <Tag className="opacity-50">{isPt ? 'Inativo' : 'Inactive'}</Tag>
        <Tag className="bg-[color:var(--surface-hover)] shadow-md">{isPt ? 'ui premium' : 'premium ui'}</Tag>
      </div>
    ),
  },
  {
    id: 'code-block',
    name: 'CodeBlock',
    category: 'typography',
    icon: <Code2 size={16} strokeWidth={1.8} />,
    description: isPt ? 'Bloco de codigo com abas de linguagem e toggle entre modo colorido e cor unica.' : 'Code block with language tabs and toggle between colorful and single-color mode.',
    source: 'src/lib/components/code-block.tsx',
    importCode: "import { CodeBlock } from '@/lib'",
    snippet: isPt ? `<CodeBlock
  snippets={[
    { language: 'tsx', code: '<Button>Salvar</Button>' },
    { language: 'css', code: '.btn { border-radius: 8px; }' },
  ]}
/>` : `<CodeBlock
  snippets={[
    { language: 'tsx', code: '<Button>Save</Button>' },
    { language: 'css', code: '.btn { border-radius: 8px; }' },
  ]}
/>`,
    href: '#components/code-block',
    urlText: 'components/code-block',
    preview: (
      <CodeBlock
        snippets={[
          {
            language: 'tsx',
            code: isPt
              ? `<Card>
  <Input label="Email" />
  <Button>Continuar</Button>
</Card>`
              : `<Card>
  <Input label="Email" />
  <Button>Continue</Button>
</Card>`,
          },
          {
            language: 'css',
            code: `.stack {
  display: grid;
  gap: 8px;
  border-radius: 8px;
}`,
          },
        ]}
      />
    ),
  },
  {
    id: 'input',
    name: 'Input',
    category: 'form',
    icon: <TextCursorInput size={16} strokeWidth={1.8} />,
    description: isPt ? 'Campo com anatomia composta para root, label, field e hint, mantendo suporte a icones.' : 'Field with composable anatomy for root, label, field and hint, keeping icon support.',
    source: 'src/lib/components/input.tsx',
    importCode: "import { Input } from '@/lib'",
    snippet: isPt ? `<Input.Root>
  <Input.Label>Email profissional</Input.Label>
  <Input.Field icon={<Mail />} placeholder="name@company.com" />
  <Input.Hint>Campo principal do formulario.</Input.Hint>
</Input.Root>` : `<Input.Root>
  <Input.Label>Work email</Input.Label>
  <Input.Field icon={<Mail />} placeholder="name@company.com" />
  <Input.Hint>Main form field.</Input.Hint>
</Input.Root>`,
    href: '#components/input',
    urlText: 'components/input',
    preview: (
      <div className="grid gap-6 w-full max-w-[600px] sm:grid-cols-2">
        <Input.Root>
          <Input.Label>{isPt ? 'Email profissional' : 'Work email'}</Input.Label>
          <Input.Field icon={<Mail size={18} />} placeholder="name@company.com" type="email" />
          <Input.Hint>{isPt ? 'Aviso padrão ativo.' : 'Standard hint active.'}</Input.Hint>
        </Input.Root>

        <Input.Root>
          <Input.Label>{isPt ? 'Senha' : 'Password'}</Input.Label>
          <Input.Field placeholder="********" type="password" />
        </Input.Root>

        <Input.Root className="opacity-60 pointer-events-none">
          <Input.Label>{isPt ? 'Campo desabilitado' : 'Disabled field'}</Input.Label>
          <Input.Field placeholder="Desabilitado..." disabled />
        </Input.Root>

        <Input.Root>
          <Input.Label className="text-red-400">{isPt ? 'Erro de validacao' : 'Validation error'}</Input.Label>
          <Input.Field icon={<Mail size={18} className="text-red-400" />} className="border-red-400/50 bg-red-400/5" placeholder="Erro..." />
          <Input.Hint className="text-red-400">{isPt ? 'Obrigatorio.' : 'Required.'}</Input.Hint>
        </Input.Root>
      </div>
    ),
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'form',
    icon: <CheckSquare size={16} strokeWidth={1.8} />,
    description: isPt ? 'Controle booleano compacto para consentimentos, filtros e preferencias.' : 'Compact boolean control for consent, filters and preferences.',
    source: 'src/lib/components/checkbox.tsx',
    importCode: "import { Checkbox } from '@/lib'",
    snippet: isPt ? `<Checkbox
  label="Aceito os termos"
  hint="Voce pode remover esse aceite depois."
  framed={false}
/>` : `<Checkbox
  label="I accept the terms"
  hint="You can remove this consent later."
  framed={false}
/>`,
    href: '#components/checkbox',
    urlText: 'components/checkbox',
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-[400px]">
        <Checkbox 
          label={isPt ? 'Aceito os termos' : 'I accept the terms'} 
          hint={isPt ? 'Consentimento obrigatorio para continuar.' : 'Required consent to continue.'} 
          defaultChecked 
        />
        <Checkbox.Item 
          framed={false} 
          label={isPt ? 'Quero receber e-mails' : 'Send me tracking emails'} 
        />
        <div className="opacity-50 pointer-events-none">
          <Checkbox 
            label={isPt ? 'Acao desabilitada' : 'Disabled action'} 
            hint={isPt ? 'Opcao fora de acesso' : 'Option out of reach'}
          />
        </div>
      </div>
    ),
  },
  {
    id: 'select',
    name: 'Select',
    category: 'form',
    icon: <ListFilter size={16} strokeWidth={1.8} />,
    description: isPt ? 'Campo de selecao para opcoes fechadas com gatilho compacto.' : 'Selection field for closed options with a compact trigger.',
    source: 'src/lib/components/select.tsx',
    importCode: "import { Select } from '@/lib'",
    snippet: isPt ? `<Select label="Prioridade" hint="Use para listas curtas." defaultValue="medium">
    <Select.Option value="low" label="Baixa" />
    <Select.Option value="medium" label="Media" />
    <Select.Option value="high" label="Alta" />
</Select>` : `<Select label="Priority" hint="Use for short lists." defaultValue="medium">
    <Select.Option value="low" label="Low" />
    <Select.Option value="medium" label="Medium" />
    <Select.Option value="high" label="High" />
</Select>`,
    href: '#components/select',
    urlText: 'components/select',
    preview: (
      <div className="grid gap-6 w-full max-w-[600px] sm:grid-cols-2 items-start">
        <Select
          defaultValue="medium"
          hint={isPt ? 'Estado default (Medium).' : 'Default status (Medium).'}
          label={isPt ? 'Prioridade Ativa' : 'Active Priority'}
        >
          <Select.Option label={isPt ? 'Baixa' : 'Low'} value="low" />
          <Select.Option label={isPt ? 'Media' : 'Medium'} value="medium" />
          <Select.Option label={isPt ? 'Alta' : 'High'} value="high" />
        </Select>

        <Select
          defaultValue="low"
          label={isPt ? 'Outro Exemplo' : 'Another Example'}
        >
          <Select.Option label={isPt ? 'Baixa' : 'Low'} value="low" />
        </Select>
      </div>
    ),
  },
  {
    id: 'input-date',
    name: isPt ? 'Input Date' : 'Input Date',
    category: 'form',
    icon: <CalendarDays size={16} strokeWidth={1.8} />,
    description: isPt ? 'Campo de data customizado com calendario, presets e modo range.' : 'Custom date field with calendar, presets and range mode.',
    source: 'src/lib/components/date-input.tsx',
    importCode: "import { DateInput } from '@/lib'",
    snippet: isPt ? `<DateInput label="Data" />
<DateInput label="Periodo" mode="range" />` : `<DateInput label="Date" />
<DateInput label="Range" mode="range" />`,
    href: '#components/input-date',
    urlText: 'components/input-date',
    preview: (
      <div className="grid gap-2">
        <DateInput
          hint={isPt ? 'Inclui atalhos: hoje, amanha, ontem e anteontem.' : 'Includes shortcuts: today, tomorrow, yesterday and day before yesterday.'}
          label={isPt ? 'Data de entrega' : 'Delivery date'}
        />
        <DateInput
          hint={isPt ? 'Modo range abre dois calendarios lado a lado no desktop.' : 'Range mode opens two calendars side by side on desktop.'}
          label={isPt ? 'Periodo de analise' : 'Analysis range'}
          mode="range"
        />
      </div>
    ),
  },
  {
    id: 'input-time',
    name: isPt ? 'Input Time' : 'Input Time',
    category: 'form',
    icon: <Clock3 size={16} strokeWidth={1.8} />,
    description: isPt ? 'Campo de hora customizado, sem seletor nativo do browser.' : 'Custom time field without the browser native picker.',
    source: 'src/lib/components/time-input.tsx',
    importCode: "import { TimeInput } from '@/lib'",
    snippet: isPt ? '<TimeInput label="Horario" />' : '<TimeInput label="Time" />',
    href: '#components/input-time',
    urlText: 'components/input-time',
    preview: (
      <TimeInput
        hint={isPt ? 'Ideal para agendas e janelas de atendimento.' : 'Ideal for schedules and support windows.'}
        label={isPt ? 'Horario da reuniao' : 'Meeting time'}
      />
    ),
  },
  {
    id: 'input-number',
    name: isPt ? 'Input Number' : 'Input Number',
    category: 'form',
    icon: <Hash size={16} strokeWidth={1.8} />,
    description: isPt ? 'Campo numerico customizado com controles de + e -.' : 'Custom numeric field with + and - controls.',
    source: 'src/lib/components/number-input.tsx',
    importCode: "import { NumberInput } from '@/lib'",
    snippet: isPt ? '<NumberInput label="Quantidade" min={1} step={1} />' : '<NumberInput label="Quantity" min={1} step={1} />',
    href: '#components/input-number',
    urlText: 'components/input-number',
    preview: (
      <div className="grid gap-6 w-full max-w-[600px] sm:grid-cols-2">
        <NumberInput
          defaultValue={1}
          hint={isPt ? 'Use min/max e step.' : 'Use min/max and step.'}
          label={isPt ? 'Quantidade de licencas' : 'License quantity'}
          min={1}
          step={1}
        />
        <div className="opacity-60 pointer-events-none">
          <NumberInput
            defaultValue={5}
            hint={isPt ? 'Valor bloqueado.' : 'Locked value.'}
            label={isPt ? 'Desabilitado' : 'Disabled'}
          />
        </div>
      </div>
    ),
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'form',
    icon: <BetweenHorizontalStart size={16} strokeWidth={1.8} />,
    description: isPt ? 'Area de texto com estrutura composta para label, field, hint e footer.' : 'Textarea with composable structure for label, field, hint and footer.',
    source: 'src/lib/components/textarea.tsx',
    importCode: "import { Textarea } from '@/lib'",
    snippet: isPt ? `<Textarea.Root>
  <Textarea.Label>Resumo do projeto</Textarea.Label>
  <Textarea.Field placeholder="Descreva o contexto..." />
  <Textarea.Hint>Mensagem inicial.</Textarea.Hint>
</Textarea.Root>` : `<Textarea.Root>
  <Textarea.Label>Project brief</Textarea.Label>
  <Textarea.Field placeholder="Describe the context..." />
  <Textarea.Hint>Initial message.</Textarea.Hint>
</Textarea.Root>`,
    href: '#components/textarea',
    urlText: 'components/textarea',
    preview: (
      <div className="grid gap-6 w-full max-w-[640px] sm:grid-cols-2">
        <Textarea.Root>
          <Textarea.Label>{isPt ? 'Resumo do projeto' : 'Project brief'}</Textarea.Label>
          <Textarea.Field placeholder={isPt ? 'Descreva produto, prazo e direcao visual...' : 'Describe the product, timeline and visual direction...'} />
          <Textarea.Hint>{isPt ? 'Mensagem inicial.' : 'Initial message.'}</Textarea.Hint>
        </Textarea.Root>
        <Textarea.Root className="opacity-60 pointer-events-none">
          <Textarea.Label>{isPt ? 'Mensagem Oculta (Disabled)' : 'Hidden Message (Disabled)'}</Textarea.Label>
          <Textarea.Field placeholder={isPt ? 'Nao pode ser editado...' : 'Cannot be edited...'} disabled />
        </Textarea.Root>
      </div>
    ),
  },
  {
    id: 'card',
    name: 'Card',
    category: 'surface',
    icon: <SquareStack size={16} strokeWidth={1.8} />,
    description: isPt ? 'Card com API composta para header, title, description, content e footer.' : 'Card with composable API for header, title, description, content and footer.',
    source: 'src/lib/components/card.tsx',
    importCode: "import { Card } from '@/lib'",
    snippet: isPt ? `<Card.Root variant="subtle">
  <Card.Header>
    <Card.Title>Titulo</Card.Title>
    <Card.Description>Descricao</Card.Description>
  </Card.Header>
</Card.Root>` : `<Card.Root variant="subtle">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
</Card.Root>`,
    href: '#components/card',
    urlText: 'components/card',
    preview: (
      <div className="grid gap-4 w-full max-w-[900px] sm:grid-cols-3">
        <Card.Root className="p-2" variant="subtle">
          <Card.Header>
            <Card.Title>{isPt ? 'Suave' : 'Subtle'}</Card.Title>
            <Card.Description>{isPt ? 'Para blocos internos com menos peso visual.' : 'For inner blocks with less visual weight.'}</Card.Description>
          </Card.Header>
        </Card.Root>
        <Card.Root className="p-2" variant="elevated">
          <Card.Header>
            <Card.Title>{isPt ? 'Elevado' : 'Elevated'}</Card.Title>
            <Card.Description>{isPt ? 'Para chamadas com mais profundidade 3D.' : 'For calls with more 3D depth.'}</Card.Description>
          </Card.Header>
        </Card.Root>
        <Card.Root className="p-2 border-[color:var(--accent-line)] opacity-80" variant="subtle">
          <Card.Header>
            <Card.Title className="text-[color:var(--accent-line)]">{isPt ? 'Outline (Custom)' : 'Outline (Custom)'}</Card.Title>
            <Card.Description>{isPt ? 'Exemplo com customizacao de borda ativa.' : 'Example with active border customization.'}</Card.Description>
          </Card.Header>
        </Card.Root>
      </div>
    ),
  },
  {
    id: 'side-rail',
    name: 'SideRail',
    category: 'navigation',
    icon: <BetweenHorizontalStart size={16} strokeWidth={1.8} />,
    description: isPt ? 'Navegacao lateral completa para app shell com estados de pin, colapso, mobile e area inferior customizavel.' : 'Complete side navigation for app shells with pin, collapse, mobile states, and custom bottom area.',
    source: 'src/lib/components/side-rail.tsx',
    importCode: "import { SideRail } from '@/lib'",
    snippet: isPt ? `<SideRail
  brandTitle="Auralith UI"
  brandSubtitle="premium component library"
  items={items}
  bottomSlot={<div>Conta</div>}
/>` : `<SideRail
  brandTitle="Auralith UI"
  brandSubtitle="premium component library"
  items={items}
  bottomSlot={<div>Account</div>}
/>`,
    href: '#components/side-rail',
    urlText: 'components/side-rail',
    preview: (
      <div className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] p-3">
        <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
          {isPt ? 'Componente de layout' : 'Layout-level component'}
        </p>
        <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">
          {isPt
            ? 'O SideRail controla o shell principal da aplicacao e deve ser usado na raiz do layout. Nesta docs voce encontra API, snippet e source para implementacao.'
            : 'SideRail controls the main app shell and should be used at the layout root. In docs you get API, snippet, and source for implementation.'}
        </p>
        <div className="mt-3 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-hover)] p-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-[color:var(--surface-panel-1)] text-[color:var(--accent-line)]">
                <PanelsTopLeft size={14} />
              </span>
              <span className="text-sm text-[color:var(--text-main)]">{isPt ? 'Landing' : 'Landing'}</span>
            </div>
            <div className="flex items-center gap-2 rounded-[8px] border border-[color:var(--card-border)] p-2 text-[color:var(--text-soft)]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-[color:var(--surface-panel-1)]">
                <SquareStack size={14} />
              </span>
              <span className="text-sm">{isPt ? 'Componentes' : 'Components'}</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'overlay',
    icon: <Waypoints size={16} strokeWidth={1.8} />,
    description: isPt ? 'Dialog composicional para fluxos focados, confirmacoes e detalhes.' : 'Composable dialog for focused flows, confirmations and details.',
    source: 'src/lib/components/modal.tsx',
    importCode: "import { Modal } from '@/lib'",
    snippet: isPt ? `<Modal.Root>
  <Modal.Trigger>Abrir modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Detalhes</Modal.Title>
      <Modal.Description>Descricao do dialog.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Conteudo</Modal.Body>
  </Modal.Content>
</Modal.Root>` : `<Modal.Root>
  <Modal.Trigger>Open modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Details</Modal.Title>
      <Modal.Description>Dialog description.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Content</Modal.Body>
  </Modal.Content>
</Modal.Root>`,
    href: '#components/modal',
    urlText: 'components/modal',
    preview: (
      <ModalPreview isPt={isPt} />
    ),
    examples: [
      {
        title: isPt ? 'Modal composicional' : 'Composable modal',
        code: isPt ? `<Modal.Root>
  <Modal.Trigger>Abrir modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Detalhes</Modal.Title>
      <Modal.Description>Descricao do dialog.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Conteudo</Modal.Body>
    <Modal.Footer>
      <Modal.Close>Fechar</Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>` : `<Modal.Root>
  <Modal.Trigger>Open modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Details</Modal.Title>
      <Modal.Description>Dialog description.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Content</Modal.Body>
    <Modal.Footer>
      <Modal.Close>Close</Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>`,
      },
      {
        title: isPt ? 'Modo controlado' : 'Controlled mode',
        code: isPt ? `<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Trigger>Abrir</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Detalhes controlados</Modal.Title>
      <Modal.Description>Estado controlado por fora.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Conteudo</Modal.Body>
  </Modal.Content>
</Modal.Root>` : `<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Trigger>Open</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Controlled details</Modal.Title>
      <Modal.Description>State controlled from outside.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Content</Modal.Body>
  </Modal.Content>
</Modal.Root>`,
      },
      {
        title: isPt ? 'Confirmacao destrutiva' : 'Destructive confirmation',
        code: isPt ? `<Modal.Root>
  <Modal.Trigger>Excluir item</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Excluir projeto?</Modal.Title>
      <Modal.Description>Essa acao nao pode ser desfeita.</Modal.Description>
    </Modal.Header>
    <Modal.Footer>
      <Modal.Close>Cancelar</Modal.Close>
      <Button>Confirmar</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>` : `<Modal.Root>
  <Modal.Trigger>Delete item</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Delete project?</Modal.Title>
      <Modal.Description>This action cannot be undone.</Modal.Description>
    </Modal.Header>
    <Modal.Footer>
      <Modal.Close>Cancel</Modal.Close>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>`,
      },
    ],
    api: [
      {
        name: 'Modal.Root',
        type: isPt ? 'container' : 'container',
        description: isPt ? 'Aceita `defaultOpen`, `open` e `onOpenChange` para estado controlado ou nao controlado.' : 'Accepts `defaultOpen`, `open` and `onOpenChange` for controlled or uncontrolled state.',
      },
      {
        name: 'Modal.Trigger',
        type: isPt ? 'gatilho' : 'trigger',
        description: isPt ? 'Abre o dialog. Pode usar `asChild` para envolver um botão customizado.' : 'Opens the dialog. Can use `asChild` to wrap a custom button.',
      },
      {
        name: 'Modal.Content',
        type: isPt ? 'conteudo' : 'content',
        description: isPt ? 'Renderiza a janela em portal, fecha no overlay click e no `Escape`.' : 'Renders the window in a portal, closes on overlay click and `Escape`.',
      },
      {
        name: 'Modal.Close',
        type: isPt ? 'acao' : 'action',
        description: isPt ? 'Fecha o modal dentro do footer ou em qualquer outra parte da composicao.' : 'Closes the modal inside the footer or anywhere else in the composition.',
      },
    ],
  },
  {
    id: 'dropdown-menu',
    name: 'DropdownMenu',
    category: 'overlay',
    icon: <ChevronDownSquare size={16} strokeWidth={1.8} />,
    description: isPt ? 'Menu dropdown composicional para acoes curtas, grupos e selecao contextual.' : 'Composable dropdown menu for short actions, groups and contextual selection.',
    source: 'src/lib/components/dropdown-menu.tsx',
    importCode: "import { DropdownMenu } from '@/lib'",
    snippet: isPt ? `<DropdownMenu.Root>
  <DropdownMenu.Trigger>Acoes</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Duplicar</DropdownMenu.Item>
    <DropdownMenu.Item>Arquivar</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>` : `<DropdownMenu.Root>
  <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Item>Archive</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`,
    href: '#components/dropdown-menu',
    urlText: 'components/dropdown-menu',
    preview: (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>{isPt ? 'Acoes' : 'Actions'}</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item description={isPt ? 'Criar uma copia do item atual.' : 'Create a copy of the current item.'}>
            {isPt ? 'Duplicar' : 'Duplicate'}
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item description={isPt ? 'Mover item para o arquivo.' : 'Move item to archive.'}>
            {isPt ? 'Arquivar' : 'Archive'}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
    examples: [
      {
        title: isPt ? 'Dropdown composicional' : 'Composable dropdown',
        code: isPt ? `<DropdownMenu.Root>
  <DropdownMenu.Trigger>Acoes</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Duplicar</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>` : `<DropdownMenu.Root>
  <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`,
      },
    ],
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'overlay',
    icon: <MessageSquareQuote size={16} strokeWidth={1.8} />,
    description: isPt ? 'Tooltip composicional para contexto rapido, labels tecnicas e ajuda inline.' : 'Composable tooltip for quick context, technical labels and inline help.',
    source: 'src/lib/components/tooltip.tsx',
    importCode: "import { Tooltip } from '@/lib'",
    snippet: isPt ? `<Tooltip.Root>
  <Tooltip.Trigger>Passe o mouse</Tooltip.Trigger>
  <Tooltip.Content>Ajuda</Tooltip.Content>
</Tooltip.Root>` : `<Tooltip.Root>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Content>Help</Tooltip.Content>
</Tooltip.Root>`,
    href: '#components/tooltip',
    urlText: 'components/tooltip',
    preview: (
      <div className="flex items-center gap-4">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-[0.78rem] text-[color:var(--text-main)]" type="button">
              {isPt ? 'Passe o mouse' : 'Hover me'}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>{isPt ? 'Informacao contextual rapida.' : 'Quick contextual information.'}</Tooltip.Content>
        </Tooltip.Root>
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Tooltip composicional' : 'Composable tooltip',
        code: isPt ? `<Tooltip.Root>
  <Tooltip.Trigger>Passe o mouse</Tooltip.Trigger>
  <Tooltip.Content>Ajuda</Tooltip.Content>
</Tooltip.Root>` : `<Tooltip.Root>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Content>Help</Tooltip.Content>
</Tooltip.Root>`,
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'surface',
    icon: <Users size={16} strokeWidth={1.8} />,
    description: isPt ? 'Representacao de perfil de usuario com fallback automatico para iniciais e suporte para empilhamento.' : 'User profile representation with automatic initials fallback and stacking support.',
    source: 'src/lib/components/avatar.tsx',
    importCode: "import { Avatar, AvatarGroup } from '@/lib'",
    snippet: isPt ? `<Avatar src="/user.png" fallback="JG" size="md" />` : `<Avatar src="/user.png" fallback="JG" size="md" />`,
    href: '#components/avatar',
    urlText: 'components/avatar',
    preview: (
      <div className="flex items-center gap-8">
        <AvatarGroup limit={3}>
          <Avatar fallback="AL" />
          <Avatar fallback="BR" />
          <Avatar fallback="CR" />
          <Avatar fallback="DR" />
        </AvatarGroup>
        <Avatar size="lg" fallback="PR" />
      </div>
    ),
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'form',
    icon: <ToggleLeft size={16} strokeWidth={1.8} />,
    description: isPt ? 'Controle estilo interruptor para operacoes e estados on/off.' : 'Switch-style control for on/off operations and states.',
    source: 'src/lib/components/switch.tsx',
    importCode: "import { Switch } from '@/lib'",
    snippet: isPt ? `<Switch label="Ativar notificacoes" description="Receber e-mails de atualizacao." />` : `<Switch label="Enable notifications" description="Receive update emails." />`,
    href: '#components/switch',
    urlText: 'components/switch',
    preview: (
      <div className="flex flex-col gap-6">
        <Switch defaultChecked label={isPt ? 'Tema Silencioso' : 'Quiet Theme'} description={isPt ? 'Desabilita sons de clique.' : 'Disables click sounds.'} />
        <Switch label={isPt ? 'Modo Beta' : 'Beta Mode'} description={isPt ? 'Testar novos recursos.' : 'Test new features.'} />
      </div>
    ),
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'surface',
    icon: <Layers size={16} strokeWidth={1.8} />,
    description: isPt ? 'Paineis colapsaveis para organizar grande volume de informacao tecnica ou FAQs.' : 'Collapsible panels to organize large volumes of technical information or FAQs.',
    source: 'src/lib/components/accordion.tsx',
    importCode: "import { Accordion, AccordionItem } from '@/lib'\nimport { Plus, Settings2 } from 'lucide-react'",
    snippet: isPt ? `<Accordion type="single">
  <AccordionItem
    value="item-1"
    title="Detalhes do banco"
    actions={
      <button type="button" aria-label="Adicionar" className="h-8 w-8 rounded-md border border-[color:var(--card-border)]">
        +
      </button>
    }
  >
    Conteudo oculto ate o clique.
  </AccordionItem>
</Accordion>` : `<Accordion type="single">
  <AccordionItem
    value="item-1"
    title="Database Details"
    actions={
      <button type="button" aria-label="Add" className="h-8 w-8 rounded-md border border-[color:var(--card-border)]">
        +
      </button>
    }
  >
    Hidden content until click.
  </AccordionItem>
</Accordion>`,
    href: '#components/accordion',
    urlText: 'components/accordion',
    preview: (
      <Accordion type="single" freezeContainerSize={false} className="w-full max-w-[500px]">
        <AccordionItem
          value="1"
          title={isPt ? 'Posso customizar tokens?' : 'Can I customize tokens?'}
          subtitle={isPt ? 'Arquitetura CSS' : 'CSS Architecture'}
          actions={(
            <>
              <button
                type="button"
                aria-label={isPt ? 'Adicionar item' : 'Add item'}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] text-[color:var(--text-soft)] transition-colors hover:text-[color:var(--text-main)]"
              >
                <Plus size={15} />
              </button>
              <button
                type="button"
                aria-label={isPt ? 'Abrir configuracoes' : 'Open settings'}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] text-[color:var(--text-soft)] transition-colors hover:text-[color:var(--text-main)]"
              >
                <Settings2 size={14} />
              </button>
            </>
          )}
        >
          <p className="mb-2">{isPt ? 'As variaveis CSS em scopes diretos facilitam a atualizacao em massa.' : 'Direct scoped CSS variables make mass updates easy.'}</p>
        </AccordionItem>
        <AccordionItem value="2" title={isPt ? 'Suporte a SSR?' : 'SSR Support?'} subtitle={isPt ? 'Next.js e Remix' : 'Next.js and Remix'}>
          <p className="mb-2">{isPt ? 'Totalmente funcional pelo export nativo da pasta lib, sem dependencias externas poluidoras.' : 'Fully functional via native lib folder export, no polluting external dependencies.'}</p>
        </AccordionItem>
      </Accordion>
    ),
    examples: [
      {
        title: isPt ? 'Acoes ao lado da seta' : 'Actions next to chevron',
        code: isPt ? `import { Plus, Settings2 } from 'lucide-react'

<Accordion type="single">
  <AccordionItem
    value="general"
    title="Configuracoes"
    actions={
      <>
        <button
          type="button"
          aria-label="Adicionar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)]"
        >
          <Plus size={14} />
        </button>
        <button
          type="button"
          aria-label="Configuracoes"
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)]"
        >
          <Settings2 size={14} />
        </button>
      </>
    }
  >
    Conteudo do painel.
  </AccordionItem>
</Accordion>` : `import { Plus, Settings2 } from 'lucide-react'

<Accordion type="single">
  <AccordionItem
    value="general"
    title="Settings"
    actions={
      <>
        <button
          type="button"
          aria-label="Add"
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)]"
        >
          <Plus size={14} />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[color:var(--card-border)]"
        >
          <Settings2 size={14} />
        </button>
      </>
    }
  >
    Panel content.
  </AccordionItem>
</Accordion>`,
      },
    ],
    api: [
      {
        name: 'AccordionItem.actions',
        type: 'ReactNode',
        description: isPt ? 'Renderiza botoes de acao no lado direito, antes da seta de expansao, com alinhamento vertical centralizado.' : 'Renders action buttons on the right side, before the expand chevron, with vertical center alignment.',
      },
    ],
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'feedback',
    icon: <Bell size={16} strokeWidth={1.8} />,
    description: isPt ? 'Notificacoes efemeras fluindo no canto da tela com animacoes liquidas e Blur background.' : 'Ephemeral notifications flowing on the screen corner with fluid animations and Blur background.',
    source: 'src/lib/components/toast.tsx',
    importCode: "import { ToastProvider, useToast } from '@/lib'",
    snippet: isPt ? `<ToastProvider position="top-right">
  <MinhaPagina />
</ToastProvider>

const toast = useToast()
toast({ title: 'Sucesso!', variant: 'success', position: 'bottom-left' })` : `<ToastProvider position="top-right">
  <MyPage />
</ToastProvider>

const toast = useToast()
toast({ title: 'Success!', variant: 'success', position: 'bottom-left' })`,
    href: '#components/toast',
    urlText: 'components/toast',
    preview: (
      <ToastProvider>
        <ToastPreview isPt={isPt} />
      </ToastProvider>
    ),
    examples: [
      {
        title: isPt ? 'Posicao padrao no provider' : 'Default provider position',
        code: isPt ? `<ToastProvider position="top-center">
  <App />
</ToastProvider>` : `<ToastProvider position="top-center">
  <App />
</ToastProvider>`,
      },
      {
        title: isPt ? 'Sobrescrever posicao por toast' : 'Override position per toast',
        code: isPt ? `const toast = useToast()

toast({
  title: 'Download concluido',
  description: 'Arquivo pronto para abrir.',
  variant: 'success',
  position: 'bottom-left',
})` : `const toast = useToast()

toast({
  title: 'Download finished',
  description: 'File is ready to open.',
  variant: 'success',
  position: 'bottom-left',
})`,
      },
    ],
    api: [
      {
        name: 'ToastProvider.position',
        type: 'ToastPosition',
        description: isPt ? 'Define a posicao padrao da pilha de notificacoes.' : 'Defines the default notification stack position.',
      },
      {
        name: 'toast({ position })',
        type: 'ToastPosition',
        description: isPt ? 'Sobrescreve a posicao somente para o toast disparado.' : 'Overrides the position only for the triggered toast.',
      },
      {
        name: 'toast({ duration, variant })',
        type: 'number | ToastVariant',
        description: isPt ? 'Controla tempo de exibicao e estilo visual da notificacao.' : 'Controls display duration and visual style of each notification.',
      },
    ],
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'navigation',
    icon: <Columns size={16} strokeWidth={1.8} />,
    description: isPt ? 'Navegacao em janelas contextuais dentro da mesma rota, otimizadas para settings de dashboards.' : 'Navigation in contextual windows within the same route, optimized for dashboard settings.',
    source: 'src/lib/components/tabs.tsx',
    importCode: "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/lib'",
    snippet: isPt ? `<Tabs defaultValue="geral" variant="baseline">
  <TabsList>
    <TabsTrigger value="geral">Geral</TabsTrigger>
  </TabsList>
  <TabsContent value="geral">Painel Geral</TabsContent>
</Tabs>` : `<Tabs defaultValue="general" variant="baseline">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General Panel</TabsContent>
</Tabs>`,
    href: '#components/tabs',
    urlText: 'components/tabs',
    preview: (
      <div className="grid w-full max-w-[760px] gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)] p-4">
          <p className="mb-3 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
            solid
          </p>
          <Tabs defaultValue="geral" variant="solid" className="w-full">
            <TabsList>
              <TabsTrigger value="geral">{isPt ? 'Geral' : 'General'}</TabsTrigger>
              <TabsTrigger value="avancado">{isPt ? 'Avançado' : 'Advanced'}</TabsTrigger>
              <TabsTrigger value="faturamento">{isPt ? 'Faturamento' : 'Billing'}</TabsTrigger>
            </TabsList>
            <TabsContent value="geral" className="rounded-lg border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.2)] p-4">
              <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Opções gerais do app.' : 'General app options.'}</p>
            </TabsContent>
            <TabsContent value="avancado" className="rounded-lg border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.2)] p-4">
              <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Painel crítico avançado.' : 'Critical advanced panel.'}</p>
            </TabsContent>
            <TabsContent value="faturamento" className="rounded-lg border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.2)] p-4">
              <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Suas formas de pagamento.' : 'Your payment methods.'}</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="rounded-xl border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)] p-4">
          <p className="mb-3 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
            baseline
          </p>
          <Tabs defaultValue="geral" variant="baseline" className="w-full">
            <TabsList>
              <TabsTrigger value="geral">{isPt ? 'Geral' : 'General'}</TabsTrigger>
              <TabsTrigger value="equipe">{isPt ? 'Equipe' : 'Team'}</TabsTrigger>
              <TabsTrigger value="seguranca">{isPt ? 'Segurança' : 'Security'}</TabsTrigger>
            </TabsList>
            <TabsContent value="geral" className="rounded-lg border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.2)] p-4">
              <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Visão geral da conta.' : 'Account overview.'}</p>
            </TabsContent>
            <TabsContent value="equipe" className="rounded-lg border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.2)] p-4">
              <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Membros e permissões.' : 'Members and permissions.'}</p>
            </TabsContent>
            <TabsContent value="seguranca" className="rounded-lg border border-[color:var(--card-border)] bg-[rgba(0,0,0,0.2)] p-4">
              <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Políticas de acesso.' : 'Access policies.'}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Variante baseline (nova)' : 'Baseline variant (new)',
        code: isPt ? `<Tabs defaultValue="geral" variant="baseline">
  <TabsList>
    <TabsTrigger value="geral">Geral</TabsTrigger>
    <TabsTrigger value="equipe">Equipe</TabsTrigger>
    <TabsTrigger value="seguranca">Seguranca</TabsTrigger>
  </TabsList>

  <TabsContent value="geral">Visao geral da conta.</TabsContent>
  <TabsContent value="equipe">Membros e permissoes.</TabsContent>
  <TabsContent value="seguranca">Politicas de acesso.</TabsContent>
</Tabs>` : `<Tabs defaultValue="general" variant="baseline">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>

  <TabsContent value="general">Account overview.</TabsContent>
  <TabsContent value="team">Members and permissions.</TabsContent>
  <TabsContent value="security">Access policies.</TabsContent>
</Tabs>`,
      },
      {
        title: isPt ? 'Tabs horizontal basica' : 'Basic horizontal tabs',
        code: isPt ? `<Tabs defaultValue="geral">
  <TabsList>
    <TabsTrigger value="geral">Geral</TabsTrigger>
    <TabsTrigger value="seguranca">Seguranca</TabsTrigger>
  </TabsList>

  <TabsContent value="geral">Configuracoes gerais.</TabsContent>
  <TabsContent value="seguranca">Configuracoes de seguranca.</TabsContent>
</Tabs>` : `<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>

  <TabsContent value="general">General settings.</TabsContent>
  <TabsContent value="security">Security settings.</TabsContent>
</Tabs>`,
      },
      {
        title: isPt ? 'Componente controlado' : 'Controlled component',
        code: isPt ? `const [tab, setTab] = useState('geral')

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="geral">Geral</TabsTrigger>
    <TabsTrigger value="equipe">Equipe</TabsTrigger>
  </TabsList>

  <TabsContent value="geral">Painel geral.</TabsContent>
  <TabsContent value="equipe">Permissoes da equipe.</TabsContent>
</Tabs>` : `const [tab, setTab] = useState('general')

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
  </TabsList>

  <TabsContent value="general">General dashboard.</TabsContent>
  <TabsContent value="team">Team permissions.</TabsContent>
</Tabs>`,
      },
      {
        title: isPt ? 'Aba desabilitada' : 'Disabled tab',
        code: isPt ? `<Tabs defaultValue="geral">
  <TabsList>
    <TabsTrigger value="geral">Geral</TabsTrigger>
    <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
  </TabsList>

  <TabsContent value="geral">Conteudo disponivel.</TabsContent>
  <TabsContent value="analytics">Em breve.</TabsContent>
</Tabs>` : `<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
  </TabsList>

  <TabsContent value="general">Available content.</TabsContent>
  <TabsContent value="analytics">Coming soon.</TabsContent>
</Tabs>`,
      },
    ],
    api: [
      {
        name: 'Tabs',
        type: 'container',
        description: isPt ? 'Aceita `defaultValue` (nao controlado) ou `value` + `onValueChange` (controlado).' : 'Accepts `defaultValue` (uncontrolled) or `value` + `onValueChange` (controlled).',
      },
      {
        name: 'Tabs.variant',
        type: 'solid | baseline',
        description: isPt ? 'Escolhe o estilo visual da barra de abas. `solid` e o estilo atual; `baseline` usa linha inferior mais minimalista.' : 'Chooses the visual style for the tab bar. `solid` is the current style; `baseline` uses a more minimal bottom line.',
      },
      {
        name: 'TabsTrigger.value',
        type: 'string',
        description: isPt ? 'Identificador da aba; deve bater com o `value` correspondente no `TabsContent`.' : 'Tab identifier; must match the corresponding `TabsContent` value.',
      },
      {
        name: 'TabsTrigger.disabled',
        type: 'boolean',
        description: isPt ? 'Desabilita interacao da aba mantendo o item visivel na lista.' : 'Disables tab interaction while keeping the item visible in the list.',
      },
      {
        name: 'TabsContent.value',
        type: 'string',
        description: isPt ? 'Define qual painel sera exibido para cada aba selecionada.' : 'Defines which panel is rendered for each selected tab.',
      },
    ],
  },
].map((doc) => ({
  ...doc,
  ...getStructuredMeta(doc.id, isPt),
}))
}
