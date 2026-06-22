import type { Metadata } from "next"
import company from "@/data/company.json"

export const SITE_URL = company.url
export const OG_IMAGE = `${SITE_URL}/images/og-image.svg`
export const metadataBase = new URL(SITE_URL)

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
    category: "technology",
  }
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    email: company.email,
    foundingDate: String(company.establishedYear),
    description: company.description,
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
}: {
  title: string
  description: string
  path: string
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
  author,
}: {
  title: string
  description: string
  path: string
  publishedAt: string
  author: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: buildUrl(path),
    datePublished: publishedAt,
    dateModified: publishedAt,
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
  }
}

export function reviewSchema(
  reviews: { name: string; content: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.brandName,
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewBody: review.content,
    })),
  }
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
    datePosted: new Date().toISOString().split("T")[0],
    employmentType: job.type === "Full-time" ? "FULL_TIME" : "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: company.brandName,
      sameAs: SITE_URL,
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
  }
}
