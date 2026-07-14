import { describe, expect, it } from 'vitest'
import { getProjectById, projects } from '../app/entities/project/model/types'

describe('projects entity', () => {
  it('contains expected case studies', () => {
    expect(projects.map((project) => project.id)).toEqual(['gau-admin', 'elros'])
  })

  it('returns project by id', () => {
    const project = getProjectById('gau-admin')
    expect(project?.technologies).toContain('Vue 3')
  })

  it('returns undefined for unknown id', () => {
    expect(getProjectById('missing')).toBeUndefined()
  })
})
