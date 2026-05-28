import { GenerativeCanvas } from '@/components/canvas/GenerativeCanvas'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 w-full h-screen flex items-center justify-center overflow-hidden bg-[var(--bg)]"
    >
      <GenerativeCanvas />

      <div
        className="relative z-10 text-center px-10 py-12 rounded-2xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)' }}
      >
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
          Senior Front-End Engineer · Berlin
        </p>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] tracking-tight leading-none mb-4"
          style={{ textShadow: '0 0 40px rgba(0,0,0,0.9)' }}
        >
          Adrien Robert
        </h1>

        <p
          className="text-base md:text-lg text-[var(--text-body)] max-w-md mx-auto mb-8 leading-relaxed"
          style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
        >
          12+ years building product interfaces across greentech, logistics, and edtech.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button href="#work" variant="primary">View my work</Button>
          <Button href="/Adrien_ROBERT_CV_en_2026.pdf" variant="ghost" target="_blank" rel="noopener noreferrer">Download CV</Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40 ">
        <span className="font-mono text-[0.6rem] text-[var(--text-muted)] tracking-[0.2em] uppercase ">Scroll</span>
        <div className="w-px h-8 bg-[var(--text-muted)] animate-pulse" />
      </div>
    </section>
  )
}
