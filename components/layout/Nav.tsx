'use client'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const direction = useScrollDirection()

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4',
        'flex items-center justify-between',
        'transition-transform duration-300 ease-[var(--ease)]',
        direction === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <a
        href="#hero"
        className="font-semibold text-sm text-[var(--text-primary)] tracking-tight hover:text-[var(--accent)] transition-colors"
      >
        AR
      </a>

      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-[var(--text-body)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="mailto:a.robert@rt-iut.re"
        className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors hidden md:block"
      >
        Available Sep 2026
      </a>
    </header>
  )
}
