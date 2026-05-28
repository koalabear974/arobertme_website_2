'use client'
import { dispatchRandomize } from '@/lib/canvasText'

const ShuffleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
  </svg>
)

export function RandomizeButton() {
  return (
    <button
      onClick={dispatchRandomize}
      aria-label="Randomise design"
      className="fixed bottom-6 right-6 z-50 font-mono text-xs text-[var(--accent)] border border-[var(--accent)] rounded-full transition-colors hover:bg-[var(--accent)] hover:text-black"
    >
      <span className="hidden sm:flex items-center gap-2 px-4 py-2">
        <ShuffleIcon />
        Randomise Design
      </span>
      <span className="sm:hidden flex items-center justify-center w-9 h-9">
        <ShuffleIcon />
      </span>
    </button>
  )
}
