export interface SkillTier {
  name: string
  level: number
  note?: string
  items: string[]
}

export const skillTiers: SkillTier[] = [
  {
    name: 'Front-End',
    level: 95,
    items: ['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'Tailwind CSS', 'Webpack', 'SASS', 'Electron'],
  },
  {
    name: 'Back-End',
    level: 70,
    items: ['Node.js', 'Python', 'Ruby', 'Laravel', 'PHP', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
  },
  {
    name: 'AI & MCP',
    level: 55,
    note: 'practitioner, not specialist',
    items: ['MCP integrations', 'Agentic workflows', 'Local LLMs', 'p5.js / Generative systems', 'Prompt engineering'],
  },
  {
    name: 'DevOps',
    level: 55,
    items: ['AWS (EC2, S3, RDS)', 'Docker', 'CircleCI', 'GitLab CI', 'Firebase', 'Vercel'],
  },
]
