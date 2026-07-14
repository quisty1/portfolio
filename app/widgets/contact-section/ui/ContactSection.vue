<script setup lang="ts">
const { t } = useI18n()
const { site } = usePortfolioSite()
const { copy, copied, isSupported } = useClipboard({
  source: site.contact.email,
  copiedDuring: 1800,
})
</script>

<template>
  <section
    id="contact"
    class="scroll-mt-24 py-24 sm:py-28"
  >
    <AppContainer size="narrow">
      <ScrollReveal>
        <AppSectionTitle
          :eyebrow="t('contact.eyebrow')"
          :title="t('contact.title')"
          :description="t('contact.description')"
        />
      </ScrollReveal>

      <ScrollReveal
        :delay="80"
        class="space-y-5"
      >
        <div class="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.14em] text-ink-subtle">
              {{ t('contact.email') }}
            </p>
            <a
              :href="`mailto:${site.contact.email}`"
              class="mt-1 inline-block text-lg text-ink transition-colors hover:text-accent-ink"
            >
              {{ site.contact.email }}
            </a>
          </div>
          <AppButton
            v-if="isSupported"
            variant="secondary"
            size="sm"
            @click="copy(site.contact.email)"
          >
            {{ copied ? t('contact.copied') : t('contact.copy') }}
          </AppButton>
        </div>

        <div class="border-t border-border pt-5">
          <p class="text-xs uppercase tracking-[0.14em] text-ink-subtle">
            {{ t('contact.telegram') }}
          </p>
          <a
            :href="site.contact.telegramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-1 inline-block text-lg text-ink transition-colors hover:text-accent-ink"
          >
            {{ site.contact.telegram }}
          </a>
        </div>

        <div class="border-t border-border pt-5">
          <p class="text-xs uppercase tracking-[0.14em] text-ink-subtle">
            {{ t('contact.phone') }}
          </p>
          <a
            :href="`tel:${site.contact.phone}`"
            class="mt-1 inline-block text-lg text-ink transition-colors hover:text-accent-ink"
          >
            {{ site.contact.phoneDisplay }}
          </a>
        </div>

        <div class="pt-4">
          <AppButton
            :href="site.cvPath"
            external
          >
            {{ t('contact.downloadCv') }}
          </AppButton>
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>
</template>
