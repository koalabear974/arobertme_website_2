import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <SectionHeading number="05">
        <span className="on-canvas">Get in Touch</span>
      </SectionHeading>

      <div className="max-w-md on-canvas">
        <p className="text-sm text-[var(--text-body)] leading-relaxed mb-2">
          My current role at Senvo ends in August 2026.
          I'm open to senior front-end and full-stack opportunities from September — preferably at a company working on something that matters.
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)] mb-8">
          Available from September 2026 · Berlin or Remote
        </p>

        <div className="flex flex-wrap gap-3">
          <Button href="mailto:a.robert@rt-iut.re" variant="primary">
            a.robert@rt-iut.re
          </Button>
          <Button
            href="https://www.linkedin.com/in/adrobert/"
            variant="ghost"
          >
            LinkedIn
          </Button>
        </div>
      </div>

      <p className="mt-24 font-mono text-[0.65rem] text-[var(--text-muted)]">
        Designed & built by Adrien Robert · 2026
      </p>
    </section>
  )
}
