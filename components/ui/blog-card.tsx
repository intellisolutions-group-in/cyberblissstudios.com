import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideUp } from "@/components/ui/slide-up"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { formatBlogDate, type BlogPost } from "@/lib/blog"

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <SlideUp index={index} hover>
      <Link href={`/blog/${post.slug}/`} className="block h-full" aria-label={`Read article: ${post.title}`}>
        <Card className="glow-border h-full bg-card/30 border-red-500/20 group">
          <CardHeader>
            <Badge variant="outline" className="w-fit border-red-500/30 text-red-400 font-geist mb-2">
              {post.category}
            </Badge>
            <CardTitle className="text-white font-orbitron text-xl group-hover:text-red-400 transition-colors line-clamp-2">
              {post.title}
            </CardTitle>
            <CardDescription className="text-gray-400 font-geist line-clamp-3 leading-relaxed">
              {post.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-geist mb-4">
              <time dateTime={post.publishedAt} className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                {formatBlogDate(post.publishedAt)}
              </time>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTimeMinutes} min read
              </span>
            </div>
            <span className="inline-flex items-center text-red-500 font-geist text-sm group-hover:gap-2 transition-all">
              Read article <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </CardContent>
        </Card>
      </Link>
    </SlideUp>
  )
}
