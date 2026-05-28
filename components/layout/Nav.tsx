'use client'
import { useEffect, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed z-50 flex justify-center px-4',
        'transition-all duration-300 ease-[var(--ease)]',
        scrolled ? 'top-4 left-0 right-0' : 'top-0 left-0 right-0 py-4',
        direction === 'down' ? '-translate-y-[calc(100%+1.5rem)]' : 'translate-y-0'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-6 transition-all duration-300 ease-[var(--ease)]',
          scrolled
            ? 'px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'px-6 py-0 w-full max-w-5xl justify-between'
        )}
      >
        <a
          href="#hero"
          className="font-semibold text-sm text-[var(--text-primary)] tracking-tight hover:text-[var(--accent)] transition-colors"
        >
          AR
        </a>

        <nav className="hidden md:flex items-center gap-5">
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
      </div>
    </header>
  )
}
