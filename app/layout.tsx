import type React from "react"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GsapProvider } from "@/components/gsap-provider"
import { PremiumShell, CursorEffects } from "@/components/premium/premium-shell"
import { createMetadata, organizationSchema } from "@/lib/seo"
import company from "@/data/company.json"

export const metadata: Metadata = createMetadata({
  title: "IT & Software Development Company in India",
  description: company.description,
  keywords: ["custom software development", "web development", "mobile apps", "enterprise software"],
  path: "/",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schema = organizationSchema()

  return (
    <html lang="en" className={`${orbitron.variable} ${GeistSans.variable} antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <GsapProvider>
          <PremiumShell>
            <Navbar />
            {children}
            <Footer />
          </PremiumShell>
          <CursorEffects />
        </GsapProvider>
      </body>
    </html>
  )
}
