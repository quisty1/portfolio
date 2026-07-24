/**
 * Валидация данных entity education
 */
import { describe, expect, it } from 'vitest'
import { educationItems } from '../app/entities/education/model/data'

describe('education entity', () => {
  it('has unique ids', () => {
    const ids = educationItems.map((item) => item.id)
    expect(ids).toEqual(['vlgu', 'college'])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has required i18n keys', () => {
    for (const item of educationItems) {
      expect(item.titleKey).toBeTruthy()
      expect(item.institutionKey).toBeTruthy()
      expect(item.periodKey).toBeTruthy()
      expect(item.degreeKey).toBeTruthy()
    }
  })
})
