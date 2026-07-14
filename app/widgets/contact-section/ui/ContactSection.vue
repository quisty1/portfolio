<script setup lang="ts">
type ContactCopyKey = 'email' | 'telegram' | 'phone' | 'github'

const { t } = useI18n()
const { site, githubUrl } = usePortfolioSite()
const { copy, copied } = useClipboard({ copiedDuring: 1800 })
const copiedKey = ref<ContactCopyKey | null>(null)

watch(copied, (isCopied) => {
  if (!isCopied) copiedKey.value = null
})

async function copyContact(key: ContactCopyKey, value: string) {
  await copy(value)
  copiedKey.value = key
}

function copyLabel(key: ContactCopyKey) {
  return copied.value && copiedKey.value === key ? t('contact.copied') : t('contact.copy')
}
</script>

<template>
  <section id="contact" class="scroll-mt-24 py-24 sm:py-28">
    <AppContainer size="narrow">
      <ScrollReveal>
        <AppSectionTitle
          :eyebrow="t('contact.eyebrow')"
          :title="t('contact.title')"
          :description="t('contact.description')"
        />
      </ScrollReveal>

      <ScrollReveal :delay="80" class="space-y-5">
        <div
          class="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
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
          <!-- Clipboard API есть только в браузере — кнопка без ClientOnly ломает гидрацию -->
          <ClientOnly>
            <AppButton
              variant="secondary"
              size="sm"
              @click="copyContact('email', site.contact.email)"
            >
              {{ copyLabel('email') }}
            </AppButton>
          </ClientOnly>
        </div>

        <div
          class="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
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
          <ClientOnly>
            <AppButton
              variant="secondary"
              size="sm"
              @click="copyContact('telegram', site.contact.telegram)"
            >
              {{ copyLabel('telegram') }}
            </AppButton>
          </ClientOnly>
        </div>

        <div
          class="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
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
          <ClientOnly>
            <AppButton
              variant="secondary"
              size="sm"
              @click="copyContact('phone', site.contact.phone)"
            >
              {{ copyLabel('phone') }}
            </AppButton>
          </ClientOnly>
        </div>

        <div
          v-if="githubUrl"
          class="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-xs uppercase tracking-[0.14em] text-ink-subtle">
              {{ t('contact.github') }}
            </p>
            <a
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-1 inline-block text-lg text-ink transition-colors hover:text-accent-ink"
            >
              {{ t('contact.githubLabel') }}
            </a>
          </div>
          <ClientOnly>
            <AppButton variant="secondary" size="sm" @click="copyContact('github', githubUrl)">
              {{ copyLabel('github') }}
            </AppButton>
          </ClientOnly>
        </div>

        <div v-if="site.cvPath" class="pt-4">
          <AppButton :href="site.cvPath" external>
            {{ t('contact.downloadCv') }}
          </AppButton>
        </div>
      </ScrollReveal>
    </AppContainer>
  </section>
</template>
