import { InnerPage } from "@/components/layout/inner-page"
import { SlideUp } from "@/components/ui/slide-up"
import { createMetadata } from "@/lib/seo"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${company.brandName}. Learn how we collect, use, and protect your personal information.`,
  path: "/privacy/",
})

export default function PrivacyPolicy() {
  return (
    <InnerPage title="Privacy Policy" subtitle="How we collect, use, and protect your personal information">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <SlideUp>
            <p className="text-gray-300 text-lg leading-relaxed font-geist glow-border rounded-lg p-6 bg-card/30">
              Last updated: {new Date().toLocaleDateString("en-IN")}
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">1. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4 font-geist">
                {company.brandName} collects information to provide and improve our software development services. We collect information in the following ways:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 font-geist">
                <li>Information you provide directly through contact forms, inquiry forms, and career applications</li>
                <li>Business contact details including name, email address, and phone number when voluntarily submitted</li>
                <li>Technical information such as browser type, device information, and IP address when you visit our website</li>
                <li>Project-related information shared during consultations and engagements</li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.15}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">2. How We Use Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4 font-geist">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 font-geist">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Process job applications and communicate with candidates</li>
                <li>Improve our website and service offerings</li>
                <li>Send relevant project updates and communications during active engagements</li>
                <li>Comply with legal obligations and regulatory requirements</li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.2}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">3. Data Sharing and Disclosure</h2>
              <p className="text-gray-300 leading-relaxed mb-4 font-geist">
                We do not sell, trade, or transfer your personal information to third parties without your consent, except:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 font-geist">
                <li>To comply with legal obligations or court orders</li>
                <li>To protect the rights, property, or safety of {company.brandName} or others</li>
                <li>With service providers under strict confidentiality agreements who assist in operating our website and services</li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.25}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">4. Data Security</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.3}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">5. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4 font-geist">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 font-geist">
                <li>Access, update, or request deletion of your personal information</li>
                <li>Withdraw consent for data processing where applicable</li>
                <li>Request information about how your data is being used</li>
                <li>File complaints with relevant data protection authorities</li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.35}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">6. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                If you have questions about this Privacy Policy, please contact us at:
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
