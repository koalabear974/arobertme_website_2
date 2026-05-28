interface SectionHeadingProps {
  number: string
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ number, children, className }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${className ?? ''}`}>
      <span className="block font-mono text-sm text-[var(--accent)] mb-1">{number}.</span>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
        {children}
      </h2>
    </div>
  )
}
