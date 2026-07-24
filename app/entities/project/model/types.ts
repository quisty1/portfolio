/**
 * Модель проекта портфолио
 * Поля *Key — ключи i18n в locales/*.json, не готовый текст
 */
export interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  /** Короткий лид на странице деталей */
  detailLeadKey: string
  roleKey: string
  periodKey: string
  /** Названия технологий как есть (не через i18n) */
  technologies: string[]
  /** Ключи пунктов «что сделал» */
  highlightsKeys: string[]
  companyUrl?: string
  github?: string
  demo?: string
}
