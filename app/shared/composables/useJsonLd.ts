import type { MaybeRefOrGetter } from 'vue'

export function useJsonLd(
  schema: MaybeRefOrGetter<Record<string, unknown> | Record<string, unknown>[]>,
) {
  useHead({
    script: computed(() => [
      {
        key: 'json-ld',
        type: 'application/ld+json',
        children: JSON.stringify(toValue(schema)),
      },
    ]),
  })
}
