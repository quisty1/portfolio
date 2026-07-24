/**
 * ESLint flat-config: база Nuxt + отключение конфликтов с Prettier
 * Override ужесточает TypeScript-правила поверх дефолтов Nuxt
 */
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

export default withNuxt(prettier).override('nuxt/typescript/rules', {
  rules: {
    // Запрет any — ошибки типизации ловим явно
    '@typescript-eslint/no-explicit-any': 'error',
    // Единый стиль: import type { Foo } вместо import { type Foo }
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  },
})
