<script setup lang="ts">
import { getProjectById } from '@entities/project/model/types'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { siteUrl } = usePortfolioSite()

const projectId = computed(() => String(route.params.id))
const project = computed(() => getProjectById(projectId.value))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: () => `${t(project.value!.titleKey)} — ${t('hero.name')}`,
  description: () => t(project.value!.descriptionKey),
  ogTitle: () => t(project.value!.titleKey),
  ogDescription: () => t(project.value!.descriptionKey),
  ogImage: () => `${siteUrl}/og-image.svg`,
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
})
</script>

<template>
  <article
    v-if="project"
    class="pb-24 pt-28"
  >
    <AppContainer size="narrow">
      <NuxtLink
        :to="localePath('/#projects')"
        class="text-sm text-ink-muted transition-colors hover:text-accent-ink"
      >
        ← {{ t('projects.back') }}
      </NuxtLink>

      <ScrollReveal class="mt-8">
        <p class="text-sm text-ink-subtle">
          {{ t(project.periodKey) }} · {{ t(project.roleKey) }}
        </p>
        <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {{ t(project.titleKey) }}
        </h1>
        <p class="mt-5 text-lg leading-relaxed text-ink-muted">
          {{ t(project.detailLeadKey) }}
        </p>
      </ScrollReveal>

      <ScrollReveal
        class="mt-10"
        :delay="80"
      >
        <h2 class="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          {{ t('projects.stack') }}
        </h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <AppBadge
            v-for="tech in project.technologies"
            :key="tech"
            :label="tech"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal
        class="mt-12"
        :delay="140"
      >
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

      <ScrollReveal
        v-if="project.companyUrl"
        class="mt-12"
        :delay="180"
      >
        <AppButton
          :href="project.companyUrl"
          variant="secondary"
          external
        >
          {{ t('projects.companySite') }}
        </AppButton>
      </ScrollReveal>
    </AppContainer>
  </article>
</template>
