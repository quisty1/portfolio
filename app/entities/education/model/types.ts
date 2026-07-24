/**
 * Модель записи образования
 * Все текстовые поля — ключи i18n
 */
export interface EducationItem {
  id: string
  titleKey: string
  institutionKey: string
  periodKey: string
  degreeKey: string
}
