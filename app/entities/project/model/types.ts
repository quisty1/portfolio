export interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  detailLeadKey: string
  roleKey: string
  periodKey: string
  technologies: string[]
  highlightsKeys: string[]
  companyUrl?: string
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'gau-admin',
    titleKey: 'projects.gau.title',
    descriptionKey: 'projects.gau.description',
    detailLeadKey: 'projects.gau.detailLead',
    roleKey: 'projects.gau.role',
    periodKey: 'projects.gau.period',
    companyUrl: 'https://digitalcenter.moscow/',
    technologies: [
      'Vue 3',
      'TypeScript',
      'Pinia',
      'Vue Router',
      'Vuetify',
      'Axios',
      'WebSocket',
      'SSE',
      'RBAC',
      'Mermaid',
    ],
    highlightsKeys: [
      'projects.gau.highlights.architecture',
      'projects.gau.highlights.realtime',
      'projects.gau.highlights.library',
      'projects.gau.highlights.markdown',
      'projects.gau.highlights.rbac',
      'projects.gau.highlights.api',
    ],
  },
  {
    id: 'elros',
    titleKey: 'projects.elros.title',
    descriptionKey: 'projects.elros.description',
    detailLeadKey: 'projects.elros.detailLead',
    roleKey: 'projects.elros.role',
    periodKey: 'projects.elros.period',
    companyUrl: 'https://elros.info/',
    technologies: [
      'Vue 3',
      'TypeScript',
      'Pinia',
      'Vuetify',
      'Axios',
      'SCSS',
      'Vite',
      'Telegram WebApp',
    ],
    highlightsKeys: [
      'projects.elros.highlights.ecosystem',
      'projects.elros.highlights.components',
      'projects.elros.highlights.migration',
      'projects.elros.highlights.typescript',
      'projects.elros.highlights.integrations',
      'projects.elros.highlights.performance',
    ],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
