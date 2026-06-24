import { InnerPage } from "@/components/layout/inner-page"
import { ContactForm } from "@/components/ui/contact-form"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { contactPageSchema, createMetadata, webPageSchema } from "@/lib/seo"
import company from "@/data/company.json"
import { Mail, Clock, MapPin } from "lucide-react"

export const metadata = createMetadata({
  title: "Contact Us",
  description: `Get in touch with ${company.brandName} for software development inquiries, project quotes, and consultations.`,
  keywords: ["contact", "software development inquiry", "get a quote"],
  path: "/contact/",
})

const pageDescription = `Get in touch with ${company.brandName} for software development inquiries, project quotes, and consultations.`

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: `Contact Us | ${company.brandName}`,
            description: pageDescription,
            path: "/contact/",
          }),
          contactPageSchema(),
        ]}
      />
      <InnerPage
        title="Contact Us"
        subtitle="We would love to hear about your project. Reach out and our team will respond promptly."
        path="/contact/"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <SlideUp index={0} hover>
                <div className="glow-border rounded-lg p-6 bg-card/50 h-full">
                  <Mail className="h-6 w-6 text-red-500 mb-3" />
                  <h3 className="text-white font-orbitron font-semibold mb-2">Email</h3>
                  <a href={`mailto:${company.email}`} className="text-gray-300 hover:text-red-500 font-geist transition-colors">
                    {company.email}
                  </a>
                </div>
              </SlideUp>

              <SlideUp index={1} hover>
                <div className="glow-border rounded-lg p-6 bg-card/50 h-full">
                  <Clock className="h-6 w-6 text-red-500 mb-3" />
                  <h3 className="text-white font-orbitron font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-300 font-geist">{company.businessHours}</p>
                </div>
              </SlideUp>
            </div>

            <SlideUp delay={0.15} className="lg:col-span-2">
              <div className="glow-border rounded-lg p-8 bg-card/30">
                <h2 className="text-2xl font-bold text-white font-orbitron mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </SlideUp>
          </div>

        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
