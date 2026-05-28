interface SectionHeadingProps {
  number: string
  children: React.ReactNode
}

export function SectionHeading({ number, children }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <span className="block font-mono text-sm text-[var(--accent)] mb-1">{number}.</span>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
        {children}
      </h2>
    </div>
  )
}
