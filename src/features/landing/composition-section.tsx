import { ArrowRight } from 'lucide-react'

import { Card, SectionLabel, Separator, Tag } from '../../lib'

interface CompositionSectionProps {
  section: {
    eyebrow: string
    title: string
    description: string
    examples: ReadonlyArray<{
      title: string
      useCase: string
      stack: ReadonlyArray<string>
    }>
  }
}

export function CompositionSection({ section }: CompositionSectionProps) {
  return (
    <section className="grid gap-3">
      <Card className="p-3" variant="subtle">
        <SectionLabel>{section.eyebrow}</SectionLabel>
        <h2 className="mt-2 font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[clamp(1.35rem,3.4vw,2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[color:var(--text-main)]">
          {section.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{section.description}</p>
      </Card>

      <div className="grid gap-2 lg:grid-cols-3">
        {section.examples.map((example) => (
          <Card key={example.title} className="p-3" variant="subtle">
            <h3 className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-[1rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">
              {example.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">{example.useCase}</p>

            <Separator className="my-2" />

            <div className="flex flex-wrap items-center gap-2">
              {example.stack.map((item, index) => (
                <div key={`${example.title}-${item}`} className="inline-flex items-center gap-2">
                  <Tag className="border-[rgba(111,224,255,0.2)] bg-[rgba(111,224,255,0.05)] text-[color:var(--accent-line)]">
                    {item}
                  </Tag>
                  {index < example.stack.length - 1 ? <ArrowRight size={12} className="text-[color:var(--text-muted)]" /> : null}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
