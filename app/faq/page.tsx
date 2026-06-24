import { InnerPage } from "@/components/layout/inner-page"
import { FAQList } from "@/components/faq/faq-list"
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
        <FAQList faqData={faqData} />
      </InnerPage>
      <CTASection />
    </>
  )
}
