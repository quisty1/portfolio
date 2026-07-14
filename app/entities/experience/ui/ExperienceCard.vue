<script setup lang="ts">
import type { ExperienceItem } from '../model/types'

interface ExperienceCardProps {
  item: ExperienceItem
}

defineProps<ExperienceCardProps>()

const { t } = useI18n()
</script>

<template>
  <article class="relative border-l border-border pl-6">
    <span
      class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
      aria-hidden="true"
    />
    <p class="text-sm text-ink-subtle">
      {{ t(item.periodKey) }} · {{ t(item.locationKey) }}
    </p>
    <h3 class="mt-2 font-display text-xl font-semibold text-ink">
      <a
        v-if="item.companyUrl"
        :href="item.companyUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="transition-colors hover:text-accent-ink"
      >
        {{ t(item.companyKey) }}
      </a>
      <span v-else>{{ t(item.companyKey) }}</span>
    </h3>
    <p class="mt-1 text-sm font-medium text-accent-ink">
      {{ t(item.roleKey) }}
    </p>
    <ul class="mt-4 space-y-2">
      <li
        v-for="highlightKey in item.highlightsKeys"
        :key="highlightKey"
        class="text-sm leading-relaxed text-ink-muted"
      >
        {{ t(highlightKey) }}
      </li>
    </ul>
    <div class="mt-4 flex flex-wrap gap-2">
      <AppBadge
        v-for="tech in item.stack"
        :key="tech"
        :label="tech"
      />
    </div>
  </article>
</template>
