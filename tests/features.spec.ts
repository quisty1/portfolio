/**
 * Тесты features: useScrollReveal, ScrollReveal, locale/theme/scroll-to-top
 */
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useScrollReveal } from '../app/features/scroll-reveal/lib/useScrollReveal'
import ScrollReveal from '../app/features/scroll-reveal/ui/ScrollReveal.vue'
import LocaleSwitcher from '../app/features/locale-switcher/ui/LocaleSwitcher.vue'
import ScrollToTop from '../app/features/scroll-to-top/ui/ScrollToTop.vue'
import ThemeSwitcher from '../app/features/theme-switcher/ui/ThemeSwitcher.vue'

const scrollY = ref(0)

mockNuxtImport('useWindowScroll', () => {
  return () => ({
    x: ref(0),
    y: scrollY,
  })
})

/** Стаб matchMedia для ветки prefers-reduced-motion в useScrollReveal */
function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

describe('useScrollReveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('maps variant classes and delay style', () => {
    stubMatchMedia(true)

    const fade = useScrollReveal({ variant: 'fade', delay: 200 })
    expect(fade.variantClass.value).toBe('reveal-fade')
    expect(fade.style.value['--reveal-delay']).toBe('200ms')

    const slideLeft = useScrollReveal({ variant: 'slide-left' })
    expect(slideLeft.variantClass.value).toBe('reveal-slide-left')

    const slide = useScrollReveal({ variant: 'slide' })
    expect(slide.variantClass.value).toBe('reveal')
  })

  it('marks as visible immediately when reduced motion is preferred', async () => {
    stubMatchMedia(true)

    const Host = defineComponent({
      setup() {
        const reveal = useScrollReveal()
        return () =>
          h('div', {
            ref: (el) => {
              reveal.target.value = el as HTMLElement | null
            },
            'data-visible': reveal.isVisible.value,
          })
      },
    })

    const wrapper = await mountSuspended(Host)
    await nextTick()
    expect(wrapper.attributes('data-visible')).toBe('true')
  })

  it('becomes visible when intersection observer reports entry', async () => {
    stubMatchMedia(false)

    type ObserverCb = (entries: Array<{ isIntersecting: boolean }>) => void
    let observerCb: ObserverCb | undefined

    // Мок IO: сохраняем callback, чтобы симулировать пересечение вручную
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          observerCb = cb as unknown as ObserverCb
        }

        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
        takeRecords = vi.fn(() => [])
      },
    )

    const isVisible = ref(false)

    const Host = defineComponent({
      setup() {
        const reveal = useScrollReveal({ threshold: 0.2 })
        return () => {
          isVisible.value = reveal.isVisible.value
          return h('div', {
            ref: (el) => {
              reveal.target.value = el as HTMLElement | null
            },
            'data-visible': String(reveal.isVisible.value),
          })
        }
      },
    })

    const wrapper = await mountSuspended(Host)
    await nextTick()
    expect(wrapper.attributes('data-visible')).toBe('false')

    observerCb?.([{ isIntersecting: true }])
    await nextTick()

    expect(isVisible.value).toBe(true)
  })
})

describe('ScrollReveal', () => {
  beforeEach(() => {
    stubMatchMedia(true)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders custom element with variant class and slot', async () => {
    const wrapper = await mountSuspended(ScrollReveal, {
      props: { as: 'section', variant: 'fade', delay: 100 },
      slots: { default: () => 'Revealed' },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('section')
    expect(wrapper.classes()).toContain('reveal-fade')
    expect(wrapper.classes()).toContain('is-visible')
    expect(wrapper.text()).toContain('Revealed')
  })
})

describe('ScrollToTop', () => {
  beforeEach(() => {
    scrollY.value = 0
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    scrollY.value = 0
  })

  it('is hidden near the top of the page', async () => {
    stubMatchMedia(false)
    scrollY.value = 0

    const wrapper = await mountSuspended(ScrollToTop)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('shows button after scroll and scrolls to top on click', async () => {
    stubMatchMedia(false)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    scrollY.value = 500

    const wrapper = await mountSuspended(ScrollToTop)
    await nextTick()

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.attributes('aria-label')).toBeTruthy()

    await button.trigger('click')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('uses auto scroll behavior when reduced motion is preferred', async () => {
    stubMatchMedia(true)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    scrollY.value = 500

    const wrapper = await mountSuspended(ScrollToTop)
    await nextTick()

    await wrapper.find('button').trigger('click')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })
})

describe('LocaleSwitcher', () => {
  it('renders locale buttons with aria-pressed on active locale', async () => {
    const wrapper = await mountSuspended(LocaleSwitcher)
    const buttons = wrapper.findAll('button')

    expect(buttons.length).toBeGreaterThanOrEqual(2)
    expect(buttons.some((button) => button.attributes('aria-pressed') === 'true')).toBe(true)
    expect(wrapper.text().toLowerCase()).toContain('ru')
    expect(wrapper.text().toLowerCase()).toContain('en')
  })

  it('invokes locale switch on inactive button click', async () => {
    const wrapper = await mountSuspended(LocaleSwitcher, {
      route: '/',
    })

    const inactive = wrapper
      .findAll('button')
      .find((button) => button.attributes('aria-pressed') === 'false')

    expect(inactive).toBeTruthy()
    await inactive!.trigger('click')
    await nextTick()

    expect(wrapper.findAll('button').length).toBeGreaterThanOrEqual(2)
  })
})

describe('ThemeSwitcher', () => {
  it('renders a button with stable aria-label', async () => {
    const wrapper = await mountSuspended(ThemeSwitcher)
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(button.attributes('aria-label')).toBeTruthy()
  })

  it('toggles color mode preference both ways', async () => {
    const wrapper = await mountSuspended(ThemeSwitcher)
    const colorMode = useColorMode()
    colorMode.preference = 'light'
    await nextTick()

    await wrapper.find('button').trigger('click')
    expect(colorMode.preference).toBe('dark')

    await wrapper.find('button').trigger('click')
    expect(colorMode.preference).toBe('light')
  })
})
