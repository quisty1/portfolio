<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 12)
const isOpen = ref(false)

const links = computed(() => [
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.experience'), href: '#experience' },
  { label: t('nav.projects'), href: '#projects' },
  { label: t('nav.skills'), href: '#skills' },
  { label: t('nav.contact'), href: '#contact' },
])

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      isScrolled || isOpen
        ? 'border-b border-border/80 bg-surface/90 backdrop-blur-md'
        : 'bg-transparent'
    "
  >
    <AppContainer class="flex h-16 items-center justify-between gap-4">
      <NuxtLink
        :to="localePath('/')"
        class="font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-accent-ink"
        @click="close"
      >
        YB
      </NuxtLink>

      <nav class="hidden items-center gap-7 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-ink-muted transition-colors hover:text-ink"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeSwitcher />
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink-muted md:hidden"
          :aria-expanded="isOpen"
          :aria-label="isOpen ? 'Close menu' : 'Open menu'"
          @click="isOpen = !isOpen"
        >
          <span class="sr-only">Menu</span>
          <span class="flex flex-col gap-1.5">
            <span
              class="block h-px w-4 bg-current transition-transform"
              :class="isOpen ? 'translate-y-[3.5px] rotate-45' : ''"
            />
            <span
              class="block h-px w-4 bg-current transition-transform"
              :class="isOpen ? '-translate-y-[3.5px] -rotate-45' : ''"
            />
          </span>
        </button>
      </div>
    </AppContainer>

    <div
      v-if="isOpen"
      class="border-t border-border bg-surface md:hidden"
    >
      <AppContainer class="flex flex-col gap-1 py-3">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-md px-3 py-2.5 text-sm text-ink-muted hover:bg-surface-elevated hover:text-ink"
          @click="close"
        >
          {{ link.label }}
        </a>
      </AppContainer>
    </div>
  </header>
</template>
