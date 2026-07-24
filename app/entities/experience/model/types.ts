/**
 * Модель записи опыта работы
 * Поля *Key — ключи i18n; stack — строки как есть
 */
export interface ExperienceItem {
  id: string
  companyKey: string
  roleKey: string
  periodKey: string
  locationKey: string
  companyUrl?: string
  stack: string[]
  /** Ключи пунктов достижений */
  highlightsKeys: string[]
}
