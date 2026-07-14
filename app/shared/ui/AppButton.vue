<script setup lang="ts">
interface AppButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  external: false,
  href: undefined,
  to: undefined,
})

const variantClasses: Record<NonNullable<AppButtonProps['variant']>, string> = {
  primary:
    'bg-accent text-white dark:text-surface hover:brightness-110 shadow-sm shadow-accent/20',
  secondary:
    'border border-border bg-surface-elevated text-ink hover:border-accent/50 hover:text-accent-ink',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-elevated',
}

const sizeClasses: Record<NonNullable<AppButtonProps['size']>, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
    variantClasses[props.variant],
    sizeClasses[props.size],
  ),
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="classes"
  >
    <slot />
  </button>
</template>
