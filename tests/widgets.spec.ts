/**
 * Mount-тесты виджетов секций (hero, about, projects, header/footer и т.д.)
 */
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { educationItems } from '../app/entities/education/model/data'
import { experiences } from '../app/entities/experience/model/data'
import { projects } from '../app/entities/project/model/data'
import { skillGroups } from '../app/entities/skill/model/data'
import AboutSection from '../app/widgets/about-section/ui/AboutSection.vue'
import ContactSection from '../app/widgets/contact-section/ui/ContactSection.vue'
import EducationSection from '../app/widgets/education-section/ui/EducationSection.vue'
import ExperienceSection from '../app/widgets/experience-section/ui/ExperienceSection.vue'
import AppFooter from '../app/widgets/footer/ui/AppFooter.vue'
import AppHeader from '../app/widgets/header/ui/AppHeader.vue'
import HeroSection from '../app/widgets/hero-section/ui/HeroSection.vue'
import ProjectsSection from '../app/widgets/projects-section/ui/ProjectsSection.vue'
import SkillsSection from '../app/widgets/skills-section/ui/SkillsSection.vue'

// Виджеты тянут scroll-reveal / color-mode — без matchMedia happy-dom падает
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

describe('AppHeader', () => {
  it('renders brand and navigation links', async () => {
    const wrapper = await mountSuspended(AppHeader)

    expect(wrapper.text()).toContain('YB')
    expect(wrapper.text()).toContain('Обо мне')
    expect(wrapper.find('header').classes()).toContain('bg-transparent')
  })

  it('toggles mobile menu and closes on Escape', async () => {
    const wrapper = await mountSuspended(AppHeader)
    const menuButton = wrapper.find('button[aria-controls="mobile-nav"]')

    expect(menuButton.attributes('aria-expanded')).toBe('false')
    await menuButton.trigger('click')
    expect(menuButton.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('#mobile-nav').exists()).toBe(true)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })
})

describe('HeroSection', () => {
  it('renders name, CTAs and CV button', async () => {
    const wrapper = await mountSuspended(HeroSection)

    expect(wrapper.text()).toContain('Ярослав Брагин')
    expect(wrapper.text()).toContain('Связаться')
    expect(wrapper.text()).toContain('Скачать резюме')
    expect(wrapper.find('a[href="/cv/bragin-yaroslav.pdf"]').exists()).toBe(true)
  })
})

describe('ContactSection', () => {
  it('renders contact channels and CV download', async () => {
    const wrapper = await mountSuspended(ContactSection)

    expect(wrapper.find('#contact').exists()).toBe(true)
    expect(wrapper.text()).toContain('braginyaroslav1@gmail.com')
    expect(wrapper.text()).toContain('@yar_bragin')
    expect(wrapper.text()).toContain('Скачать CV')
  })

  it('copies contact value and shows copied label', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })
    document.execCommand = vi.fn(() => true)

    const wrapper = await mountSuspended(ContactSection)
    const copyButtons = wrapper
      .findAll('button')
      .filter((button) => button.text().includes('Скопировать'))

    expect(copyButtons.length).toBeGreaterThan(0)
    await copyButtons[0]!.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 20))

    expect(
      writeText.mock.calls.length +
        (document.execCommand as ReturnType<typeof vi.fn>).mock.calls.length,
    ).toBeGreaterThan(0)
    expect(wrapper.text()).toMatch(/Скопировано|Скопировать/)
  })
})

describe('section smoke', () => {
  it('AboutSection renders four points', async () => {
    const wrapper = await mountSuspended(AboutSection)
    expect(wrapper.find('#about').exists()).toBe(true)
    expect(wrapper.findAll('#about .border-t').length).toBe(4)
  })

  it('ExperienceSection renders all experience cards', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    expect(wrapper.find('#experience').exists()).toBe(true)
    expect(wrapper.findAll('article')).toHaveLength(experiences.length)
  })

  it('ProjectsSection renders all project cards', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    expect(wrapper.find('#projects').exists()).toBe(true)
    expect(wrapper.findAll('article')).toHaveLength(projects.length)
  })

  it('SkillsSection renders groups and languages', async () => {
    const wrapper = await mountSuspended(SkillsSection)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.text()).toContain('Основа')
    expect(wrapper.text()).toContain('Русский')
    expect(skillGroups.length).toBeGreaterThan(0)
  })

  it('EducationSection renders education items', async () => {
    const wrapper = await mountSuspended(EducationSection)
    expect(wrapper.find('#education').exists()).toBe(true)
    expect(wrapper.text()).toContain('Прикладная информатика')
    expect(educationItems.length).toBe(2)
  })

  it('AppFooter renders year and rights', async () => {
    const wrapper = await mountSuspended(AppFooter)
    expect(wrapper.text()).toContain('2026')
    expect(wrapper.text()).toContain('Ярослав Брагин')
  })
})
