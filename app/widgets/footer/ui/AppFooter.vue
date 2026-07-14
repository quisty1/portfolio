<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border py-10">
    <AppContainer class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-ink-muted">
        © {{ year }} {{ t('footer.rights') }}
      </p>
      <p class="text-sm text-ink-subtle">
        {{ t('footer.built') }}
      </p>
    </AppContainer>
  </footer>
</template>
