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
