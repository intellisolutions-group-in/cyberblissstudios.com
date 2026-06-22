import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"

const SEGMENT_LABELS: Record<string, string> = {
  about: "About Us",
  services: "Services",
  contact: "Contact Us",
  careers: "Careers",
  "why-choose-us": "Why Choose Us",
  "our-process": "Our Process",
  portfolio: "Portfolio",
  blog: "Blog",
  faq: "FAQ",
  testimonials: "Testimonials",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  cookies: "Cookie Policy",
}

export function buildBreadcrumbs(path: string, currentTitle: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ name: "Home", path: "/" }]
  const segments = path.replace(/^\/|\/$/g, "").split("/").filter(Boolean)

  let accumulated = ""
  segments.forEach((segment, index) => {
    accumulated += `/${segment}`
    const isLast = index === segments.length - 1
    items.push({
      name: isLast ? currentTitle : SEGMENT_LABELS[segment] ?? segment.replace(/-/g, " "),
      path: `${accumulated}/`,
    })
  })

  return items
}

type BreadcrumbsProps = {
  path: string
  currentTitle: string
}

export function Breadcrumbs({ path, currentTitle }: BreadcrumbsProps) {
  const items = buildBreadcrumbs(path, currentTitle)

  if (items.length <= 1) return null

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-2">
        <ol className="flex flex-wrap items-center gap-1 text-sm font-geist text-gray-400">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.path} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-600" aria-hidden />}
                {isLast ? (
                  <span className="text-gray-300" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-red-500 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
