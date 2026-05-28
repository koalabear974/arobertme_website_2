import { describe, it, expect } from 'vitest'
import { workRoles } from './work'
import { sideProjects } from './projects'
import { skillTiers } from './skills'

describe('workRoles', () => {
  it('has at least 4 entries', () => {
    expect(workRoles.length).toBeGreaterThanOrEqual(4)
  })

  it('each role has required fields', () => {
    for (const role of workRoles) {
      expect(role.id).toBeTruthy()
      expect(role.company).toBeTruthy()
      expect(role.title).toBeTruthy()
      expect(role.period).toBeTruthy()
      expect(role.impact).toBeTruthy()
      expect(Array.isArray(role.tags)).toBe(true)
      expect(role.tags.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('first role is most recent (Senvo)', () => {
    expect(workRoles[0].company).toBe('Senvo')
  })
})

describe('sideProjects', () => {
  it('has 3 or 4 entries', () => {
    expect(sideProjects.length).toBeGreaterThanOrEqual(3)
    expect(sideProjects.length).toBeLessThanOrEqual(4)
  })

  it('each project has required fields', () => {
    for (const project of sideProjects) {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(Array.isArray(project.tags)).toBe(true)
    }
  })
})

describe('skillTiers', () => {
  it('has 4 tiers', () => {
    expect(skillTiers.length).toBe(4)
  })

  it('Front-End is the first tier', () => {
    expect(skillTiers[0].name).toBe('Front-End')
  })

  it('each tier has items', () => {
    for (const tier of skillTiers) {
      expect(tier.items.length).toBeGreaterThan(0)
    }
  })
})
