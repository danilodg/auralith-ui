import {
  BetweenHorizontalStart,
  CalendarDays,
  CaseSensitive,
  CheckSquare,
  Circle,
  Code2,
  Search,
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
  Upload,
  Waypoints,
  Users,
  ToggleLeft,
  Layers,
  Columns,
  Bell,
  Plus,
  Settings2,
  Command,
  Menu,
  Minus
} from 'lucide-react'

import { Accordion, AccordionItem, Alert, AlertDialog, Avatar, AvatarGroup, Badge, Breadcrumb, Button, Card, Checkbox, CheckboxGroup, CodeBlock, CommandPalette, Combobox, ContextMenu, DataTable, DateInput, DropdownMenu, EmptyState, FileUpload, FormField, FormHint, FormMessage, GlassPanel, Input, Navbar, NumberInput, Pagination, Popover, Progress, RadioGroup, SearchInput, SectionHeader, SectionLabel, Select, Separator, Sheet, Skeleton, Slider, Stepper, Switch, TableToolbar, Tabs, TabsContent, TabsList, TabsTrigger, Tag, Textarea, TimeInput, ToastProvider, ToggleGroup, Tooltip } from '../lib'
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
    'section-header': {
      anatomy: ['SectionHeader'],
      parts: [
        { name: 'eyebrow', description: isPt ? 'Texto superior opcional para contexto da secao.' : 'Optional upper text for section context.' },
        { name: 'title', description: isPt ? 'Titulo principal da secao.' : 'Primary section title.' },
        { name: 'description', description: isPt ? 'Texto de apoio logo abaixo do titulo.' : 'Supporting copy below the title.' },
      ],
      notes: isPt ? ['Ideal para abertura de blocos de conteudo e docs.'] : ['Great for section openings in docs and content blocks.'],
    },
    'section-label': {
      anatomy: ['SectionLabel'],
      parts: [{ name: 'SectionLabel', description: isPt ? 'Eyebrow tecnico simples.' : 'Simple technical eyebrow.' }],
      notes: isPt ? ['Componente de uso direto, sem necessidade de subpartes.'] : ['Direct-use component, no subparts needed.'],
    },
    separator: {
      anatomy: ['Separator'],
      parts: [
        { name: 'orientation', description: isPt ? 'Define se a linha e horizontal ou vertical.' : 'Defines whether the line is horizontal or vertical.' },
        { name: 'tone', description: isPt ? 'Controla o gradiente entre `accent` e `muted`.' : 'Controls gradient tone between `accent` and `muted`.' },
      ],
      notes: isPt ? ['Use para dividir grupos em cards e listas sem criar borda dura.'] : ['Use to split card/list groups without introducing a hard border.'],
    },
    'alert-dialog': {
      anatomy: ['AlertDialog.Root', 'AlertDialog.Trigger', 'AlertDialog.Content', 'AlertDialog.Footer'],
      parts: [
        { name: 'AlertDialog.Root', description: isPt ? 'Gerencia estado controlado ou nao controlado do dialog.' : 'Manages controlled or uncontrolled dialog state.' },
        { name: 'AlertDialog.Cancel', description: isPt ? 'Acao secundaria para cancelar/fechar.' : 'Secondary action to cancel/close.' },
        { name: 'AlertDialog.Action', description: isPt ? 'Acao principal de confirmacao, com suporte a `tone="danger"`.' : 'Primary confirmation action, with `tone="danger"` support.' },
      ],
      notes: isPt ? ['Use para confirmacao destrutiva; para dialog generico continue com `Modal`.'] : ['Use for destructive confirmation; keep using `Modal` for generic dialogs.'],
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
    'form-field': {
      anatomy: ['FormField', 'FormField.Label', 'FormHint', 'FormMessage'],
      parts: [
        { name: 'FormField', description: isPt ? 'Wrapper com API simples para label, hint e message.' : 'Wrapper with a simple API for label, hint and message.' },
        { name: 'FormField.Label', description: isPt ? 'Label com suporte a estado required.' : 'Label with required-state support.' },
        { name: 'FormHint', description: isPt ? 'Texto de apoio neutro abaixo do campo.' : 'Neutral support text below the field.' },
        { name: 'FormMessage', description: isPt ? 'Mensagem contextual com `tone` (`error`, `info`, `success`).' : 'Context message with `tone` (`error`, `info`, `success`).' },
      ],
      notes: isPt
        ? ['Use quando quiser padronizar erros/hints em qualquer input da biblioteca.', 'Funciona bem com `Input.Field`, `Select` e `Textarea.Field`.']
        : ['Use when you want to standardize errors/hints for any library input.', 'Works well with `Input.Field`, `Select`, and `Textarea.Field`.'],
    },
    'radio-group': {
      anatomy: ['RadioGroup', 'RadioGroup.Item'],
      parts: [
        { name: 'RadioGroup', description: isPt ? 'Container do grupo com suporte controlado e nao controlado.' : 'Group container with controlled and uncontrolled support.' },
        { name: 'RadioGroup.Item', description: isPt ? 'Item declarativo com `value`, `label` e `description`.' : 'Declarative item with `value`, `label`, and `description`.' },
      ],
      notes: isPt
        ? ['Use para escolhas exclusivas (apenas uma opcao ativa por vez).', 'Nao substitui `CheckboxGroup`: aqui o usuario escolhe apenas uma alternativa.', 'Defina `name` para integrar com submit nativo de formulários.']
        : ['Use for exclusive choices (only one active option at a time).', 'This does not replace `CheckboxGroup`: users can select only one alternative here.', 'Set `name` to integrate with native form submit behavior.'],
    },
    'checkbox-group': {
      anatomy: ['CheckboxGroup', 'CheckboxGroup.Item'],
      parts: [
        { name: 'CheckboxGroup', description: isPt ? 'Container de selecao multipla com estado em array.' : 'Multiple-selection container with array state.' },
        { name: 'CheckboxGroup.Item', description: isPt ? 'Item declarativo com `value`, `label` e opcionalmente `description`.' : 'Declarative item with `value`, `label`, and optional `description`.' },
      ],
      notes: isPt
        ? ['Use para filtros e preferências multi-select (varias opcoes ao mesmo tempo).', 'Nao substitui `RadioGroup`: aqui nao ha exclusividade entre itens.', 'Evite listas longas sem agrupamento visual.']
        : ['Use for multi-select filters and preferences (multiple options at the same time).', 'This does not replace `RadioGroup`: selection is not exclusive.', 'Avoid long lists without visual grouping.'],
    },
    combobox: {
      anatomy: ['Combobox', 'Combobox.Item'],
      parts: [
        { name: 'Combobox', description: isPt ? 'Combina trigger de select com busca local em tempo real.' : 'Combines a select trigger with real-time local search.' },
        { name: 'Combobox.Item', description: isPt ? 'Item declarativo com `value`, `label` e `description`.' : 'Declarative item with `value`, `label`, and `description`.' },
      ],
      notes: isPt
        ? ['Prefira para listas medias/grandes onde Select comum fica limitado.', 'Use `emptyLabel` para mensagem amigavel quando nao houver resultados.']
        : ['Prefer it for medium/large lists where basic Select is limited.', 'Use `emptyLabel` for a friendly empty-result message.'],
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
      notes: isPt ? ['Use para estado booleano unico (ligado/desligado) de uma opcao isolada.', 'Para varias opcoes use `CheckboxGroup`; para escolha exclusiva use `RadioGroup`.', 'Agrupe opcoes relacionadas em coluna para facilitar leitura no mobile.', 'Use `framed={false}` quando nao quiser bloco com borda.'] : ['Use for a single boolean state (on/off) of one isolated option.', 'For multiple options use `CheckboxGroup`; for exclusive choice use `RadioGroup`.', 'Group related options in a column for better mobile readability.', 'Use `framed={false}` when you do not want a bordered container.'],
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
    popover: {
      anatomy: ['Popover.Root', 'Popover.Trigger', 'Popover.Content', 'Popover.Title', 'Popover.Description', 'Popover.Close'],
      parts: [
        { name: 'Popover.Root', description: isPt ? 'Controla estado aberto/fechado (controlado ou nao controlado).' : 'Controls open/closed state (controlled or uncontrolled).' },
        { name: 'Popover.Trigger', description: isPt ? 'Gatilho que abre e fecha o painel ancorado.' : 'Trigger that opens and closes the anchored panel.' },
        { name: 'Popover.Content', description: isPt ? 'Painel flutuante com alinhamento e lado configuravel.' : 'Floating panel with configurable alignment and side.' },
      ],
      notes: isPt
        ? ['Use para microfluxos contextuais sem bloquear a tela inteira.', 'Pode conter conteudo rico (texto, campos, acoes) e permanecer aberto durante interacao.', 'Nao e o mesmo que `DropdownMenu`: popover nao e necessariamente uma lista de acoes.']
        : ['Use for contextual micro-flows without blocking the whole screen.', 'It can hold richer content (text, fields, actions) and stay open during interaction.', 'This is not the same as `DropdownMenu`: a popover is not necessarily an action list.'],
    },
    sheet: {
      anatomy: ['Sheet.Root', 'Sheet.Trigger', 'Sheet.Content', 'Sheet.Header', 'Sheet.Title', 'Sheet.Description', 'Sheet.Body', 'Sheet.Footer', 'Sheet.Close'],
      parts: [
        { name: 'Sheet.Root', description: isPt ? 'Controla estado do painel lateral.' : 'Controls side panel state.' },
        { name: 'Sheet.Content', description: isPt ? 'Renderiza painel em portal com suporte a `side`.' : 'Renders portal panel with `side` support.' },
        { name: 'Sheet.Footer', description: isPt ? 'Area de acoes para confirmar ou cancelar fluxo.' : 'Action area to confirm or cancel the flow.' },
      ],
      notes: isPt
        ? ['Ideal para filtros, configuracoes e ediçao rapida no mobile.', 'Use `side="bottom"` para comportamento tipo drawer inferior.']
        : ['Ideal for filters, settings, and quick edits on mobile.', 'Use `side="bottom"` for bottom-drawer behavior.'],
    },
    'dropdown-menu': {
      anatomy: ['DropdownMenu.Root', 'DropdownMenu.Trigger', 'DropdownMenu.Content', 'DropdownMenu.Item', 'DropdownMenu.Separator'],
      parts: [
        { name: 'DropdownMenu.Root', description: isPt ? 'Controla o estado aberto/fechado.' : 'Controls the open/closed state.' },
        { name: 'DropdownMenu.Trigger', description: isPt ? 'Aciona a abertura do menu.' : 'Triggers the menu opening.' },
        { name: 'DropdownMenu.Item', description: isPt ? 'Acao individual da lista.' : 'Individual list action.' },
      ],
      notes: isPt ? ['Prefira esse componente para lista curta de acoes contextuais (menu de comandos).', 'Diferente de `Popover`, aqui o foco e selecionar uma acao e fechar o menu.'] : ['Prefer this component for short contextual action lists (command menu).', 'Different from `Popover`, the focus here is choosing an action and closing the menu.'],
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
    alert: {
      anatomy: ['Alert.Root', 'Alert.Title', 'Alert.Description'],
      parts: [
        { name: 'Alert.Root', description: isPt ? 'Container principal com `variant` e opcao de esconder icone.' : 'Main container with `variant` and optional icon hiding.' },
        { name: 'Alert.Title', description: isPt ? 'Titulo curto para destacar o contexto do aviso.' : 'Short title to highlight alert context.' },
        { name: 'Alert.Description', description: isPt ? 'Descricao com instrucoes, causa ou proximo passo.' : 'Description with instructions, cause, or next step.' },
      ],
      notes: isPt
        ? ['Use para feedback persistente em formularios, listas e telas de config.', 'Prefira `Toast` para eventos efemeros e `Alert` para estado visivel continuo.']
        : ['Use for persistent feedback in forms, lists, and settings pages.', 'Prefer `Toast` for ephemeral events and `Alert` for continuously visible state.'],
    },
    skeleton: {
      anatomy: ['Skeleton'],
      parts: [{ name: 'Skeleton', description: isPt ? 'Bloco visual de carregamento com shimmer opcional.' : 'Visual loading block with optional shimmer.' }],
      notes: isPt
        ? ['Monte layouts usando varios Skeletons para simular a estrutura final.', 'Use alturas e larguras proximas ao conteudo real para reduzir salto visual.']
        : ['Compose layouts with multiple Skeletons to mimic final structure.', 'Use heights and widths close to real content to reduce visual jumps.'],
    },
    'empty-state': {
      anatomy: ['EmptyState.Root', 'EmptyState.Title', 'EmptyState.Description'],
      parts: [
        { name: 'EmptyState.Root', description: isPt ? 'Container com `title`, `description`, `icon` e `action`.' : 'Container with `title`, `description`, `icon`, and `action`.' },
        { name: 'EmptyState.Title', description: isPt ? 'Titulo principal do estado vazio.' : 'Main empty-state title.' },
        { name: 'EmptyState.Description', description: isPt ? 'Texto de apoio explicando o estado atual.' : 'Supporting text explaining current state.' },
      ],
      notes: isPt
        ? ['Use para listas sem dados e resultados de busca sem retorno.', 'Sempre inclua acao de recuperacao quando possivel.']
        : ['Use for empty data lists and no-result search states.', 'Always include a recovery action when possible.'],
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
    breadcrumb: {
      anatomy: ['Breadcrumb.Root', 'Breadcrumb.List', 'Breadcrumb.Item', 'Breadcrumb.Separator', 'Breadcrumb.Link', 'Breadcrumb.Current'],
      parts: [
        { name: 'Breadcrumb.Root', description: isPt ? 'Container semantico da trilha.' : 'Semantic breadcrumb container.' },
        { name: 'Breadcrumb.Link', description: isPt ? 'Link navegavel para niveis anteriores.' : 'Navigable link for previous levels.' },
        { name: 'Breadcrumb.Current', description: isPt ? 'Item atual com `aria-current="page"`.' : 'Current item with `aria-current="page"`.' },
      ],
      notes: isPt
        ? ['Use para contexto de navegação em telas profundas.', 'Evite mais de 4-5 niveis para manter legibilidade.']
        : ['Use for navigation context on deep screens.', 'Avoid more than 4-5 levels to keep readability.'],
    },
    pagination: {
      anatomy: ['Pagination'],
      parts: [
        { name: 'currentPage', description: isPt ? 'Pagina ativa atual (controlado pelo estado externo).' : 'Current active page (externally controlled state).' },
        { name: 'totalPages', description: isPt ? 'Total de paginas disponiveis.' : 'Total available pages.' },
        { name: 'onPageChange', description: isPt ? 'Callback disparado em mudancas de pagina.' : 'Callback fired on page changes.' },
      ],
      notes: isPt
        ? ['Comprime listas longas usando ellipsis automaticamente.', 'Funciona melhor quando integrado com filtros e busca.']
        : ['Collapses long ranges with ellipsis automatically.', 'Works best when integrated with filters and search.'],
    },
    stepper: {
      anatomy: ['Stepper', 'Stepper.Item'],
      parts: [
        { name: 'Stepper', description: isPt ? 'Container com estado atual via `currentStep`.' : 'Container with current state via `currentStep`.' },
        { name: 'Stepper.Item', description: isPt ? 'Etapa declarativa com `value`, `label` e `description`.' : 'Declarative step with `value`, `label`, and `description`.' },
      ],
      notes: isPt
        ? ['Ideal para onboarding e fluxos de checkout/configuracao.', 'A etapa atual e as concluidas ficam visualmente destacadas.']
        : ['Ideal for onboarding and checkout/settings flows.', 'Current and completed steps are visually highlighted.'],
    },
    'table-toolbar': {
      anatomy: ['TableToolbar'],
      parts: [
        { name: 'searchValue', description: isPt ? 'Valor controlado do campo de busca.' : 'Controlled value of the search field.' },
        { name: 'filtersSlot', description: isPt ? 'Slot para filtros (selects, tags, toggles).' : 'Slot for filters (selects, tags, toggles).' },
        { name: 'primaryAction', description: isPt ? 'Acao principal alinhada a direita.' : 'Primary action aligned to the right.' },
      ],
      notes: isPt
        ? ['Use junto do DataTable para padronizar busca e filtros.', 'Em mobile, deixe filtros essenciais e simplifique os secundarios.']
        : ['Use with DataTable to standardize search and filters.', 'On mobile, keep essential filters and simplify secondary ones.'],
    },
    'data-table': {
      anatomy: ['DataTable'],
      parts: [
        { name: 'columns', description: isPt ? 'Define cabecalhos, alinhamento e render customizada por coluna.' : 'Defines headers, alignment, and custom render per column.' },
        { name: 'data', description: isPt ? 'Lista de registros renderizados por linha.' : 'List of records rendered by row.' },
        { name: 'empty', description: isPt ? 'Conteudo mostrado quando nao ha registros.' : 'Content shown when there are no records.' },
      ],
      notes: isPt
        ? ['Combine com Pagination para listas longas.', 'Use render customizado para status, badges e acoes por linha.']
        : ['Combine with Pagination for long lists.', 'Use custom rendering for statuses, badges, and row actions.'],
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
    id: 'section-header',
    name: 'SectionHeader',
    category: 'typography',
    icon: <CaseSensitive size={16} strokeWidth={1.8} />,
    description: isPt ? 'Cabecalho de secao com eyebrow, heading e descricao em layout consistente.' : 'Section heading block with eyebrow, heading, and description in a consistent layout.',
    source: 'src/lib/components/section-header.tsx',
    importCode: "import { SectionHeader } from '@/lib'",
    snippet: isPt ? `<SectionHeader
  eyebrow="Plataforma"
  heading="Equipe e governanca"
  description="Gerencie membros, papeis e acessos em um unico lugar."
/>` : `<SectionHeader
  eyebrow="Platform"
  heading="Team and governance"
  description="Manage members, roles, and access in one place."
/>`,
    href: '#components/section-header',
    urlText: 'components/section-header',
    preview: (
      <SectionHeader
        eyebrow={isPt ? 'Plataforma' : 'Platform'}
        heading={isPt ? 'Equipe e governanca' : 'Team and governance'}
        description={isPt ? 'Gerencie membros, papeis e acessos em um unico lugar.' : 'Manage members, roles, and access in one place.'}
      />
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
    id: 'separator',
    name: 'Separator',
    category: 'typography',
    icon: <Minus size={16} strokeWidth={1.8} />,
    description: isPt ? 'Divisor visual com degradê horizontal ou vertical para separar blocos sem peso excessivo.' : 'Visual divider with horizontal/vertical gradient to separate blocks without heavy borders.',
    source: 'src/lib/components/separator.tsx',
    importCode: "import { Separator } from '@/lib'",
    snippet: isPt ? `<div className="space-y-4">
  <p>Grupo A</p>
  <Separator />
  <p>Grupo B</p>
</div>` : `<div className="space-y-4">
  <p>Group A</p>
  <Separator />
  <p>Group B</p>
</div>`,
    href: '#components/separator',
    urlText: 'components/separator',
    preview: (
      <div className="w-full max-w-[660px] rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-4">
        <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Bloco superior' : 'Top block'}</p>
        <Separator className="my-3" />
        <p className="text-sm text-[color:var(--text-soft)]">{isPt ? 'Bloco inferior' : 'Bottom block'}</p>
      </div>
    ),
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
    id: 'form-field',
    name: 'FormField',
    category: 'form',
    icon: <CaseSensitive size={16} strokeWidth={1.8} />,
    description: isPt ? 'Estrutura base para padronizar label, hint e mensagens de validacao em qualquer campo.' : 'Base structure to standardize labels, hints, and validation messages for any field.',
    source: 'src/lib/components/form-field.tsx',
    importCode: "import { FormField, FormHint, FormMessage, Input } from '@/lib'",
    snippet: isPt ? `<FormField label="Email" required message="Campo obrigatorio" htmlFor="work-email">
  <Input.Field id="work-email" placeholder="name@company.com" />
</FormField>` : `<FormField label="Email" required message="Required field" htmlFor="work-email">
  <Input.Field id="work-email" placeholder="name@company.com" />
</FormField>`,
    href: '#components/form-field',
    urlText: 'components/form-field',
    preview: (
      <div className="grid gap-6 w-full max-w-[620px] sm:grid-cols-2">
        <FormField
          hint={isPt ? 'Use e-mail corporativo.' : 'Use your company email.'}
          htmlFor="docs-form-field-email"
          label={isPt ? 'Email profissional' : 'Work email'}
          message={isPt ? 'Campo obrigatorio.' : 'This field is required.'}
          required
        >
          <Input.Field icon={<Mail size={18} />} id="docs-form-field-email" placeholder="name@company.com" type="email" />
        </FormField>

        <FormField className="rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] p-3" htmlFor="docs-form-field-slack" label={isPt ? 'Canal interno' : 'Internal channel'}>
          <Input.Field id="docs-form-field-slack" placeholder={isPt ? '#produto-design' : '#product-design'} />
          <FormHint>{isPt ? 'Padrao de comunicacao da squad.' : 'Default communication channel for the squad.'}</FormHint>
          <FormMessage tone="success">{isPt ? 'Configuracao valida.' : 'Configuration looks valid.'}</FormMessage>
        </FormField>
      </div>
    ),
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'form',
    icon: <CheckSquare size={16} strokeWidth={1.8} />,
    description: isPt ? 'Checkbox unico (booleano) para uma unica opcao de consentimento ou preferencia.' : 'Single boolean checkbox for one consent or preference option.',
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
    id: 'checkbox-group',
    name: 'CheckboxGroup',
    category: 'form',
    icon: <CheckSquare size={16} strokeWidth={1.8} />,
    description: isPt ? 'Grupo de checkbox com selecao multipla (pode marcar varias opcoes).' : 'Checkbox group with multiple selection (users can mark multiple options).',
    source: 'src/lib/components/checkbox-group.tsx',
    importCode: "import { CheckboxGroup } from '@/lib'",
    snippet: isPt ? `<CheckboxGroup label="Notificacoes" defaultValue={["product"]}>
  <CheckboxGroup.Item value="product" label="Produto" />
  <CheckboxGroup.Item value="billing" label="Faturamento" />
</CheckboxGroup>` : `<CheckboxGroup label="Notifications" defaultValue={["product"]}>
  <CheckboxGroup.Item value="product" label="Product" />
  <CheckboxGroup.Item value="billing" label="Billing" />
</CheckboxGroup>`,
    href: '#components/checkbox-group',
    urlText: 'components/checkbox-group',
    preview: (
      <CheckboxGroup
        defaultValue={['product']}
        hint={isPt ? 'Selecione todos os temas que deseja receber.' : 'Select all topics you want to receive.'}
        label={isPt ? 'Notificacoes por e-mail' : 'Email notifications'}
      >
        <CheckboxGroup.Item description={isPt ? 'Lançamentos e changelogs.' : 'Releases and changelogs.'} label={isPt ? 'Produto' : 'Product'} value="product" />
        <CheckboxGroup.Item description={isPt ? 'Pagamentos e vencimentos.' : 'Payments and due dates.'} label={isPt ? 'Faturamento' : 'Billing'} value="billing" />
        <CheckboxGroup.Item description={isPt ? 'Incidentes e alertas.' : 'Incidents and alerts.'} label={isPt ? 'Operacoes' : 'Operations'} value="ops" />
      </CheckboxGroup>
    ),
  },
  {
    id: 'radio-group',
    name: 'RadioGroup',
    category: 'form',
    icon: <ListFilter size={16} strokeWidth={1.8} />,
    description: isPt ? 'Grupo de radio com escolha exclusiva (somente uma opcao ativa).' : 'Radio group with exclusive selection (only one active option).',
    source: 'src/lib/components/radio-group.tsx',
    importCode: "import { RadioGroup } from '@/lib'",
    snippet: isPt ? `<RadioGroup label="Plano" defaultValue="team">
  <RadioGroup.Item value="starter" label="Starter" />
  <RadioGroup.Item value="team" label="Team" />
</RadioGroup>` : `<RadioGroup label="Plan" defaultValue="team">
  <RadioGroup.Item value="starter" label="Starter" />
  <RadioGroup.Item value="team" label="Team" />
</RadioGroup>`,
    href: '#components/radio-group',
    urlText: 'components/radio-group',
    preview: (
      <RadioGroup
        defaultValue="team"
        hint={isPt ? 'Apenas uma opcao pode permanecer ativa.' : 'Only one option can stay active.'}
        label={isPt ? 'Plano da equipe' : 'Team plan'}
      >
        <RadioGroup.Item description={isPt ? 'Para testes e prototipos.' : 'For tests and prototypes.'} label="Starter" value="starter" />
        <RadioGroup.Item description={isPt ? 'Para squads em producao.' : 'For squads in production.'} label="Team" value="team" />
        <RadioGroup.Item description={isPt ? 'Governanca corporativa e SSO.' : 'Enterprise governance and SSO.'} label="Scale" value="scale" />
      </RadioGroup>
    ),
  },
  {
    id: 'combobox',
    name: 'Combobox',
    category: 'form',
    icon: <ListFilter size={16} strokeWidth={1.8} />,
    description: isPt ? 'Select com busca para listas maiores e selecao rapida.' : 'Searchable select for larger lists and quick selection.',
    source: 'src/lib/components/combobox.tsx',
    importCode: "import { Combobox } from '@/lib'",
    snippet: isPt ? `<Combobox label="Framework" defaultValue="react">
  <Combobox.Item value="react" label="React" />
  <Combobox.Item value="vue" label="Vue" />
</Combobox>` : `<Combobox label="Framework" defaultValue="react">
  <Combobox.Item value="react" label="React" />
  <Combobox.Item value="vue" label="Vue" />
</Combobox>`,
    href: '#components/combobox',
    urlText: 'components/combobox',
    preview: (
      <div className="grid gap-6 w-full max-w-[640px] sm:grid-cols-2 items-start">
        <Combobox
          defaultValue="react"
          emptyLabel={isPt ? 'Sem resultados para este termo.' : 'No results for this search.'}
          hint={isPt ? 'Digite para filtrar por nome ou descricao.' : 'Type to filter by name or description.'}
          label={isPt ? 'Framework principal' : 'Primary framework'}
          searchPlaceholder={isPt ? 'Buscar framework...' : 'Search framework...'}
        >
          <Combobox.Item description={isPt ? 'Ecossistema completo para UI moderna.' : 'Complete ecosystem for modern UI.'} label="React" value="react" />
          <Combobox.Item description={isPt ? 'Progressivo e simples de iniciar.' : 'Progressive and easy to start.'} label="Vue" value="vue" />
          <Combobox.Item description={isPt ? 'Meta-framework fullstack com SSG/SSR.' : 'Full-stack meta-framework with SSG/SSR.'} label="Next.js" value="next" />
          <Combobox.Item description={isPt ? 'Framework orientado a produtividade.' : 'Productivity-oriented framework.'} label="SvelteKit" value="sveltekit" />
        </Combobox>

        <Combobox
          defaultValue="figma"
          label={isPt ? 'Ferramenta de design' : 'Design tool'}
          searchPlaceholder={isPt ? 'Buscar ferramenta...' : 'Search tool...'}
        >
          <Combobox.Item label="Figma" value="figma" />
          <Combobox.Item label="Framer" value="framer" />
          <Combobox.Item label="Penpot" value="penpot" />
        </Combobox>
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
    description: isPt ? 'Menu de acoes contextuais (lista de comandos) que normalmente fecha apos selecionar um item.' : 'Contextual action menu (command list) that usually closes after selecting an item.',
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
    id: 'popover',
    name: 'Popover',
    category: 'overlay',
    icon: <MessageSquareQuote size={16} strokeWidth={1.8} />,
    description: isPt ? 'Painel contextual ancorado para conteudo rico (texto, campo, acoes) sem semantica de menu.' : 'Anchored contextual panel for richer content (text, fields, actions) without menu semantics.',
    source: 'src/lib/components/popover.tsx',
    importCode: "import { Popover, Button } from '@/lib'",
    snippet: isPt ? `<Popover.Root>
  <Popover.Trigger asChild>
    <Button variant="secondary">Abrir popover</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Atalho rapido</Popover.Title>
    <Popover.Description>Escolha uma acao sem sair da tela.</Popover.Description>
  </Popover.Content>
</Popover.Root>` : `<Popover.Root>
  <Popover.Trigger asChild>
    <Button variant="secondary">Open popover</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Quick shortcut</Popover.Title>
    <Popover.Description>Pick an action without leaving the screen.</Popover.Description>
  </Popover.Content>
</Popover.Root>`,
    href: '#components/popover',
    urlText: 'components/popover',
    preview: (
      <div className="flex items-center gap-3">
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="secondary">{isPt ? 'Abrir popover' : 'Open popover'}</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>{isPt ? 'Atalho rapido' : 'Quick shortcut'}</Popover.Title>
            <Popover.Description>{isPt ? 'Escolha uma acao sem sair da tela atual.' : 'Pick an action without leaving the current screen.'}</Popover.Description>
            <div className="mt-3 flex justify-end">
              <Popover.Close asChild>
                <Button>{isPt ? 'Entendi' : 'Got it'}</Button>
              </Popover.Close>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    ),
  },
  {
    id: 'alert-dialog',
    name: 'AlertDialog',
    category: 'overlay',
    icon: <Bell size={16} strokeWidth={1.8} />,
    description: isPt ? 'Dialog de confirmacao para acoes criticas e destrutivas com CTA de cancelamento e confirmacao.' : 'Confirmation dialog for critical/destructive actions with cancel and confirm CTAs.',
    source: 'src/lib/components/alert-dialog.tsx',
    importCode: "import { AlertDialog, Button } from '@/lib'",
    snippet: isPt ? `<AlertDialog.Root>
  <AlertDialog.Trigger asChild>
    <Button variant="secondary">Excluir projeto</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Excluir projeto?</AlertDialog.Title>
      <AlertDialog.Description>Essa acao nao pode ser desfeita.</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
      <AlertDialog.Action tone="danger">Excluir</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>` : `<AlertDialog.Root>
  <AlertDialog.Trigger asChild>
    <Button variant="secondary">Delete project</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete project?</AlertDialog.Title>
      <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action tone="danger">Delete</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>`,
    href: '#components/alert-dialog',
    urlText: 'components/alert-dialog',
    preview: (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button variant="secondary">{isPt ? 'Excluir projeto' : 'Delete project'}</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>{isPt ? 'Excluir projeto?' : 'Delete project?'}</AlertDialog.Title>
            <AlertDialog.Description>
              {isPt ? 'Essa acao remove definitivamente os dados deste projeto.' : 'This action permanently removes this project data.'}
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>{isPt ? 'Cancelar' : 'Cancel'}</AlertDialog.Cancel>
            <AlertDialog.Action tone="danger">{isPt ? 'Excluir' : 'Delete'}</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    ),
    examples: [
      {
        title: isPt ? 'Confirmacao destrutiva' : 'Destructive confirmation',
        code: isPt ? `<AlertDialog.Root>
  <AlertDialog.Trigger asChild>
    <Button variant="secondary">Excluir item</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Excluir item?</AlertDialog.Title>
      <AlertDialog.Description>Essa acao nao pode ser desfeita.</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
      <AlertDialog.Action tone="danger">Excluir</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>` : `<AlertDialog.Root>
  <AlertDialog.Trigger asChild>
    <Button variant="secondary">Delete item</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete item?</AlertDialog.Title>
      <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action tone="danger">Delete</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>`,
      },
    ],
    api: [
      {
        name: 'AlertDialog.Root',
        type: isPt ? 'container' : 'container',
        description: isPt ? 'Aceita `defaultOpen`, `open` e `onOpenChange` para controle de estado.' : 'Accepts `defaultOpen`, `open`, and `onOpenChange` for state control.',
      },
      {
        name: 'AlertDialog.Action',
        type: isPt ? 'acao principal' : 'primary action',
        description: isPt ? 'Botao de confirmacao com suporte a `tone="danger"` para risco.' : 'Confirmation button with `tone="danger"` support for risky actions.',
      },
      {
        name: 'AlertDialog.Cancel',
        type: isPt ? 'acao secundaria' : 'secondary action',
        description: isPt ? 'Fecha o dialog e cancela a acao atual.' : 'Closes the dialog and cancels current action.',
      },
    ],
  },
  {
    id: 'sheet',
    name: 'Sheet',
    category: 'overlay',
    icon: <PanelsTopLeft size={16} strokeWidth={1.8} />,
    description: isPt ? 'Painel lateral/drawer para filtros, ajustes e fluxos secundarios sem trocar de rota.' : 'Side panel/drawer for filters, settings, and secondary flows without route changes.',
    source: 'src/lib/components/sheet.tsx',
    importCode: "import { Sheet, Button, Input } from '@/lib'",
    snippet: isPt ? `<Sheet.Root>
  <Sheet.Trigger asChild>
    <Button>Abrir painel</Button>
  </Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Filtros</Sheet.Title>
      <Sheet.Description>Ajuste criterios da busca.</Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>` : `<Sheet.Root>
  <Sheet.Trigger asChild>
    <Button>Open panel</Button>
  </Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Filters</Sheet.Title>
      <Sheet.Description>Adjust search criteria.</Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>`,
    href: '#components/sheet',
    urlText: 'components/sheet',
    preview: (
      <Sheet.Root>
        <Sheet.Trigger asChild>
          <Button>{isPt ? 'Abrir painel' : 'Open panel'}</Button>
        </Sheet.Trigger>
        <Sheet.Content side="right">
          <Sheet.Header>
            <Sheet.Title>{isPt ? 'Filtros de projeto' : 'Project filters'}</Sheet.Title>
            <Sheet.Description>{isPt ? 'Atualize os criterios e aplique sem sair da tela.' : 'Update criteria and apply without leaving the current view.'}</Sheet.Description>
          </Sheet.Header>
          <Sheet.Body>
            <div className="grid gap-4">
              <Input label={isPt ? 'Palavra-chave' : 'Keyword'} placeholder={isPt ? 'Buscar por nome...' : 'Search by name...'} />
              <Select label={isPt ? 'Status' : 'Status'} defaultValue="active">
                <Select.Option label={isPt ? 'Ativo' : 'Active'} value="active" />
                <Select.Option label={isPt ? 'Pausado' : 'Paused'} value="paused" />
              </Select>
            </div>
          </Sheet.Body>
          <Sheet.Footer>
            <Sheet.Close asChild>
              <Button variant="secondary">{isPt ? 'Cancelar' : 'Cancel'}</Button>
            </Sheet.Close>
            <Sheet.Close asChild>
              <Button>{isPt ? 'Aplicar' : 'Apply'}</Button>
            </Sheet.Close>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet.Root>
    ),
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
    id: 'toggle-group',
    name: 'ToggleGroup',
    category: 'form',
    icon: <ToggleLeft size={16} strokeWidth={1.8} />,
    description: isPt ? 'Grupo de botoes estilo toggle para selecao exclusiva entre opcoes.' : 'Toggle-style button group for exclusive selection between options.',
    source: 'src/lib/components/toggle-group.tsx',
    importCode: "import { ToggleGroup } from '@/lib'",
    snippet: isPt ? `<ToggleGroup defaultValue="1">
  <ToggleGroup.Item value="1" label="Dia" />
  <ToggleGroup.Item value="2" label="Semana" />
  <ToggleGroup.Item value="3" label="Mes" />
</ToggleGroup>` : `<ToggleGroup defaultValue="1">
  <ToggleGroup.Item value="1" label="Day" />
  <ToggleGroup.Item value="2" label="Week" />
  <ToggleGroup.Item value="3" label="Month" />
</ToggleGroup>`,
    href: '#components/toggle-group',
    urlText: 'components/toggle-group',
    preview: (
      <div className="flex flex-col gap-6">
        <ToggleGroup defaultValue="1">
          <ToggleGroup.Item value="1" label={isPt ? 'Dia' : 'Day'} />
          <ToggleGroup.Item value="2" label={isPt ? 'Semana' : 'Week'} />
          <ToggleGroup.Item value="3" label={isPt ? 'Mês' : 'Month'} />
        </ToggleGroup>
        <ToggleGroup defaultValue="2" orientation="vertical">
          <ToggleGroup.Item value="1" label={isPt ? 'Pequeno' : 'Small'} />
          <ToggleGroup.Item value="2" label={isPt ? 'Médio' : 'Medium'} />
          <ToggleGroup.Item value="3" label={isPt ? 'Grande' : 'Large'} />
        </ToggleGroup>
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Horizontal' : 'Horizontal',
        code: isPt ? `<ToggleGroup defaultValue="1">
  <ToggleGroup.Item value="1" label="Dia" />
  <ToggleGroup.Item value="2" label="Semana" />
  <ToggleGroup.Item value="3" label="Mês" />
</ToggleGroup>` : `<ToggleGroup defaultValue="1">
  <ToggleGroup.Item value="1" label="Day" />
  <ToggleGroup.Item value="2" label="Week" />
  <ToggleGroup.Item value="3" label="Month" />
</ToggleGroup>`,
      },
      {
        title: isPt ? 'Vertical' : 'Vertical',
        code: isPt ? `<ToggleGroup defaultValue="1" orientation="vertical">
  <ToggleGroup.Item value="1" label="Pequeno" />
  <ToggleGroup.Item value="2" label="Médio" />
  <ToggleGroup.Item value="3" label="Grande" />
</ToggleGroup>` : `<ToggleGroup defaultValue="1" orientation="vertical">
  <ToggleGroup.Item value="1" label="Small" />
  <ToggleGroup.Item value="2" label="Medium" />
  <ToggleGroup.Item value="3" label="Large" />
</ToggleGroup>`,
      },
    ],
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'form',
    icon: <BetweenHorizontalStart size={16} strokeWidth={1.8} />,
    description: isPt ? 'Controle deslizante para selecao de valores numericos em um intervalo.' : 'Slider control for selecting numeric values within a range.',
    source: 'src/lib/components/slider.tsx',
    importCode: "import { Slider } from '@/lib'",
    snippet: isPt ? `<Slider defaultValue={50} label="Volume" showValue />` : `<Slider defaultValue={50} label="Volume" showValue />`,
    href: '#components/slider',
    urlText: 'components/slider',
    preview: (
      <div className="flex flex-col gap-8 w-full max-w-[400px]">
        <Slider defaultValue={50} label={isPt ? 'Volume' : 'Volume'} showValue />
        <Slider defaultValue={75} min={0} max={100} step={5} label={isPt ? 'Progresso' : 'Progress'} showValue formatValue={(v) => v + '%'} />
        <Slider defaultValue={25} disabled label={isPt ? 'Desabilitado' : 'Disabled'} showValue />
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Básico' : 'Basic',
        code: isPt ? `<Slider defaultValue={50} label="Volume" showValue />` : `<Slider defaultValue={50} label="Volume" showValue />`,
      },
      {
        title: isPt ? 'Com formatação' : 'With formatting',
        code: isPt ? `<Slider defaultValue={75} min={0} max={100} step={5} label="Progresso" showValue formatValue={(v) => v + '%'} />` : `<Slider defaultValue={75} min={0} max={100} step={5} label="Progress" showValue formatValue={(v) => v + '%'} />`,
      },
    ],
  },
  {
    id: 'file-upload',
    name: 'FileUpload',
    category: 'form',
    icon: <Upload size={16} strokeWidth={1.8} />,
    description: isPt ? 'Area de upload com drag & drop, preview de imagens e validacao.' : 'Upload area with drag & drop, image preview and validation.',
    source: 'src/lib/components/file-upload.tsx',
    importCode: "import { FileUpload } from '@/lib'",
    snippet: isPt ? `<FileUpload label="Arquivos" accept="image/*,.pdf" maxSize={5000000} />` : `<FileUpload label="Files" accept="image/*,.pdf" maxSize={5000000} />`,
    href: '#components/file-upload',
    urlText: 'components/file-upload',
    preview: (
      <div className="w-full max-w-[400px]">
        <FileUpload
          label={isPt ? 'Upload de arquivos' : 'File upload'}
          accept="image/*,.pdf"
          maxSize={5000000}
          maxFiles={3}
          hint={isPt ? 'Arraste ou clique para selecionar' : 'Drag or click to select'}
        />
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Imagens apenas' : 'Images only',
        code: isPt ? `<FileUpload label="Fotos" accept="image/*" multiple />` : `<FileUpload label="Photos" accept="image/*" multiple />`,
      },
      {
        title: isPt ? 'Com limite de tamanho' : 'With size limit',
        code: isPt ? `<FileUpload label="Documentos" accept=".pdf,.doc" maxSize={10000000} />` : `<FileUpload label="Documents" accept=".pdf,.doc" maxSize={10000000} />`,
      },
    ],
  },
  {
    id: 'search-input',
    name: 'SearchInput',
    category: 'form',
    icon: <Search size={16} strokeWidth={1.8} />,
    description: isPt ? 'Input de busca com debounce integrado e botao de limpar.' : 'Search input with built-in debounce and clear button.',
    source: 'src/lib/components/search-input.tsx',
    importCode: "import { SearchInput } from '@/lib'",
    snippet: isPt ? `<SearchInput label="Buscar" placeholder="Digite para buscar..." debounceMs={300} />` : `<SearchInput label="Search" placeholder="Type to search..." debounceMs={300} />`,
    href: '#components/search-input',
    urlText: 'components/search-input',
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        <SearchInput
          label={isPt ? 'Buscar produtos' : 'Search products'}
          placeholder={isPt ? 'Nome do produto...' : 'Product name...'}
          debounceMs={300}
        />
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Básico' : 'Basic',
        code: isPt ? `<SearchInput placeholder="Buscar..." />` : `<SearchInput placeholder="Search..." />`,
      },
      {
        title: isPt ? 'Com debounce' : 'With debounce',
        code: isPt ? `<SearchInput debounceMs={500} onSearch={(value) => console.log(value)} />` : `<SearchInput debounceMs={500} onSearch={(value) => console.log(value)} />`,
      },
    ],
  },
  {
    id: 'progress',
    name: 'Progress',
    category: 'feedback',
    icon: <Circle size={16} strokeWidth={1.8} />,
    description: isPt ? 'Barra ou circular de progresso com variants de cor e tamanho.' : 'Linear or circular progress bar with color variants and sizes.',
    source: 'src/lib/components/progress.tsx',
    importCode: "import { Progress } from '@/lib'",
    snippet: isPt ? `<Progress value={60} label="Carregando" />` : `<Progress value={60} label="Loading" />`,
    href: '#components/progress',
    urlText: 'components/progress',
    preview: (
      <div className="flex flex-col gap-6 w-full max-w-[300px]">
        <Progress value={60} label={isPt ? 'Progresso' : 'Progress'} showValue />
        <Progress value={45} variant="success" label={isPt ? 'Completo' : 'Complete'} showValue />
        <Progress value={80} variant="warning" label={isPt ? 'Atenção' : 'Warning'} showValue />
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Linear' : 'Linear',
        code: isPt ? `<Progress value={60} label="Progresso" showValue />` : `<Progress value={60} label="Progress" showValue />`,
      },
      {
        title: isPt ? 'Circular' : 'Circular',
        code: isPt ? `<Progress value={75} shape="circular" label="Carregando" showValue />` : `<Progress value={75} shape="circular" label="Loading" showValue />`,
      },
      {
        title: isPt ? 'Indeterminado' : 'Indeterminate',
        code: isPt ? `<Progress indeterminate label="Carregando..." />` : `<Progress indeterminate label="Loading..." />`,
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'feedback',
    icon: <Circle size={16} strokeWidth={1.8} />,
    description: isPt ? 'Indicador de status com variants de cor e opçao de ponto.' : 'Status indicator with color variants and optional dot.',
    source: 'src/lib/components/badge.tsx',
    importCode: "import { Badge } from '@/lib'",
    snippet: isPt ? `<Badge variant="success">Online</Badge>` : `<Badge variant="success">Online</Badge>`,
    href: '#components/badge',
    urlText: 'components/badge',
    preview: (
      <div className="flex flex-wrap gap-3">
        <Badge variant="default">{isPt ? 'Padrão' : 'Default'}</Badge>
        <Badge variant="success" dot>{isPt ? 'Online' : 'Online'}</Badge>
        <Badge variant="warning" dot>{isPt ? 'Pendente' : 'Pending'}</Badge>
        <Badge variant="error" dot>{isPt ? 'Erro' : 'Error'}</Badge>
        <Badge variant="neutral">{isPt ? 'Inativo' : 'Inactive'}</Badge>
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Básico' : 'Basic',
        code: isPt ? `<Badge>Novo</Badge>` : `<Badge>New</Badge>`,
      },
      {
        title: isPt ? 'Com ponto' : 'With dot',
        code: isPt ? `<Badge variant="success" dot>Online</Badge>` : `<Badge variant="success" dot>Online</Badge>`,
      },
      {
        title: isPt ? 'Tamanhos' : 'Sizes',
        code: isPt ? `<><Badge size="sm">Pequeno</Badge><Badge size="md">Médio</Badge><Badge size="lg">Grande</Badge></>` : `<><Badge size="sm">Small</Badge><Badge size="md">Medium</Badge><Badge size="lg">Large</Badge></>`,
      },
    ],
  },
  {
    id: 'navbar',
    name: 'Navbar',
    category: 'navigation',
    icon: <Menu size={16} strokeWidth={1.8} />,
    description: isPt ? 'Header responsivo com brand, navegacao, dropdowns e acoes.' : 'Responsive header with brand, navigation, dropdowns and actions.',
    source: 'src/lib/components/navbar.tsx',
    importCode: "import { Navbar } from '@/lib'",
    snippet: isPt ? `<Navbar
  brandTitle="MyApp"
  brandSubtitle="PRO"
  navItems={[{ id: '1', label: 'Home', href: '/' }]}
  actions={[{ id: '1', label: 'Login', variant: 'primary' }]}
/>` : `<Navbar
  brandTitle="MyApp"
  brandSubtitle="PRO"
  navItems={[{ id: '1', label: 'Home', href: '/' }]}
  actions={[{ id: '1', label: 'Login', variant: 'primary' }]}
/>`,
    href: '#components/navbar',
    urlText: 'components/navbar',
    preview: (
      <div className="w-full">
        <Navbar
          brandTitle="Auralith"
          brandSubtitle="UI"
          navItems={[
            { id: '1', label: isPt ? 'Início' : 'Home', href: '#' },
            { id: '2', label: isPt ? 'Docs' : 'Docs', href: '#' },
            { id: '3', label: isPt ? 'Componentes' : 'Components', href: '#' },
          ]}
          actions={[
            { id: '1', label: isPt ? 'Login' : 'Login', variant: 'primary' },
            { id: '2', label: isPt ? 'GitHub' : 'GitHub', variant: 'secondary' },
          ]}
        />
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Básico' : 'Basic',
        code: isPt ? `<Navbar brandTitle="MinhaApp" navItems={[{ id: '1', label: 'Home', href: '/' }]} />` : `<Navbar brandTitle="MyApp" navItems={[{ id: '1', label: 'Home', href: '/' }]} />`,
      },
      {
        title: isPt ? 'Com ações' : 'With actions',
        code: isPt ? `<Navbar brandTitle="MinhaApp" actions={[{ id: '1', label: 'Login', variant: 'primary' }]} />` : `<Navbar brandTitle="MyApp" actions={[{ id: '1', label: 'Login', variant: 'primary' }]} />`,
      },
    ],
  },
  {
    id: 'context-menu',
    name: 'ContextMenu',
    category: 'overlay',
    icon: <Menu size={16} strokeWidth={1.8} />,
    description: isPt ? 'Menu de contexto ao clicar com botao direito do mouse.' : 'Context menu on right-click mouse button.',
    source: 'src/lib/components/context-menu.tsx',
    importCode: "import { ContextMenu } from '@/lib'\nimport { Copy, Edit, Trash } from 'lucide-react'",
    snippet: isPt ? `<ContextMenu
  items={[
    { id: 'copy', label: 'Copiar', icon: <Copy size={14} /> },
    { id: 'edit', label: 'Editar', icon: <Edit size={14} /> },
  ]}
/>` : `<ContextMenu
  items={[
    { id: 'copy', label: 'Copy', icon: <Copy size={14} /> },
    { id: 'edit', label: 'Edit', icon: <Edit size={14} /> },
  ]}
/>`,
    href: '#components/context-menu',
    urlText: 'components/context-menu',
    preview: (
      <div className="flex items-center justify-center p-8">
        <ContextMenu
          items={[
            { id: 'copy', label: isPt ? 'Copiar' : 'Copy', shortcut: 'Ctrl+C' },
            { id: 'paste', label: isPt ? 'Colar' : 'Paste', shortcut: 'Ctrl+V' },
            { id: 'edit', label: isPt ? 'Editar' : 'Edit' },
            { id: 'delete', label: isPt ? 'Excluir' : 'Delete' },
          ]}
        >
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--surface-base)] px-6 py-4 text-sm text-[var(--text-muted)]">
            {isPt ? 'Clique com botão direito' : 'Right click here'}
          </div>
        </ContextMenu>
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Básico' : 'Basic',
        code: isPt ? `<ContextMenu items={[{ id: '1', label: 'Opção 1' }]}><div>Conteúdo</div></ContextMenu>` : `<ContextMenu items={[{ id: '1', label: 'Option 1' }]}><div>Content</div></ContextMenu>`,
      },
    ],
  },
  {
    id: 'command-palette',
    name: 'CommandPalette',
    category: 'overlay',
    icon: <Command size={16} strokeWidth={1.8} />,
    description: isPt ? 'Menu de busca estilo Cmd+K com atalho de teclado.' : 'Cmd+K style search menu with keyboard shortcut.',
    source: 'src/lib/components/command-palette.tsx',
    importCode: "import { CommandPalette } from '@/lib'\nimport { Settings, User, Home } from 'lucide-react'",
    snippet: isPt ? `<CommandPalette
  items={[
    { id: 'home', label: 'Home', icon: <Home /> },
    { id: 'settings', label: 'Configurações', icon: <Settings /> },
  ]}
/>` : `<CommandPalette
  items={[
    { id: 'home', label: 'Home', icon: <Home /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ]}
/>`,
    href: '#components/command-palette',
    urlText: 'components/command-palette',
    preview: (
      <div className="flex items-center justify-center p-8">
        <CommandPalette
          placeholder={isPt ? 'Buscar comando...' : 'Search command...'}
          items={[
            { id: 'home', label: isPt ? 'Ir para Home' : 'Go to Home', shortcut: 'H' },
            { id: 'docs', label: isPt ? 'Documentação' : 'Documentation', shortcut: 'D' },
            { id: 'settings', label: isPt ? 'Configurações' : 'Settings', shortcut: 'S' },
            { id: 'profile', label: isPt ? 'Perfil' : 'Profile', shortcut: 'P' },
          ]}
        />
      </div>
    ),
    examples: [
      {
        title: isPt ? 'Básico' : 'Basic',
        code: isPt ? `<CommandPalette items={[{ id: '1', label: 'Buscar' }]} />` : `<CommandPalette items={[{ id: '1', label: 'Search' }]} />`,
      },
    ],
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
    id: 'alert',
    name: 'Alert',
    category: 'feedback',
    icon: <Bell size={16} strokeWidth={1.8} />,
    description: isPt ? 'Feedback persistente inline para estados de sucesso, aviso, informacao e erro.' : 'Persistent inline feedback for success, warning, info, and error states.',
    source: 'src/lib/components/alert.tsx',
    importCode: "import { Alert } from '@/lib'",
    snippet: isPt ? `<Alert.Root variant="warning">
  <Alert.Title>Revisao pendente</Alert.Title>
  <Alert.Description>Confira os campos antes de publicar.</Alert.Description>
</Alert.Root>` : `<Alert.Root variant="warning">
  <Alert.Title>Pending review</Alert.Title>
  <Alert.Description>Check your fields before publishing.</Alert.Description>
</Alert.Root>`,
    href: '#components/alert',
    urlText: 'components/alert',
    preview: (
      <div className="grid gap-3 w-full max-w-[700px]">
        <Alert.Root variant="info">
          <Alert.Title>{isPt ? 'Atualizacao de integracao' : 'Integration update'}</Alert.Title>
          <Alert.Description>{isPt ? 'Conexao MCP validada com sucesso para ambiente local.' : 'MCP connection validated successfully for local environment.'}</Alert.Description>
        </Alert.Root>
        <Alert.Root variant="warning">
          <Alert.Title>{isPt ? 'Atenção ao deploy' : 'Pay attention before deploy'}</Alert.Title>
          <Alert.Description>{isPt ? 'Existem alteracoes sem commit no workspace.' : 'There are uncommitted changes in the workspace.'}</Alert.Description>
        </Alert.Root>
        <Alert.Root variant="error">
          <Alert.Title>{isPt ? 'Falha de validacao' : 'Validation failed'}</Alert.Title>
          <Alert.Description>{isPt ? 'Revise os campos obrigatorios e tente novamente.' : 'Review required fields and try again.'}</Alert.Description>
        </Alert.Root>
      </div>
    ),
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'feedback',
    icon: <SquareStack size={16} strokeWidth={1.8} />,
    description: isPt ? 'Placeholder de carregamento para evitar layout shift e melhorar UX percebida.' : 'Loading placeholder to avoid layout shift and improve perceived UX.',
    source: 'src/lib/components/skeleton.tsx',
    importCode: "import { Skeleton } from '@/lib'",
    snippet: isPt ? `<div className="grid gap-2">
  <Skeleton className="h-4 w-28" />
  <Skeleton className="h-20 w-full" />
</div>` : `<div className="grid gap-2">
  <Skeleton className="h-4 w-28" />
  <Skeleton className="h-20 w-full" />
</div>`,
    href: '#components/skeleton',
    urlText: 'components/skeleton',
    preview: (
      <div className="grid gap-4 w-full max-w-[680px] sm:grid-cols-2">
        <Card className="p-3" variant="subtle">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-24 w-full" />
          </div>
        </Card>
        <Card className="p-3" variant="subtle">
          <div className="grid gap-2">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </Card>
      </div>
    ),
  },
  {
    id: 'empty-state',
    name: 'EmptyState',
    category: 'feedback',
    icon: <Layers size={16} strokeWidth={1.8} />,
    description: isPt ? 'Estado vazio para listas, buscas e dashboards sem dados iniciais.' : 'Empty state for lists, searches, and dashboards with no initial data.',
    source: 'src/lib/components/empty-state.tsx',
    importCode: "import { EmptyState, Button } from '@/lib'",
    snippet: isPt ? `<EmptyState.Root
  heading="Nenhum projeto ainda"
  description="Crie o primeiro projeto para iniciar o painel."
  action={<Button>Novo projeto</Button>}
/>` : `<EmptyState.Root
  heading="No projects yet"
  description="Create your first project to start the dashboard."
  action={<Button>New project</Button>}
/>`,
    href: '#components/empty-state',
    urlText: 'components/empty-state',
    preview: (
      <div className="grid gap-4 w-full max-w-[760px] md:grid-cols-2">
        <EmptyState.Root
          action={<Button>{isPt ? 'Novo projeto' : 'New project'}</Button>}
          description={isPt ? 'Crie o primeiro projeto para começar o workspace.' : 'Create your first project to start the workspace.'}
          heading={isPt ? 'Nenhum projeto ainda' : 'No projects yet'}
        />
        <EmptyState.Root
          action={<Button variant="secondary">{isPt ? 'Limpar filtros' : 'Clear filters'}</Button>}
          description={isPt ? 'Nenhum resultado combina com sua busca atual.' : 'No results match your current search.'}
          heading={isPt ? 'Sem resultados' : 'No results'}
        />
      </div>
    ),
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
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    icon: <Columns size={16} strokeWidth={1.8} />,
    description: isPt ? 'Trilha de navegacao para dar contexto em rotas internas e estruturas hierarquicas.' : 'Navigation trail to provide context in nested routes and hierarchical structures.',
    source: 'src/lib/components/breadcrumb.tsx',
    importCode: "import { Breadcrumb } from '@/lib'",
    snippet: isPt ? `<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Item><Breadcrumb.Separator /></Breadcrumb.Item>
    <Breadcrumb.Item><Breadcrumb.Current>Projetos</Breadcrumb.Current></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>` : `<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Item><Breadcrumb.Separator /></Breadcrumb.Item>
    <Breadcrumb.Item><Breadcrumb.Current>Projects</Breadcrumb.Current></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>`,
    href: '#components/breadcrumb',
    urlText: 'components/breadcrumb',
    preview: (
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#landing">{isPt ? 'Inicio' : 'Home'}</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Separator />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#components">{isPt ? 'Componentes' : 'Components'}</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Separator />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Current>{isPt ? 'Navegacao' : 'Navigation'}</Breadcrumb.Current>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    ),
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'navigation',
    icon: <BetweenHorizontalStart size={16} strokeWidth={1.8} />,
    description: isPt ? 'Controle de paginacao para listas longas com estados anterior/proximo e ellipsis.' : 'Pagination control for long lists with previous/next states and ellipsis.',
    source: 'src/lib/components/pagination.tsx',
    importCode: "import { Pagination } from '@/lib'",
    snippet: isPt ? `<Pagination currentPage={3} totalPages={12} onPageChange={setPage} />` : `<Pagination currentPage={3} totalPages={12} onPageChange={setPage} />`,
    href: '#components/pagination',
    urlText: 'components/pagination',
    preview: (
      <div className="flex flex-col gap-3">
        <Pagination currentPage={3} totalPages={12} onPageChange={() => {}} />
        <p className="text-[0.78rem] text-[color:var(--text-muted)]">
          {isPt ? 'Exemplo estatico para visual da navegacao entre paginas.' : 'Static preview showing pagination navigation visuals.'}
        </p>
      </div>
    ),
  },
  {
    id: 'stepper',
    name: 'Stepper',
    category: 'navigation',
    icon: <Waypoints size={16} strokeWidth={1.8} />,
    description: isPt ? 'Fluxo de etapas para onboarding, checkout e configuracoes guiadas.' : 'Step flow component for onboarding, checkout, and guided setup.',
    source: 'src/lib/components/stepper.tsx',
    importCode: "import { Stepper } from '@/lib'",
    snippet: isPt ? `<Stepper currentStep="config" onStepChange={setStep}>
  <Stepper.Item value="conta" label="Conta" />
  <Stepper.Item value="config" label="Config" />
  <Stepper.Item value="revisao" label="Revisao" />
</Stepper>` : `<Stepper currentStep="config" onStepChange={setStep}>
  <Stepper.Item value="account" label="Account" />
  <Stepper.Item value="config" label="Config" />
  <Stepper.Item value="review" label="Review" />
</Stepper>`,
    href: '#components/stepper',
    urlText: 'components/stepper',
    preview: (
      <Stepper currentStep="config" onStepChange={() => {}}>
        <Stepper.Item
          description={isPt ? 'Dados iniciais do workspace.' : 'Initial workspace details.'}
          label={isPt ? 'Conta' : 'Account'}
          value="account"
        />
        <Stepper.Item
          description={isPt ? 'Preferencias visuais e notificacoes.' : 'Visual preferences and notifications.'}
          label={isPt ? 'Config' : 'Config'}
          value="config"
        />
        <Stepper.Item
          description={isPt ? 'Revisao final antes de concluir.' : 'Final review before completion.'}
          label={isPt ? 'Revisao' : 'Review'}
          value="review"
        />
      </Stepper>
    ),
  },
  {
    id: 'table-toolbar',
    name: 'TableToolbar',
    category: 'data',
    icon: <ListFilter size={16} strokeWidth={1.8} />,
    description: isPt ? 'Barra utilitaria para busca, filtros e acao primaria em listagens.' : 'Utility bar for search, filters, and primary action in list views.',
    source: 'src/lib/components/table-toolbar.tsx',
    importCode: "import { TableToolbar, Button, Select } from '@/lib'",
    snippet: isPt ? `<TableToolbar
  searchValue={query}
  onSearchValueChange={setQuery}
  filtersSlot={<Select label="Status" />}
  primaryAction={<Button>Novo</Button>}
/>` : `<TableToolbar
  searchValue={query}
  onSearchValueChange={setQuery}
  filtersSlot={<Select label="Status" />}
  primaryAction={<Button>New</Button>}
/>`,
    href: '#components/table-toolbar',
    urlText: 'components/table-toolbar',
    preview: (
      <TableToolbar
        filtersSlot={(
          <Select defaultValue="active">
            <Select.Option label={isPt ? 'Ativo' : 'Active'} value="active" />
            <Select.Option label={isPt ? 'Arquivado' : 'Archived'} value="archived" />
          </Select>
        )}
        onSearchValueChange={() => {}}
        primaryAction={<Button>{isPt ? 'Novo registro' : 'New record'}</Button>}
        searchPlaceholder={isPt ? 'Buscar por nome...' : 'Search by name...'}
        searchValue=""
      />
    ),
  },
  {
    id: 'data-table',
    name: 'DataTable',
    category: 'data',
    icon: <SquareStack size={16} strokeWidth={1.8} />,
    description: isPt ? 'Tabela leve para listagens com suporte a colunas customizadas e estado vazio.' : 'Lightweight table for list views with custom columns and empty state support.',
    source: 'src/lib/components/data-table.tsx',
    importCode: "import { DataTable, Tag, Button } from '@/lib'",
    snippet: isPt ? `<DataTable
  columns={[{ key: 'name', header: 'Nome' }]}
  data={[{ name: 'Aurora' }]}
/>` : `<DataTable
  columns={[{ key: 'name', header: 'Name' }]}
  data={[{ name: 'Aurora' }]}
/>`,
    href: '#components/data-table',
    urlText: 'components/data-table',
    preview: (
      <DataTable
        columns={[
          { key: 'name', header: isPt ? 'Projeto' : 'Project' },
          {
            key: 'status',
            header: isPt ? 'Status' : 'Status',
            render: (row) => (
              <Tag className="border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)]">
                {row.status}
              </Tag>
            ),
          },
          { key: 'owner', header: isPt ? 'Responsavel' : 'Owner' },
          {
            key: 'action',
            header: isPt ? 'Acao' : 'Action',
            align: 'right',
            render: () => <Button variant="secondary">{isPt ? 'Abrir' : 'Open'}</Button>,
          },
        ]}
        data={[
          { action: 'open', name: 'Auralith UI', owner: 'Danilo', status: isPt ? 'Ativo' : 'Active' },
          { action: 'open', name: 'landing-pages-templates', owner: 'Danilo', status: isPt ? 'Ativo' : 'Active' },
          { action: 'open', name: 'new_portfolio', owner: 'Danilo', status: isPt ? 'Em revisao' : 'In review' },
        ]}
      />
    ),
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
