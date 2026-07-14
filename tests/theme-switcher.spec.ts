import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ThemeSwitcher from '../app/features/theme-switcher/ui/ThemeSwitcher.vue'

describe('ThemeSwitcher', () => {
  it('renders a button', async () => {
    const wrapper = await mountSuspended(ThemeSwitcher)
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
