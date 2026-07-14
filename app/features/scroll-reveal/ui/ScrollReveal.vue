<script setup lang="ts">
import type { RevealVariant } from '../lib/useScrollReveal'
import { useScrollReveal } from '../lib/useScrollReveal'

interface ScrollRevealProps {
  variant?: RevealVariant
  delay?: number
  as?: keyof HTMLElementTagNameMap
}

const props = withDefaults(defineProps<ScrollRevealProps>(), {
  variant: 'slide',
  delay: 0,
  as: 'div',
})

const { target, isVisible, variantClass, style } = useScrollReveal({
  variant: props.variant,
  delay: props.delay,
})
</script>

<template>
  <component
    :is="as"
    ref="target"
    :class="[variantClass, { 'is-visible': isVisible }]"
    :style="style"
  >
    <slot />
  </component>
</template>
