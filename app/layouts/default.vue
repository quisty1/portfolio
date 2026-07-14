<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
})
</script>

<template>
  <div class="min-h-svh bg-surface text-ink">
    <a
      href="#main-content"
      class="absolute left-4 top-4 z-[100] -translate-y-16 rounded-md bg-surface-elevated px-4 py-2 text-sm font-medium text-ink shadow-md outline-none ring-2 ring-transparent transition-transform focus:translate-y-0 focus:ring-accent/40"
    >
      {{ $t('a11y.skipToContent') }}
    </a>
    <AppHeader />
    <main id="main-content">
      <slot />
    </main>
    <AppFooter />
    <ScrollToTop />
  </div>
</template>
