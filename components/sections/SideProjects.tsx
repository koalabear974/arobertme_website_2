import { sideProjects } from '@/data/projects'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function SideProjects() {
  return (
    <section id="projects" className="py-24">
      <SectionHeading number="04">Lab</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sideProjects.map((project) => (
          <Card key={project.id} href={project.url}>
            <h3 className="text-[var(--text-primary)] font-semibold text-sm mb-2">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
