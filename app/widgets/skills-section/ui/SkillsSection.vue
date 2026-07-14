<script setup lang="ts">
import { skillGroups } from '@entities/skill/model/types'

const { t } = useI18n()
</script>

<template>
  <section
    id="skills"
    class="scroll-mt-24 py-24 sm:py-28"
  >
    <AppContainer>
      <ScrollReveal>
        <AppSectionTitle
          :eyebrow="t('skills.eyebrow')"
          :title="t('skills.title')"
          :description="t('skills.description')"
        />
      </ScrollReveal>

      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <ScrollReveal
          v-for="(group, index) in skillGroups"
          :key="group.id"
          :delay="index * 60"
        >
          <SkillGroupCard :group="group" />
        </ScrollReveal>
      </div>

      <ScrollReveal
        class="mt-12 border-t border-border pt-8"
        :delay="120"
      >
        <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          {{ t('skills.languages') }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <AppBadge :label="t('skills.ru')" />
          <AppBadge :label="t('skills.en')" />
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>
</template>
