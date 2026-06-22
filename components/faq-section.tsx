import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import faqData from "@/data/faq.json"

export function FAQSection() {
  const previewFaqs = faqData.flatMap((cat) => cat.items).slice(0, 6)

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-geist">
            Common questions about our software development services and how we work with clients
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {previewFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-geist">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-10">
            <Link href="/faq/">
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-geist bg-transparent">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
