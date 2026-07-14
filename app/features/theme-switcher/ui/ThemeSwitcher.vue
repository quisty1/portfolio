<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggle = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

// Стабильный label: isDark на SSR (fallback) и на клиенте (localStorage) часто расходится
const label = computed(() => t('a11y.toggleTheme'))
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-elevated text-ink-muted transition-all duration-200 hover:border-accent/40 hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    :aria-label="label"
    @click="toggle"
  >
    <!-- Иконка зависит от localStorage/system — только на клиенте, чтобы не ломать гидрацию -->
    <ClientOnly>
      <svg
        v-if="isDark"
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        />
      </svg>
      <svg
        v-else
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" />
      </svg>
      <template #fallback>
        <span class="h-4 w-4" aria-hidden="true" />
      </template>
    </ClientOnly>
  </button>
</template>
