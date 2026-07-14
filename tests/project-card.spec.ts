import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { projects } from '../app/entities/project/model/data'
import ProjectCard from '../app/entities/project/ui/ProjectCard.vue'

describe('ProjectCard', () => {
  it('renders project title key content', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: {
        project: projects[0]!,
      },
    })

    expect(wrapper.text()).toContain('Админ-панель')
  })
})
