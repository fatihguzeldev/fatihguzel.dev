import { readFile } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'
import { ImageResponse } from 'next/og'
import { SITE_URL } from '@/site/content/identity/loader'
import {
  getArticleShareImageData,
  getArticleShareImageTitleLayout,
  SHARE_IMAGE_SIZE,
  type ShareImageArticle,
} from './share-image'

const siteDomain = new URL(SITE_URL).hostname
const domainDot = siteDomain.lastIndexOf('.')
const fontDirectory = path.join(process.cwd(), 'src/features/articles/share/fonts')

const loadAssets = async () => {
  const [displayFont, monoFont, themeSource] = await Promise.all([
    readFile(path.join(fontDirectory, 'SpaceGrotesk-Medium.ttf')),
    readFile(path.join(fontDirectory, 'JetBrainsMono-Regular.ttf')),
    readFile(path.join(process.cwd(), 'src/styles/tokens/theme.css'), 'utf8'),
  ])
  const lightTheme = themeSource.slice(
    0,
    themeSource.indexOf("html[data-theme='dark']"),
  )
  const color = (name: string) => {
    const value = lightTheme.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]
    if (!value) throw new Error(`Missing light theme color: --${name}`)
    return value.trim()
  }

  return {
    displayFont,
    monoFont,
    colors: {
      background: color('bg'),
      accent: color('accent'),
      metadata: color('text-faint'),
    },
  }
}

let assets: ReturnType<typeof loadAssets> | undefined

export async function renderArticleShareImage(article: ShareImageArticle) {
  const { displayFont, monoFont, colors } = await (assets ??= loadAssets())
  const { title, hashtag, date } = getArticleShareImageData(article)
  const titleLayout = getArticleShareImageTitleLayout(title)

  return new ImageResponse(
    (
      <div
        style={{
          ...SHARE_IMAGE_SIZE,
          display: 'flex',
          flexDirection: 'column',
          padding: 72,
          background: colors.background,
          color: colors.metadata,
          fontFamily: 'JetBrains Mono',
          fontSize: 22,
          lineHeight: 1.3,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <div style={{ display: 'flex' }}>
            <span>{siteDomain.slice(0, domainDot)}</span>
            <span style={{ color: colors.accent }}>.</span>
            <span>{siteDomain.slice(domainDot + 1)}</span>
          </div>
          {hashtag ? (
            <div style={{ display: 'flex', maxWidth: 560 }}>
              <span style={{ color: colors.accent }}>#</span>
              <span>{hashtag.slice(1)}</span>
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: colors.accent,
              fontFamily: 'Space Grotesk',
              fontWeight: 500,
              fontSize: titleLayout.fontSize,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              overflowWrap: 'break-word',
            }}
          >
            {titleLayout.lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{date}</div>
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
      fonts: [
        { name: 'Space Grotesk', data: displayFont, weight: 500, style: 'normal' },
        { name: 'JetBrains Mono', data: monoFont, weight: 400, style: 'normal' },
      ],
    },
  )
}
