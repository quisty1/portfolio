<script setup lang="ts">
interface AppBadgeProps {
  label: string
}

defineProps<AppBadgeProps>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-accent-ink"
  >
    {{ label }}
  </span>
</template>
