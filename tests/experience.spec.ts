/**
 * Валидация данных entity experience
 */
import { describe, expect, it } from 'vitest'
import { experiences } from '../app/entities/experience/model/data'

describe('experience entity', () => {
  it('has unique ids', () => {
    const ids = experiences.map((item) => item.id)
    expect(ids).toEqual(['gau', 'elros'])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has non-empty stack and highlights for each item', () => {
    for (const item of experiences) {
      expect(item.stack.length).toBeGreaterThan(0)
      expect(item.highlightsKeys.length).toBeGreaterThan(0)
      expect(item.companyKey).toBeTruthy()
      expect(item.roleKey).toBeTruthy()
      expect(item.periodKey).toBeTruthy()
      expect(item.locationKey).toBeTruthy()
    }
  })
})
