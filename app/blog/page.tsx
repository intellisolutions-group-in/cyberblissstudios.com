import { InnerPage } from "@/components/layout/inner-page"
import { BlogCard } from "@/components/ui/blog-card"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata, webPageSchema } from "@/lib/seo"
import { getAllPosts } from "@/lib/blog"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Blog",
  description: `Insights on software development, technology trends, and digital strategy from ${company.brandName}.`,
  keywords: ["software development blog", "technology insights", "IT articles India"],
  path: "/blog/",
})

const pageDescription = `Insights on software development, technology trends, and digital strategy from ${company.brandName}.`

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <JsonLd
        data={webPageSchema({
          title: `Blog | ${company.brandName}`,
          description: pageDescription,
          path: "/blog/",
        })}
      />
      <InnerPage
        title="Blog"
        subtitle="Practical insights on software development, technology strategy, and building reliable digital products"
        path="/blog/"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
