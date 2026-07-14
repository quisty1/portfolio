<script setup lang="ts">
import { educationItems } from '@entities/education/model/types'

const { t } = useI18n()
</script>

<template>
  <section
    id="education"
    class="scroll-mt-24 py-24 sm:py-28"
  >
    <AppContainer>
      <ScrollReveal>
        <AppSectionTitle
          :eyebrow="t('education.eyebrow')"
          :title="t('education.title')"
          :description="t('education.description')"
        />
      </ScrollReveal>

      <div class="grid gap-8 md:grid-cols-2">
        <ScrollReveal
          v-for="(item, index) in educationItems"
          :key="item.id"
          :delay="index * 80"
          class="border-t border-border pt-6"
        >
          <p class="text-sm text-ink-subtle">
            {{ t(item.periodKey) }} · {{ t(item.degreeKey) }}
          </p>
          <h3 class="mt-2 font-display text-xl font-semibold text-ink">
            {{ t(item.titleKey) }}
          </h3>
          <p class="mt-2 text-ink-muted">
            {{ t(item.institutionKey) }}
          </p>
        </ScrollReveal>
      </div>
    </AppContainer>
  </section>
</template>
