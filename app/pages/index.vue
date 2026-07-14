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
const { siteUrl } = usePortfolioSite()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  ogUrl: () => `${siteUrl}${locale.value === 'ru' ? '/' : '/en'}`,
  ogImage: () => `${siteUrl}/og-image.svg`,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('meta.title'),
  twitterDescription: () => t('meta.description'),
  twitterImage: () => `${siteUrl}/og-image.svg`,
})

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
  link: [
    {
      rel: 'canonical',
      href: () => `${siteUrl}${locale.value === 'ru' ? '/' : '/en'}`,
    },
  ],
})
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
