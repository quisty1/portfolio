/**
 * Проверка: все *Key из entity data существуют и непусты в ru/en locales
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { educationItems } from '../app/entities/education/model/data'
import { experiences } from '../app/entities/experience/model/data'
import { projects } from '../app/entities/project/model/data'
import { skillGroups } from '../app/entities/skill/model/data'

const ru = JSON.parse(readFileSync(resolve('locales/ru.json'), 'utf-8')) as Record<string, unknown>
const en = JSON.parse(readFileSync(resolve('locales/en.json'), 'utf-8')) as Record<string, unknown>

/** Достаёт значение по dotted-ключу (a.b.c) из вложенного объекта locale */
function resolveKey(messages: Record<string, unknown>, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, messages)
}

/** Собирает все i18n-ключи из experience / project / skill / education */
function collectEntityKeys(): string[] {
  const keys: string[] = []

  for (const item of experiences) {
    keys.push(
      item.companyKey,
      item.roleKey,
      item.periodKey,
      item.locationKey,
      ...item.highlightsKeys,
    )
  }

  for (const project of projects) {
    keys.push(
      project.titleKey,
      project.descriptionKey,
      project.detailLeadKey,
      project.roleKey,
      project.periodKey,
      ...project.highlightsKeys,
    )
  }

  for (const group of skillGroups) {
    keys.push(group.titleKey)
  }

  for (const item of educationItems) {
    keys.push(item.titleKey, item.institutionKey, item.periodKey, item.degreeKey)
  }

  return keys
}

describe('i18n entity keys', () => {
  const keys = collectEntityKeys()

  it('resolves every entity key in ru locale', () => {
    for (const key of keys) {
      const value = resolveKey(ru, key)
      expect(value, `missing ru key: ${key}`).toEqual(expect.any(String))
      expect(String(value).length, `empty ru key: ${key}`).toBeGreaterThan(0)
    }
  })

  it('resolves every entity key in en locale', () => {
    for (const key of keys) {
      const value = resolveKey(en, key)
      expect(value, `missing en key: ${key}`).toEqual(expect.any(String))
      expect(String(value).length, `empty en key: ${key}`).toBeGreaterThan(0)
    }
  })
})
