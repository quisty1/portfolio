export interface ExperienceItem {
  id: string
  companyKey: string
  roleKey: string
  periodKey: string
  locationKey: string
  companyUrl?: string
  stack: string[]
  highlightsKeys: string[]
}

export const experiences: ExperienceItem[] = [
  {
    id: 'gau',
    companyKey: 'experience.gau.company',
    roleKey: 'experience.gau.role',
    periodKey: 'experience.gau.period',
    locationKey: 'experience.gau.location',
    companyUrl: 'https://digitalcenter.moscow/',
    stack: [
      'Vue 3',
      'TypeScript',
      'Pinia',
      'Vue Router',
      'Vuetify',
      'Axios',
      'WebSocket',
      'SSE',
      'Vite',
      'RBAC',
    ],
    highlightsKeys: [
      'experience.gau.highlights.0',
      'experience.gau.highlights.1',
      'experience.gau.highlights.2',
      'experience.gau.highlights.3',
    ],
  },
  {
    id: 'elros',
    companyKey: 'experience.elros.company',
    roleKey: 'experience.elros.role',
    periodKey: 'experience.elros.period',
    locationKey: 'experience.elros.location',
    companyUrl: 'https://elros.info/',
    stack: [
      'Vue',
      'TypeScript',
      'JavaScript',
      'Pinia',
      'Vuetify',
      'Axios',
      'SCSS',
      'Vite',
      'ESLint',
      'Prettier',
    ],
    highlightsKeys: [
      'experience.elros.highlights.0',
      'experience.elros.highlights.1',
      'experience.elros.highlights.2',
      'experience.elros.highlights.3',
    ],
  },
]
