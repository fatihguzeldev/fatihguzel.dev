import assert from 'node:assert/strict'
import { test } from 'node:test'
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants'
import createNextConfig from '../../../next.config'

test('a production build cannot overwrite the running development server output', () => {
  const development = createNextConfig(PHASE_DEVELOPMENT_SERVER)
  const production = createNextConfig(PHASE_PRODUCTION_BUILD)

  assert.equal(development.distDir, '.next-dev')
  assert.equal(production.distDir, '.next')
  assert.notEqual(development.distDir, production.distDir)
})

test('both phases preserve static export and unoptimized images', () => {
  for (const phase of [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]) {
    const config = createNextConfig(phase)

    assert.equal(config.output, 'export')
    assert.equal(config.images?.unoptimized, true)
    assert.equal(config.trailingSlash, false)
  }
})
