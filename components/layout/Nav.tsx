'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY.current) > 5) {
        setHidden(y > lastY.current && y > 80)
        lastY.current = y
      }
      setScrolled(y > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-transform duration-300 ease-[var(--ease)]',
        scrolled && 'flex justify-center pt-4 px-4',
        hidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div
        className={cn(
          'flex items-center',
          scrolled
            ? 'gap-6 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'w-full justify-between px-6 py-4'
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
