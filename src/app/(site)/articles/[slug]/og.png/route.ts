import { getArticleSlugs, loadArticleBySlug } from '@/features/articles/content/loader'
import {
  ARTICLE_STATIC_EXPORT_PLACEHOLDER,
  getArticleStaticParams,
} from '@/features/articles/content/static-params'
import { renderArticleShareImage } from '@/features/articles/share/render-share-image'

type ShareImageRouteContext = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams(): { slug: string }[] {
  return getArticleStaticParams(getArticleSlugs())
}

export async function GET(_request: Request, { params }: ShareImageRouteContext) {
  const { slug } = await params

  if (slug === ARTICLE_STATIC_EXPORT_PLACEHOLDER) {
    return new Response(null, { status: 404 })
  }

  const article = loadArticleBySlug(slug)

  if (!article) {
    return new Response(null, { status: 404 })
  }

  return renderArticleShareImage(article)
}
