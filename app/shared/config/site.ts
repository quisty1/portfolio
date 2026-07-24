/**
 * Статический конфиг сайта: имя, роль, контакты, путь к CV
 * Не зависит от runtime env — URL сайта берётся из usePortfolioSite
 */

export interface SiteContact {
  email: string
  /** E.164 / tel: ссылка без пробелов */
  phone: string
  /** Человекочитаемый формат для UI */
  phoneDisplay: string
  /** Ник для отображения */
  telegram: string
  /** Полный URL мессенджера */
  telegramUrl: string
  vk: string
  location: string
}

export interface SiteConfig {
  name: string
  nameEn: string
  role: string
  /** PDF в public/cv/... — без пути кнопки CV скрываются */
  cvPath?: string
  contact: SiteContact
}

export const siteConfig: SiteConfig = {
  name: 'Ярослав Брагин',
  nameEn: 'Yaroslav Bragin',
  role: 'Vue Frontend Developer',
  cvPath: '/cv/bragin-yaroslav.pdf',
  contact: {
    email: 'braginyaroslav1@gmail.com',
    phone: '+79049593922',
    phoneDisplay: '+7 (904) 959-39-22',
    telegram: '@yar_bragin',
    telegramUrl: 'https://telegram.me/yar_bragin',
    vk: 'https://vk.com/yar1qqq',
    location: 'Moscow',
  },
}
