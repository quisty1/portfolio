<script setup lang="ts">
const { t } = useI18n()
const { site } = usePortfolioSite()
</script>

<template>
  <section class="relative min-h-[100svh] overflow-hidden pt-16">
    <div class="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
      <div class="absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div class="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,var(--surface)_70%)]"
      />
    </div>

    <AppContainer class="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20">
      <ScrollReveal variant="fade">
        <p
          class="mb-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-ink"
        >
          {{ t('hero.location') }}
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="80">
        <h1
          class="font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          {{ t('hero.name') }}
        </h1>
      </ScrollReveal>

      <ScrollReveal :delay="140">
        <p class="mt-5 font-display text-xl text-accent-ink sm:text-2xl">
          {{ t('hero.role') }}
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="200">
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          {{ t('hero.lead') }}
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="280" class="mt-10 flex flex-wrap gap-3">
        <AppButton href="#contact" size="lg">
          {{ t('hero.ctaContact') }}
        </AppButton>
        <AppButton v-if="site.cvPath" :href="site.cvPath" variant="secondary" size="lg" external>
          {{ t('hero.ctaCv') }}
        </AppButton>
      </ScrollReveal>
    </AppContainer>
  </section>
</template>
