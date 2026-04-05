/* eslint-disable react-refresh/only-export-components */

import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Check, Copy, Paintbrush2, Palette } from 'lucide-react'

import { cn } from '../utils/cn'

export type CodeBlockSnippet = {
  code: string
  language: string
  label?: string
}

type CodeTone = 'color' | 'mono'

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  defaultLanguage?: string
  defaultTone?: CodeTone
  showCopyButton?: boolean
  showLanguageTabs?: boolean
  showToneToggle?: boolean
  snippets: ReadonlyArray<CodeBlockSnippet>
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function colorizeCode(code: string, language: string) {
  const escaped = escapeHtml(code)
  const normalized = language.toLowerCase()

  if (normalized === 'css') {
    return escaped.replace(/(\/\*.*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(display|gap|border-radius|border|padding|margin|color|background|font-size|line-height|width|height|grid-template-columns)\b|\b(\d+(?:\.\d+)?(?:px|rem|em|%)?)\b|([{}:;])/gm, (match, comment, str, prop, num, punct) => {
      if (comment) return `<span class="text-[color:var(--text-muted)]">${match}</span>`
      if (str) return `<span class="text-[color:var(--accent-soft)]">${match}</span>`
      if (prop) return `<span class="text-[color:var(--accent-line)] font-semibold">${match}</span>`
      if (num) return `<span class="text-[color:var(--accent-end)]">${match}</span>`
      if (punct) return `<span class="text-[color:var(--text-soft)]">${match}</span>`
      return match
    })
  }

  if (normalized === 'bash' || normalized === 'sh' || normalized === 'shell') {
    return escaped.replace(/(#.*$)|\b(npm|pnpm|yarn|bun|npx|cd|ls|cp|mv|rm|git|run|install|build|dev|test)\b|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/gm, (match, comment, cmd, str) => {
      if (comment) return `<span class="text-[color:var(--text-muted)]">${match}</span>`
      if (cmd) return `<span class="text-[color:var(--accent-line)] font-semibold">${match}</span>`
      if (str) return `<span class="text-[color:var(--accent-soft)]">${match}</span>`
      return match
    })
  }

  if (normalized === 'tsx' || normalized === 'jsx' || normalized === 'html') {
    return escaped.replace(/(&lt;\/?[A-Za-z][^&]*?&gt;)|(\/\/.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(const|let|var|function|return|import|from|export|type|interface|if|else|switch|case|for|while|class|new|async|await|extends|implements|try|catch|finally|throw|default|readonly|public|private|protected)\b|\b(\d+(?:\.\d+)?)\b/gm, (match, tag, comment, str, keyword, num) => {
      if (tag) return `<span class="text-[color:var(--accent-line)]">${match}</span>`
      if (comment) return `<span class="text-[color:var(--text-muted)]">${match}</span>`
      if (str) return `<span class="text-[color:var(--accent-soft)]">${match}</span>`
      if (keyword) return `<span class="text-[color:var(--accent-line)] font-semibold">${match}</span>`
      if (num) return `<span class="text-[color:var(--accent-end)]">${match}</span>`
      return match
    })
  }

  return escaped.replace(/(\/\/.*$|#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(const|let|var|function|return|import|from|export|type|interface|if|else|switch|case|for|while|class|new|async|await|extends|implements|try|catch|finally|throw|default)\b|\b(\d+(?:\.\d+)?)\b/gm, (match, comment, str, keyword, num) => {
    if (comment) return `<span class="text-[color:var(--text-muted)]">${match}</span>`
    if (str) return `<span class="text-[color:var(--accent-soft)]">${match}</span>`
    if (keyword) return `<span class="text-[color:var(--accent-line)] font-semibold">${match}</span>`
    if (num) return `<span class="text-[color:var(--accent-end)]">${match}</span>`
    return match
  })
}

function normalizeLanguageLabel(snippet: CodeBlockSnippet) {
  return snippet.label ?? snippet.language.toUpperCase()
}

function CodeBlockBase({ className, defaultLanguage, defaultTone = 'color', showCopyButton = true, showLanguageTabs = true, showToneToggle = true, snippets, ...props }: CodeBlockProps) {
  const firstLanguage = snippets[0]?.language ?? 'text'
  const [language, setLanguage] = useState(defaultLanguage ?? firstLanguage)
  const [tone, setTone] = useState<CodeTone>(defaultTone)
  const [copied, setCopied] = useState(false)

  const activeSnippet = useMemo(
    () => snippets.find((snippet) => snippet.language === language) ?? snippets[0],
    [language, snippets],
  )

  if (!activeSnippet) {
    return null
  }

  async function handleCopyCode() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return

    try {
      await navigator.clipboard.writeText(activeSnippet.code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    }
    catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-panel-1)]',
        className,
      )}
      {...props}
    >
      {(showLanguageTabs && snippets.length > 1) || showToneToggle || showCopyButton ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--card-border)] bg-[color:var(--surface-soft)] px-2 py-1.5">
          {showLanguageTabs && snippets.length > 1 ? (
            <div className="flex flex-wrap gap-1">
              {snippets.map((snippet) => {
                const isActive = snippet.language === activeSnippet.language

                return (
                  <button
                    className={cn(
                      'rounded-[8px] px-2 py-1 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.62rem] uppercase tracking-[0.1em] transition',
                      isActive
                        ? 'bg-[linear-gradient(135deg,var(--accent-start),var(--accent-mid)_55%,var(--accent-end))] text-white'
                        : 'text-[color:var(--text-soft)] hover:bg-[color:var(--surface-hover)]',
                    )}
                    key={snippet.language}
                    onClick={() => setLanguage(snippet.language)}
                    type="button"
                  >
                    {normalizeLanguageLabel(snippet)}
                  </button>
                )
              })}
            </div>
          ) : <span />}

          <div className="flex items-center gap-2">
            {showToneToggle ? (
              <button
                className="inline-flex items-center gap-1 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] px-2 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-[color:var(--text-soft)] transition hover:bg-[color:var(--surface-hover)]"
                onClick={() => setTone((current) => (current === 'color' ? 'mono' : 'color'))}
                type="button"
              >
                {tone === 'color' ? <Palette size={11} /> : <Paintbrush2 size={11} />}
                {tone === 'color' ? 'Color' : 'Mono'}
              </button>
            ) : null}

            {showCopyButton ? (
              <button
                className="inline-flex items-center gap-1 rounded-[8px] border border-[color:var(--card-border)] bg-[color:var(--surface-base)] px-2 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-[color:var(--text-soft)] transition hover:bg-[color:var(--surface-hover)]"
                onClick={handleCopyCode}
                type="button"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <pre className={cn('overflow-x-auto p-2 font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-xs leading-6', tone === 'mono' ? 'text-[color:var(--text-soft)]' : 'text-[color:var(--text-main)]')}>
        {tone === 'mono'
          ? <code>{activeSnippet.code}</code>
          : <code dangerouslySetInnerHTML={{ __html: colorizeCode(activeSnippet.code, activeSnippet.language) }} />}
      </pre>
    </div>
  )
}

function CodeBlockRoot(props: CodeBlockProps) {
  return <CodeBlockBase {...props} />
}

type CodeBlockComponent = typeof CodeBlockBase & {
  Root: typeof CodeBlockRoot
}

export const CodeBlock = Object.assign(CodeBlockBase, {
  Root: CodeBlockRoot,
}) as CodeBlockComponent
