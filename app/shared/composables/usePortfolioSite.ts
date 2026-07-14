import { siteConfig } from '@shared/config/site'

export type AppLocale = 'ru' | 'en'

export function usePortfolioSite() {
  const config = useRuntimeConfig()

  const siteUrl = config.public.siteUrl
  const githubUrl = config.public.githubUrl || undefined

  return {
    site: siteConfig,
    siteUrl,
    githubUrl,
  }
}
