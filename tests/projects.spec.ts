import { describe, expect, it } from 'vitest'
import { getProjectById, projects } from '../app/entities/project/model/data'

describe('projects entity', () => {
  it('contains expected case studies', () => {
    expect(projects.map((project) => project.id)).toEqual(['gau-admin', 'gau-hr', 'elros'])
  })

  it('returns project by id', () => {
    const project = getProjectById('gau-admin')
    expect(project?.technologies).toContain('Vue')
  })

  it('returns undefined for unknown id', () => {
    expect(getProjectById('missing')).toBeUndefined()
  })
})
