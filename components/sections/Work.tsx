'use client'
import { useState } from 'react'
import { workRoles } from '@/data/work'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeUp } from '@/components/ui/FadeUp'

export function Work() {
  const [showAll, setShowAll] = useState(false)
  const featured = workRoles.filter((r) => r.featured)
  const rest = workRoles.filter((r) => !r.featured)
  const visible = showAll ? workRoles : featured

  return (
    <section id="work" className="py-24">
      <a
        href="#hero"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-10"
      >
        ↑ Adrien Robert
      </a>
      <SectionHeading number="01">Where I've Worked</SectionHeading>

      <div className="flex flex-col gap-4">
        {visible.map((role, i) => (
          <FadeUp key={role.id} delay={i * 0.08}>
            <Card href={role.url}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-[var(--text-primary)] font-semibold text-base">
                    {role.title}
                    <span className="text-[var(--accent)]"> · {role.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-muted)] mt-0.5">
                    {role.period} · {role.duration} · {role.location}
                  </p>
                </div>
                {role.isCurrent && (
                  <span className="shrink-0 font-mono text-[0.6rem] text-[var(--accent)] border border-[var(--accent)] rounded-full px-2 py-0.5 tracking-wider">
                    Current
                  </span>
                )}
              </div>

              <p className="text-sm text-[var(--text-body)] leading-relaxed mb-4">
                {role.impact}
              </p>

              <div className="flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>

      {!showAll && rest.length > 0 && (
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => setShowAll(true)}
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            + {rest.length} more roles
          </button>
          <a
            href="/Adrien_ROBERT_CV_en_no_photo_2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Full CV (PDF) →
          </a>
        </div>
      )}
    </section>
  )
}
