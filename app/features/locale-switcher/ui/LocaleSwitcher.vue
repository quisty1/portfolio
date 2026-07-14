<script setup lang="ts">
import type { AppLocale } from '@shared/composables/usePortfolioSite'

const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const localeCodes = computed(() =>
  locales.value.map((item) => (typeof item === 'string' ? item : item.code) as AppLocale),
)

const switchTo = async (code: AppLocale) => {
  const path = switchLocalePath(code)
  await setLocale(code)
  await navigateTo(path)
}
</script>

<template>
  <div
    class="flex items-center gap-1 rounded-md border border-border bg-surface-elevated p-0.5"
    role="group"
    :aria-label="$t('a11y.localeSwitcher')"
  >
    <button
      v-for="code in localeCodes"
      :key="code"
      type="button"
      class="rounded px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors"
      :class="code === locale ? 'bg-accent/15 text-accent-ink' : 'text-ink-subtle hover:text-ink'"
      :aria-pressed="code === locale"
      :aria-label="$t('a11y.switchLocale', { locale: code.toUpperCase() })"
      @click="switchTo(code)"
    >
      {{ code }}
    </button>
  </div>
</template>
