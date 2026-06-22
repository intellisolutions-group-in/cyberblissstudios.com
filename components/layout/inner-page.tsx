import { PageHero } from "@/components/layout/page-hero"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

interface InnerPageProps {
  title: string
  subtitle?: string
  path?: string
  children: React.ReactNode
}

export function InnerPage({ title, subtitle, path, children }: InnerPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {path && <Breadcrumbs path={path} currentTitle={title} />}
      <PageHero title={title} subtitle={subtitle} compact={Boolean(path)} />
      <main className="py-10 md:py-14 lg:py-16">{children}</main>
    </div>
  )
}
