import Link from "next/link"
import { InnerPage } from "@/components/layout/inner-page"
import { Button } from "@/components/ui/button"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  path: "/404/",
  noIndex: true,
})

export default function NotFound() {
  return (
    <InnerPage title="Page Not Found" subtitle="The page you requested does not exist or may have been moved." path="/404/">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <p className="text-gray-400 font-geist mb-8">
          Check the URL or return to the homepage to continue browsing our software development services.
        </p>
        <Link href="/">
          <Button className="bg-red-500 hover:bg-red-600 text-white font-geist border-0">Back to Home</Button>
        </Link>
      </div>
    </InnerPage>
  )
}
