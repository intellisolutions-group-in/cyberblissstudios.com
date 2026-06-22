import { InnerPage } from "@/components/layout/inner-page"
import { SlideUp } from "@/components/ui/slide-up"
import { createMetadata } from "@/lib/seo"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms of Service for ${company.brandName} website and software development services.`,
  path: "/terms/",
})

export default function TermsOfService() {
  return (
    <InnerPage title="Terms of Service" subtitle="Terms governing use of our website and software development services">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <SlideUp>
            <p className="text-gray-300 text-lg leading-relaxed font-geist glow-border rounded-lg p-6 bg-card/30">
              Last updated: {new Date().toLocaleDateString("en-IN")}
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                By accessing or using the {company.brandName} website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our website and services.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.15}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">2. Services Description</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                {company.brandName} provides software development, IT consulting, and related technology services. Specific deliverables, timelines, and terms for each engagement are defined in individual project agreements or statements of work.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.2}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">3. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed mb-4 font-geist">
                Unless otherwise agreed in writing, custom software developed for clients becomes the property of the client upon full payment. {company.brandName} retains rights to general methodologies, tools, and pre-existing intellectual property used in delivering services.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.25}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">4. User Responsibilities</h2>
              <p className="text-gray-300 leading-relaxed mb-4 font-geist">When using our website and services, you agree to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 font-geist">
                <li>Provide accurate information in forms and communications</li>
                <li>Not misuse our website or attempt unauthorized access to our systems</li>
                <li>Respect intellectual property rights of {company.brandName} and third parties</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.3}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">5. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                {company.brandName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website. Our total liability for any claim shall not exceed the amount paid by you for the specific services giving rise to the claim in the twelve months preceding the claim.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.35}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">6. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.4}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">7. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                For questions about these Terms of Service, contact us at:
                <br />
                Email: {company.email}
              </p>
            </section>
          </SlideUp>
        </div>
      </div>
    </InnerPage>
  )
}
