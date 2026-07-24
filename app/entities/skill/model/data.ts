import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    titleKey: 'skills.groups.core',
    items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Vue', 'Nuxt', 'SPA'],
  },
  {
    id: 'state',
    titleKey: 'skills.groups.state',
    items: ['Pinia', 'Vuex', 'Vue Router', 'Composition API'],
  },
  {
    id: 'ui',
    titleKey: 'skills.groups.ui',
    items: ['Tailwind CSS', 'Vuetify', 'SCSS / Sass', 'Bootstrap', 'BEM', 'Figma'],
  },
  {
    id: 'tooling',
    titleKey: 'skills.groups.tooling',
    items: ['Vite', 'Webpack', 'ESLint', 'Prettier', 'Git', 'Docker', 'Node.js', 'CI/CD'],
  },
  {
    id: 'quality',
    titleKey: 'skills.groups.quality',
    items: [
      'Vitest',
      'Jest',
      'Playwright',
      'Cypress',
      'REST API',
      'Axios',
      'WebSocket',
      'Scrum',
      'Agile',
    ],
  },
]
