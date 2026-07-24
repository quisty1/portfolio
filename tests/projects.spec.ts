/**
 * Тесты entity projects: данные, getProjectById, projectIds
 */
import { describe, expect, it } from 'vitest'
import { getProjectById, projectIds, projects } from '../app/entities/project/model/data'

describe('projects entity', () => {
  it('contains expected case studies', () => {
    expect(projects.map((project) => project.id)).toEqual([
      'gau-admin',
      'gau-hr',
      'elros',
      'elros-taxi',
    ])
  })

  it('keeps projectIds in sync with projects', () => {
    expect(projectIds).toEqual(projects.map((project) => project.id))
  })

  it('has required detail fields', () => {
    for (const project of projects) {
      expect(project.detailLeadKey).toBeTruthy()
      expect(project.highlightsKeys.length).toBeGreaterThan(0)
      expect(project.technologies.length).toBeGreaterThan(0)
      expect(project.titleKey).toBeTruthy()
      expect(project.descriptionKey).toBeTruthy()
    }
  })

  it('returns project by id', () => {
    const project = getProjectById('gau-admin')
    expect(project?.technologies).toContain('Vue')
  })

  it('returns undefined for unknown id', () => {
    expect(getProjectById('missing')).toBeUndefined()
  })
})
