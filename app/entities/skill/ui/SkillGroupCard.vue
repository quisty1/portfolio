<script setup lang="ts">
import type { SkillGroup } from '../model/types'

interface SkillGroupProps {
  group: SkillGroup
}

defineProps<SkillGroupProps>()

const { t } = useI18n()
</script>

<template>
  <div>
    <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-subtle">
      {{ t(group.titleKey) }}
    </h3>
    <div class="flex flex-wrap gap-2">
      <AppBadge
        v-for="item in group.items"
        :key="item"
        :label="item"
      />
    </div>
  </div>
</template>
