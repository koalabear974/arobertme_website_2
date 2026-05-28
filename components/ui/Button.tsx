import { cn } from '@/lib/utils'
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
  variant?: 'primary' | 'ghost'
}

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: 'primary' | 'ghost'
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const BASE = 'inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'
const VARIANTS = {
  primary: 'bg-[var(--accent)] text-black hover:bg-[#00c8ad] hover:-translate-y-0.5',
  ghost: 'bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent-tint)] hover:-translate-y-0.5',
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], className)

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink
    return <a href={href} className={classes} {...rest}>{children}</a>
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
