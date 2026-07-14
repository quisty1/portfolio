<script setup lang="ts">
interface AppContainerProps {
  as?: string
  size?: 'default' | 'narrow' | 'wide'
}

withDefaults(defineProps<AppContainerProps>(), {
  as: 'div',
  size: 'default',
})

const sizeClasses: Record<NonNullable<AppContainerProps['size']>, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
}
</script>

<template>
  <component
    :is="as"
    :class="cn('mx-auto w-full px-5 sm:px-8', sizeClasses[size])"
  >
    <slot />
  </component>
</template>
