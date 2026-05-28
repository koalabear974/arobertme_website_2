import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  href?: string
}

export function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap'
  const variants = {
    primary: 'bg-[var(--accent)] text-black hover:bg-[#00c8ad] hover:-translate-y-0.5',
    ghost: 'bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent-tint)] hover:-translate-y-0.5',
  }

  if (href) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {children}
      </a>
    )
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
