'use client'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import { CircleCanvas } from '@/components/canvas/CircleCanvas'

const SECTION_IDS = ['work', 'about', 'skills', 'projects', 'contact']

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const quickSkills = ['React', 'Node.js', 'Python', 'MCP']

export function StickyLeft() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between py-24 px-8 lg:px-12 relative">
      {/* Background circle — overflows sidebar bounds intentionally */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleCanvas size={1000} variant="desktop" />
        </div>
      </div>

      <div className="relative z-10" style={{ boxShadow: '0 0 40px 32px rgba(0,0,0,0.95)' }}>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-1">
          Adrien Robert
        </h1>
        <p className="text-sm text-[var(--text-body)] mb-3">Senior Front-End Engineer</p>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[220px]">
          12+ years building product interfaces across greentech, logistics, and edtech.
        </p>
      </div>

      <nav className="relative z-10 flex flex-col gap-1" style={{ boxShadow: '0 0 40px 32px rgba(0,0,0,0.95)' }}>
        <a
          href="#hero"
          className="flex items-center gap-3 text-sm py-1 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 mb-2"
        >
          <span className="h-px w-4 bg-current" />
          ↑ Top
        </a>
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

      <div className="relative z-10 flex flex-col gap-4" style={{ boxShadow: '0 0 40px 32px rgba(0,0,0,0.95)' }}>
        <div className="flex flex-wrap gap-1.5">
          {quickSkills.map((skill, i) => (
            <span key={skill} className="font-mono text-[0.65rem] text-[var(--text-muted)] tracking-wider">
              {skill}{i < quickSkills.length - 1 && <span className="mx-1 opacity-30">·</span>}
            </span>
          ))}
        </div>

        <a
          href="/Adrien_ROBERT_CV_en_2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[var(--accent)] border border-[var(--accent)] rounded-full px-3 py-1.5 hover:bg-[var(--accent)] hover:text-black transition-colors w-fit"
        >
          Download CV →
        </a>

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
