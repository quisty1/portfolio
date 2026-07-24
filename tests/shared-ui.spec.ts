/**
 * Mount-тесты shared UI-компонентов (Button, Badge, Container и т.д.)
 */
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppBadge from '../app/shared/ui/AppBadge.vue'
import AppButton from '../app/shared/ui/AppButton.vue'
import AppContainer from '../app/shared/ui/AppContainer.vue'
import AppSectionTitle from '../app/shared/ui/AppSectionTitle.vue'

describe('AppButton', () => {
  it('renders as button by default', async () => {
    const wrapper = await mountSuspended(AppButton, {
      slots: { default: () => 'Click me' },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Click me')
  })

  it('renders NuxtLink when to is set', async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: { to: '/#contact' },
      slots: { default: () => 'Contact' },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders external anchor with rel when href and external are set', async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        href: 'https://example.com',
        external: true,
        variant: 'secondary',
        size: 'lg',
      },
      slots: { default: () => 'External' },
    })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })
})

describe('AppBadge', () => {
  it('renders label', async () => {
    const wrapper = await mountSuspended(AppBadge, {
      props: { label: 'Vue' },
    })

    expect(wrapper.text()).toBe('Vue')
  })
})

describe('AppContainer', () => {
  it('renders as main with narrow size class', async () => {
    const wrapper = await mountSuspended(AppContainer, {
      props: { as: 'main', size: 'narrow' },
      slots: { default: () => 'Content' },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('main')
    expect(wrapper.classes()).toContain('max-w-3xl')
  })

  it('uses default max width when size is omitted', async () => {
    const wrapper = await mountSuspended(AppContainer, {
      slots: { default: () => 'Content' },
    })

    expect(wrapper.classes()).toContain('max-w-6xl')
  })

  it('uses wide max width', async () => {
    const wrapper = await mountSuspended(AppContainer, {
      props: { size: 'wide' },
      slots: { default: () => 'Content' },
    })

    expect(wrapper.classes()).toContain('max-w-7xl')
  })
})

describe('AppSectionTitle', () => {
  it('always renders title in h2', async () => {
    const wrapper = await mountSuspended(AppSectionTitle, {
      props: { title: 'Section' },
    })

    expect(wrapper.find('h2').text()).toBe('Section')
    expect(wrapper.findAll('p')).toHaveLength(0)
  })

  it('renders eyebrow and description when provided', async () => {
    const wrapper = await mountSuspended(AppSectionTitle, {
      props: {
        eyebrow: 'Eyebrow',
        title: 'Title',
        description: 'Description',
      },
    })

    expect(wrapper.text()).toContain('Eyebrow')
    expect(wrapper.text()).toContain('Description')
    expect(wrapper.findAll('p')).toHaveLength(2)
  })
})
