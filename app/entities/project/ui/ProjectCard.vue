<script setup lang="ts">
import type { Project } from '../model/types'

interface ProjectCardProps {
  project: Project
}

defineProps<ProjectCardProps>()

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <article
    class="group border-b border-border py-8 transition-colors first:pt-0 last:border-b-0 hover:bg-surface-elevated/40"
  >
    <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-2xl">
        <p class="mb-2 text-sm text-ink-subtle">
          {{ t(project.periodKey) }} · {{ t(project.roleKey) }}
        </p>
        <h3 class="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-ink">
          {{ t(project.titleKey) }}
        </h3>
        <p class="mt-3 text-base leading-relaxed text-ink-muted">
          {{ t(project.descriptionKey) }}
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <AppBadge
            v-for="tech in project.technologies.slice(0, 6)"
            :key="tech"
            :label="tech"
          />
        </div>
      </div>
      <AppButton
        :to="localePath(`/projects/${project.id}`)"
        variant="secondary"
        size="sm"
        class="shrink-0 self-start lg:self-auto"
      >
        {{ t('projects.readMore') }}
      </AppButton>
    </div>
  </article>
</template>
