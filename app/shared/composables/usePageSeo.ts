/**
 * SEO для страницы: title, description, Open Graph, Twitter, canonical
 * Значения могут быть ref/getter — подхватываются через toValue
 */
import type { MaybeRefOrGetter } from 'vue'

export interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Путь страницы относительно origin, например /projects/foo или / */
  path: MaybeRefOrGetter<string>
  ogType?: MaybeRefOrGetter<'website' | 'article'>
}

/** OG/Twitter image из public/ */
const OG_IMAGE = '/og-image.png'

export function usePageSeo(options: PageSeoOptions) {
  const { siteUrl } = usePortfolioSite()

  // Absolute URL для canonical и og:url
  const pageUrl = computed(() => {
    const path = toValue(options.path)
    if (!path || path === '/') {
      return siteUrl
    }
    return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
  })

  const ogImageUrl = computed(() => `${siteUrl}${OG_IMAGE}`)

  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogType: () => toValue(options.ogType) ?? 'website',
    ogUrl: () => pageUrl.value,
    ogImage: () => ogImageUrl.value,
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
    twitterImage: () => ogImageUrl.value,
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: () => pageUrl.value,
      },
    ],
  })

  return { pageUrl, ogImageUrl }
}
