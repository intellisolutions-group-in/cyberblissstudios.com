import { notFound } from "next/navigation"
import Link from "next/link"
import { InnerPage } from "@/components/layout/inner-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/ui/blog-card"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { articleSchema, createMetadata, webPageSchema } from "@/lib/seo"
import {
  formatBlogDate,
  getAllPostSlugs,
  getPostBySlug,
  getPostWordCount,
  getRelatedPosts,
} from "@/lib/blog"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import company from "@/data/company.json"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.category, "software blog"],
    path: `/blog/${slug}/`,
    ogType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    authors: [post.author],
  })
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug)
  const postPath = `/blog/${slug}/`

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: `${post.title} | ${company.brandName}`,
            description: post.excerpt,
            path: postPath,
            dateModified: post.publishedAt,
          }),
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: postPath,
            publishedAt: post.publishedAt,
            author: post.author,
            articleSection: post.category,
            wordCount: getPostWordCount(post),
          }),
        ]}
      />
      <InnerPage title={post.title} subtitle={post.excerpt} path={postPath}>
        <article className="container mx-auto px-4 max-w-3xl">
          <SlideUp>
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-red-500/20">
              <Badge variant="outline" className="border-red-500/30 text-red-400 font-geist">
                {post.category}
              </Badge>
              <time dateTime={post.publishedAt} className="inline-flex items-center gap-1.5 text-sm text-gray-400 font-geist">
                <Calendar className="h-4 w-4 text-red-500" aria-hidden />
                {formatBlogDate(post.publishedAt)}
              </time>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 font-geist">
                <Clock className="h-4 w-4 text-red-500" />
                {post.readTimeMinutes} min read
              </span>
              <span className="text-sm text-gray-500 font-geist">By {post.author}</span>
            </div>
          </SlideUp>

          <div className="space-y-10">
            {post.sections.map((section, sectionIndex) => (
              <SlideUp key={sectionIndex} index={sectionIndex}>
                <div className="glow-border rounded-lg p-6 md:p-8 bg-card/30">
                  {section.heading && (
                    <h2 className="text-xl md:text-2xl font-bold text-red-500 font-orbitron mb-4">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-300 font-geist leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>

          <SlideUp delay={0.2} className="mt-10">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-geist text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </SlideUp>

          <SlideUp delay={0.25} className="mt-10 text-center">
            <Link href="/blog/">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-geist bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </SlideUp>
        </article>

        {related.length > 0 && (
          <section className="container mx-auto px-4 max-w-6xl mt-16 md:mt-20 pt-12 border-t border-red-500/20">
            <SlideUp>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-orbitron mb-8 text-center">
                Related Articles
              </h2>
            </SlideUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((relatedPost, index) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
              ))}
            </div>
          </section>
        )}
      </InnerPage>
      <CTASection />
    </>
  )
}
