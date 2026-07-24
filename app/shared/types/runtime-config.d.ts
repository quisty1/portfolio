/**
 * Расширение типов Nuxt PublicRuntimeConfig
 * Поля совпадают с runtimeConfig.public в nuxt.config.ts
 */
declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    siteUrl: string
    githubUrl: string
  }
}

export {}
