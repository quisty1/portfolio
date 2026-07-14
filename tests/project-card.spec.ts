import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProjectCard from '../app/entities/project/ui/ProjectCard.vue'
import { projects } from '../app/entities/project/model/types'

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
