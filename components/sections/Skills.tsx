import { skillTiers } from '@/data/skills'
import { Tag } from '@/components/ui/Tag'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <SectionHeading number="03">
        <span className="on-canvas">Skills</span>
      </SectionHeading>

      <div className="flex flex-col gap-10">
        {skillTiers.map((tier) => (
          <div key={tier.name} className="on-canvas">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{tier.name}</span>

              <div className="flex-1 h-px bg-[var(--divider)] relative">
                <div
                  className="absolute left-0 top-0 h-px bg-[var(--accent)] transition-all duration-700"
                  style={{ width: `${tier.level}%` }}
                />
              </div>

              {tier.note && (
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)] italic shrink-0">
                  {tier.note}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {tier.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
