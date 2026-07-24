/**
 * Главный конфиг Nuxt 4
 * Структура app/ следует FSD: shared → entities → features → widgets → pages
 */
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { projectIds } from './app/entities/project/model/data'

const srcDir = fileURLToPath(new URL('./app', import.meta.url))
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://bragin.dev'

// Явные маршруты проектов для SSG (ru без префикса + /en/...)
const projectRoutes = projectIds.flatMap((id) => [`/projects/${id}`, `/en/projects/${id}`])

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Исходники живут в app/, а не в корне
  srcDir: 'app',

  // FSD-алиасы для импортов без глубоких относительных путей
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

  // Модули: VueUse, i18n, тема, sitemap, шрифты, ESLint
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],

  // Авто-регистрация UI без префикса пути (Button, ProjectCard и т.д.)
  components: [
    { path: '~/shared/ui', pathPrefix: false },
    { path: '~/features', pathPrefix: false, pattern: '**/ui/*.vue' },
    { path: '~/widgets', pathPrefix: false, pattern: '**/ui/*.vue' },
    { path: '~/entities', pathPrefix: false, pattern: '**/ui/*.vue' },
  ],

  // Авто-импорт composables, утилит и entity model
  imports: {
    dirs: ['shared/composables', 'shared/lib', 'features/**/lib', 'entities/**/model'],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // Google Fonts: display (Outfit) + body (Source Sans 3)
  fonts: {
    families: [
      { name: 'Outfit', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Source Sans 3', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  // classSuffix '' → класс .dark на <html>, без суффикса -dark
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'portfolio-color-mode',
  },

  // ru без префикса, en с /en/; cookie для выбора языка
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

  // Используется модулем sitemap
  site: {
    url: siteUrl,
    name: 'Yaroslav Bragin',
  },

  sitemap: {
    autoLastmod: true,
  },

  // Публичные env: NUXT_PUBLIC_SITE_URL, NUXT_PUBLIC_GITHUB_URL
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
    // Имя 'page' совпадает с .page-enter-* в main.css
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // SSG: crawl + явные маршруты проектов (иначе детали могут не попасть в generate)
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', ...projectRoutes],
    },
  },
})
