<script setup lang="ts">
interface AppSectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
}

defineProps<AppSectionTitleProps>()
</script>

<template>
  <div class="mb-12 max-w-2xl">
    <p
      v-if="eyebrow"
      class="mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink"
    >
      {{ eyebrow }}
    </p>
    <h2 class="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg"
    >
      {{ description }}
    </p>
  </div>
</template>
