/**
 * Доступ к статическому siteConfig + публичному runtimeConfig
 * siteUrl / githubUrl приходят из NUXT_PUBLIC_* (см. nuxt.config runtimeConfig)
 */
import { siteConfig } from '@shared/config/site'

export type AppLocale = 'ru' | 'en'

export function usePortfolioSite() {
  const config = useRuntimeConfig()

  const siteUrl = config.public.siteUrl
  // Пустая строка из env трактуем как «не задано»
  const githubUrl = config.public.githubUrl || undefined

  return {
    site: siteConfig,
    siteUrl,
    githubUrl,
  }
}
