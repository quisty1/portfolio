<script setup lang="ts">
import { getProjectById } from '@entities/project/model/data'
import type { Project } from '@entities/project/model/types'

definePageMeta({
  validate: (route) => Boolean(getProjectById(String(route.params.id))),
})

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { site, siteUrl } = usePortfolioSite()

const projectId = computed(() => String(route.params.id))

const project = computed((): Project => {
  const found = getProjectById(projectId.value)
  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
  return found
})

const pagePath = computed(() =>
  locale.value === 'ru' ? `/projects/${projectId.value}` : `/en/projects/${projectId.value}`,
)

usePageSeo({
  title: () => `${t(project.value.titleKey)} — ${t('hero.name')}`,
  description: () => t(project.value.descriptionKey),
  path: pagePath,
  ogType: 'article',
})

useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: t(project.value.titleKey),
  description: t(project.value.descriptionKey),
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}${pagePath.value}`,
  author: {
    '@type': 'Person',
    name: site.nameEn,
    url: siteUrl,
  },
}))
</script>

<template>
  <article class="pb-24 pt-28">
    <AppContainer size="narrow">
      <NuxtLink
        :to="localePath('/#projects')"
        class="text-sm text-ink-muted transition-colors hover:text-accent-ink"
      >
        ← {{ t('projects.back') }}
      </NuxtLink>

      <ScrollReveal class="mt-8">
        <p class="text-sm text-ink-subtle">{{ t(project.periodKey) }} · {{ t(project.roleKey) }}</p>
        <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {{ t(project.titleKey) }}
        </h1>
        <p class="mt-5 text-lg leading-relaxed text-ink-muted">
          {{ t(project.detailLeadKey) }}
        </p>
      </ScrollReveal>

      <ScrollReveal class="mt-10" :delay="80">
        <h2 class="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          {{ t('projects.stack') }}
        </h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <AppBadge v-for="tech in project.technologies" :key="tech" :label="tech" />
        </div>
      </ScrollReveal>

      <ScrollReveal class="mt-12" :delay="140">
        <h2 class="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          {{ t('projects.highlights') }}
        </h2>
        <ul class="mt-5 space-y-4">
          <li
            v-for="highlightKey in project.highlightsKeys"
            :key="highlightKey"
            class="border-l border-accent/40 pl-4 text-base leading-relaxed text-ink-muted"
          >
            {{ t(highlightKey) }}
          </li>
        </ul>
      </ScrollReveal>

      <ScrollReveal v-if="project.companyUrl" class="mt-12" :delay="180">
        <AppButton :href="project.companyUrl" variant="secondary" external>
          {{ t('projects.companySite') }}
        </AppButton>
      </ScrollReveal>
    </AppContainer>
  </article>
</template>
