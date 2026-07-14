<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const switchTo = async (code: string) => {
  const localeCode = code as 'ru' | 'en'
  const path = switchLocalePath(localeCode)
  await setLocale(localeCode)
  await navigateTo(path)
}
</script>

<template>
  <div class="flex items-center gap-1 rounded-md border border-border bg-surface-elevated p-0.5">
    <button
      v-for="item in locales"
      :key="typeof item === 'string' ? item : item.code"
      type="button"
      class="rounded px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors"
      :class="
        (typeof item === 'string' ? item : item.code) === locale
          ? 'bg-accent/15 text-accent-ink'
          : 'text-ink-subtle hover:text-ink'
      "
      :aria-pressed="(typeof item === 'string' ? item : item.code) === locale"
      @click="switchTo(typeof item === 'string' ? item : item.code)"
    >
      {{ typeof item === 'string' ? item : item.code }}
    </button>
  </div>
</template>
