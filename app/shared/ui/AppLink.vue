<script setup lang="ts">
interface AppLinkProps {
  href?: string
  to?: string
  external?: boolean
}

withDefaults(defineProps<AppLinkProps>(), {
  external: false,
  href: undefined,
  to: undefined,
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="text-ink transition-colors hover:text-accent-ink"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    class="text-ink transition-colors hover:text-accent-ink"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
</template>
