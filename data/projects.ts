export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url?: string
  imageUrl?: string
}

export const sideProjects: Project[] = [
  {
    id: 'senvo-canvas',
    title: 'Generative Typography System',
    description: 'Designed and built the p5.js animation system powering Senvo.ai — a full-viewport typographic particle field where letters breathe in sine-wave columns. Three modes: column waterfall, horizontal waterfall, and radial rings. Ships in production.',
    tags: ['p5.js', 'Generative Art', 'TypeScript', 'Webflow'],
    url: 'https://senvo.ai',
  },
  {
    id: 'generative-art',
    title: 'Generative Art Practice',
    description: 'Ongoing personal work exploring computational aesthetics — parametric typography, noise fields, and algorithmic composition using p5.js and WebGL.',
    tags: ['p5.js', 'WebGL', 'Creative Coding'],
    url: 'https://github.com/koalabear974',
  },
  {
    id: 'mcp-experiments',
    title: 'MCP & Agentic Tooling',
    description: 'Experiments with Model Context Protocol integrations and agentic coding workflows — building tools that extend AI assistants with custom capabilities.',
    tags: ['MCP', 'AI Tooling', 'Node.js', 'TypeScript'],
  },
  {
    id: 'electronics',
    title: 'Electronics & Embedded Systems',
    description: 'Hardware tinkering with Raspberry Pi and Arduino — from sensor networks to custom keyboard firmware. Interests include IoT, low-power systems, and physical computing.',
    tags: ['Raspberry Pi', 'Arduino', 'C++', 'IoT'],
  },
]
