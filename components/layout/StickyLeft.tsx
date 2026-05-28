'use client'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const SECTION_IDS = ['work', 'about', 'skills', 'projects', 'contact']

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const quickSkills = ['React', 'Node', 'Python', 'MCP']

export function StickyLeft() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between py-24 px-8 lg:px-12">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-1">
          Adrien Robert
        </h1>
        <p className="text-sm text-[var(--text-body)] mb-3">Senior Front-End Engineer</p>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[220px]">
          Building for greentech, AI tooling, and the open web.
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'flex items-center gap-3 text-sm py-1 transition-colors duration-200',
              activeId === item.id
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
            )}
          >
            <span
              className={cn(
                'h-px transition-all duration-300',
                activeId === item.id ? 'w-8 bg-[var(--accent)]' : 'w-4 bg-current'
              )}
            />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {quickSkills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[0.65rem] text-[var(--text-muted)] tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/koalabear974"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adrobert/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:a.robert@rt-iut.re"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
