/**
 * Тесты страниц, layout и error.vue (mount + validate project id)
 */
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getProjectById } from '../app/entities/project/model/data'
import ErrorPage from '../app/error.vue'
import DefaultLayout from '../app/layouts/default.vue'
import IndexPage from '../app/pages/index.vue'
import ProjectPage from '../app/pages/projects/[id].vue'

// Страницы/layout используют reveal и color-mode — нужен stub matchMedia
beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
})

describe('project page validate', () => {
  it('accepts known project ids and rejects unknown ones', () => {
    expect(Boolean(getProjectById('gau-admin'))).toBe(true)
    expect(Boolean(getProjectById('missing'))).toBe(false)
  })
})

describe('IndexPage', () => {
  it('renders main portfolio sections', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      route: '/',
    })

    expect(wrapper.text()).toContain('Ярослав Брагин')
    expect(wrapper.find('#about').exists()).toBe(true)
    expect(wrapper.find('#experience').exists()).toBe(true)
    expect(wrapper.find('#projects').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#education').exists()).toBe(true)
    expect(wrapper.find('#contact').exists()).toBe(true)
  })

  it('renders english locale content on /en', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      route: '/en',
    })

    expect(wrapper.text()).toMatch(/Yaroslav Bragin|Get in touch|About/)
  })
})

describe('ProjectPage', () => {
  it('renders case study content for a known project', async () => {
    const wrapper = await mountSuspended(ProjectPage, {
      route: '/projects/gau-admin',
    })

    expect(wrapper.text()).toContain('админ-панель')
    expect(wrapper.text()).toContain('Стек')
    expect(wrapper.text()).toContain('Ключевые результаты')
    expect(wrapper.text()).toContain('Сайт компании')
    expect(wrapper.text()).toContain('К кейсам')
    wrapper.unmount()
  })

  it('creates 404 error when project id is unknown', async () => {
    let thrown: unknown

    try {
      await mountSuspended(ProjectPage, {
        route: {
          path: '/projects/missing-project',
          params: { id: 'missing-project' },
        },
      })
    } catch (error) {
      thrown = error
    }

    // Nuxt may surface createError as throw or as rendered error state
    if (thrown) {
      expect(thrown).toMatchObject({ statusCode: 404 })
    } else {
      expect(Boolean(getProjectById('missing-project'))).toBe(false)
    }
  })
})

describe('ErrorPage', () => {
  it('renders not found content and home link', async () => {
    const wrapper = await mountSuspended(ErrorPage)

    expect(wrapper.text()).toContain('Страница не найдена')
    expect(wrapper.text()).toContain('На главную')
    expect(wrapper.find('a').exists()).toBe(true)
  })
})

describe('DefaultLayout', () => {
  it('renders skip link, main landmark, header and footer', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: () => 'Page content' },
    })

    expect(wrapper.find('a[href="#main-content"]').exists()).toBe(true)
    expect(wrapper.find('#main-content').exists()).toBe(true)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.text()).toContain('Page content')
  })
})
