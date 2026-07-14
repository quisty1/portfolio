<script setup lang="ts">
import { experiences } from '@entities/experience/model/data'

const { t } = useI18n()
</script>

<template>
  <section id="experience" class="scroll-mt-24 py-24 sm:py-28">
    <AppContainer>
      <ScrollReveal>
        <AppSectionTitle
          :eyebrow="t('experience.eyebrow')"
          :title="t('experience.title')"
          :description="t('experience.description')"
        />
      </ScrollReveal>

      <div class="space-y-12">
        <ScrollReveal v-for="(item, index) in experiences" :key="item.id" :delay="index * 90">
          <ExperienceCard :item="item" />
        </ScrollReveal>
      </div>
    </AppContainer>
  </section>
</template>
