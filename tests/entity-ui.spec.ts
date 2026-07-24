/**
 * Mount-тесты UI-карточек entities (Experience, Project, Education, Skill)
 */
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { experiences } from '../app/entities/experience/model/data'
import ExperienceCard from '../app/entities/experience/ui/ExperienceCard.vue'
import { projects } from '../app/entities/project/model/data'
import ProjectCard from '../app/entities/project/ui/ProjectCard.vue'
import { skillGroups } from '../app/entities/skill/model/data'
import SkillGroupCard from '../app/entities/skill/ui/SkillGroupCard.vue'
import type { ExperienceItem } from '../app/entities/experience/model/types'
import type { Project } from '../app/entities/project/model/types'

describe('ProjectCard', () => {
  it('renders project title key content', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: {
        project: projects[0]!,
      },
    })

    expect(wrapper.text()).toContain('админ-панель')
  })

  it('limits technology badges to six', async () => {
    const project: Project = {
      ...projects[0]!,
      technologies: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    }

    const wrapper = await mountSuspended(ProjectCard, {
      props: { project },
    })

    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('F')
    expect(wrapper.text()).not.toContain('G')
    expect(wrapper.text()).toContain('Подробнее')
  })

  it('links to project detail page', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: projects[0]! },
    })

    const href = wrapper.find('a').attributes('href')
    expect(href).toContain('/projects/gau-admin')
  })
})

describe('ExperienceCard', () => {
  it('renders company as external link when companyUrl is set', async () => {
    const wrapper = await mountSuspended(ExperienceCard, {
      props: { item: experiences[0]! },
    })

    const link = wrapper.find('h3 a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe(experiences[0]!.companyUrl)
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(wrapper.findAll('li')).toHaveLength(experiences[0]!.highlightsKeys.length)
  })

  it('renders company as span when companyUrl is missing', async () => {
    const item: ExperienceItem = {
      ...experiences[0]!,
      companyUrl: undefined,
    }

    const wrapper = await mountSuspended(ExperienceCard, {
      props: { item },
    })

    expect(wrapper.find('h3 a').exists()).toBe(false)
    expect(wrapper.find('h3 span').exists()).toBe(true)
  })

  it('renders all stack badges', async () => {
    const wrapper = await mountSuspended(ExperienceCard, {
      props: { item: experiences[0]! },
    })

    for (const tech of experiences[0]!.stack) {
      expect(wrapper.text()).toContain(tech)
    }
  })
})

describe('SkillGroupCard', () => {
  it('renders group title and all items', async () => {
    const group = skillGroups[0]!
    const wrapper = await mountSuspended(SkillGroupCard, {
      props: { group },
    })

    expect(wrapper.text()).toContain('Основа')
    for (const item of group.items) {
      expect(wrapper.text()).toContain(item)
    }
  })
})
