import { CodeBlock, GlassPanel, Tag, Card } from '../../lib'
import { SectionHeader } from '../../lib/components/section-header'
import { useLocale } from '../../locale-context'
import type { ComponentDoc } from '../../types/docs'
import { Zap, Puzzle, Library, Layers, Asterisk, ShieldCheck } from 'lucide-react'

function getCategoryLabel(category: string, isPt: boolean) {
  if (!isPt) return category

  return {
    primitive: 'primitivo',
    surface: 'superficie',
    typography: 'tipografia',
    feedback: 'feedback',
    form: 'formulario',
    pattern: 'pattern',
    navigation: 'navegacao',
    overlay: 'overlay',
  }[category] ?? category
}

export function ModalDetailView({ doc }: { doc: ComponentDoc }) {
  const { language, strings } = useLocale()
  const isPt = language === 'pt'
  const examples = doc.examples?.filter((example, index) => index !== 0 || example.code.trim() !== doc.snippet.trim()) ?? []
  const sectionLabelClass = 'font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]'

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 w-full max-w-full">
      {/* 1. HERO MASSIVE CANVAS */}
      <GlassPanel className="w-full p-0 overflow-hidden border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)] relative shadow-[inset_0px_1px_1px_rgba(255,255,255,0.02)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(111,224,255,0.06)_0%,transparent_60%),repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(255,255,255,0.01)_24px,rgba(255,255,255,0.01)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.01)_24px,rgba(255,255,255,0.01)_25px)] pointer-events-none" />
        
        <div className="relative p-6 sm:p-10 flex flex-col items-center">
           <div className="flex flex-wrap gap-3 mb-8 w-full max-w-[1000px]">
            <Tag>{getCategoryLabel(doc.category, isPt)}</Tag>
            <Tag>{doc.name}</Tag>
            <Tag className="bg-[rgba(111,224,255,0.07)] text-[color:var(--accent-soft)] border-[rgba(111,224,255,0.15)] select-none">
              <Asterisk size={12} className="mr-1.5 inline-block -mt-0.5" />
              {isPt ? 'Flow Interativo Premium' : 'Premium Interactive Flow'}
            </Tag>
          </div>

          <div className="mb-10 w-full max-w-[1000px]">
            <h1 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-[color:var(--text-main)] drop-shadow-sm">{doc.name}</h1>
            <p className="mt-5 text-[1.05rem] leading-7 text-[color:var(--text-soft)] max-w-[640px]">{doc.description}</p>
          </div>

          <div className="w-full relative flex justify-center py-6">
            <div className="relative z-10 w-full max-w-3xl">
               {doc.preview}
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* 2. THE BENTO GRID */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] w-full max-w-full">
        
        {/* LEFT COLUMN: Main Tech Information */}
        <div className="space-y-6 min-w-0">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Zap size={16} className="text-[color:var(--accent-line)]" />
              <p className={sectionLabelClass}>{strings.docs.basicUsageLabel}</p>
            </div>
            <CodeBlock snippets={[{ code: doc.snippet, language: 'tsx' }]} />
          </GlassPanel>

          {examples.length ? (
            <GlassPanel className="p-6">
              <p className={sectionLabelClass}>{isPt ? 'Exemplos de Composicao' : 'Composition Examples'}</p>
              <div className="mt-6 flex flex-col gap-6">
                {examples.map((example) => (
                  <div key={example.title} className="rounded-xl border border-[color:var(--card-border)] overflow-hidden bg-[color:var(--surface-soft)] shadow-sm">
                    <div className="px-5 py-4 border-b border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)]">
                      <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1.1rem] font-semibold text-[color:var(--text-main)]">{example.title}</p>
                    </div>
                    <div className="p-2 sm:p-4">
                      <CodeBlock snippets={[{ code: example.code, language: 'tsx' }]} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          ) : null}

          {doc.parts?.length ? (
            <GlassPanel className="p-6 relative overflow-hidden bg-[radial-gradient(ellipse_120%_90%_at_0%_0%,rgba(111,224,255,0.06)_0%,transparent_60%)]">
              <div className="flex items-center gap-2 mb-6">
                <Puzzle size={16} className="text-[color:var(--accent-soft)]" />
                <p className={sectionLabelClass}>{isPt ? 'Subcomponentes Opcionais' : 'Optional Sub-components'}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 relative z-10">
                {doc.parts.map((part) => (
                  <div className="group rounded-[12px] border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)] p-4 hover:border-[rgba(111,224,255,0.2)] transition-colors duration-300" key={part.name}>
                    <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs text-[color:var(--accent-line)] font-medium bg-[rgba(111,224,255,0.05)] shadow-[inset_0px_1px_1px_rgba(255,255,255,0.05)] inline-block px-2.5 py-1 rounded-[6px] mb-3 group-hover:bg-[rgba(111,224,255,0.08)] transition-colors">
                      {part.name}
                    </span>
                    <p className="text-[0.84rem] leading-6 text-[color:var(--text-soft)]">{part.description}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          ) : null}
        </div>

        {/* RIGHT COLUMN: Metadata & API Details */}
        <div className="space-y-6 min-w-0">
          <GlassPanel className="p-5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[color:var(--accent-line)] opacity-[0.02] blur-[40px] rounded-full group-hover:opacity-[0.06] transition-opacity duration-500" />
            
            <p className={sectionLabelClass}>{strings.docs.importLabel}</p>
            <div className="mt-4 relative z-10">
               <CodeBlock snippets={[{ code: doc.importCode, language: 'ts' }]} />
            </div>
            
            <hr className="my-6 border-[color:var(--card-border)] opacity-60" />
            
            <p className={sectionLabelClass}>{strings.docs.sourceLabel}</p>
            <div className="mt-3 rounded-[8px] bg-[rgba(0,0,0,0.15)] border border-[color:var(--card-border)] px-3 py-2.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] relative z-10">
              <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.7rem] overflow-x-auto whitespace-nowrap text-[color:var(--text-muted)] text-center select-all">
                {doc.source}
              </p>
            </div>
          </GlassPanel>

          {doc.notes?.length ? (
            <GlassPanel className="p-6 border-l-2 border-l-[color:var(--accent-line)] bg-gradient-to-r from-[rgba(111,224,255,0.03)] to-transparent">
               <p className={sectionLabelClass}>{isPt ? 'Dicas Profissionais' : 'Pro Tips'}</p>
               <div className="mt-5 flex flex-col gap-4">
                 {doc.notes.map((note) => (
                   <p className="text-[0.86rem] leading-6 text-[color:var(--text-main)] italic" key={note}>
                     "{note}"
                   </p>
                 ))}
               </div>
            </GlassPanel>
          ) : null}

          {doc.anatomy?.length ? (
            <GlassPanel className="p-6 bg-[color:var(--surface-base)]">
              <div className="flex items-center gap-2 mb-5">
                <Layers size={16} className="text-[color:var(--text-muted)] opacity-80" />
                <p className={sectionLabelClass}>{isPt ? 'Anatomia da Arvore' : 'Tree Anatomy'}</p>
              </div>
              <div className="relative pl-3 border-l-[1.5px] border-[color:var(--card-border)] py-1">
                {doc.anatomy.map((part, index) => (
                  <div className="relative mb-4 last:mb-0" key={part}>
                    <div className="absolute -left-3 top-[10px] w-[14px] h-[1.5px] bg-[color:var(--card-border)]" />
                    <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.72rem] bg-[color:var(--surface-hover)] border border-[color:var(--card-border)] text-[color:var(--text-soft)] px-2.5 py-1.5 rounded-[8px] shadow-sm ml-3 block w-fit">
                      {part}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          ) : null}

          <GlassPanel className="p-6 bg-[color:var(--surface-base)]">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={16} className="text-[color:var(--text-muted)] opacity-80" />
              <p className={sectionLabelClass}>{isPt ? 'Acessibilidade (A11Y)' : 'Accessibility (A11Y)'}</p>
            </div>
            <ul className="space-y-4 font-[Space_Grotesk,sans-serif] text-[0.85rem] text-[color:var(--text-soft)]">
              <li className="flex items-start gap-3">
                 <span className="mt-1.5 w-[5px] h-[5px] rounded-full bg-[color:var(--accent-line)] shrink-0 shadow-[0_0_8px_rgba(111,224,255,0.6)]" />
                 {isPt ? 'Foco preso (Focus Trap) no interior do portal do modal.' : 'Automatic focus trap inside the modal portal.'}
              </li>
              <li className="flex items-start gap-3">
                 <span className="mt-1.5 w-[5px] h-[5px] rounded-full bg-[color:var(--accent-line)] shrink-0 shadow-[0_0_8px_rgba(111,224,255,0.6)]" />
                 {isPt ? 'Tecla Escape (Esc) fecha o painel ativando animacao de saida natural.' : 'Escape key closes the panel triggering natural exit animation.'}
              </li>
              <li className="flex items-start gap-3">
                 <span className="mt-1.5 w-[5px] h-[5px] rounded-full bg-[color:var(--accent-line)] shrink-0 shadow-[0_0_8px_rgba(111,224,255,0.6)]" />
                 {isPt ? 'Anotacao `aria-modal="true"` configurada no Root por padrao.' : '`aria-modal="true"` properly set on the Root overlay by default.'}
              </li>
            </ul>
          </GlassPanel>

          {doc.api?.length ? (
            <GlassPanel className="p-0 border overflow-hidden">
              <div className="flex items-center gap-2 p-5 border-b border-[color:var(--card-border)] bg-[rgba(255,255,255,0.015)]">
                <Library size={16} className="text-[color:var(--text-muted)] opacity-80" />
                <p className={sectionLabelClass}>{isPt ? 'Referencia da API' : 'API Reference'}</p>
              </div>
              <div className="flex flex-col p-5 gap-4">
                {doc.api.map((item) => (
                  <div className="border-b last:border-0 border-[color:var(--card-border)]/50 pb-4 last:pb-0" key={item.name}>
                    <div className="flex justify-between items-center mb-2.5">
                       <span className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.75rem] font-medium text-[color:var(--accent-soft)] break-all px-1 bg-[rgba(111,224,255,0.05)] rounded">
                         {item.name}
                       </span>
                       <span className="text-[0.62rem] tracking-wide font-medium px-2 py-0.5 rounded-[4px] bg-[color:var(--surface-hover)] text-[color:var(--text-muted)] uppercase">
                         {item.type}
                       </span>
                    </div>
                    <p className="text-[0.8rem] leading-[1.65] text-[color:var(--text-muted)] drop-shadow-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          ) : null}
        </div>
      </div>
    </div>
  )
}
