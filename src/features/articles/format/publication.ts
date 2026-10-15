type ArticlePublication = {
  publishedAt: string
  updatedAt?: string
}

export function getShownUpdatedAt({
  publishedAt,
  updatedAt,
}: ArticlePublication): string | undefined {
  return updatedAt && updatedAt.slice(0, 10) !== publishedAt.slice(0, 10)
    ? updatedAt
    : undefined
}
