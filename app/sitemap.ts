import type { MetadataRoute } from "next"
import { buildUrl, LEGAL_LAST_UPDATED } from "@/lib/seo"
import { getAllServiceSlugs } from "@/lib/services"
import { getAllPosts, getAllPostSlugs } from "@/lib/blog"
import company from "@/data/company.json"

export const dynamic = "force-static"

const STATIC_LAST_MODIFIED = new Date(LEGAL_LAST_UPDATED)

function getLastModified(path: string): Date {
  if (path === "/") return STATIC_LAST_MODIFIED

  const blogMatch = path.match(/^\/blog\/([^/]+)\/$/)
  if (blogMatch) {
    const post = getAllPosts().find((p) => p.slug === blogMatch[1])
    if (post) return new Date(post.publishedAt)
  }

  if (path === "/blog/") {
    const posts = getAllPosts()
    if (posts.length > 0) return new Date(posts[0].publishedAt)
  }

  if (path === "/about/") {
    return new Date(company.domainRegisteredDate)
  }

  return STATIC_LAST_MODIFIED
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "/",
    "/about/",
    "/services/",
    "/contact/",
    "/careers/",
    "/why-choose-us/",
    "/our-process/",
    "/portfolio/",
    "/blog/",
    "/faq/",
    "/testimonials/",
    "/privacy/",
    "/terms/",
    "/cookies/",
  ]

  const servicePages = getAllServiceSlugs().map((slug) => `/services/${slug}/`)
  const blogPages = getAllPostSlugs().map((slug) => `/blog/${slug}/`)

  const allPages = [...staticPages, ...servicePages, ...blogPages]

  return allPages.map((page) => ({
    url: buildUrl(page),
    lastModified: getLastModified(page),
    changeFrequency: page === "/" ? "weekly" : page.startsWith("/blog/") ? "monthly" : "monthly",
    priority: page === "/" ? 1 : page.startsWith("/services/") ? 0.8 : page.startsWith("/blog/") ? 0.75 : 0.7,
  }))
}
