<script setup lang="ts">
import HeroSection from '@widgets/hero-section/ui/HeroSection.vue'

const AboutSection = defineAsyncComponent(
  () => import('@widgets/about-section/ui/AboutSection.vue'),
)
const ExperienceSection = defineAsyncComponent(
  () => import('@widgets/experience-section/ui/ExperienceSection.vue'),
)
const ProjectsSection = defineAsyncComponent(
  () => import('@widgets/projects-section/ui/ProjectsSection.vue'),
)
const SkillsSection = defineAsyncComponent(
  () => import('@widgets/skills-section/ui/SkillsSection.vue'),
)
const EducationSection = defineAsyncComponent(
  () => import('@widgets/education-section/ui/EducationSection.vue'),
)
const ContactSection = defineAsyncComponent(
  () => import('@widgets/contact-section/ui/ContactSection.vue'),
)

const { t, locale } = useI18n()
const { site, siteUrl, githubUrl } = usePortfolioSite()

const pagePath = computed(() => (locale.value === 'ru' ? '/' : '/en'))

usePageSeo({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  path: pagePath,
  ogType: 'website',
})

useJsonLd(() => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.nameEn,
    url: siteUrl,
    description: t('meta.description'),
    inLanguage: locale.value === 'ru' ? 'ru-RU' : 'en-US',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.nameEn,
    alternateName: site.name,
    jobTitle: site.role,
    url: siteUrl,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.location,
      addressCountry: 'RU',
    },
    sameAs: [site.contact.telegramUrl, site.contact.vk, githubUrl].filter(Boolean),
  },
])
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
  </div>
</template>
