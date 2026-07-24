/**
 * Тесты shared composables: usePortfolioSite, usePageSeo, useJsonLd
 */
import { describe, expect, it } from 'vitest'
import { siteConfig } from '../app/shared/config/site'
import { useJsonLd } from '../app/shared/composables/useJsonLd'
import { usePageSeo } from '../app/shared/composables/usePageSeo'
import { usePortfolioSite } from '../app/shared/composables/usePortfolioSite'

describe('usePortfolioSite', () => {
  it('returns site config and runtime urls', () => {
    const { site, siteUrl, githubUrl } = usePortfolioSite()

    expect(site).toEqual(siteConfig)
    expect(siteUrl).toBeTruthy()
    expect(githubUrl === undefined || typeof githubUrl === 'string').toBe(true)
  })
})

describe('usePageSeo', () => {
  it('builds pageUrl for root and nested paths', () => {
    const { siteUrl } = usePortfolioSite()

    const root = usePageSeo({
      title: 'Home',
      description: 'Desc',
      path: '/',
    })
    expect(root.pageUrl.value).toBe(siteUrl)
    expect(root.ogImageUrl.value).toBe(`${siteUrl}/og-image.png`)

    const empty = usePageSeo({
      title: 'Home',
      description: 'Desc',
      path: '',
    })
    expect(empty.pageUrl.value).toBe(siteUrl)

    const nested = usePageSeo({
      title: 'Case',
      description: 'Desc',
      path: '/projects/gau-admin',
      ogType: 'article',
    })
    expect(nested.pageUrl.value).toBe(`${siteUrl}/projects/gau-admin`)

    const withoutSlash = usePageSeo({
      title: 'Case',
      description: 'Desc',
      path: 'projects/gau-admin',
    })
    expect(withoutSlash.pageUrl.value).toBe(`${siteUrl}/projects/gau-admin`)
  })
})

describe('useJsonLd', () => {
  it('registers json-ld script without throwing', () => {
    expect(() =>
      useJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Test',
      }),
    ).not.toThrow()

    expect(() =>
      useJsonLd([
        { '@type': 'WebSite', name: 'Site' },
        { '@type': 'Person', name: 'Person' },
      ]),
    ).not.toThrow()
  })
})
