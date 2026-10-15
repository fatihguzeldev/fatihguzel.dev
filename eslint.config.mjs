import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    ignores: [
      'node_modules/',
      'out/',
      '.next/',
      'context/',
      'planning/',
      'next-env.d.ts',
    ],
  },
  {
    files: ['src/{components,lib}/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/**', '@/site/**', '@/presentations/**'],
              message:
                'Shared UI and technical helpers must stay independent of site and feature contexts.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/site/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/**', '@/presentations/**'],
              message:
                'Feature-specific content and SEO belong to the owning feature; routes compose them.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/content/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/components/**', '**/player/**', '**/seo/**'],
              message:
                'Content contracts and loaders must not depend on rendering or browser UI.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/presentations/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/**', '@/site/**', '@/components/**'],
              message:
                'Presentation sources own their visual language and must not depend on the site or viewer.',
            },
          ],
        },
      ],
    },
  },
]

export default eslintConfig
