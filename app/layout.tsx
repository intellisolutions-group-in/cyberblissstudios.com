import type React from "react"
import type { Metadata, Viewport } from "next"
import { Orbitron } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GsapProvider } from "@/components/gsap-provider"
import { PremiumShell, CursorEffects } from "@/components/premium/premium-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { CommandMenu } from "@/components/ui/command-menu"
import { createMetadata, organizationSchema, websiteSchema } from "@/lib/seo"
import company from "@/data/company.json"

export const metadata: Metadata = createMetadata({
  title: "IT & Software Development Company in India",
  description: company.description,
  keywords: ["custom software development", "web development", "mobile apps", "enterprise software"],
  path: "/",
})

export const viewport: Viewport = {
  themeColor: "#ef4444",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

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
  return (
    <html lang="en-IN" className={`${orbitron.variable} ${GeistSans.variable} antialiased dark`}>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:bg-red-500 focus:px-4 focus:py-2 focus:text-white focus:font-geist"
        >
          Skip to main content
        </a>
        <GsapProvider>
          <PremiumShell>
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
          </PremiumShell>
          <CommandMenu />
          <CursorEffects />
        </GsapProvider>
      </body>
    </html>
  )
}
