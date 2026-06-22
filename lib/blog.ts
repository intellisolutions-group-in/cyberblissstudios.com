import blogPosts from "@/data/blog.json"

export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  readTimeMinutes: number
  tags: string[]
  sections: BlogSection[]
  relatedSlugs: string[]
}

const posts = blogPosts as BlogPost[]

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPostSlugs(): string[] {
  return posts.map((post) => post.slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []

  const related = current.relatedSlugs
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => p !== undefined)

  if (related.length >= limit) return related.slice(0, limit)

  const extras = getAllPosts()
    .filter((p) => p.slug !== slug && !related.some((r) => r.slug === p.slug))
    .slice(0, limit - related.length)

  return [...related, ...extras].slice(0, limit)
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getPostWordCount(post: BlogPost): number {
  const text = [
    post.excerpt,
    ...post.sections.flatMap((section) => [
      section.heading ?? "",
      ...section.paragraphs,
    ]),
  ].join(" ")
  return text.split(/\s+/).filter(Boolean).length
}
