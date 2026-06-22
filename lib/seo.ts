import type { Metadata } from "next"
import company from "@/data/company.json"

export const SITE_URL = company.url
export const OG_IMAGE = `${SITE_URL}/images/og-image.png`
export const LOGO_IMAGE = `${SITE_URL}/images/logo.png`
export const LOGO_PATH = "/images/logo.png"
export const metadataBase = new URL(SITE_URL)

/** Fixed policy revision date — update when legal content changes. */
export const LEGAL_LAST_UPDATED = company.legalLastUpdated
export const LEGAL_LAST_UPDATED_DISPLAY = new Date(LEGAL_LAST_UPDATED).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

/** Date job listings were last refreshed — update when openings change. */
export const JOB_POSTINGS_DATE = "2025-06-01"

const DEFAULT_KEYWORDS = [
  company.brandName,
  "software development India",
  "IT services",
]

type OgType = "website" | "article"

export type PageMeta = {
  title: string
  description: string
  keywords?: string[]
  path?: string
  ogType?: OgType
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noIndex?: boolean
}

export function buildUrl(path = ""): string {
  if (!path || path === "/") return `${SITE_URL}/`
  const normalized = path.startsWith("/") ? path : `/${path}`
  return normalized.endsWith("/") ? `${SITE_URL}${normalized}` : `${SITE_URL}${normalized}/`
}

export function createMetadata({
  title,
  description,
  keywords = [],
  path = "",
  ogType = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageMeta): Metadata {
  const url = buildUrl(path)
  const isHome = path === "/" || path === ""
  const fullTitle = isHome ? `${company.brandName} | ${title}` : `${title} | ${company.brandName}`

  return {
    metadataBase,
    title: fullTitle,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    authors: [{ name: company.brandName, url: SITE_URL }],
    creator: company.brandName,
    publisher: company.brandName,
    applicationName: company.brandName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.brandName,
      locale: "en_IN",
      type: ogType,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${company.brandName} — IT & Software Development Company in India`,
          type: "image/png",
        },
      ],
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
      ...(ogType === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(ogType === "article" && authors?.length ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/favicon-32x32.png",
    },
    category: "technology",
  }
}

export function organizationSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.brandName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_IMAGE,
      width: 3334,
      height: 951,
    },
    email: company.email,
    foundingDate: String(company.establishedYear),
    description: company.description,
    knowsAbout: company.knowsAbout,
    areaServed: {
      "@type": "Country",
      name: company.targetCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: company.email,
      availableLanguage: ["English", "Hindi"],
      areaServed: company.targetCountry,
    },
  }

  if (company.socialProfiles?.length) {
    schema.sameAs = company.socialProfiles
  }

  return schema
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: company.brandName,
    url: SITE_URL,
    description: company.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  }
}

export function webPageSchema({
  title,
  description,
  path,
  dateModified,
}: {
  title: string
  description: string
  path: string
  dateModified?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${buildUrl(path)}#webpage`,
    url: buildUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    ...(dateModified ? { dateModified } : {}),
  }
}

export type BreadcrumbItem = {
  name: string
  path: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildUrl(item.path),
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${buildUrl("/faq/")}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function itemListSchema({
  name,
  description,
  path,
  items,
}: {
  name: string
  description: string
  path: string
  items: { name: string; path: string; description?: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: buildUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: buildUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

export function blogCollectionSchema(
  posts: { title: string; path: string; publishedAt: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${buildUrl("/blog/")}#blog`,
    name: `Blog | ${company.brandName}`,
    description: `Insights on software development, technology trends, and digital strategy from ${company.brandName}.`,
    url: buildUrl("/blog/"),
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: buildUrl(post.path),
      datePublished: post.publishedAt,
      description: post.description,
    })),
  }
}

export function portfolioItemListSchema(
  projects: { title: string; description: string; type: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio and Case Studies",
    description: `Software projects delivered by ${company.brandName}.`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        genre: project.type,
        creator: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  }
}

export function serviceSchema({
  name,
  description,
  path,
  category,
}: {
  name: string
  description: string
  path: string
  category: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: buildUrl(path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: company.targetCountry,
    },
    serviceType: category,
    category: "Software Development",
  }
}

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  modifiedAt,
  author,
  articleSection,
  wordCount,
}: {
  title: string
  description: string
  path: string
  publishedAt: string
  modifiedAt?: string
  author: string
  articleSection?: string
  wordCount?: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: buildUrl(path),
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildUrl(path),
    },
    inLanguage: "en-IN",
    image: OG_IMAGE,
    ...(articleSection ? { articleSection } : {}),
    ...(wordCount ? { wordCount } : {}),
  }
}

export function testimonialReviewsSchema(
  reviews: { name: string; content: string; rating: number }[]
) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: company.brandName,
    },
    author: {
      "@type": "Person",
      name: review.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.content,
  }))
}

export function jobPostingSchema(jobs: {
  title: string
  description: string
  type: string
  id: string
}[]) {
  return jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: company.brandName,
      value: job.id,
    },
    datePosted: JOB_POSTINGS_DATE,
    validThrough: `${new Date(JOB_POSTINGS_DATE).getFullYear() + 1}-12-31`,
    employmentType: job.type === "Full-time" ? "FULL_TIME" : "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: company.brandName,
      sameAs: SITE_URL,
      logo: LOGO_IMAGE,
    },
    jobLocation: {
      "@type": "Country",
      name: company.targetCountry,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: company.targetCountry,
    },
    url: buildUrl("/careers/"),
  }))
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${company.brandName}`,
    url: buildUrl("/contact/"),
    description: `Contact ${company.brandName} for software development inquiries and project consultations.`,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  }
}

/** @deprecated Use testimonialReviewsSchema instead */
export function reviewSchema(reviews: { name: string; content: string }[]) {
  return testimonialReviewsSchema(
    reviews.map((r) => ({ ...r, rating: 5 }))
  )
}
