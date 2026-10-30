import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

export default function createNextConfig(phase: string): NextConfig {
  return {
    // A production build must not replace files used by a running dev server.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
    output: 'export',
    images: {
      unoptimized: true,
    },
    trailingSlash: false,
  }
}
