/**
 * Unit-тесты утилиты cn (clsx + tailwind-merge)
 */
import { describe, expect, it } from 'vitest'
import { cn } from '../app/shared/lib/cn'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('resolves tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    const maybeHidden = false
    expect(cn('base', maybeHidden && 'hidden', 'visible')).toBe('base visible')
  })
})
