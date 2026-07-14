<script setup lang="ts">
const { t } = useI18n()

const points = ['0', '1', '2', '3'] as const
</script>

<template>
  <section
    id="about"
    class="scroll-mt-24 py-24 sm:py-28"
  >
    <AppContainer>
      <ScrollReveal>
        <AppSectionTitle
          :eyebrow="t('about.eyebrow')"
          :title="t('about.title')"
          :description="t('about.description')"
        />
      </ScrollReveal>

      <div class="grid gap-4 sm:grid-cols-2">
        <ScrollReveal
          v-for="(point, index) in points"
          :key="point"
          :delay="index * 70"
          class="border-t border-border pt-5"
        >
          <p class="text-base leading-relaxed text-ink-muted">
            {{ t(`about.points.${point}`) }}
          </p>
        </ScrollReveal>
      </div>
    </AppContainer>
  </section>
</template>
