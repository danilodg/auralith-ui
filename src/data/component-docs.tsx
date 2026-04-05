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
} from 'lucide-react'

import { Button, Card, Checkbox, CodeBlock, DateInput, DropdownMenu, GlassPanel, Input, NumberInput, SectionLabel, Select, Tag, Textarea, TimeInput, Tooltip } from '../lib'
import { ModalPreview } from '../features/docs/modal-preview'
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
      <GlassPanel.Root className="p-2">
        <GlassPanel.Header>
          <SectionLabel>{isPt ? 'Preview do painel' : 'Panel preview'}</SectionLabel>
          <GlassPanel.Title className="mt-4">{isPt ? 'Bloco premium' : 'Premium block'}</GlassPanel.Title>
          <GlassPanel.Description>
            {isPt ? 'Superficie principal para blocos premium, auth containers e hero cards.' : 'Primary surface for premium blocks, auth containers and hero cards.'}
          </GlassPanel.Description>
        </GlassPanel.Header>
      </GlassPanel.Root>
    ),
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
      <div className="flex flex-wrap gap-2.5">
        <Tag>tailwind v4</Tag>
        <Tag>react 19</Tag>
        <Tag>{isPt ? 'ui premium' : 'premium ui'}</Tag>
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
      <Input.Root>
        <Input.Label>{isPt ? 'Email profissional' : 'Work email'}</Input.Label>
        <Input.Field icon={<Mail size={18} />} placeholder="name@company.com" type="email" />
        <Input.Hint>{isPt ? 'Campo principal do formulario.' : 'Main form field.'}</Input.Hint>
      </Input.Root>
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
      <div className="grid gap-2">
        <Checkbox label={isPt ? 'Aceito os termos de uso' : 'I accept the terms of use'} hint={isPt ? 'Consentimento obrigatorio para continuar.' : 'Required consent to continue.'} />
        <Checkbox.Item framed={false} label={isPt ? 'Quero receber novidades por email' : 'Send me product updates by email'} defaultChecked />
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
      <Select
        defaultValue="medium"
        hint={isPt ? 'Use para listas curtas de opcoes pre-definidas.' : 'Use for short predefined option lists.'}
        label={isPt ? 'Nivel de prioridade' : 'Priority level'}
      >
        <Select.Option label={isPt ? 'Baixa' : 'Low'} value="low" />
        <Select.Option label={isPt ? 'Media' : 'Medium'} value="medium" />
        <Select.Option label={isPt ? 'Alta' : 'High'} value="high" />
      </Select>
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
      <NumberInput
        defaultValue={1}
        hint={isPt ? 'Use min/max e step para restringir valores.' : 'Use min/max and step to constrain values.'}
        label={isPt ? 'Quantidade de licencas' : 'License quantity'}
        min={1}
        step={1}
      />
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
      <Textarea.Root>
        <Textarea.Label>{isPt ? 'Resumo do projeto' : 'Project brief'}</Textarea.Label>
        <Textarea.Field placeholder={isPt ? 'Descreva produto, prazo e direcao visual...' : 'Describe the product, timeline and visual direction...'} />
        <Textarea.Hint>{isPt ? 'Mensagem inicial.' : 'Initial message.'}</Textarea.Hint>
      </Textarea.Root>
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
      <div className="grid gap-3 sm:grid-cols-2">
        <Card.Root className="p-2" variant="subtle">
          <Card.Header>
            <Card.Title>{isPt ? 'Suave' : 'Subtle'}</Card.Title>
            <Card.Description>{isPt ? 'Para blocos internos com menos peso visual.' : 'For inner blocks with less visual weight.'}</Card.Description>
          </Card.Header>
        </Card.Root>
        <Card.Root className="p-2" variant="elevated">
          <Card.Header>
            <Card.Title>{isPt ? 'Elevado' : 'Elevated'}</Card.Title>
            <Card.Description>{isPt ? 'Para chamadas com mais profundidade.' : 'For calls with more depth.'}</Card.Description>
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
].map((doc) => ({
  ...doc,
  ...getStructuredMeta(doc.id, isPt),
}))
}
