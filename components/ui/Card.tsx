import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
}

export function Card({ children, className, href }: CardProps) {
  const base = cn(
    'bg-[var(--surface)] border border-[var(--divider)] rounded-lg p-6',
    'transition-all duration-[250ms] ease-[var(--ease)]',
    'hover:-translate-y-1 hover:border-[rgba(0,229,200,0.4)]',
    className
  )

  if (href) {
    return <a href={href} className={base}>{children}</a>
  }

  return <div className={base}>{children}</div>
}
