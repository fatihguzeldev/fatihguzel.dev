import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { loadSite } from '@/content/load-site'
import { createMetadata } from '@/lib/seo/metadata'
import { PersonJsonLd, WebSiteJsonLd } from '@/lib/seo/json-ld'
import { getThemeScript } from '@/lib/theme/apply-theme'
import '@/styles/globals.css'

const site = loadSite()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
        <PersonJsonLd />
        <WebSiteJsonLd />
        <Header siteName={site.name} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
