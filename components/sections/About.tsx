import { SectionHeading } from '@/components/ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-24">
      <SectionHeading number="02" >
        <span className="on-canvas">About</span>
      </SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">
        <div className="flex flex-col gap-5 text-[var(--text-body)] leading-relaxed text-sm on-canvas">
          <p>
            I'm a front-end engineer originally from Réunion Island, now based in Berlin.
            I've spent twelve years building product interfaces — from piano learning apps
            to invoice auditing platforms — mostly in React, always leaning front-end.
          </p>
          <p>
            I'm drawn to teams working on problems that matter: sustainable food systems,
            climate tech, and AI tooling that makes developers more capable. Alongside my
            product work I practice{' '}
            <a href="https://www.instagram.com/fromcodewithlove/" target="_blank" rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline">
              generative art
            </a>
            {' '}— I designed and built the animation
            system running on{' '}
            <a href="https://senvo.ai" target="_blank" rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline">
              Senvo.ai
            </a>
            .
          </p>
          <p>
            Between Querfeld and Senvo I took time for personal projects, generative art
            exploration, and deliberate learning in AI tooling. My current role ends in
            August 2026 — I'm open to opportunities from September.
          </p>

          <p className="text-[var(--text-muted)] text-xs mt-2">
            Outside of work: bike packing across Europe, music, and tinkering with electronics.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.15em] uppercase mb-4 relative z-20">
            Technologies
          </h3>
          <div className="flex gap-x-10">
            {[
              ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'p5.js', 'MCP / AI tooling'],
              ['Node.js', 'Python', 'GraphQL', 'AWS', 'Docker'],
            ].map((col, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col gap-y-1.5 px-3 py-2"
                style={{ background: 'rgba(0,0,0,0.88)', boxShadow: '0 0 10px 6px rgba(0,0,0,0.88)' }}
              >
                {col.map((skill) => (
                  <span key={skill} className="flex items-center gap-2 text-xs text-[var(--text-body)] font-mono">
                    <span className="text-[var(--accent)]">▹</span>
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
