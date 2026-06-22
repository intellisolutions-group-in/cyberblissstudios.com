import { PageHero } from "@/components/layout/page-hero"

interface InnerPageProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function InnerPage({ title, subtitle, children }: InnerPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <PageHero title={title} subtitle={subtitle} />
      <main className="py-10 md:py-14 lg:py-16">{children}</main>
    </div>
  )
}
