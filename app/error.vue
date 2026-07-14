<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('notFound.title'),
  description: () => t('notFound.description'),
})
</script>

<template>
  <section class="flex min-h-[70vh] items-center py-28">
    <AppContainer size="narrow">
      <h1 class="font-display text-4xl font-semibold text-ink">
        {{ t('notFound.title') }}
      </h1>
      <p class="mt-4 text-ink-muted">
        {{ t('notFound.description') }}
      </p>
      <AppButton
        class="mt-8"
        :to="localePath('/')"
      >
        {{ t('notFound.cta') }}
      </AppButton>
    </AppContainer>
  </section>
</template>
