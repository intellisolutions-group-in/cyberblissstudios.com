import { InnerPage } from "@/components/layout/inner-page"
import { SlideUp } from "@/components/ui/slide-up"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata, LEGAL_LAST_UPDATED, LEGAL_LAST_UPDATED_DISPLAY, webPageSchema } from "@/lib/seo"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Cookie Policy",
  description: `Cookie Policy for ${company.brandName}. Learn how we use cookies on our website.`,
  path: "/cookies/",
})

const pageDescription = `Cookie Policy for ${company.brandName}. Learn how we use cookies on our website.`

export default function CookiePolicy() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          title: `Cookie Policy | ${company.brandName}`,
          description: pageDescription,
          path: "/cookies/",
          dateModified: LEGAL_LAST_UPDATED,
        })}
      />
      <InnerPage
        title="Cookie Policy"
        subtitle="How we use cookies to improve your browsing experience"
        path="/cookies/"
      >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <SlideUp>
            <p className="text-gray-300 text-lg leading-relaxed font-geist glow-border rounded-lg p-6 bg-card/30">
              Last updated: {LEGAL_LAST_UPDATED_DISPLAY}
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">1. What Are Cookies</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                Cookies are small text files placed on your computer or mobile device when you visit our website. {company.brandName} uses cookies to enhance your browsing experience and improve our website functionality.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.15}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">2. Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white font-orbitron">Essential Cookies</h3>
                  <p className="text-gray-300 leading-relaxed font-geist">
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white font-orbitron">Performance Cookies</h3>
                  <p className="text-gray-300 leading-relaxed font-geist">
                    These cookies collect information about how visitors use our website, helping us improve website performance and user experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white font-orbitron">Analytics Cookies</h3>
                  <p className="text-gray-300 leading-relaxed font-geist">
                    We may use analytics cookies to understand website traffic and usage patterns. This helps us improve our content and services.
                  </p>
                </div>
              </div>
            </section>
          </SlideUp>

          <SlideUp delay={0.2}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">3. Managing Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4 font-geist">You can control cookies through:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 font-geist">
                <li>Browser settings to refuse or accept cookies</li>
                <li>Deleting existing cookies from your browser at any time</li>
                <li>Using browser privacy modes that limit cookie storage</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4 font-geist">
                Disabling certain cookies may affect website functionality.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.25}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold mb-4 text-red-500 font-orbitron">4. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                For questions about our use of cookies, contact us at:
                <br />
                Email: {company.email}
              </p>
            </section>
          </SlideUp>
        </div>
      </div>
    </InnerPage>
    </>
  )
}
