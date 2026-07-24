/**
 * Валидация статического siteConfig (имя, контакты, cvPath)
 */
import { describe, expect, it } from 'vitest'
import { siteConfig } from '../app/shared/config/site'

describe('siteConfig', () => {
  it('has required identity fields', () => {
    expect(siteConfig.name).toBeTruthy()
    expect(siteConfig.nameEn).toBeTruthy()
    expect(siteConfig.role).toBeTruthy()
  })

  it('has contact fields', () => {
    expect(siteConfig.contact.email).toContain('@')
    expect(siteConfig.contact.telegramUrl).toMatch(/^https?:\/\//)
    expect(siteConfig.contact.phone).toBeTruthy()
    expect(siteConfig.contact.phoneDisplay).toBeTruthy()
  })

  it('points cv path under /cv/', () => {
    expect(siteConfig.cvPath).toMatch(/^\/cv\//)
  })
})
