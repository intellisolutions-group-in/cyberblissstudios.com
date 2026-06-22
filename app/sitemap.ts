import type { MetadataRoute } from "next"
import company from "@/data/company.json"
import { getAllServiceSlugs } from "@/lib/services"
import { getAllPostSlugs } from "@/lib/blog"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = company.url

  const staticPages = [
    "",
    "about",
    "services",
    "contact",
    "careers",
    "why-choose-us",
    "our-process",
    "portfolio",
    "blog",
    "faq",
    "testimonials",
    "privacy",
    "terms",
    "cookies",
  ]

  const servicePages = getAllServiceSlugs().map((slug) => `services/${slug}`)
  const blogPages = getAllPostSlugs().map((slug) => `blog/${slug}`)

  const allPages = [...staticPages, ...servicePages, ...blogPages]

  return allPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : page.startsWith("blog/") ? "monthly" : "monthly",
    priority: page === "" ? 1 : page.startsWith("services/") ? 0.8 : page.startsWith("blog/") ? 0.75 : 0.7,
  }))
}
