import { InnerPage } from "@/components/layout/inner-page"
import { BlogGrid } from "@/components/blog/blog-grid"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata, blogCollectionSchema, webPageSchema } from "@/lib/seo"
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
        data={[
          webPageSchema({
            title: `Blog | ${company.brandName}`,
            description: pageDescription,
            path: "/blog/",
          }),
          blogCollectionSchema(
            posts.map((post) => ({
              title: post.title,
              path: `/blog/${post.slug}/`,
              publishedAt: post.publishedAt,
              description: post.excerpt,
            }))
          ),
        ]}
      />
      <InnerPage
        title="Blog"
        subtitle="Practical insights on software development, technology strategy, and building reliable digital products"
        path="/blog/"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <BlogGrid posts={posts} />
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
