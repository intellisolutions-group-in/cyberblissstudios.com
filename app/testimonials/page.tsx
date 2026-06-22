import { InnerPage } from "@/components/layout/inner-page"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { createMetadata } from "@/lib/seo"
import testimonials from "@/data/testimonials.json"
import company from "@/data/company.json"
import { Star } from "lucide-react"

export const metadata = createMetadata({
  title: "Client Testimonials",
  description: `Read what clients say about working with ${company.brandName} on software development projects.`,
  keywords: ["testimonials", "client reviews", "software development feedback"],
  path: "/testimonials/",
})

export default function TestimonialsPage() {
  return (
    <>
      <InnerPage
        title="Client Testimonials"
        subtitle="Feedback from clients who have partnered with us on software development projects"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
            <SlideUp key={testimonial.id} index={index} hover>
              <Card className="glow-border bg-card/30 border-red-500/20 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-red-500 text-red-500" />
                      ))}
                    </div>
                    <p className="text-gray-300 font-geist leading-relaxed mb-6">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-red-500/20 text-red-500 font-orbitron">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white font-geist">{testimonial.name}</p>
                        <p className="text-sm text-gray-400 font-geist">
                          {testimonial.designation}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SlideUp>
            ))}
          </div>
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
