import { InnerPage } from "@/components/layout/inner-page"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata, faqSchema, webPageSchema } from "@/lib/seo"
import faqData from "@/data/faq.json"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description: `Find answers to common questions about ${company.brandName}'s software development services, processes, and engagement models.`,
  keywords: ["FAQ", "software development questions"],
  path: "/faq/",
})

const allFaqs = faqData.flatMap((cat) => cat.items)

const pageDescription = `Find answers to common questions about ${company.brandName}'s software development services, processes, and engagement models.`

export default function FAQPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: `Frequently Asked Questions | ${company.brandName}`,
            description: pageDescription,
            path: "/faq/",
          }),
          faqSchema(allFaqs),
        ]}
      />
      <InnerPage
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about our services, process, and how we work"
        path="/faq/"
      >
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {faqData.map((category, categoryIndex) => (
            <SlideUp key={category.id} delay={categoryIndex * 0.1}>
              <div>
                <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((faq, index) => (
                    <AccordionItem key={index} value={`${category.id}-${index}`} className="border-red-500/20 mb-4">
                      <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-geist">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SlideUp>
          ))}
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
