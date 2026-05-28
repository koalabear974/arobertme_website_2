import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'font-mono text-[0.7rem] tracking-[0.04em] text-[var(--accent)]',
        'border border-[rgba(0,229,200,0.3)] rounded px-2 py-0.5',
        className
      )}
    >
      {children}
    </span>
  )
}
