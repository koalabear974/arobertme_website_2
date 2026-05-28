export interface WorkRole {
  id: string
  company: string
  title: string
  period: string
  duration: string
  location: string
  stack: string
  impact: string
  tags: string[]
  url?: string
  featured: boolean
  isCurrent?: boolean
}

export const workRoles: WorkRole[] = [
  {
    id: 'senvo',
    company: 'Senvo',
    title: 'Senior Front-End Developer',
    period: 'Sep 2024 – Aug 2026',
    duration: '1 yr 10 mo',
    location: 'Berlin',
    stack: 'React, Python',
    impact: 'Designed complex reporting interfaces for a logistics invoice auditing platform and built MCP integrations.',
    tags: ['React', 'Python', 'MCP', 'TypeScript'],
    url: 'https://senvo.ai',
    featured: true,
    isCurrent: true,
  },
  {
    id: 'querfeld',
    company: 'Querfeld',
    title: 'Front-End Developer',
    period: 'Aug 2020 – May 2023',
    duration: '3 yrs 3 mo',
    location: 'Berlin',
    stack: 'React, Node.js',
    impact: 'Built the front-end for a sustainable food-saving B2B platform reducing produce waste across European supply chains.',
    tags: ['React', 'Node.js', 'TypeScript'],
    url: 'https://querfeld.bio',
    featured: true,
  },
  {
    id: 'skoove',
    company: 'Skoove',
    title: 'Full-Stack Developer',
    period: 'Apr 2018 – May 2020',
    duration: '2 yrs 1 mo',
    location: 'Berlin',
    stack: 'React, PHP',
    impact: 'Developed features across the full stack of a consumer piano learning app for iOS and Web with real-time audio interaction.',
    tags: ['React', 'PHP', 'iOS Web'],
    url: 'https://skoove.com',
    featured: true,
  },
  {
    id: 'taledo',
    company: 'Taledo',
    title: 'Full-Stack Developer',
    period: 'Feb 2017 – Feb 2018',
    duration: '1 yr',
    location: 'Berlin',
    stack: 'React, Ruby',
    impact: 'Built features on a recruiting marketplace connecting digital talent with Berlin tech companies.',
    tags: ['React', 'Ruby', 'Elasticsearch'],
    featured: false,
  },
  {
    id: 'igotcha',
    company: 'Igotcha Media',
    title: 'Full-Stack Developer',
    period: 'Apr 2015 – May 2016',
    duration: '1 yr 1 mo',
    location: 'Montreal',
    stack: 'React, PHP',
    impact: 'Built interactive installations for Cirque du Soleil and Les Grandes Fêtes Telus, including embedded systems programming.',
    tags: ['React', 'PHP', 'Embedded'],
    featured: false,
  },
  {
    id: 'reuniwatt',
    company: 'Reuniwatt',
    title: 'ICT Technician',
    period: 'Sep 2013 – Nov 2014',
    duration: '1 yr 2 mo',
    location: 'Réunion Island',
    stack: 'PHP, Angular',
    impact: 'First professional role — built web tooling for a solar forecasting and climate information system.',
    tags: ['PHP', 'Angular'],
    featured: false,
  },
]
