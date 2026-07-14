import type { Project } from './types'

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
      'Vue',
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
    id: 'gau-hr',
    titleKey: 'projects.gauHr.title',
    descriptionKey: 'projects.gauHr.description',
    detailLeadKey: 'projects.gauHr.detailLead',
    roleKey: 'projects.gauHr.role',
    periodKey: 'projects.gauHr.period',
    companyUrl: 'https://digitalcenter.moscow/',
    technologies: ['Vue', 'Pinia', 'Vue Router', 'Vuetify 4', 'Axios', 'RBAC', 'Excel', 'Vite'],
    highlightsKeys: [
      'projects.gauHr.highlights.spa',
      'projects.gauHr.highlights.card',
      'projects.gauHr.highlights.rbac',
      'projects.gauHr.highlights.admin',
      'projects.gauHr.highlights.filters',
      'projects.gauHr.highlights.migration',
    ],
  },
  {
    id: 'elros',
    titleKey: 'projects.elros.title',
    descriptionKey: 'projects.elros.description',
    detailLeadKey: 'projects.elros.detailLead',
    roleKey: 'projects.elros.role',
    periodKey: 'projects.elros.period',
    companyUrl: 'https://elros33.orgs.biz/',
    technologies: [
      'Vue',
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

export const projectIds = projects.map((project) => project.id)
