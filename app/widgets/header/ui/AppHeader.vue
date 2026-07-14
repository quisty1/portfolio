<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 12)
const isOpen = ref(false)
const menuButtonRef = ref<HTMLButtonElement | null>(null)

const links = computed(() => [
  { label: t('nav.about'), to: localePath('/#about') },
  { label: t('nav.experience'), to: localePath('/#experience') },
  { label: t('nav.projects'), to: localePath('/#projects') },
  { label: t('nav.skills'), to: localePath('/#skills') },
  { label: t('nav.contact'), to: localePath('/#contact') },
])

const close = () => {
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

onKeyStroke('Escape', () => {
  if (!isOpen.value) {
    return
  }
  close()
  nextTick(() => menuButtonRef.value?.focus())
})
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

      <nav class="hidden items-center gap-7 md:flex" :aria-label="t('a11y.mainNav')">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-ink-muted transition-colors hover:text-ink"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeSwitcher />
        <button
          ref="menuButtonRef"
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink-muted md:hidden"
          :aria-expanded="isOpen"
          aria-controls="mobile-nav"
          :aria-label="isOpen ? t('a11y.closeMenu') : t('a11y.openMenu')"
          @click="toggle"
        >
          <span class="flex flex-col gap-1.5" aria-hidden="true">
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

    <div v-if="isOpen" id="mobile-nav" class="border-t border-border bg-surface md:hidden">
      <nav :aria-label="t('a11y.mobileNav')">
        <AppContainer class="flex flex-col gap-1 py-3">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-md px-3 py-2.5 text-sm text-ink-muted hover:bg-surface-elevated hover:text-ink"
            @click="close"
          >
            {{ link.label }}
          </NuxtLink>
        </AppContainer>
      </nav>
    </div>
  </header>
</template>
