<script setup lang="ts">
const { t } = useI18n()
const { y } = useWindowScroll()

const VISIBLE_AFTER = 400
const isVisible = computed(() => y.value > VISIBLE_AFTER)

const scrollToTop = () => {
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: preferReducedMotion ? 'auto' : 'smooth' })
}
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-if="isVisible"
      type="button"
      class="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface-elevated text-ink-muted shadow-sm transition-all duration-200 hover:border-accent/40 hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:bottom-8 sm:right-8"
      :aria-label="t('a11y.scrollToTop')"
      @click="scrollToTop"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
