import * as React from 'react'

import { BellRing, CheckCircle2, AlertTriangle, Info, Sparkles } from 'lucide-react'

import { Button, Card, Tag, useToast } from '../../lib'
import type { ToastPosition, ToastVariant } from '../../lib'

const positions: ToastPosition[] = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
const variants: ToastVariant[] = ['default', 'success', 'info', 'error']

export function ToastPreview({ isPt }: { isPt: boolean }) {
  const toast = useToast()
  const [position, setPosition] = React.useState<ToastPosition>('bottom-right')
  const [variant, setVariant] = React.useState<ToastVariant>('success')

  function triggerPreviewToast() {
    const titleByVariant: Record<ToastVariant, string> = {
      default: isPt ? 'Atualizacao enviada' : 'Update sent',
      success: isPt ? 'Alteracoes salvas' : 'Changes saved',
      info: isPt ? 'Nova informacao disponivel' : 'New information available',
      error: isPt ? 'Falha ao sincronizar' : 'Sync failed',
    }

    const descriptionByVariant: Record<ToastVariant, string> = {
      default: isPt ? 'Seu fluxo continua ativo no painel.' : 'Your workflow continues running in the dashboard.',
      success: isPt ? 'Tudo pronto, o sistema confirmou a acao.' : 'All set, the system confirmed your action.',
      info: isPt ? 'Confira a proxima etapa recomendada no menu.' : 'Check the next recommended step in the menu.',
      error: isPt ? 'Tente novamente em alguns instantes.' : 'Please try again in a few moments.',
    }

    toast({
      title: titleByVariant[variant],
      description: descriptionByVariant[variant],
      duration: 3800,
      position,
      variant,
    })
  }

  return (
    <Card className="w-full max-w-[760px] border-0 bg-transparent p-6" variant="subtle">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--surface-hover)] text-[color:var(--accent-line)]">
          <BellRing size={22} strokeWidth={1.9} />
        </div>

        <div>
          <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-xl font-semibold text-[color:var(--text-main)]">
            {isPt ? 'Preview interativo de toast' : 'Interactive toast preview'}
          </p>
          <p className="mt-2 text-sm text-[color:var(--text-soft)]">
            {isPt
              ? 'Escolha posicao e variante, depois clique para disparar e validar o comportamento real.'
              : 'Pick position and variant, then click to trigger and validate the real behavior.'}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 rounded-xl border border-[color:var(--card-border)] bg-[rgba(255,255,255,0.02)] p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {positions.map((option) => {
              const active = option === position

              return (
                <button
                  className={[
                    'rounded-lg border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition',
                    active
                      ? 'border-[color:var(--accent-line)] bg-[rgba(111,224,255,0.12)] text-[color:var(--accent-line)]'
                      : 'border-[color:var(--card-border)] text-[color:var(--text-soft)] hover:text-[color:var(--text-main)]',
                  ].join(' ')}
                  key={option}
                  onClick={() => setPosition(option)}
                  type="button"
                >
                  {option}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {variants.map((option) => {
              const active = option === variant
              const Icon = option === 'success' ? CheckCircle2 : option === 'error' ? AlertTriangle : option === 'info' ? Info : Sparkles

              return (
                <button
                  className={[
                    'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition',
                    active
                      ? 'border-[color:var(--accent-line)] bg-[rgba(111,224,255,0.12)] text-[color:var(--accent-line)]'
                      : 'border-[color:var(--card-border)] text-[color:var(--text-soft)] hover:text-[color:var(--text-main)]',
                  ].join(' ')}
                  key={option}
                  onClick={() => setVariant(option)}
                  type="button"
                >
                  <Icon size={14} />
                  {option}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Tag className="bg-[rgba(255,255,255,0.04)] border-[color:var(--card-border)]">{position}</Tag>
            <Tag className="bg-[rgba(255,255,255,0.04)] border-[color:var(--card-border)]">{variant}</Tag>
            <Button onClick={triggerPreviewToast} type="button">
              {isPt ? 'Disparar toast' : 'Trigger toast'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
