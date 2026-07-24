/**
 * Конфиг Vitest через @nuxt/test-utils
 * environment: 'nuxt' поднимает Nuxt-контекст (авто-импорты, runtimeConfig, i18n)
 */
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // Specs в tests/ и рядом с кодом в app/
    include: ['tests/**/*.spec.ts', 'app/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/**/*.{ts,vue}'],
      // Исключаем оболочки, декларации и чистые типы без логики
      exclude: ['app/app.vue', 'app/**/*.d.ts', 'app/**/types.ts', 'app/shared/types/**'],
    },
  },
})
