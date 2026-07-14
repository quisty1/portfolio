import { siteConfig } from '@shared/config/site'

export function usePortfolioSite() {
  const config = useRuntimeConfig()

  return {
    site: siteConfig,
    siteUrl: config.public.siteUrl as string,
    githubUrl: (config.public.githubUrl as string) || undefined,
  }
}
