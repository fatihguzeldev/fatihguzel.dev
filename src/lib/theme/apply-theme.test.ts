import assert from 'node:assert/strict'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import { getThemeScript } from './apply-theme'

function bootstrapTheme(stored: string | null, systemDark: boolean, blocked = false) {
  const document = { documentElement: { dataset: { theme: 'light' } } }
  runInNewContext(getThemeScript(), {
    document,
    localStorage: {
      getItem() {
        if (blocked) throw new Error('storage unavailable')
        return stored
      },
    },
    window: { matchMedia: () => ({ matches: systemDark }) },
  })
  return document.documentElement.dataset.theme
}

test('stored theme takes precedence over the system before hydration', () => {
  assert.equal(bootstrapTheme('light', true), 'light')
  assert.equal(bootstrapTheme('dark', false), 'dark')
})

test('missing or invalid stored themes follow the system', () => {
  assert.equal(bootstrapTheme(null, true), 'dark')
  assert.equal(bootstrapTheme('invalid', false), 'light')
})

test('blocked storage preserves the light bootstrap fallback', () => {
  assert.equal(bootstrapTheme(null, true, true), 'light')
})
