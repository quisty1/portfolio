import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { projectIds } from './app/entities/project/model/data'

const srcDir = fileURLToPath(new URL('./app', import.meta.url))
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://bragin.dev'

const projectRoutes = projectIds.flatMap((id) => [`/projects/${id}`, `/en/projects/${id}`])

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  srcDir: 'app',

  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },

  alias: {
    '@shared': `${srcDir}/shared`,
    '@entities': `${srcDir}/entities`,
    '@features': `${srcDir}/features`,
    '@widgets': `${srcDir}/widgets`,
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  css: ['~/assets/styles/main.css'],

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],

  components: [
    { path: '~/shared/ui', pathPrefix: false },
    { path: '~/features', pathPrefix: false, pattern: '**/ui/*.vue' },
    { path: '~/widgets', pathPrefix: false, pattern: '**/ui/*.vue' },
    { path: '~/entities', pathPrefix: false, pattern: '**/ui/*.vue' },
  ],

  imports: {
    dirs: ['shared/composables', 'shared/lib', 'features/**/lib', 'entities/**/model'],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: 'Outfit', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Source Sans 3', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'portfolio-color-mode',
  },

  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    langDir: '../locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'portfolio-locale',
      redirectOn: 'root',
    },
  },

  site: {
    url: siteUrl,
    name: 'Yaroslav Bragin',
  },

  sitemap: {
    autoLastmod: true,
  },

  runtimeConfig: {
    public: {
      siteUrl,
      githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL || '',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', ...projectRoutes],
    },
  },
})
