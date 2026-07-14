<script setup lang="ts">
import { projects } from '@entities/project/model/types'

const { t } = useI18n()
</script>

<template>
  <section
    id="projects"
    class="scroll-mt-24 py-24 sm:py-28"
  >
    <AppContainer>
      <ScrollReveal>
        <AppSectionTitle
          :eyebrow="t('projects.eyebrow')"
          :title="t('projects.title')"
          :description="t('projects.description')"
        />
      </ScrollReveal>

      <div>
        <ScrollReveal
          v-for="(project, index) in projects"
          :key="project.id"
          :delay="index * 80"
        >
          <ProjectCard :project="project" />
        </ScrollReveal>
      </div>
    </AppContainer>
  </section>
</template>
