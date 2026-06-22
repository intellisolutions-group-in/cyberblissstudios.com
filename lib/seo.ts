import type { Metadata } from "next"
import company from "@/data/company.json"

type PageMeta = {
  title: string
  description: string
  keywords?: string[]
  path?: string
}

export function createMetadata({ title, description, keywords = [], path = "" }: PageMeta): Metadata {
  const fullTitle = path === "/" ? `${company.brandName} | ${title}` : `${title} | ${company.brandName}`
  const url = `${company.url}${path === "/" ? "/" : path}`

  return {
    title: fullTitle,
    description,
    keywords: [
      company.brandName,
      "software development India",
      "IT services",
      ...keywords,
    ],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.brandName,
      locale: "en_IN",
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  }
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brandName,
    url: company.url,
    email: company.email,
    foundingDate: String(company.establishedYear),
    description: company.description,
    areaServed: company.targetCountry,
    industry: company.industry,
  }
}
