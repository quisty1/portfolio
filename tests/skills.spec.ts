/**
 * Валидация данных entity skill groups
 */
import { describe, expect, it } from 'vitest'
import { skillGroups } from '../app/entities/skill/model/data'

describe('skill entity', () => {
  it('contains expected groups', () => {
    expect(skillGroups.map((group) => group.id)).toEqual([
      'core',
      'state',
      'ui',
      'tooling',
      'quality',
    ])
  })

  it('has non-empty items and title keys', () => {
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0)
      expect(group.titleKey).toMatch(/^skills\.groups\./)
    }
  })
})
