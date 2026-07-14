export interface SiteContact {
  email: string
  phone: string
  phoneDisplay: string
  telegram: string
  telegramUrl: string
  vk: string
  location: string
}

export interface SiteConfig {
  name: string
  nameEn: string
  role: string
  cvPath: string
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
    telegramUrl: 'https://t.me/yar_bragin',
    vk: 'https://vk.com/yar1qqq',
    location: 'Moscow',
  },
}
