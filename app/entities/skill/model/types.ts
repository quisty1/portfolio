export interface SkillGroup {
  id: string
  titleKey: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    titleKey: 'skills.groups.core',
    items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Vue', 'Nuxt'],
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
    items: ['Vite', 'Webpack', 'ESLint', 'Prettier', 'Git', 'Docker', 'Node.js'],
  },
  {
    id: 'quality',
    titleKey: 'skills.groups.quality',
    items: ['Vitest', 'Jest', 'Playwright', 'Cypress', 'REST API', 'Axios'],
  },
]
